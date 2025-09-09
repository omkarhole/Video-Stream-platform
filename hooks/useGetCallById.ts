import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCallById=(id:string|string[])=>{
    //first use useState to create call and isCallLoading state
    //1. call to store the call object
       const [call, setCall] = useState<Call>();
    //2. isCallLoading to indicate whether the call is being fetched or not
        const [isCallLoading, setIsCallLoading] = useState<boolean>(true);
       
        //then we have to get the client using useStreamVideoClient hook
         const client=useStreamVideoClient();

         //then use useEffect to fetch the call using the id

        useEffect(()=>{
         //if no client then return 
            if(!client ) return;
            // use loadCall async function to fetch the call using the id
            const loadCall=async()=>{
                //query the call using the id and destructure the calls from the response
                const {calls}=await client.queryCalls({
                    filter_conditions:{
                        id
                    }
                })
                //if calls length is greater than 0 then set the call to the first call in the calls array and set isCallLoading to false
                if(calls.length>0){
                    setCall(calls[0]);
                    setIsCallLoading(false);
                }
            }
            //call the loadCall function
            loadCall();

        },[client,id]);
            //finally return the call and isCallLoading
        return {call,isCallLoading};
}