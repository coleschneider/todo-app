import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';


export const Navbar = () => (
    <div className="navbarcontainer">
        <Link to="/">
            <h2 className="logo">
                 Mern-Todo
            </h2>
        </Link>
    </div>
)
