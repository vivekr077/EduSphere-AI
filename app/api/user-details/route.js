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

    console.log('Fetching user details for email:', email);

    const result = await db.select().from(USER_TABLE)
      .where(eq(USER_TABLE.email, email));

    console.log('Database query result:', result);

    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = result[0];
    console.log('User details found:', user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch user details',
      details: error.message 
    }, { status: 500 });
  }
}
