import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file
import 'boxicons/css/boxicons.min.css';
import FileUpload from './Fileupload';

const Sidebar = ({userAddress, provider, contract}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const shortUserAddress = `${userAddress.slice(0,4)}...${userAddress.slice(-4)}`;
  const toggleDarkMode = () => {
     setIsDarkMode(!isDarkMode);
     document.body.classList.toggle('dark');
  };

  return (
    <nav className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <div className="image-text">
          <span className="bx bx-shape-circle icon">
          </span>
          <div className="text logo-text">
            <span className="name">Securestor</span>
            <span className="address">Hi {shortUserAddress}</span>
          </div>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className='nav-link'>
              <FileUpload
               account={userAddress}
               provider={provider}
               contract={contract}>
              </FileUpload>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-file icon'></i>
                <span className="text nav-text">Files</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-share-alt icon'></i>
                <span className="text nav-text">Shared by Me</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-share icon'></i>
                <span className="text nav-text">Shared with Me</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li>
            <a href="#">
              <i className='bx bx-log-out icon'></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="sun-moon">
              <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i>
            </div>
            <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            <div className="toggle-switch" onClick={toggleDarkMode}>
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;
