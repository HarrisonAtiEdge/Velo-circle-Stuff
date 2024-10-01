"use client";

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'

// const antibiotics = [
//   { name: 'Cephradine Gen-1', color1: '#1cdaff', color2: '#006eb5' },
//   { name: 'Cefuroxime Gen-2', color1: '#ffc700', color2: '#fd9100'},
//   { name: 'Ceftibuten Gen-3', color1: '#00fca8', color2: '#0097a2' },
// ]

// const pathogenName ="Staphlococcus Aureus";

// export default function MainScreenCopy() {
//   const [score, setScore] = useState(0)
//   const [rotation, setRotation] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRotation(prev => (prev + 1) % 360)
//     }, 7)
//     return () => clearInterval(interval)
//   }, [])

//   const handleTap = () => {
//     setScore(prev => prev + 1)
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d0727] text-white p-4">
//       <div className="w-full max-w-md aspect-[9/16] bg-[#410332] rounded-3xl overflow-hidden shadow-lg relative">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4">Pathogen: {pathogenName}</h1>
//           <div className="relative aspect-square">

//             <div className="flex justify-center items-center h-screen">
//               <svg className="w-40 h-40">
//                   {/* Background Circle */}
//                   <circle className="text-gray-300" strokeWidth="10" stroke="currentColor" fill="transparent" r="30" cx="50%" cy="50%"></circle>
//                   {/* Progress Circle */}
//                   <circle
//                       className="progress text-blue-500"
//                       strokeWidth="10"
//                       fill="red"
//                       r="30"
//                       cx="50%"
//                       cy="50%"
//                       style={{ '--percentage': '75' }} // Correct usage for JSX
//                   ></circle>
//               </svg>
//               <div className="absolute text-center">
//                   <span className="text-3xl font-bold">75%</span>
//               </div>
//             </div>



//             <motion.div
//               className="absolute inset-0"
//               animate={{ rotate: rotation }}
//               transition={{ duration: 0, ease: "linear" }}
//             >
//               {antibiotics.map((antibiotic, index) => (
//                 <motion.div
//                   key={antibiotic.name}
//                   className={`absolute w-8 h-8 rounded-full `}
//                   style={{
//                     top: '50%',
//                     left: '50%',
//                     transform: `translate(-50%, -50%) rotate(${index * 120}deg) translateX(120px)`,
//                     background: `radial-gradient(circle, ${antibiotic.color1}, ${antibiotic.color2})`
//                   }}
//                 />
//               ))}
//             </motion.div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-6xl font-bold">{score}</span>
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#590339]">
//           {antibiotics.map(antibiotic => (
//             <div key={antibiotic.name} className="flex items-center mb-2 last:mb-0">
//               <div className={`w-4 h-4 rounded-full mr-2`} 
//                style={{  background: `radial-gradient(circle, ${antibiotic.color1}, ${antibiotic.color2})`
//                   }}/>
//               <span>{antibiotic.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         className="mt-8 px-6 py-3 bg-purple-600 rounded-full text-xl font-semibold hover:bg-purple-500 transition-colors"
//         onClick={handleTap}
//       >
//         Tap to kill pathogen
//       </button>
//     </div>
//   )
// }



// import React from 'react';

// const HalfCircleProgressRing = ({ percentage }) => {
//     const radius = 30; // Radius of the circle
//     const circumference = 2 * Math.PI * radius; // Circumference of the circle
//     const offset = circumference - (percentage / 100) * circumference; // Calculate the stroke offset

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <svg className="w-40 h-20">
//                 {/* Background Half-Circle */}
//                 <circle
//                     className="text-gray-300"
//                     strokeWidth="10"
//                     stroke="currentColor"
//                     fill="transparent"
//                     r={radius}
//                     cx="50%"
//                     cy="100%" // Position the circle at the bottom half
//                 ></circle>
//                 {/* Progress Half-Circle */}
//                 <circle
//                     className="progress text-blue-500"
//                     strokeWidth="10"
//                     fill="transparent"
//                     r={radius}
//                     cx="50%"
//                     cy="100%" // Position the circle at the bottom half
//                     strokeDasharray={circumference}
//                     strokeDashoffset={offset}
//                     style={{ transition: 'stroke-dashoffset 0.5s ease' }} // Smooth transition
//                 ></circle>
//             </svg>
//             <div className="absolute text-center">
//                 <span className="text-3xl font-bold">{percentage}%</span>
//             </div>
//         </div>
//     );
// };

// // Example usage
// const MainScreenCopy = () => {
//     return <HalfCircleProgressRing percentage={50} />; // Change this value for different percentages
// };

// export default MainScreenCopy;




import React from 'react';

const HalfCircleProgressRing = ({ percentage }) => {
    const radius = 30; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (percentage / 100) * circumference; // Calculate the stroke offset

    // Function to create the arc path for the half-circle
    const createArcPath = () => {
        const startAngle = Math.PI; // Start from the left
        const endAngle = startAngle + (percentage / 100) * Math.PI; // Calculate the end angle based on percentage

        const x1 = radius + radius * Math.cos(startAngle); // Start x-coordinate
        const y1 = radius - radius * Math.sin(startAngle); // Start y-coordinate
        const x2 = radius + radius * Math.cos(endAngle); // End x-coordinate
        const y2 = radius - radius * Math.sin(endAngle); // End y-coordinate

        // Large arc flag: 0 for small arc, 1 for large arc
        const largeArcFlag = percentage > 50 ? 1 : 0;

        // Create path string for the arc
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${radius} ${radius} Z`;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <svg className="w-40 h-40" viewBox="0 0 60 60">
                {/* Background Half-Circle */}
                <path
                    className="text-gray-300"
                    fill="currentColor"
                    d={createArcPath()} // Draw background arc
                />
                {/* Progress Half-Circle */}
                <path
                    className="progress text-blue-500"
                    fill="currentColor"
                    d={createArcPath()} // Draw progress arc
                    style={{
                        transition: 'd 0.5s ease', // Smooth transition
                    }}
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-3xl font-bold">{percentage}%</span>
            </div>
        </div>
    );
};

// Example usage with dynamic percentage
const MainScreenCopy = () => {
    const [percentage, setPercentage] = React.useState(0); // Initial percentage

    React.useEffect(() => {
        // Simulate percentage change over time
        const interval = setInterval(() => {
            setPercentage((prev) => (prev < 100 ? prev + 10 : 0)); // Cycle from 0 to 100
        }, 1000); // Change every second

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return <HalfCircleProgressRing percentage={percentage} />;
};

export default MainScreenCopy;

