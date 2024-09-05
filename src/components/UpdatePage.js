import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdatePage() {
  const [challengeName, setChallengeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState("Easy");
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams(); // Use the ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`https://hackathon-lyart-one.vercel.app/api/get-card/${id}`);
        const { challengeName, startDate, endDate, description, level, image } = response.data;
        setChallengeName(challengeName);
        setStartDate(startDate);
        setEndDate(endDate);
        setDescription(description);
        setLevel(level);
        if (image) {
          setImagePreview(image); // Set image preview URL
        }
      } catch (error) {
        console.error("Error fetching challenge data:", error.message);
      }
    };

    fetchChallenge();
  }, [id]);

  useEffect(() => {
    // Clean up image URL when the component unmounts
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set preview URL for the new image
    }
  };

  const challengeSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("challengeName", challengeName);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", description);
    formData.append("level", level);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`https://hackathon-lyart-one.vercel.app/api/update-card/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Challenge updated successfully:", response.data);
      navigate("/"); // Redirect to homepage after form submission
    } catch (error) {
      console.error("Error submitting the challenge:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg text-left py-4 px-6">
      <div className="bg-gray-100 py-4 px-6 rounded-lg flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Update Challenge</h1>
        <form onSubmit={challengeSubmitHandler} encType="multipart/form-data">
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
            <div className="flex flex-col space-y-2 flex-1">
              <label htmlFor="challengeName" className="font-semibold text-sm">Challenge Name</label>
              <input
                type="text"
                id="challengeName"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-2 flex-1">
              <label htmlFor="startDate" className="font-semibold text-sm">Start Date</label>
              <input
                type="datetime-local"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
            <div className="flex flex-col space-y-2 flex-1">
              <label htmlFor="endDate" className="font-semibold text-sm">End Date</label>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-2 flex-1">
              <label htmlFor="level" className="font-semibold text-sm">Difficulty Level</label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-md"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="description" className="font-semibold text-sm">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="border-2 border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="image" className="font-semibold text-sm">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Challenge"
                className="mt-4 h-32 w-32 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Update Challenge
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePage;
