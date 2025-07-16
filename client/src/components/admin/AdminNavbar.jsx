import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { assets } from '../../assets/assets';

const AdminNavbar = () => {
  return (
    <div className="p-4">
      <RouterLink to="/">
        <img src={assets.logo} alt='logo' className='w-36 h-auto' />
      </RouterLink>
    </div>
  );
}

export default AdminNavbar;
