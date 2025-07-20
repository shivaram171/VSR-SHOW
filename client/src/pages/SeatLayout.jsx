// // import React, { useState } from 'react'
// import React, { useState, useEffect } from 'react'

// import { useNavigate, useParams } from 'react-router-dom'
// import { dummyDateTimeData, dummyShowsData} from '../assets/assets'
// import { ClockIcon } from 'lucide-react'
// import Loading from '../components/Loading'
// import BlurCircle from '../components/BlurCircle'

// const SeatLayout = () => {
//   const {id, date} = useParams()

//   const[selectedSeats, setSelectedSeats] = useState([])
//   const [selectedTime, setSelectedTime]=useState(null)
//   const [show, setShow] =useState(null)


//   const navigate = useNavigate()


//   const getShow = async () => {
//     const show = dummyShowsData.find(show => show._id === id)
//     if(show){
//       setShow({
//         movie: show,
//         dateTime : dummyDateTimeData
//       })
//     }
//   }
//   useEffect(()=>{
//     getShow()
// },[])
//   return show ? (
//     <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
//       {
//         /*Available Timings*/
//       }
//       <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max'>
//       <p className='text-lg font-semibold px-6'>Available Timings</p>
//       <div className='mt-5 space-y-1'>
      
//       { show.dateTime[date].map((item) => (
//           <div className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20" }`}>
//             <ClockIcon className='w-4 h-4'/>
//             <p className='text-sm'>{isoTimeFormat(item.time)}</p>

//           </div>
//          ) )
//       }
//     </div>
//     </div>
//     {/* Seats Layout */}
//     <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
// <BlurCircle top="-100px" left ="-100px"/>
// <BlurCircle bottom='0' right="0"/>
// <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
// <img  src={assets.screenImage} alt='screen'/>
// <p className='text-gray-400 text-sm mb-6'>screen size</p>
//     </div>
//     </div>
//   ): (
//     <Loading/>
//   )
// }

// export default SeatLayout
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData, assets } from '../assets/assets'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import isoTimeFormat from '../lib/isoTimeFormat'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {


  const groupRows = [["A", "B"],["C", "D"], ["E", "F"], ["G", "H"],["I", "J"]]
  const { id, date } = useParams()

  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const [ occupiedSeats, setOccupiedSeats] = useState([])

  const navigate = useNavigate()
  
  const { axios, getToken, user} = useAppContext()

  const getShow = async () => {
     try {
      const { data } = await axios.get(`/api/show/${id}`)

      if (data.success) {
        setShow(data);
      }


    } catch (error) {
      console.log(error);
    }
  }


const handleSeatClick = (seatId) => {
  if (!selectedTime) {
    return toast("Please select a time first!")
  }
  if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
    return toast("You can only select up to 5 seats.")
  }
  if(occupiedSeats.includes(seatId)){
    return toast("this seat is already booked")
  }

  setSelectedSeats(prev =>
    prev.includes(seatId)
      ? prev.filter(seat => seat !== seatId)
      : [...prev, seatId]
  )
}

  // const handleSeatClick =
  //   (seatId) => {
  //     if(!selectedTime){
  //       return toast("please select time first")

  //     }
  //     if(!selectedSeats.includes(seatId)&& selectedSeats.length >4){
  //       return toast("you can only sleect 5 seats")

  //     }
  //     setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !==seatId):[...prev, seatId])
  //   }
  

  const renderSeats = (row, count = 9) => (
  <div key={row} className="flex gap-2 mt-2">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-red-600 cursor-pointer 
              ${selectedSeats.includes(seatId) && 'bg-red-600 text-white'
            }
            ${occupiedSeats.includes(seatId) && "opacity-15"}
            `}
          >

            {seatId}
          </button>
        );
      })}
    </div>
  </div>
)

const getOccupiedSeats = async () =>{

  try{
    const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`)

    if(data.success){
      setOccupiedSeats(data.occupiedSeats)
    }
    else{
      toast.error(data.message)
    }
  }

  catch (error){
    console.log(error)
  }
}
const bookTickets = async () => {
  try{
    if(!user) return toast.error('please login to proceed')

      if (!selectedTime || !selectedSeats.length) return toast.error('plase select a time and seat');

      const {data} = await axios.post('/api/booking/create', {
        showId: selectedTime.showId, selectedSeats
      },    { headers: { Authorization: `Bearer ${await getToken()}` } });


      if (data.success){
       window.location.href = data.url;
      }else{
        toast.error(data.message)
      }
  } catch (error){
    toast.error(error.message)
  }
}
  useEffect(() => {
    getShow()
  }, [])

  useEffect(() => {
    if(selectedTime){
      getOccupiedSeats()
    }
  },[selectedTime])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:stickymd:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date]?.map((item, index) => (
            <div
              key={item.time} onClick={()=>setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time ? "bg-red-500" : "hover:bg-primary/20"
              }`}
           
            >
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0' right='0' />
        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />


        <p className='text-gray-400 text-sm mb-6'>screen side</p>
    
    <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
<div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
  {groupRows[0].map(row => renderSeats(row))}
</div>

<div className='grid grid-cols-2 gap-11'>
{
  groupRows.slice(1).map((group, idx)=>(
    <div key={idx}>
      {group.map(row => renderSeats(row))}
    </div>
  ))
}
</div>
</div>
<button onClick={bookTickets} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-red-700 hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
      Proceed To checkout
      <ArrowRightIcon strokeWidth={3} className='w-4 h-4'/>
    </button>

    </div>
    
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout