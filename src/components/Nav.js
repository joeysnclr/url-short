import React from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav() {
    function toggleNav() {
        if (window.innerWidth >= 900) {
            return;
        }
        let nav = document.querySelector(".nav");
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
        } else {
            nav.classList.add("active");
        }
    }
    return (
        <div className='nav container'>
            <p className='logo'>URL Shortener</p>
            <div className='nav-toggle' onClick={toggleNav}>
                <FontAwesomeIcon icon='bars' />
            </div>
            <div className='links'>
                <Link onClick={toggleNav} to='/'>
                    Home
                </Link>
                <Link onClick={toggleNav} to='/analytics'>
                    Analytics
                </Link>
                <Link onClick={toggleNav} to='/#api'>
                    API Documentation
                </Link>
            </div>
        </div>
    );
}
