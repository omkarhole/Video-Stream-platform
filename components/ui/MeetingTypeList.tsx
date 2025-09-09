'use client'

import { toast, Toaster } from "sonner"
import React, { useState } from 'react'
import HomeCard from '../HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from '../MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>();
  const [values, setValues] = useState({
    dateTime:new Date(),
    description:'',
    link:''
  });
  const [callDetails, setCallDetails] = useState<Call>();
    const {user}=useUser();
    const client=useStreamVideoClient();

    const createMeeting=async ()=>{
        if(!user || !client ) return ;
        try{
            if(!values.dateTime){
            toast.error("Please Create a date and time.")
            return;
            }
            //generate random call id 
            const id=crypto.randomUUID();

            //create call
            const call=client.call('default',id);
            if(!call) throw new Error('Failed To Create Call');

            const startAt=values.dateTime.toISOString() || new Date().toISOString() ;
            const description=values.description || 'Instant Meeting';
            call.getOrCreate({
                data:{
                    starts_at:startAt,
                    custom:{
                        description
                    }
                }
            });
            setCallDetails(call);
            if(!values.description){
                router.push(`meeting/${call.id}`);
            }
            toast.success("Meeting created.")
           
        }
        catch(e){
            console.log(e);
            toast.error("Failed to create meeting")
        }
    }
    
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2  xl:grid-cols-4'>
            <HomeCard
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start a new meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='via invitation link'
                handleClick={() => setMeetingState('isJoinMeeting')}
                className='bg-blue-1'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description='plan your meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-purple-1'
            />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Recordings'
                description='Meeting recordings'
                handleClick={() => router.push('/recordings')}
                className='bg-yellow-1'
            />
            <MeetingModal 
            isOpen={meetingState==='isInstantMeeting'}
                 onClose={()=> setMeetingState(undefined)}
                 title='Start Instant Meeting'
                 className='text-center'
                 buttonText="Start Meeting"
                 handleClick={createMeeting}
            />

        </section>
    )
}

export default MeetingTypeList