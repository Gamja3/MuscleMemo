import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <nav className="footer-nav">
                <Link className="nav-btn" to={"/record"}>
                    <div>기록</div>
                </Link>
                <Link className="nav-btn" to={"/"}>
                    <div>홈</div>
                </Link>
                <Link className="nav-btn" to={"/graph"}>
                    <div>그래프</div>
                </Link>
            </nav>
        </footer>
    );
};

export default Footer;
