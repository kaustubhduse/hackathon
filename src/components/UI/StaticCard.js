// StaticCard.js
import React from 'react';

function StaticCard({ img, alt, title, description }) {
  return (
    <div className="static-card bg-white p-6 rounded-lg shadow-md text-center">
      <img src={img} alt={alt} className="mx-auto mb-4 w-20 h-20" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default StaticCard;
