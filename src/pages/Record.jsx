import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import ControlDate from "../component/ControlDate";
import DateBox from "../component/DateBox";
import Modal from "../component/Modal";

const Container2 = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    /* background-color: #132229; */
    /* padding-bottom: 24px; */
`;
const Container = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    /* background-color: #132229; */
    /* padding-bottom: 24px; */
`;

const Button = styled.button`
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-family: "noto-sans";
    &:hover {
        background-color: #0056b3;
    }
`;

const ExerciseList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ExerciseItem = styled.li`
    background: #f8f9fa;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
`;

const ExerciseInfo = styled.span`
    display: inline-block;
`;

const Record = memo(() => {
    const [nowDate, setNowDate] = useState(new Date());
    const [clickedDate, setClickedDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [exercises, setExercises] = useState([]);

    const handleModalOpen = (data) => {
        setModalOpen(data);
    };

    useEffect(() => {
        console.log(new Date());
    }, []);

    const addExercise = (exerciseData) => {
        console.log(clickedDate);
        setExercises((prevExercises) => {
            const dateKey = clickedDate.toISOString().split("T")[0]; // YYYY-MM-DD
            const exercisesForDate = prevExercises[dateKey] || [];
            return {
                ...prevExercises,
                [dateKey]: [...exercisesForDate, exerciseData],
            };
        });
    };

    const selectedDateExercises = clickedDate
        ? exercises[clickedDate.toISOString().split("T")[0]]
        : [];

    return (
        <Container2>
            <Container>
                <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
                <DateBox
                    nowDate={nowDate}
                    setNowDate={setNowDate}
                    clickedDate={clickedDate}
                    setClickedDate={setClickedDate}
                />
                <div className="btn-wrapper">
                    <Button
                        className="modal-open-btn"
                        onClick={() => setModalOpen(true)}
                    >
                        운동추가하기
                    </Button>
                </div>
                {modalOpen && (
                    <Modal
                        modalOpen={handleModalOpen}
                        addExercise={addExercise}
                    />
                )}
                <div>
                    <h3>운동 목록</h3>
                    <ExerciseList>
                        {selectedDateExercises &&
                            selectedDateExercises.map((exercise, index) => (
                                <ExerciseItem key={index}>
                                    <ExerciseInfo>{exercise.part}</ExerciseInfo>
                                    <ExerciseInfo>
                                        {exercise.exercise}
                                    </ExerciseInfo>
                                    <ExerciseInfo>
                                        {exercise.weight} kg
                                    </ExerciseInfo>
                                </ExerciseItem>
                            ))}
                    </ExerciseList>
                </div>
            </Container>
        </Container2>
    );
});

export default Record;
