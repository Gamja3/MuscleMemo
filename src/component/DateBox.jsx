import React, { memo } from "react";
import styled from "styled-components";
import WeekBox from "./WeekBox";
import AllDay from "./AllDay";

const Container = styled.div`
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const DateBox = memo(({ nowDate, setNowDate, clickedDate, setClickedDate }) => {
    const monthList = (nowDate) => {
        const nowYear = nowDate.getFullYear();
        const nowMonth = nowDate.getMonth();

        const firstDayOfMonth = new Date(nowYear, nowMonth, 1).getDay();
        const lastDateOfMonth = new Date(nowYear, nowMonth + 1, 0).getDate();

        const result = [];
        const prevMonthEndDate = new Date(nowYear, nowMonth, 0).getDate();

        // 이전 달 날짜들
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            result.push(new Date(nowYear, nowMonth - 1, prevMonthEndDate - i));
        }

        // 이번 달 날짜들
        for (let i = 1; i <= lastDateOfMonth; i++) {
            result.push(new Date(nowYear, nowMonth, i));
        }

        const nextMonthStartDay = result.length % 7;

        // 다음 달 날짜들
        for (let i = 1; i <= 6 - nextMonthStartDay; i++) {
            result.push(new Date(nowYear, nowMonth + 1, i));
        }

        return result;
    };
    const allDay = monthList(nowDate);
    const weeks = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <Container>
            {weeks.map((week, index) => {
                return <WeekBox key={index} week={week} index={index} />;
            })}
            {allDay.map((day, index) => {
                return (
                    <AllDay
                        key={index}
                        day={day}
                        nowDate={nowDate}
                        setNowDate={setNowDate}
                        clickedDate={clickedDate}
                        setClickedDate={setClickedDate}
                    />
                );
            })}
        </Container>
    );
});

export default DateBox;
