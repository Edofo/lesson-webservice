import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.scss";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <img
                width={"75%"}
                alt="logo"
                loading="lazy"
                src="https://logo-marque.com/wp-content/uploads/2020/04/Nike-Logo.png"
            />
            <ul>
                <li>
                    <i className="fad fa-users-class" />
                    <p>Classes</p>
                </li>
                <li>
                    <i className="fad fa-user-graduate" />
                    <p>Students</p>
                </li>
                <li>
                    <i className="fad fa-graduation-cap" />
                    <p>Notes</p>
                </li>
                <li>
                    <i className="fad fa-book-open" />
                    <p>Courses</p>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
