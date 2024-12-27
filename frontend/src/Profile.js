import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from './Images/profile.png';
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to log in to view this page.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/profile/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError('Failed to load profile data.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profile) {
    return <div className="loading-message">Loading...</div>;
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToUpdateProfile = () => {
    navigate('/update-profile');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-picture" />
        <h1>{profile.name}</h1>
        <p className="profile-email">{profile.email}</p>
      </div>
      <div className="profile-actions">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
        <button className="update-profile-button" onClick={goToUpdateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
