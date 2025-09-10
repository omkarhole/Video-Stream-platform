'use client'

import { toast } from "sonner"
import React, { useState } from 'react'
import HomeCard from '../HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from '../MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Textarea } from "./textarea"
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { user } = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!user || !client) return;
        try {
            if (!values.dateTime) {
                toast.error("Please Create a date and time.")
                return;
            }
            //generate random call id 
            const id = crypto.randomUUID();

            //create call
            const call = client.call('default', id);
            if (!call) throw new Error('Failed To Create Call');

            const startAt = values.dateTime.toISOString() || new Date().toISOString();
            const description = values.description || 'Instant Meeting';
            call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            });
            setCallDetails(call);
            if (!values.description) {
                router.push(`meeting/${call.id}`);
            }
            toast.success("Meeting created.")

        }
        catch (e) {
            console.log(e);
            toast.error("Failed to create meeting")
        }
    }
const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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
            {/* schedule meeting modal */}
            {/* if call details not exist then schedule meeting  */}
            {
                !callDetails ? (
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title='Create Meeting'
                        handleClick={createMeeting}
                    >
                        <div className="flex flex-col gap-2.5">
                            <label className="text-base  leading-[22px] text-normal text-sky-2">Add a description</label>
                            <Textarea className="bg-dark-2 border-none focus-visible:ring-0  focus-visible:ring-offset-0 " onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }} />
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <label className="text-base  leading-[22px] text-normal text-sky-2">Select Date & Time</label>
                            <ReactDatePicker selected={values.dateTime} onChange={(date) => { setValues({ ...values, dateTime: date! }) }} showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat={'MMMM d, yyyy h:mm aa'}
                                className="w-full rounded bg-dark-2 p-2 focus:outline-none"
                            />
                        </div>
                    </MeetingModal>
                    // if call details exist then show meeting created modal as copy the link 
                ) : (
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title='Meeting Created'
                        className='text-center'
                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink);
                            toast.success("Meeting link copied to clipboard");
                        }}
                        image='/icons/checked.svg'
                        buttonIcon="/icons/copy.svg"
                        buttonText='Copy Meeting Link'
                    />
                )
            }



            {/* create instant  meeting  */}
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start Instant Meeting'
                className='text-center'
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

        </section>
    )
}

export default MeetingTypeList