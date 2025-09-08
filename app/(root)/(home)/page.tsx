import MeetingTypeList from '@/components/ui/MeetingTypeList';
import React from 'react'

const Home = () => {
  const date=new Date();
  const time=date.toLocaleTimeString(['en-IN'], { hour: '2-digit', minute: '2-digit' });
  return (
    <section className='flex flex-col size-full  gap-10 text-white'>
     <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
      <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11  '>
        <h1 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at 12:30PM</h1>
        <div className="flex flex-col gap-2">
          <h1 className='text-4xl font-extrabold lg:text-7xl'>
            {time.toUpperCase()}
            </h1 >
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date.toDateString()}</p>
             </div>
      </div> 
     </div>
     <MeetingTypeList/>
    </section>
  )
}

export default Home;  