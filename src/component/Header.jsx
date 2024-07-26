// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styled from "styled-components";
const HeaderContainer = styled.div`
    max-width: 600px;
    margin: 0px auto;
    box-sizing: border-box;
    height: 50px;
    background-color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    z-index: 500;
`;
const Header = ({ displayName }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/login");
    };

    return (
        <HeaderContainer>
            <div></div>
            <div>
                <div>
                    <b>MusleMemo</b>
                </div>
            </div>
            <div>
                <span>{displayName}</span>
                <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
                    로그아웃
                </button>
            </div>
        </HeaderContainer>
    );
};

export default Header;
