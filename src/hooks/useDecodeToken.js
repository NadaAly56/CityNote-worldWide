import { useEffect, useState } from "react";

export default function useDecodeToken(token) {
    // Base64Url decode the payload
    const [payloadObject, setPayloadObject] = useState({
      user_id:""
    })
    console.log(token);
    useEffect(()=>{
      if (token)
   {
    console.log(token);
     const [headerEncoded, payloadEncoded] = token.split(".");
    const payloadDecoded = atob(payloadEncoded);
    console.log(payloadDecoded);
    // Parse the payload as JSON
     setPayloadObject(JSON.parse(payloadDecoded));
    
   }
    },[token])
    return [payloadObject, setPayloadObject]
    
}