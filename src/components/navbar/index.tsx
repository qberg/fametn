import React from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Navbar.module.css'; // Assuming you're using CSS modules

const Navbar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
<div style={{marginLeft:'50px', marginRight:'50px'}}>
    <nav className="navbar">
      <div className={styles.logo}>
        <img src="/image 3.png" alt="Logo" style={{ marginRight: '10px' }} />
        <img src="/Vector 8.png" alt="Logo" style={{ marginRight: '10px' }} />
        <img src="/image 1.png" alt="Logo" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '17px' }}>
        <div className="bordersearch">
    <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="search"
          style={{ marginRight: '5px' }}
          onChange={handleSearch} // Call handleSearch on input change
        />
        </div>
        <img src="/Line 1.png" alt="Logo" style={{ marginRight: '10px', marginLeft:'15px' }} />
        <div className="borderDiv">
          <LanguageIcon/>
        <select className="drop">
     < option value="option1"> EN</option>
     <option value="option2"> TN</option>
     <option value="option3"> HIN</option>
</select>
</div>
<img src="/Line 1.png" alt="Logo" style={{ marginLeft: '5px' ,marginRight:'7px'}} />      
<button style={{ backgroundColor: 'rgb(241, 183, 38)', border:'none',borderRadius:'10px', padding: '5px 10px',marginLeft: '9px' }}>
 <MenuIcon/> Menu
</button>
</div>
</nav>
</div>
);
};

export default Navbar;
