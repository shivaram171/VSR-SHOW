import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

  const { nextUrl }= useParams()
  const navigate = useNavigate()


  useEffect(() =>
  {
    if(nextUrl){
      setTimeout(()=>{
        navigate('/' + nextUrl)
      },8000)
    }
  },[nextUrl, navigate])
  
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='animate-spin rounded-full h-14 w-14 border-4 border-white border-t-[#F84464]'></div>
    </div>
  )
}

export default Loading
