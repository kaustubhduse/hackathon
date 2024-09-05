import React, { useEffect, useState } from "react";
import InfoCard from "../UI/InfoCard";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import card4 from "../../assets/card4.png";
import card5 from "../../assets/card5.png";
import card6 from "../../assets/card6.png";

function CardChallenge() {
  const [challenges, setChallenges] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    level: []
  });

  useEffect(() => {
    // Load challenges from localStorage when component mounts
    const savedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
    setChallenges(savedChallenges);
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters)); // Fix: Use `setItem` to store filters
  }, [selectedFilters]);

  // Function to filter challenges based on selected filters
  const filterChallenges = (challenges) => {
    return challenges.filter((challenge) => {
      const matchesStatus = selectedFilters.status.length === 0 || selectedFilters.status.includes(challenge.status);
      const matchesLevel = selectedFilters.level.length === 0 || selectedFilters.level.includes(challenge.level);
      return matchesStatus && matchesLevel;
    });
  };

  // Static cards data
  const staticCards = [
    {
      img: card1,
      alt: "placeholder",
      status: "Upcoming",
      challengeName: "Data Science Bootcamp - Graded Datathon",
      startDate: "10/09/2024",
      endDate: "10/19/2024",
    },
    {
      img: card2,
      alt: "placeholder",
      challengeName: "Data Sprint 72 - Butterfly Identification",
      startDate: "04/11/2024",
      endDate: "04/21/2024"
    },
    {
      img: card3,
      alt: "placeholder",
      challengeName: "Data Sprint 71 - Weather Recognition",
      startDate: "09/02/2024",
      endDate: "09/11/2024"
    },
    {
      img: card4,
      alt: "placeholder",
      challengeName: "Data Sprint 70 - Airline Passenger Satisfaction",
      startDate: "09/04/2024",
      endDate: "09/15/2024"
    },
    {
      img: card5,
      alt: "placeholder",
      challengeName: "Engineering Graduates Employment Outcomes",
      startDate: "11/04/2023",
      endDate: "21/04/2023"
    },
    {
      img: card6,
      alt: "placeholder",
      challengeName: "Travel Insurance Claim Prediction",
      startDate: "11/04/2023",
      endDate: "21/04/2023"
    }
  ];

  // Filter both static and dynamic cards based on selected filters
  const filteredStaticCards = staticCards.filter((card) => {
    const matchesStatus = selectedFilters.status.length === 0 || selectedFilters.status.includes(card.status);
    const matchesLevel = selectedFilters.level.length === 0 || selectedFilters.level.includes(card.level);
    return matchesStatus && matchesLevel;
  });

  return (
    <div className="bg-[rgba(0,49,69,1)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 px-4 lg:px-[10%] py-[5%]">
      {/* Static Cards */}
      {filteredStaticCards.map((card, index) => (
        <InfoCard
          key={index}
          img={card.img}
          alt={card.alt}
          status={card.status}
          challengeName={card.challengeName}
          startDate={card.startDate}
          endDate={card.endDate}
          description={card.description}
          level={card.level}
        />
      ))}

      {/* Dynamic Cards */}
      {filterChallenges(challenges).map((challenge) => (
        <InfoCard
          key={challenge.id} // Use id from localStorage data
          img={challenge.image ? challenge.image : card1} // Display uploaded image or default
          alt={challenge.challengeName}
          status={challenge.status} // Ensure challenge data includes status
          challengeName={challenge.challengeName}
          startDate={challenge.startDate}
          endDate={challenge.endDate}
          description={challenge.description}
          level={challenge.level}
          challengeId={challenge.id} // Pass challengeId
        />
      ))}
    </div>
  );
}

export default CardChallenge;
