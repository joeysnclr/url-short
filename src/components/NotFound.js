import React from "react";
import NotFoundSVG from "../static/not-found.svg";
import "../css/NotFound.css";
export default function NotFound() {
    return (
        <div className='error-container'>
            <img src={NotFoundSVG} alt='404. Not Found' />
        </div>
    );
}
