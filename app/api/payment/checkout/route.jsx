import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    try{
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      const { priceId, userEmail } = await req.json();
      
      console.log('Checkout request received with priceId:', priceId);
      
      if(!priceId){
        console.error('Missing priceId in request');
        return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })
      }

      // Determine plan type from price ID
      let planType = 'monthly'; // default
      if (process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY === priceId) {
        planType = 'yearly';
      }

      // Verify the price exists in Stripe
      try {
        const price = await stripe.prices.retrieve(priceId);
        console.log('Price retrieved successfully:', price.id, price.unit_amount, price.currency);
      } catch (priceError) {
        console.error('Price not found in Stripe:', priceError.message);
        return NextResponse.json({ error: `Price not found: ${priceError.message}` }, { status: 400 });
      }

      const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          metadata: {
            planType: planType,
            userEmail: userEmail
          },
          success_url: process.env.HOST_URL+'payment-success?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: process.env.HOST_URL,
        });
        
      console.log('Checkout session created successfully:', session.id);
      return NextResponse.json(session)
    } catch (err) {
      console.error('Stripe checkout error:', err?.message || err)
      return NextResponse.json({ error: err?.message || 'Checkout failed' }, { status: 500 })
    }
}