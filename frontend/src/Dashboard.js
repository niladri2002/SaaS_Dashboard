import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import profileImage from './Images/profile.png';
import { FaRegUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to log in to view this page.');
        navigate('/');
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
          setUser(data);
        } else {
          setError('Failed to load user data.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="logo">ability<span>EX</span></div>
        <div className="sidebar-icons">
          <i className="icon icon-home"><IoHomeOutline /></i>
          <i className="icon icon-user" onClick={() => navigate("/profile")}><FaRegUserCircle /></i>
          <i className="icon icon-calendar" onClick={() => navigate("/analytics")}><SlCalender /></i>
          <i className="icon icon-settings" onClick={() => navigate("/update-profile")}><IoSettingsOutline /></i>
        </div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <input
            type="text"
            className="search-bar"
            placeholder="Courses | What are you looking for?"
          />
          <div className="profile-menu">
            <img src={profileImage} alt="Profile" className="profile-img" />
            <span className="profile-name">{user.name}</span>
          </div>
        </header>

        {/* Content Grid */}
        <div className="dashboard-content">
          {/* User Info Section */}
          <div className="user-info">
            <img src={profileImage} alt={user.name} className="profile-img" />
            <h2>{user.name}</h2>
            <p>"{user.role || 'IT Specialist'}"</p>
            <div className="stats">
              <div><span>8.2</span> Overall Rating</div>
              <div><span>75%</span> Completed Projects</div>
              <div><span>10</span> Proficient Skills</div>
            </div>
          </div>

          {/* Upcoming Courses */}
          <div className="courses-section">
            <h3>Upcoming Courses</h3>
            <p>Enroll in new courses</p>
          </div>

          {/* Most Wanted Skills */}
          <div className="most-wanted-skills">
            <h3>Most Wanted Skills (20)</h3>
            <div className="skills">
              <span>Analytics and Data Management</span>
              <span>Security System Architecture</span>
            </div>
            <a href="#">See All</a>
          </div>

          {/* Deadline Section */}
          <div className="card">
            <h4>Deadline</h4>
            <p>AI/ML: 4 Days left</p>
            <p>UI/UX: 2 Days left</p>
          </div>

          {/* Courses Progress */}
          <div className="card">
            <h4>Courses</h4>
            <div className="progress">
              <div className="progress-bar"><span style={{ width: '62%' }}></span></div>
              <p>Cyber Security</p>
              <div className="progress-bar"><span style={{ width: '20%' }}></span></div>
              <p>UX Research</p>
            </div>
          </div>

          {/* Certification Section */}
          <div className="card">
            <h4>Certification</h4>
            <p>Mobile Design ★★★★★</p>
            <p>DSA ★★★★★</p>
            <p>Data Analytics ★★★★★</p>
          </div>

          {/* Latest Rating */}
          <div className="card">
            <h4>Latest Rating</h4>
            <p>7.6</p>
            <p>Project: Myspace Layouts</p>
          </div>

          {/* Calendar */}
          <div className="calendar-section">
            <h3>January 2022</h3>
            {/* Calendar content here */}
          </div>

          {/* Activities Section */}
          <div className="activities-list">
            <h3>Activities (24)</h3>
            <ul>
              <li>Adriana posted cloud system security - 1 Hour Ago</li>
              <li>Grace liked your Post - 1 Hour Ago</li>
              <li>Peter posted cloud system security - 2 Hours Ago</li>
            </ul>
            <a href="#">See All</a>
          </div>

          {/* Jobs Panel */}
          <div className="jobs-panel">
            <h3>Jobs</h3>
            <p>Cyber Security - Gurugram</p>
            <p>Data Science - Andheri</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
