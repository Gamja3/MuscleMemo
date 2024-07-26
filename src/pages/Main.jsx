import React, { useState } from "react";
import styled from "styled-components";
import ControlDate from "../component/ControlDate";
import DateBox from "../component/DateBox";
import Modal from "../component/Modal";

const Container = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
`;
const WeeksExercise = styled.div`
    margin-top: 100px;
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    background-color: blue;
    color: white;
    justify-content: center;
    align-items: center;
`;

const Main = () => {
    return (
        <Container>
            <div> 홈화면</div>
            <WeeksExercise>
                <div>땡땡님 안녕하세요.</div>
                이번주 운동량
            </WeeksExercise>
        </Container>
    );
};

export default Main;
