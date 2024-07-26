import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BtnBox = styled.div`
    button {
        border: 0;
        margin: 0;
        background-color: white;
        width: 30px;
        margin: 10px;
    }
    &:hover {
        background-color: gray;
    }
`;
const ControlDate = memo(({ nowDate, setNowDate }) => {
    const changeYear = (change) => {
        const date = new Date(nowDate.getTime());
        date.setFullYear(date.getFullYear() + change);
        setNowDate(date);
    };
    const changeMonth = (change) => {
        const date = new Date(nowDate.getTime());
        date.setMonth(date.getMonth() + change);
        setNowDate(date);
    };

    return (
        <Container>
            <BtnBox>
                <button
                    onClick={() => {
                        changeYear(-1);
                    }}
                >{`<<`}</button>
                <button
                    onClick={() => {
                        changeMonth(-1);
                    }}
                >{`<`}</button>
            </BtnBox>
            <h1>{`${nowDate.getFullYear()}.${nowDate.getMonth()}`}</h1>
            <BtnBox>
                <button
                    onClick={() => {
                        changeMonth(+1);
                    }}
                >
                    {">"}
                </button>
                <button
                    onClick={() => {
                        changeYear(+1);
                    }}
                >
                    {">>"}
                </button>
            </BtnBox>
        </Container>
    );
});

export default ControlDate;
