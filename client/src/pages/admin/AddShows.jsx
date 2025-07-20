
// export default AddShows;
import React, { useEffect, useState } from 'react';
import { dummyBookingData, dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import {
  CheckIcon,
  StarIcon,
  Trash2 as DeleteIcon, // ✅ Correct icon for delete
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddShows = () => {

  // const {axios, getToken, user} = useAppContext 

const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [addingShow, setAddingShow] = useState(false)

  // Fetch dummy movies
  const fetchNowPlayingMovies = async () => {
    try{
const { data }
  = await axios.get('/api/show/now-playing', {
    headers: {Authorization : `Bearer ${await getToken()}`}
  })

  if(data.success){
    setNowPlayingMovies(data.movies)
  }


} catch(error){
console.error("error in fetching movies")
    }
  
  };

  // Add datetime to selection
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return {
          ...prev,
          [date]: [...times, time],
        };
      }
      return prev;
    });

    // Clear input after adding
    setDateTimeInput("");
  };

  // Remove a specific time
  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const updatedTimes = prev[date].filter((t) => t !== time);
      if (updatedTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: updatedTimes };
    });
  };

  const handleSubmit = async () =>
  {
    try{
      setAddingShow(true)

      if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice){
        return toast.error('missing required fields');
      }
      const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({date,time}));

      const payload ={
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice)
      } 

      const { data } = await axios.post('/api/show/add', payload, {
  headers: {
    Authorization: `Bearer ${await getToken()}`
  }
})

      if (data.success){
        toast.success(data.message)
        setSelectedMovie(null)
        setDateTimeSelection({})
        setShowPrice("")
      }
      else{
        toast.error(data.message)
      }
    }catch (error){
      console.error("submssion erro", error);
      toast.error("an error occured. Please try again")

    }
    setAddingShow(false)
  }

  useEffect(() => {
    if(user){
      fetchNowPlayingMovies();
    }
 
  }, [user]);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      {/* Movie Selection */}
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 ${
                selectedMovie === movie.id ? "ring-2 ring-red-600" : ""
              }`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img src={image_base_url + movie.poster_path} 
                  alt={movie.title}
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-red-600 fill-red-600" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">{movie.vote_count} Votes</p>
                </div>
              </div>

              {/* Selected checkmark */}
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-red-600 h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}

              <p className="font-medium truncate mt-1">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none bg-transparent text-white"
          />
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Select Date and Time</label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md text-white bg-transparent"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-red-600/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display selected date-times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-white font-medium">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary px-2 py-1 flex items-center rounded"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    <button onClick={handleSubmit} disabled={addingShow} className='bg-red-600 text-white px-8 py-2 mt-6 rounded hover:bg-red-600/90 transition-all cursor-pointer'>Add Show</button>
    </>
  ) : (
    <p className="text-gray-400 text-center mt-10">Loading...</p>
  );
};

export default AddShows;
