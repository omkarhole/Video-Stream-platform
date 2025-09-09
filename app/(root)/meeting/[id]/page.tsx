'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { use, useState } from 'react';

const Meeting = ({params}:{params:Promise<{id:string}>}) => {
  // Unwrap the params Promise
  const { id } = use(params);

  // check whether user is authenticated or not
  const {user, isLoaded} = useUser();

  //to check whether the audio and video steup is complete  or not
  const [isSetupComplete, setIsSetupComplete] = useState<Boolean>(false);

//here we have to fetch the call using the id from the url so we use the custom hook useGetCallById and pass the id to it
//then we get the call and is callLoading from the hook
  
const {call, isCallLoading} = useGetCallById(id);
//if user is not loaded or call is loading then show loader
if(!isLoaded || isCallLoading) return <Loader />

  return (
   <main className='h-screen w-full  '>
    {/* pass the call into call  */}
    <StreamCall call={call}>
      <StreamTheme>
        {
          !isSetupComplete ?(
            // if setup is not complete then show the meeting setup component
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ):(
            // else show the meeting room component
            <MeetingRoom />
          )
        }
      </StreamTheme>
    </StreamCall>
    
   </main>
  )
}

export default Meeting;