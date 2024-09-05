import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Explore from './Explore';
import StaticCard from '../UI/StaticCard';
import CardChallenge from './CardChallenge';
import CreateChallenge from '../CreateChallenge';
import './HomePage.css';

// Image Imports
import rocket from '../../assets/rocket.png';
import s1 from '../../assets/s1.png';
import s2 from '../../assets/s2.png';
import s3 from '../../assets/s3.png';
import skill1 from '../../assets/skill1.png';
import skill2 from '../../assets/skill2.png';
import skill3 from '../../assets/skill3.png';
import skill4 from '../../assets/skill4.png';

function HomePage() {
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);

  const challengeHandler = () => {
    setShowCreateChallenge(true);
  };

  const closeCreateChallenge = () => {
    setShowCreateChallenge(false);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-[rgba(0,49,69,1)]">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-[5%] justify-center items-center p-5">
          <div className="text-left w-full lg:w-[40%] py-8 lg:py-[98px] animate-slide-up">
            <h1 className="text-white text-2xl lg:text-5xl font-semibold animate-fade-in">
              Accelerate Innovation with Global AI Challenges
            </h1>
            <p className="text-white mt-4 lg:mt-[7%] text-lg animate-fade-in delay-200">
              AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to the test on diverse datasets, allowing you to foster learning through competitions.
            </p>
            {/* Link to Create Challenge Page */}
            <Link
              to="/create-challenge"
              className="text-[rgba(0,49,69,1)] mt-4 lg:mt-[7%] bg-white py-2 px-3 rounded-xl font-bold inline-block hover:scale-105 transform transition-transform duration-200"
            >
              Create Challenge
            </Link>
          </div>
          <div className="flex justify-center items-center w-full lg:w-auto animate-slide-up delay-300">
            <img src={rocket} alt="rocket" className="rocket max-w-full" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col lg:flex-row bg-[rgba(0,42,59,1)] justify-center p-6 lg:p-12 lg:space-x-[12%] space-y-6 lg:space-y-0 border-t-2 border-t-gray-400">
        <StatCard image={s1} value="100K+" description="All model submissions" />
        <StatCard image={s2} value="50K+" description="Data Scientists" />
        <StatCard image={s3} value="100+" description="AI challenges hosted" />
      </div>

      {/* Why Participate Section */}
      <div className="px-6 lg:px-12 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
          Why Participate in <span className="text-green-400">AI Challenges?</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-10 justify-center px-[12%]">
          <StaticCard
            img={skill1}
            alt="Prove your skills"
            title="Prove your skills"
            description="Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
          />
          <StaticCard
            img={skill2}
            alt="Learn new skills"
            title="Learn from community"
            description="One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
          />
          <StaticCard
            img={skill3}
            alt="Win exciting prizes"
            title="Challenge yourself"
            description="There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
          />
          <StaticCard
            img={skill4}
            alt="Earn recognition"
            title="Earn recognition"
            description="You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards."
          />
        </div>
      </div>

      <Explore />
      <CardChallenge />

      {/* Display Create Challenge Modal */}
      {showCreateChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative animate-scale-up">
            <button
              onClick={closeCreateChallenge}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <CreateChallenge />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ image, value, description }) {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6 animate-fade-in delay-150">
      <img src={image} alt={description} className="w-12 h-12 lg:w-16 lg:h-16" />
      <div>
        <h1 className="text-left text-white font-bold text-xl lg:text-2xl">{value}</h1>
        <p className="text-white font-semibold text-sm lg:text-base">{description}</p>
      </div>
    </div>
  );
}

export default HomePage;
