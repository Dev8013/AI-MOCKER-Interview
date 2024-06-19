"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {

    const [interviewData,setInterviewData]=useState([]);
    const [weCamEnabled,setWebCamEnabled] = useState(false);

    useEffect(()=>{
        console.log(params.interviewId);
        GetInterviewDetails();
    })

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        setInterviewData(result[0]);
    }
  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='flex flex-col my-5 gap-5 '> 
        <div className='p-5 border rounded-lg'>
        <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData.jobPosition}</h2>
        <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewData.jobDesc}</h2>
        <h2 className='text-lg'><strong>Years Of Experience : </strong>{interviewData.jobExperience}</h2>
        </div>

        <div className='p-5 border border-yellow-300 rounded-lg bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>Enable Video Cam and Microphone to Start your AI Genrated Mock Interview. It has 5 question which you can answer and at the last you will get  the report on the basis if your answer. NOTE We never record your video. Web cam can be disable if you want.</h2>
        </div>
        
      </div>
      <div >
        {weCamEnabled?
        <Webcam 
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
        style={{
            height:300,
            width:300
        }}
        />:
        <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
        <Button onClick={()=>setWebCamEnabled(true)}>You Can Enable Web Cam and Microphone</Button>
        </>
        }
      </div>

      </div>

      <div className='flex items-end justify-end'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button>Start</Button>
        </Link>
        
      </div>
     
      
    </div>
  )
}

export default Interview
