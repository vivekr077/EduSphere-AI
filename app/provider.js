"use client"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db';
import React, { useEffect } from 'react'
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import axios from 'axios';

const Provider = ({children}) => {
  const { user } = useUser();

  useEffect(()=>{
       user && CheckIsNewUser();
  },[user])

  const CheckIsNewUser = async () => {
     // check is user already exists
    //   const result = await db.select().from(USER_TABLE)
    //   .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))

    // console.log(result);
    // if(result?.length==0){
    //     // if not, then add to DB
    //     const userRes = await db.insert(USER_TABLE).values({
    //        name: user?.fullName,
    //        email: user?.primaryEmailAddress?.emailAddress
    //     }).returning({id:USER_TABLE.id})        
    // }
      const res = await axios.post('/api/create-user', {user: user});
      console.log(res.data);
       
  }

  return (
    <div>
        {children}
    </div>
  )
}

export default Provider