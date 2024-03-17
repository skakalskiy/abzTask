import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-scroll';

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
                    <Link to='users' smooth={true} offset={-100} duration={500}><Button text='Users' /></Link>
                    <Link to='form' smooth={true} offset={-100} duration={500}><Button text='Sign up' /></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;