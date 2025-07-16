// export default TrailerSection
// import React, { useState } from 'react';
// import { dummyTrailers } from '../assets/assets';
// import ReactPlayer from 'react-player';
// import BlurCircle from './BlurCircle';

// const TrailerSection = () => {
//   const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
 

//   return (
//        <div className='px-6 md:px-16 lg:px-24 py-20 overflow-hidden'>
//         <p className ='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>trailers
//         </p>
//       <div className='relative mt-6'>
//         <BlurCircle top='-100px' right='-100px'/>
       
//        <ReactPlayer url={currentTrailer.videoUrl} controls={false}
//        className='mx-auto max-w-full' width="960px" height="540px"/>
//       </div>
//     </div>
//   )
// }

// export default TrailerSection;
// ---------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react'
// import ReactPlayer from 'react-player'
// import BlurCircle from './BlurCircle'
// import { dummyTrailers } from '../assets/assets'

// const TrailerSection = () => {
//   const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

//   console.log("Current trailer URL:", currentTrailer.videoUrl); // 👈 debug

//   return (
//     <div className='px-6 md:px-16 lg:px-24 py-20 overflow-hidden'>
//       <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto text-center'>Trailers</p>

//       <div className='relative mt-6'>
//         <BlurCircle top='-100px' right='-100px' />

//         <ReactPlayer
//           url={currentTrailer.videoUrl}
//           controls
//           width="960px"
//           height="540px"
//           className="mx-auto"
//         />
//       </div>
//     </div>
//   )
// }

// export default TrailerSection
// ----------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import ReactPlayer from 'react-player';
// import BlurCircle from './BlurCircle';
// import { dummyTrailers } from '../assets/assets';

// const TrailerSection = () => {
//   const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

//   return (
//     <div className='px-6 md:px-16 lg:px-24 py-20 overflow-hidden'>
//       {/* Title */}
//       <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto text-center'>
//         Trailers
//       </p>

//       {/* Main Player */}
//       <div className='relative mt-6'>
//         <BlurCircle top='-100px' right='-100px' />

//         <ReactPlayer
//           url={currentTrailer.videoUrl}
//           controls
//           width="100%"
//           height="540px"
//           className="mx-auto max-w-[960px]"
//         />
//       </div>

//       {/* Thumbnail Selector */}
//       <div className="flex flex-wrap justify-center gap-4 mt-8">
//         {dummyTrailers.map((trailer, index) => (
//           <img
//             key={index}
//             src={trailer.image}
//             alt={`Trailer ${index + 1}`}
//             onClick={() => setCurrentTrailer(trailer)}
//             className={`w-40 h-24 object-cover cursor-pointer rounded-md border-2 ${
//               currentTrailer.videoUrl === trailer.videoUrl
//                 ? 'border-red-500'
//                 : 'border-transparent'
//             } hover:opacity-80 transition-all duration-200`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrailerSection;

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { dummyTrailers } from '../assets/assets';

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className='px-6 md:px-16 lg:px-24 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto text-center'>
        Trailers
      </p>

      <div className='relative mt-6'>
        <BlurCircle top='-100px' right='-100px' />
        <ReactPlayer
          url={currentTrailer.videoUrl}
          playing
          muted
          controls
          width="100%"
          height="540px"
          className="mx-auto max-w-[960px]"
          onError={(e) => console.log("ReactPlayer error:", e)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {dummyTrailers.map((trailer, index) => (
          <img
            key={index}
            src={trailer.image}
            alt={`Trailer ${index + 1}`}
            onClick={() => setCurrentTrailer(trailer)}
            className={`w-40 h-24 object-cover cursor-pointer rounded-md border-2 ${
              currentTrailer.videoUrl === trailer.videoUrl
                ? 'border-red-500'
                : 'border-transparent'
            } hover:opacity-80 transition-all duration-200`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
