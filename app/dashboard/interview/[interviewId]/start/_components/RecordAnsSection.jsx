"use client"
import { Button } from '@/components/ui/button'
import { chatSession } from '@/utils/GeminiAiModel'
import { useUser } from '@clerk/nextjs'
import { Mic, Webcam } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'

function RecordAnsSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {

    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading] = useState(false);
    
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      const StartStopRecording=async()=>{
        if(isRecording) {
          
          stopSpeechToText();
           
        }else {
          startSpeechToText();
        }
      }
      const UpdateUserAnswer=async()=>{
        setLoading(true);
        const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+",User Answer:"+userAnswer+",Depends on question and user answer for give interview question"+",please give us rating for answer and feedback as area of improvment"

          const result=await chatSession.sendMessage(feedbackPrompt);
          const mockJsonResp=(Result.response.text()).replace('```json','').replace('```','')
          const JsonFeedbackResp=Json.parse(mockJsonResp);
          const resp=await db.insert(userAnswer)
          .values({
            mockIdRef:interviewData?.mockId,
            question:mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-YYYY')
          })
          if(resp){
            toast('user Answer recorded successfully');
            setUserAnswer('');
            setResults([]);
          }
          setResults([]);
          
          setLoading(false);
      }
      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          UpdateUserAnswer();
        }
      },[userAnswer])

  return (

    <div className='flex flex-col justify-center items-center border mt-10 mb-10 rounded-lg'>
        <div className='flex flex-col justify-center items-center mt-20 rounded-lg p-5 gap-10'>
        <Image src={'/Webcam.png'} 
        width={200}
        height={200}
        className='absolute'
        />
      <Webcam mirrored={true}
      style={{
        height:300,
        width:'100%',
        zIndex:10
      }}
      />
    </div>
      <Button
      disabled={loading}
      className="my-10"
      onClick={StartStopRecording}
      >
      {isRecording?
        <h2 className='text-red-600 flex gap-2'>
            <Mic />Stop Recording...
        </h2>:
        
      'Record Answer'}</Button>

      <Button>Show User Answer</Button>
        

      {/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
    </div>
    
  )
}

export default RecordAnsSection
