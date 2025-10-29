import React from 'react';
import ExperienceCard from '../components/ExperienceCard';

export default function Home({ list, loading }) {
  if (loading) return <div>Loading experiences...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Experiences</h1>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))}
        </div>
      ) : (
        <p>No experiences found.</p>
      )}
    </div>
  );
}
