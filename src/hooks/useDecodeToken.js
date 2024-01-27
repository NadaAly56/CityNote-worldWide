import { useState } from "react";

export default function useDecodeToken(token) {
    // Base64Url decode the payload
    if (token)
   {
     const [headerEncoded, payloadEncoded] = token.split(".");
    const payloadDecoded = atob(payloadEncoded);
    // Parse the payload as JSON
    const payloadObject = JSON.parse(payloadDecoded);
    return payloadObject
   }
}