import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import upload from "../assets/upload.png";

function UpdatePage() {
  const { id } = useParams(); // Use useParams to access the id from the route
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // Retrieve challenges from localStorage
    const savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];

    // Find the challenge based on the id from the URL params
    const foundChallenge = savedChallenges.find(
      (ch) => ch.id === parseInt(id) // Parse the id to an integer
    );

    setChallenge(foundChallenge);
  }, [id]);

  const handleChange = (e) => {
    setChallenge({
      ...challenge,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    setChallenge({
      ...challenge,
      image: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    // Retrieve challenges from localStorage
    const savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];

    // Find and update the existing challenge
    const updatedChallenges = savedChallenges.map((ch) =>
      ch.id === challenge.id ? challenge : ch
    );

    // Save updated challenges back to localStorage
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    alert("Challenge updated successfully");
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg text-left py-[3%]">
      <div className="bg-[rgba(248,249,253,1)] py-[2%] px-[5%]">
        <h1 className="text-2xl font-bold mb-4">Update Challenge</h1>
      </div>
      <div className="px-[5%] space-y-[3%] mt-[3%]">
        <div className="mb-4">
          <p className="font-semibold">Challenge Name</p>
          <input
            type="text"
            name="challengeName"
            value={challenge.challengeName}
            onChange={handleChange}
            className="w-[40%] p-2 border border-gray-300 rounded mt-5"
          />
        </div>

        <div className="mb-4">
          <p className="font-semibold">Start Date</p>
          <input
            type="date"
            name="startDate"
            value={challenge.startDate}
            onChange={handleChange}
            className="w-[40%] p-2 border border-gray-300 rounded mt-5"
          />
        </div>

        <div className="mb-4">
          <p className="font-semibold">End Date</p>
          <input
            type="date"
            name="endDate"
            value={challenge.endDate}
            onChange={handleChange}
            className="w-[40%] p-2 border border-gray-300 rounded mt-5"
          />
        </div>

        <div className="mb-4">
          <p className="font-semibold">Description</p>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={challenge.description}
            onChange={handleChange}
            className="w-[60%] p-2 border border-gray-300 rounded mt-5"
            rows={4}
          />
        </div>

        <div className="mb-4 flex space-x-2 bg-[rgba(217,217,217,1)] w-fit py-3 px-[4%] rounded-lg">
          <p className="font-semibold mb-2 text-[rgba(102,102,102,1)]">Upload</p>
          <label className="relative block cursor-pointer">
            <img src={upload} alt="Upload" className="rounded cursor-pointer" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {challenge.image && (
            <img
              src={URL.createObjectURL(challenge.image)}
              alt="Uploaded"
              className="mt-2 w-full h-32 object-cover rounded cursor-pointer"
            />
          )}
        </div>

        <div className="mb-4">
          <p className="font-semibold">Level Type</p>
          <select
            name="level"
            value={challenge.level}
            onChange={handleChange}
            className="w-[15%] p-2 border border-gray-300 rounded mt-5"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="bg-[rgba(68,146,76,1)] text-center py-2 px-5 rounded-xl w-fit">
          <button className="text-white font-bold" onClick={handleSubmit}>
            Update Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePage;
