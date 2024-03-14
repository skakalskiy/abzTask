import React from 'react';
import User from '../User/User';

import './Users.scss';


const Users = ({ users, nextUrl, handleClick }) => {

  return (
    <div className='users'>
      <div className='users-container'>
        {users?.map((user, index) => (
          <div className='user-card' key={index}>
            <User user={user} />
          </div>
        ))}
      </div>

      {nextUrl && 
        <div className='btnShow'>
        <button onClick={handleClick} className='more'>Show more</button>
      </div>
      } 
    </div>

  )
}

export default Users;