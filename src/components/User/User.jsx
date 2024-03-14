// User.jsx
import React from 'react';

import './User.scss';

const User = ({ user }) => {
  return (
    <div className='card'>
      <img src={user.photo} alt='avatar' />
      <p className='name'>{user.name}</p>
      <p className='pos'>{user.position}</p>
      <p className='email'>{user.email}</p>
      <p className='phone'>{user.phone}</p>
    </div>
  );
};

export default User;
