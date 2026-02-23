import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallState, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { RecordingTimer } from './RecordingTimer';
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type callLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {

  //checking if its personal room or not by using searchParams
  const searchParams = useSearchParams();
  // if presonal room set it to true else false 
  const isPersonalRoom = !!searchParams.get('personal');

  // state to manage call layout options
  const [layout, setLayout] = useState<callLayoutType>('speaker-left');
  // state to show/hide participants list
  const [showParticipants, setShowParticipants] = useState(false);
  // function to switch between different call layouts

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== 'joined') {
    return <Loader />
  }
  const callLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />
      default:
        return <SpeakerLayout participantsBarPosition='right' />
    }
  }
  return (
    <section className='relative h-screen w-full pt-4 text-white'>
      <div className="relative flex size-full items-center justify-center">
        <RecordingTimer />
        <div className="flex size-full max-w-[1000px] items-center">
          {/* displays call layout  */}
          {callLayout()}
        </div>
        <div className={cn('h-[calc(100vh-86px)]  hidden ml-2', { 'block': showParticipants })}>
          {/* Call participants list */}
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex-wrap items-center justify-center gap-5 p-3 flex">
        {/* Call controls options */}
        <CallControls onLeave={() => router.push('/')} />
        <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <LayoutList size={20} className='text-white' />
          </DropdownMenuTrigger >
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['grid', 'speaker-left', 'speaker-right'].map((item, idx) => (
              <div key={idx} className='cursor-pointer  ' onClick={() => setLayout(item as callLayoutType)}>
                <DropdownMenuItem>
                  {/* displays layout option */}
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* gives connection statistics  */}
        <CallStatsButton />
        {/* see or hide all participants */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white' />
          </div>
        </button>
        {/* close meeting for everyone  */}
        {!isPersonalRoom && <EndCallButton />}

      </div>
    </section>
  )
}

export default MeetingRoom