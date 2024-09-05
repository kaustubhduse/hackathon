import React, { useEffect, useState } from "react";
import InfoCard from "../UI/InfoCard";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import card4 from "../../assets/card4.png";
import card5 from "../../assets/card5.png";
import card6 from "../../assets/card6.png";
import axios from "axios";

function CardChallenge() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Await the response and access the data directly
        const response = await axios.get("https://hackathon-lyart-one.vercel.app/api/get-cards"); // Adjust the endpoint if necessary
        setChallenges(response.data); // Set the data received from the backend
        console.log("Challenges fetched:", response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="bg-[rgba(0,49,69,1)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 px-4 lg:px-[10%] py-[5%]">
      {/* Static Cards */}
      <InfoCard
        img={card1}
        alt="placeholder"
        status="Upcoming"
        challengeName="Data Science Bootcamp - Graded Datathon"
        startDate="10/09/2024"
        endDate="10/19/2024"
        description="Starts in"
        level="Easy"
      />
      <InfoCard
        img={card2}
        alt="placeholder"
        challengeName="Data Sprint 72 - Butterfly Identification"
        startDate="04/11/2024"
        endDate="04/21/2024"
      />
      <InfoCard
        img={card3}
        alt="placeholder"
        challengeName="Data Sprint 71 - Weather Recognition"
        startDate="09/02/2024"
        endDate="09/11/2024"
      />
      <InfoCard
        img={card4}
        alt="placeholder"
        challengeName="Data Sprint 70 - Airline Passenger Satisfaction"
        startDate="09/04/2024"
        endDate="09/15/2024"
      />
      <InfoCard
        img={card5}
        alt="placeholder"
        challengeName="Engineering Graduates Employment Outcomes"
        startDate="11/04/2023"
        endDate="21/04/2023"
      />
      <InfoCard
        img={card6}
        alt="placeholder"
        challengeName="Travel Insurance Claim Prediction"
        startDate="11/04/2023"
        endDate="21/04/2023"
      />

      {/* Dynamic Cards */}
      {challenges.map((challenge) => (
        <InfoCard
          key={challenge._id} // Use _id if that's what your backend returns
          img={card1} // Display uploaded image or default
          alt={challenge.challengeName}
          status="Upcoming"
          challengeName={challenge.challengeName}
          startDate={challenge.startDate}
          endDate={challenge.endDate}
          description={challenge.description}
          level={challenge.level}
          challengeId={challenge._id} 
        />
      ))}
    </div>
  );
}

export default CardChallenge;
