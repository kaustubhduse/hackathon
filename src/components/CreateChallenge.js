import React, { useContext } from "react";
import { ChallengeContext } from "./ChallengeContext";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";

function CreateChallenge() {
  const {
    challengeName,
    setChallengeName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    description,
    setDescription,
    image,
    handleImageUpload,
    level,
    setLevel,
    handleSubmit,
    resetForm,
  } = useContext(ChallengeContext);

  const navigate = useNavigate();

  const challengeSubmitHandler = () => {
    handleSubmit();
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="bg-white shadow-lg rounded-lg text-left py-[3%]">
      <div className="bg-[rgba(248,249,253,1)] py-[2%] px-[5%]">
        <h1 className="text-2xl font-bold mb-4">Challenge Details</h1>
      </div>
      <div className="px-[5%] space-y-[3%] mt-[3%]">
        <div className="mb-4">
          <p className="font-semibold">Challenge Name</p>
          <input
            type="text"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            className="w-[40%] p-2 border border-gray-300 rounded mt-5"
          />
        </div>

        <div className="mb-4">
          <p className="font-semibold">Start Date</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-[40%] p-2 border border-gray-300 rounded mt-5"
          />
        </div>

        <div className="mb-4">
          <p className="font-semibold">End Date</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-[40%] p-2 border border-gray-300 rounded mt-5"
          />
        </div>

        <div className="mb-4">
          <p className="font-semibold">Description</p>
          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[60%] p-2 border border-gray-300 rounded mt-5"
            rows={4}
          />
        </div>

        <div className="mb-4 flex space-x-2 bg-[rgba(217,217,217,1)] w-fit py-3 px-[4%] rounded-lg">
          <p className="font-semibold mb-2 text-[rgba(102,102,102,1)]">Upload</p>
          <label className="relative block cursor-pointer">
            <img
              src={upload}
              alt="Upload"
              className="rounded cursor-pointer"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="mt-2 w-full h-32 object-cover rounded cursor-pointer"
            />
          )}
        </div>

        <div className="mb-4">
          <p className="font-semibold">Level Type</p>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-[15%] p-2 border border-gray-300 rounded mt-5"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="bg-[rgba(68,146,76,1)] text-center py-2 px-5 rounded-xl w-fit">
          <button
            className="text-white font-bold"
            onClick={challengeSubmitHandler}
          >
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChallenge;
