// import React from 'react'
// import BlurCircle from './BlurCircle'
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

// const dateSelect = ({dateTime, id}) => {
//   return (
//     <div id= 'dateSelect' className='pt-30'>
//       <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
      
//       <BlurCircle top="-100" left="-100"/>
//       <BlurCircle top="-100" left='0px'/>
// <div>
//     <p className='text-lg font-semibold'>choose date</p>
//     <div className='flex items-center gap-6 text-sm mt-5'>
//       <ChevronLeftIcon width={28}/>
//         <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>

//             {Object.keys(dateTime).map((date) => (
//                 <button key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? "bg-primary text-white" : "border border-primary/70"}`
//                 }>
//                     <span>{new Date(date).getDate()}</span>
//                     <span>{
// new Date(date).toLocaleDateString("en-US", { month :  "short"})
// }</span>

//                 </button>
//             ))}
//         </span>
//         <ChevronRightIcon width={28}/>
//     </div>

// </div>
// <button className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>book now</button>
//       </div>
//     </div>
//   )
// }

// export default dateSelect



import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const DateSelect = ({ dateTime, id }) => {

    const navigate =useNavigate();
  const [selected, setSelected] = useState(null)

  const onBookHandler =() =>{
    if(!selected){
        return toast('please select a date')
    }
     navigate(`/movies/${id}/${selected}`)
  }
  return (
    <div id='dateSelect' className='pt-30'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>

        <BlurCircle top="-100" left="-100" />
        <BlurCircle top="-100" left="0px" />

        <div>
          <p className='text-lg font-semibold text-white'>Choose Date</p>
          <div className='flex items-center gap-6 text-sm mt-5'>
            <ChevronLeftIcon width={28} />
            <div className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer transition font-semibold ${
                    selected === date
                      ? 'bg-[#F84464] text-white'
                      : 'border border-white/30 text-white bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span className='text-xs'>
                    {new Date(date).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </div>
            <ChevronRightIcon width={28} />
          </div>
        </div>

        <button onClick={onBookHandler}
          className='bg-[#F84464] text-white px-8 py-2 mt-6 rounded hover:bg-[#e63756] transition-all cursor-pointer font-semibold active:scale-95'
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default DateSelect

