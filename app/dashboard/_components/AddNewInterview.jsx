"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
  

function AddNewInterview() {
    const [openDialog,setOpenDialog] = useState(false);
    const [jobPosition,setJobPosition] = useState();
    const [jobDescription,setJobDescription] = useState();
    const [jobExperience,setJobExperience] = useState();
    const [loading,setLoading] = useState(false);
    const [jsonResponse,setJsaonResponse] = useState([]);
    const {user} = useUser();
    const router=useRouter();

    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log(jobDescription,jobExperience,jobPosition);

        const InputPrompt="Job title:"+jobPosition+", Job description: "+jobDescription+",years of experiecne:"+jobExperience+".Based on this information please give me 5 interview question with answers in json format.question and answers"

        const Result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(Result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsaonResponse(MockJsonResp);

        if(MockJsonResp){
        const resp=await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDescription,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress.emailAddress,
            createdAt:moment().format('DD-MM-YYYY')
        }).returning({mockId:MockInterview.mockId})

        console.log("Inserted ID:",resp);
        if(resp){
            setOpenDialog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
        }else{
            console.log("ERROR");
        }
        setLoading(false);
    }
  return (
    <div>
      <div className='
        p-10 border
        rounded-lg 
        bg-secondary 
        hover:scale-105 
        cursor-pointer 
        shadow-md
        transition-all
        '>
        <h2 className='font-bold text-lg text-center'
        onClick={()=>setOpenDialog(true)}
        >+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
    
    <DialogContent className='max-w-2xl'>
        <DialogHeader>
        <DialogTitle className='font-bold text-2xl'>Tell us more about your job interviewing</DialogTitle>
        <form onSubmit={onSubmit}>
        <DialogDescription>

            <div>
            <h2>Add details about your job position/role, job description and years of experience</h2>
            <div className='mt-7 my-3'>
                <label>Job Role/Job position</label>
                <Input placeholder='Ex. Full Stack Devloper' required
                onChange={(e)=>setJobPosition(e.target.value)}
                />
            </div>
            <div className=' my-3'>
                <label>Job Description</label>
                <Textarea placeholder='Ex. React, Angular, NextJs' required
                onChange={(e)=>setJobDescription(e.target.value)}
                />
            </div>
            <div className='my-3'>
                <label>Years of Experience</label>
                <Input placeholder='Ex. 5' type="number" max="50" required
                onChange={(e)=>setJobExperience(e.target.value)}
                />
            </div>
            </div>
            
            
            <div className='flex gap-5 justify-end mt-2'>
                <Button type="button" variant="destructive" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disable={loading} >
                {loading?
                    <>
                    <LoaderCircle className='animate-spin' />'Generating Question'
                    </>:'Start Interview'
                    
                }
               </Button>
            </div>
            
        </DialogDescription>
        </form>
        </DialogHeader>
    </DialogContent>
    </Dialog>

    </div>
  )
}

export default AddNewInterview
