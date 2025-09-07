import React from 'react'
type MeetingProps={
    params:{
        id:string;
    }
}
const Meeting : React.FC<MeetingProps> = async({params}) => {
    const { id } = await params
  return (
    <div>Meeting: {id}</div>
  )
}

export default Meeting;