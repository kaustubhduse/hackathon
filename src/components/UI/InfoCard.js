import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InfoCard.css"; // Import the CSS file for animations

function InfoCard(props) {
  const [timer, setTimer] = useState("00:00:00:00");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const { startDate, endDate, img, alt, challengeName, challengeId } = props;

  // Function to calculate the remaining time
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  // Function to start the timer
  const startTimer = (endTime) => {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        `${days > 9 ? days : "0" + days}:${hours > 9 ? hours : "0" + hours}:${
          minutes > 9 ? minutes : "0" + minutes
        }:${seconds > 9 ? seconds : "0" + seconds}`
      );
    } else {
      setTimer("00:00:00:00");
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval
        setIntervalId(null); // Reset intervalId to null
      }
    }
  };

  // Function to clear and reset the timer
  const clearTimer = (endTime) => {
    if (intervalId) clearInterval(intervalId); // Clear existing interval
    const id = setInterval(() => startTimer(endTime), 1000);
    setIntervalId(id); // Set new intervalId
  };

  // Determine status and timer based on dates
  const determineStatusAndTimer = () => {
    const today = new Date().setHours(0, 0, 0, 0); // Standardize to midnight
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(0, 0, 0, 0);

    if (today < start) {
      setStatus("Upcoming");
      setDescription("Starts in");
      clearTimer(new Date(startDate));
    } else if (today >= start && today <= end) {
      setStatus("Active");
      setDescription("Ends in");
      clearTimer(new Date(endDate));
    } else {
      setStatus("Ended");
      setDescription(`Ended on`);
      setTimer("00:00:00:00");
      if (intervalId) {
        clearInterval(intervalId); // Clear existing interval
        setIntervalId(null); // Reset intervalId to null
      }
    }
  };

  useEffect(() => {
    determineStatusAndTimer();
    return () => {
      if (intervalId) clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [startDate, endDate]);

  return (
    <div className="info-card animate-slide-up lg:w-[90%] w-[70%] mx-auto items-center justify-center bg-white shadow-lg rounded-2xl text-center flex flex-col h-[500px]">
      <img
        src={img}
        alt={alt}
        className="info-card-img w-full h-40 object-cover rounded-t-md" // Fixed height and maintain aspect ratio
      />
      <div className="flex-grow flex flex-col justify-between py-[9%]">
        {/* Status Section */}
        <div className="flex flex-col items-center mb-4">
          {/* Different statuses */}
          {status === "Upcoming" && (
            <div className="bg-[rgba(242,201,76,0.25)] w-fit px-4 py-1 rounded-lg text-sm sm:text-base">
              <h1 className="text-[rgba(102,102,102,1)] font-semibold">
                {status}
              </h1>
            </div>
          )}

          {status === "Active" && (
            <div className="bg-[rgba(68,146,76,0.24)] w-fit text-center rounded-lg px-4">
              <h1 className="text-[rgba(68,146,76,1)] font-semibold w-fit px-3 py-1 text-sm sm:text-base">
                {status}
              </h1>
            </div>
          )}

          {status === "Ended" && (
            <div className="bg-[rgba(255,60,0,0.1701)] w-fit px-3 py-1 rounded-lg text-sm sm:text-base">
              <h1 className="text-[rgba(102,102,102,1)] font-semibold">
                {status}
              </h1>
            </div>
          )}
        </div>

        {/* Challenge Name and Timer Section */}
        <h1 className="text-base sm:text-lg font-semibold mt-2 w-[80%] mx-auto">
          {challengeName}
        </h1>

        <div className="flex flex-col items-center mt-2">
          <h1 className="text-xs sm:text-sm text-gray-700 font-semibold">
            {description}
          </h1>
          {status !== "Ended" && (
            <div className="flex justify-center items-center gap-2 mt-2">
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold">
                  {timer.split(":")[0]}
                </h1>
                <p className="text-xs">Days</p>
              </div>
              <p className="text-lg sm:text-xl font-bold mb-4">:</p>
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold">
                  {timer.split(":")[1]}
                </h1>
                <p className="text-xs">Hours</p>
              </div>
              <p className="text-lg sm:text-xl font-bold mb-4">:</p>
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold">
                  {timer.split(":")[2]}
                </h1>
                <p className="text-xs">Minutes</p>
              </div>
            </div>
          )}
          {status === "Ended" && (
            <div className="mt-2">
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold mb-4">{endDate}</h1>
              </div>
            </div>
          )}
        </div>

        {/* Participate Button */}
        <Link
          to={`/detail-page/${challengeId}`} // Use challengeId from props
          className="info-card-button bg-[rgba(68,146,76,1)] text-white font-bold py-3 px-4 rounded-xl cursor-pointer w-fit mx-auto flex items-center justify-center gap-2 mt-7"
        >
          <span className="flex items-center justify-center w-6 h-6 bg-white text-[rgba(68,146,76,1)] rounded-full">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Participate Now
        </Link>
      </div>
    </div>
  );
}

export default InfoCard;
