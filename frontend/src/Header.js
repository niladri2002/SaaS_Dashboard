import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="dashboard-header">
            <nav className="dashboard-nav">
                <Link to="/profile">Profile</Link>
                <Link to="/update-profile">Update Profile</Link>
                <Link to="/analytics">Analytics</Link>
            </nav>
          
        </header>
    );
};

export default Header;
