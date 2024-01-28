import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    const navigate = useNavigate()
    useEffect(()=>{
        if (!localStorage.getItem('token')) 
        navigate('/')
    // console.log(isUserSigned);
    },[navigate])
    return localStorage.getItem('token') ? children : null
}
