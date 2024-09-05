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

  // Array of card images
  const cardImages = [card1, card2, card3, card4, card5, card6];

  // Function to get image for a challenge
  const getCardImage = (index) => {
    return cardImages[index % cardImages.length]; // Use modulo to cycle through images
  };  

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
      {filterChallenges(challenges).map((challenge, index) => (
        <InfoCard
          key={challenge.id} // Use id from localStorage data
          img={getCardImage(index)} // Get image from cardImages array
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
