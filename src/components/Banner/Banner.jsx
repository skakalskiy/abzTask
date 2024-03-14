import React from 'react';
import Button from '../Button/Button';

import './Banner.scss';

const Banner = () => {
    return (
        <div className='banner'>
            <div className='content'>
                <h1>
                    Test assignment for front-end developer
                </h1>
                <p>
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind.<br /> They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <Button text='Sign up' />
            </div>

        </div>
    )
}

export default Banner;