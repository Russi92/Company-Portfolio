

import React, { useEffect, useState } from 'react';
import Followers from '../component/Followers';

const Subscribe = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://theway4business.27lashabab.com/api/followers', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      setFollowers(data.data || []);
    } catch (error) {
      console.error('فشل في جلب المتابعين', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-black bg-gray-700">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Followers</h2>

      {loading ? (
        <p className="text-center">Loading ...</p>
      ) : followers.length === 0 ? (
        <p className="text-center text-gray-500">No Followers Right Now</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followers.map((follower) => (
            <div key={follower.id} className="bg-sky-950 p-4 shadow rounded text-center text-white">

              <p><strong>Email:</strong> {follower.email}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscribe;
