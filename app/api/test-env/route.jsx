import { NextResponse } from "next/server";

export async function GET() {
  try {
    const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY;
    const yearlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY;
    
    return NextResponse.json({
      success: true,
      monthlyPriceId: monthlyPriceId || 'NOT_SET',
      yearlyPriceId: yearlyPriceId || 'NOT_SET',
      monthlyConfigured: !!monthlyPriceId,
      yearlyConfigured: !!yearlyPriceId,
      bothConfigured: !!(monthlyPriceId && yearlyPriceId)
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
