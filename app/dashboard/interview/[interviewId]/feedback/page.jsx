"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {
  const router=useRouter();
  const [feedbackList,setFeedbackList]=useState([]);
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback=async()=>{
        const result=await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id);
        setFeedbackList(result);
    }
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-slate-500 text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>
      <h2 className='text-sm text-gray-500'>Find below the correct answers for the questions, your answer and feedback for improvement</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
          <Collapsible  key={index}>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left justify-between'>
          {item.question}<ChevronsUpDown className='h-5 w-5 gap-7 w-full'/>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
              <h2 className='p-2 border rounded-lg text-red-900 bg-red-50 text-sm'><strong>Your Answer</strong>{item.UserAns}</h2>
              <h2 className='p-2 border rounded-lg text-green-900 bg-green-50 text-sm'><strong>Correct Answer</strong>{item.correctAns}</h2>
              <h2 className='p-2 border rounded-lg text-blue-900 bg-blue-50 text-sm'><strong>Feedback</strong>{item.feedback}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      
      ))}
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
