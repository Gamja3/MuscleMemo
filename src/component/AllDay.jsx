import React, { memo } from "react";
import styled, { css } from "styled-components";
import imgDem from "../icon/kettlebells.png";

const Container = styled.div`
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &:hover {
        background-color: aqua;
    }
    .img_dembell {
        width: 30px;
    }
    .select_day {
        padding: 5px;
        font-weight: ${({ $sameMonth }) => ($sameMonth ? "700" : "300")};

        ${({ $sameDay }) =>
            $sameDay
                ? css`
                      color: white;
                      background-color: #007bff;
                      width: 100%;
                      text-align: center;
                      height: 100%;
                      width: 44%;
                      border-radius: 40px;
                  `
                : css``}

        ${({ $clickDay }) =>
            $clickDay
                ? css`
                      border: 1px solid skyblue;
                      border-radius: 40px;
                  `
                : css``}
    }
`;

const AllDay = memo(
    ({ day, nowDate, setNowDate, clickedDate, setClickedDate }) => {
        const nowTime = new Date();

        const sameMonth = nowDate.getMonth() === day.getMonth();
        const sameDay =
            nowTime.getFullYear() === day.getFullYear() &&
            nowTime.getMonth() === day.getMonth() &&
            nowTime.getDate() === day.getDate(); // `getDay()`를 `getDate()`로 변경

        const clickDay = clickedDate
            ? clickedDate.getFullYear() === day.getFullYear() &&
              clickedDate.getMonth() === day.getMonth() &&
              clickedDate.getDate() === day.getDate() // `getDay()`를 `getDate()`로 변경
            : false;

        const clickDate = () => {
            console.log("day", day);
            setClickedDate(day);
        };

        return (
            <>
                <Container
                    onClick={clickDate}
                    $sameMonth={sameMonth}
                    $sameDay={sameDay}
                    $clickDay={clickDay}
                >
                    <div className="select_day">{day.getDate()}</div>
                    <div>
                        <img className="img_dembell" src={imgDem} alt="" />
                    </div>
                </Container>
            </>
        );
    }
);

export default AllDay;
