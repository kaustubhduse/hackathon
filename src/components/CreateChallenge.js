import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../assets/upload.png";
import axios from "axios";

function CreateChallenge() {
  const [challenges, setChallenges] = useState([
    { challengeName: "", startDate: "", endDate: "", description: "", image: null, level: "Easy" }
  ]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleImageUpload = (index, event) => {
    const newChallenges = [...challenges];
    newChallenges[index].image = event.target.files[0];
    setChallenges(newChallenges);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newChallenges = [...challenges];
    newChallenges[index][name] = value;
    setChallenges(newChallenges);
  };

  const handleAddChallenge = () => {
    setChallenges([...challenges, { challengeName: "", startDate: "", endDate: "", description: "", image: null, level: "Easy" }]);
  };

  const handleRemoveChallenge = (index) => {
    const newChallenges = challenges.filter((_, i) => i !== index);
    setChallenges(newChallenges);
  };

  const challengeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      for (const challenge of challenges) {
        const formData = new FormData();
        formData.append("challengeName", challenge.challengeName);
        formData.append("startDate", challenge.startDate);
        formData.append("endDate", challenge.endDate);
        formData.append("description", challenge.description);
        formData.append("level", challenge.level);
        
        if (challenge.image) {
          formData.append("image", challenge.image);
        }

        await axios.post("https://hackathon-lyart-one.vercel.app/api/add-card", formData, {
           
        });  
      }
      console.log("Challenges added successfully");
      navigate("/"); // Redirect to homepage after form submission
    } catch (error) {
      console.error("Error submitting the challenges:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg text-left py-[3%]">
      <div className="bg-[rgba(248,249,253,1)] py-[2%] px-[5%]">
        <h1 className="text-2xl font-bold mb-4">Challenge Details</h1>
      </div>
      <div className="px-[5%] space-y-[3%] mt-[3%]">
        <form onSubmit={challengeSubmitHandler}>
          {challenges.map((challenge, index) => (
            <div key={index} className="mb-6">
              <div className="mb-4">
                <p className="font-semibold">Challenge Name</p>
                <input
                  type="text"
                  name="challengeName"
                  value={challenge.challengeName}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-[40%] p-2 border border-gray-300 rounded mt-5"
                />
              </div>

              <div className="mb-4">
                <p className="font-semibold">Start Date</p>
                <input
                  type="date"
                  name="startDate"
                  value={challenge.startDate}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-[40%] p-2 border border-gray-300 rounded mt-5"
                />
              </div>

              <div className="mb-4">
                <p className="font-semibold">End Date</p>
                <input
                  type="date"
                  name="endDate"
                  value={challenge.endDate}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-[40%] p-2 border border-gray-300 rounded mt-5"
                />
              </div>

              <div className="mb-4">
                <p className="font-semibold">Description</p>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={challenge.description}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-[60%] p-2 border border-gray-300 rounded mt-5"
                  rows={4}
                />
              </div>

              <div className="mb-4 flex space-x-2 bg-[rgba(217,217,217,1)] w-fit py-3 px-[4%] rounded-lg">
                <p className="font-semibold mb-2 text-[rgba(102,102,102,1)]">Upload</p>
                <label className="relative block cursor-pointer">
                  <img
                    src={upload} // Replace with the path to your upload image
                    alt="Upload"
                    className="rounded cursor-pointer"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
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
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-[15%] p-2 border border-gray-300 rounded mt-5"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {challenges.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveChallenge(index)}
                  className="text-red-500 font-bold mb-4"
                >
                  Remove Challenge
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddChallenge}
            className="text-blue-500 font-bold mb-4"
          >
            Add Another Challenge
          </button>

          <div className="bg-[rgba(68,146,76,1)] text-center py-2 px-5 rounded-xl w-fit">
            <button
              type="submit" // Ensure the button type is 'submit'
              className="text-white font-bold"
            >
              Create Challenges
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChallenge;
