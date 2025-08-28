import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log('Testing user update for email:', email);

    // Check if user exists
    const existingUser = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
    
    console.log('Existing user:', existingUser);

    if (existingUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Test update
    const result = await db.update(USER_TABLE)
      .set({
        isMember: true,
        customerId: 'test-customer-id-' + Date.now()
      })
      .where(eq(USER_TABLE.email, email));

    console.log('Update result:', result);

    // Get updated user
    const updatedUser = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
    
    console.log('Updated user:', updatedUser);

    return NextResponse.json({ 
      success: true, 
      message: 'Test update completed',
      originalUser: existingUser[0],
      updatedUser: updatedUser[0],
      updateResult: result
    });

  } catch (error) {
    console.error('Error in test-update:', error);
    return NextResponse.json({ 
      error: 'Test update failed',
      details: error.message 
    }, { status: 500 });
  }
}
