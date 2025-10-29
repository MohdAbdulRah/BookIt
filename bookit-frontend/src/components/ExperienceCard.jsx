import React from 'react';
import { Link } from 'react-router-dom';

export default function ExperienceCard({ exp }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img src={exp.image} alt={exp.title} className="w-full h-40 object-cover rounded" />
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{exp.title}</h3>
        <p className="text-sm text-gray-600">{exp.location} • {exp.duration}</p>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">{exp.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <Link to={`/experience/${exp._id}`} className="text-indigo-600">View</Link>
          <div className="text-sm text-gray-800">{exp.slots?.length || 0} slots</div>
        </div>
      </div>
    </div>
  );
}
