import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // If sessionId is provided, this is a fallback user membership update
    if (body.sessionId) {
      const { sessionId } = body;
      
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      
      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
      }

      // Check if payment was successful
      if (session.payment_status !== 'paid') {
        return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
      }

      const customerEmail = session.customer_details?.email || session.metadata?.userEmail;
      const customerId = session.customer;
      const planType = session.metadata?.planType || 'monthly'; // default to monthly if not specified

      if (!customerEmail || !customerId) {
        return NextResponse.json({ error: 'Missing customer information' }, { status: 400 });
      }

      // Check if user exists
      const existingUser = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, customerEmail));
      
      if (existingUser.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Update user membership
      const result = await db.update(USER_TABLE)
        .set({
          isMember: true,
          customerId: customerId,
          planType: planType
        })
        .where(eq(USER_TABLE.email, customerEmail));

      console.log('Manually updated user membership:', { email: customerEmail, customerId, planType, result });

      return NextResponse.json({ 
        success: true, 
        message: 'User membership updated successfully',
        user: { email: customerEmail, customerId, planType, isMember: true }
      });
    }
    
    // If customerId is provided, this is for billing portal access
    if (body.customerId) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      
      try {
        // First verify the customer exists in Stripe
        const customer = await stripe.customers.retrieve(body.customerId);
        
        if (!customer || customer.deleted) {
          return NextResponse.json({ error: 'Customer not found in Stripe' }, { status: 404 });
        }

        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = process.env.HOST_URL || 'http://localhost:3000';

        const portalSession = await stripe.billingPortal.sessions.create({
          customer: body.customerId,
          return_url: returnUrl,
        });
        
        console.log('Billing portal session created:', portalSession.id);
        return NextResponse.json(portalSession);
        
      } catch (stripeError) {
        console.error('Stripe error in billing portal:', stripeError);
        
        if (stripeError.code === 'resource_missing') {
          return NextResponse.json({ 
            error: 'Customer not found in Stripe. Please contact support.' 
          }, { status: 404 });
        }
        
        return NextResponse.json({ 
          error: 'Unable to create billing portal session',
          details: stripeError.message 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Either sessionId or customerId is required' }, { status: 400 });

  } catch (error) {
    console.error('Error in manage-payment:', error);
    return NextResponse.json({ 
      error: 'Failed to process request',
      details: error.message 
    }, { status: 500 });
  }
}