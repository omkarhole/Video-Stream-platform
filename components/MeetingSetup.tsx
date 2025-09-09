'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:Boolean)=>void}) => {
// we have use useState  to toggle mic and camera (to on or off )
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  // useCall hook to get the call object from the StreamCall context
  const call=useCall();
  //if call is not defined then throw an error
  if(!call){
    throw new Error("UseCall must Be defined Stream call component");
  }
  //use Effect to enable(on) or disable(off) the mic and camera based on the isMicCamToggledOn state 
  useEffect(()=>{
    // if micCamToggledOn is true then disable the mic and camera 
    if(isMicCamToggledOn){
      call?.camera.disable();
      call?.microphone.disable();
    }
    //else enable the mic and camera
    else{
      call?.camera.enable();
      call?.microphone.enable();
    }

  },[isMicCamToggledOn,call?.camera,call?.microphone])
  
  return (
    <div className='flex h-screen w-full  flex-col items-center justify-center  gap-3 text-white'>
      <h1 className='text-2xl font-bold '>
        Meeting Setup
      </h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium' > 
          {/* here we have use check label to set micCamToogle on/off if user click on label then iw will pass boolean value of micCamToogled as false to useEffect  */}
          <input type="checkbox" checked={isMicCamToggledOn} onChange={(e)=> setIsMicCamToggledOn(e.target.checked)} />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className='rounded-md bg-green-500  px-4  py-2.5' onClick={()=>{
        call.join();
        setIsSetupComplete(true);
      }}>Join Meeting</Button>
    </div>
  )
}

export default MeetingSetup