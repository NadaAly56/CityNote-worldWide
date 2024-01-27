import { useEffect, useState } from "react";

export default function useLoacalStorage(initialState, key) {
    const [value, setValue] = useState(function(){
        const storedValue = localStorage.getItem(key)
        return storedValue ? storedValue : initialState
    })
    

    useEffect(()=>{
        if (value)
        localStorage.setItem(key, JSON.stringify(value))
    },[value, key])

    return [value, setValue]
}