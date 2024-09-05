import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ChallengeContext = createContext();

// Create the provider component
export const ChallengeProvider = ({ children }) => {
  const [challengeName, setChallengeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState("Easy");
  const [challenges, setChallenges] = useState([]);

  // Load challenges from localStorage when component mounts
  useEffect(() => {
    const savedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
    setChallenges(savedChallenges);
  }, []);

  // Save challenges to localStorage whenever the challenges state changes
  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const challengeData = {
      id: Date.now(), // Unique ID for each challenge
      challengeName,
      startDate,
      endDate,
      description,
      image: image ? URL.createObjectURL(image) : null, // Convert image to URL
      level,
    };
    setChallenges([...challenges, challengeData]); // Add new challenge to the list
    console.log("Challenge Created:", challengeData);
    resetForm(); // Reset form after submission
  };

  // Function to reset form fields
  const resetForm = () => {
    setChallengeName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setImage(null);
    setLevel("Easy");
  };

  return (
    <ChallengeContext.Provider
      value={{
        challengeName,
        setChallengeName,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        description,
        setDescription,
        image,
        setImage,
        level,
        setLevel,
        handleImageUpload,
        handleSubmit,
        resetForm,
        challenges, // Expose challenges to context
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
