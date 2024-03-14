import React from 'react';
import Button from '../Button/Button';

import './Navbar.scss';

import logo from '../../assets/logo.png';

const Navbar = () => {
    return (
        <nav>
            <div className='flex container'>
                <div>
                    <img className='logo' src={logo} alt="logo" />
                </div>
                <div className='flex buttons'>
                    <Button text='Users' />
                    <Button text='Sign up' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;