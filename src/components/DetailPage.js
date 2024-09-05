import React, { useState, useEffect } from "react";
import easy from "../assets/easy.png";

function DetailPage(props) {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // Retrieve challenges from localStorage
    const savedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
    
    // Find the challenge based on an ID passed as a prop
    const challengeId = props.match.params.id; // Adjust this based on how you're passing the ID
    const foundChallenge = savedChallenges.find(ch => ch.id === parseInt(challengeId));
    
    setChallenge(foundChallenge);
  }, [props.match.params.id]);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-left">
      <div className="bg-[rgba(0,49,69,1)] p-6 md:p-[7%] space-y-8 md:space-y-[3%]">
        <h1 className="bg-[rgba(255,206,92,1)] w-fit px-4 py-2 md:px-6 rounded-lg font-semibold flex items-center gap-2 text-sm md:text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Starts on {new Date(challenge.startDate).toLocaleDateString()} {new Date(challenge.startDate).toLocaleTimeString()}
        </h1>

        <h1 className="text-white text-2xl md:text-4xl font-bold">
          {challenge.challengeName}
        </h1>
        <p className="text-white text-sm md:text-lg">
          {challenge.description}
        </p>
        <div className="bg-white w-fit py-2 px-4 md:px-[2%] rounded-lg flex space-x-2 items-center">
          <img src={easy} alt="easy" className="h-5 w-5 md:h-6 md:w-6" />
          <p className="text-[rgba(0,49,69,1)] font-semibold text-xs md:text-base">{challenge.level}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row shadow-custom rounded-lg justify-between px-4 py-2 md:px-[7%] md:py-[1%] space-y-4 md:space-y-0">
        <h1 className="text-xl font-bold relative inline-block text-center md:text-left">
          Overview
          <span className="absolute left-0 top-[100%] w-full h-1 bg-green-500"></span>
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8">
          <div className="bg-[rgba(68,146,76,1)] py-2 px-5 md:px-7 rounded-xl cursor-pointer">
            <p className="text-white">Edit</p>
          </div>
          <div className="border-2 border-[rgba(220,20,20,1)] py-2 px-4 md:px-5 rounded-xl cursor-pointer">
            <p className="text-red-600 font-bold">Delete</p>
          </div>
        </div>
      </div>

      <p className="px-4 py-4 md:px-[7%] md:py-[3%] lg:w-[80%] text-sm md:text-lg leading-relaxed">
        {challenge.fullDescription}
      </p>
    </div>
  );
}

export default DetailPage;
