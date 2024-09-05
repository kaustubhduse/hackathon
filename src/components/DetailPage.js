import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import easy from "../assets/easy.png";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const savedChallenges =
      JSON.parse(localStorage.getItem("challenges")) || [];
    const foundChallenge = savedChallenges.find((ch) => ch.id === parseInt(id));
    setChallenge(foundChallenge);
  }, [id]);

  const handleEditClick = () => {
    navigate(`/update/${id}`);
  };

  const handleDeleteClick = () => {
    const savedChallenges =
      JSON.parse(localStorage.getItem("challenges")) || [];
    const updatedChallenges = savedChallenges.filter(
      (ch) => ch.id !== parseInt(id)
    );
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    navigate("/");
  };

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
          {`Starts on ${challenge.startDate} 9:00 PM(Indian Standard Time)`}
        </h1>

        <h1 className="text-white text-2xl md:text-4xl font-bold">
          {challenge.challengeName}
        </h1>
        <p className="text-white text-sm md:text-md">
          Identify the class to which each butterfly belongs to
        </p>
        <div className="bg-white w-fit py-2 px-4 md:px-[2%] rounded-lg flex space-x-2 items-center">
          <img src={easy} alt="easy" className="h-5 w-5 md:h-6 md:w-6" />
          <p className="text-[rgba(0,49,69,1)] font-semibold text-xs md:text-base">
            {challenge.level}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row shadow-custom rounded-lg justify-between px-4 py-2 md:px-[7%] md:py-[1%] space-y-4 md:space-y-0">
        <h1 className="text-xl font-bold relative inline-block text-center md:text-left">
          Overview
          <span className="absolute left-0 top-[100%] w-full h-1 bg-green-500"></span>
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8">
          <div
            className="bg-[rgba(68,146,76,1)] py-2 px-5 md:px-7 rounded-xl cursor-pointer"
            onClick={handleEditClick}
          >
            <p className="text-white">Edit</p>
          </div>
          <div
            className="border-2 border-[rgba(220,20,20,1)] py-2 px-4 md:px-5 rounded-xl cursor-pointer"
            onClick={handleDeleteClick}
          >
            <p className="text-red-600 font-bold">Delete</p>
          </div>
        </div>
      </div>

      <p className="px-4 py-4 md:px-[7%] md:py-[3%] lg:w-[80%] text-sm md:text-lg leading-relaxed">
        Butterflies are the adult flying stage of certain insects belonging to
        an order or group called Lepidoptera. The word "Lepidoptera" means
        "scaly wings" in Greek. This name perfectly suits the insects in this
        group because their wings are covered with thousands of tiny scales
        overlapping in rows.
        <br></br>
        <br></br>An agency of the Governmental Wildlife Conservation is planning
        to implement an automated system based on computer vision so that it can
        identify butterflies based on captured images. As a consultant for this
        project, you are responsible for developing an efficient model.
        <br></br>
        <br></br>Your Task is to build an Image Classification Model using CNN
        that classifies to which class of weather each image belongs to.
      </p>
    </div>
  );
}

export default DetailPage;
