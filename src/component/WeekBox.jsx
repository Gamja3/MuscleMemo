import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
    /* background-color: gray; */
    /* border: 1px solid black; */
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WeekBox = memo(({ index, week }) => {
    return (
        <Container>
            <p style={index === 6 ? { color: "red" } : null}>{week}</p>
        </Container>
    );
});

export default WeekBox;
