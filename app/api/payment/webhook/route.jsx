import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let data;
  let eventType;
  
  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;
  
  if (webhookSecret) {
    // Get the raw body for webhook signature verification
    const body = await req.text();
    let signature = req.headers.get("stripe-signature");

    try {
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
      data = event.data;
      eventType = event.type;
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:`, err.message);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }
  } else {
    // Webhook signing is recommended, but if the secret is not configured,
    // retrieve the event data directly from the request body.
    const body = await req.json();
    data = body.data;
    eventType = body.type;
  }

  console.log('Webhook event received:', eventType);

  switch (eventType) {
    case 'checkout.session.completed':
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      const session = data.object;
      console.log('Checkout session completed:', session);
      
      const customerEmail = session.customer_details?.email || session.metadata?.userEmail;
      const customerId = session.customer;
      const planType = session.metadata?.planType || 'monthly'; // default to monthly if not specified
      
      if (customerEmail && customerId) {
        try {
          // First check if user exists
          const existingUser = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, customerEmail));
          
          if (existingUser.length > 0) {
            // Update existing user
            const result = await db.update(USER_TABLE)
              .set({
                isMember: true,
                customerId: customerId,
                planType: planType
              })
              .where(eq(USER_TABLE.email, customerEmail));
            
            console.log('Updated user membership:', { email: customerEmail, customerId, planType, result });
          } else {
            console.log('User not found with email:', customerEmail);
          }
        } catch (error) {
          console.error('Error updating user membership:', error);
        }
      } else {
        console.log('Missing customer email or customer ID:', { customerEmail, customerId });
      }
      break;
      
    case 'invoice.paid':
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      console.log('Invoice paid event received');
      break;
      
    case 'invoice.payment_failed':
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      console.log('Invoice payment failed event received');
      break;
      
    default:
      // Unhandled event type
      console.log('Unhandled event type:', eventType);
  }
  
  return NextResponse.json({ result: 'success' });
}