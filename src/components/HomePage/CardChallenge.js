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
        const response = await axios.get(
          "https://hackathon-lyart-one.vercel.app/api/get-cards"
        );
        if (response.status === 200) {
          // Check if the response data is an array
          if (Array.isArray(response.data)) {
            setChallenges(response.data);
          } else {
            console.error("Unexpected data format:", response.data);
            setChallenges([]); // Set to empty array if format is not as expected
          }
          console.log("Challenges fetched:", response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error(
          "Error fetching challenges:",
          error.response ? error.response.data : error.message
        );
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
      {Array.isArray(challenges) && challenges.length > 0 ? (
        challenges.map((challenge) => (
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
        ))
      ) : (
        <p>No challenges available</p>
      )}
    </div>
  );
}

export default CardChallenge;
