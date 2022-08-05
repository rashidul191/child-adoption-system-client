import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import {Link} from "react-router-dom"

const NotFound = () => {
    return (
        <div className='text-center text-error my-10 md:my-32'>
            <h4 className='text-xl'>Error !!! Sorry Page Not Found</h4>
            <h1 className='text-5xl font-bold'>404</h1>
            <p className='text-blue-500 underline'><Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} />

            Back To Home</Link></p>
        </div>
    );
};

export default NotFound;