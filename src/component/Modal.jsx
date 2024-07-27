import React, { useState, useRef } from "react";
import styled from "styled-components";

const exercisesData = {
    가슴: ["벤치 프레스", "덤벨 프레스", "푸쉬업"],
    등: ["렛풀다운", "바벨 로우", "풀업"],
    어깨: ["오버헤드 프레스", "덤벨 숄더 프레스", "사이드 레터럴 레이즈"],
    하체: ["스쿼트", "레그 프레스", "런지"],
};

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: left;
`;

const ModalTitle = styled.p`
    font-size: 1.5em;
    margin-bottom: 10px;
    padding-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Input = styled.input`
    width: 40%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const SetAdd = styled.div`
    /* width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer; */
`;

const SetBtn = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #525252;
    color: white;
    cursor: pointer;
    font-weight: 800;

    &:hover {
        background-color: #000000;
    }
`;

const Modal = ({ modalOpen, addExercise }) => {
    const modalBackground = useRef();
    const [selectedPart, setSelectedPart] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState([
        { weight: "", times: "" },
        { weight: "", times: "" },
        { weight: "", times: "" },
        { weight: "", times: "" },
    ]);
    const handleClose = () => {
        modalOpen(false); // 부모 컴포넌트로 모달 닫기 신호 전달
    };

    const handleAddExercise = () => {
        if (
            selectedPart &&
            selectedExercise &&
            sets.every((set) => set.weight && set.times)
        ) {
            addExercise({
                part: selectedPart,
                exercise: selectedExercise,
                sets,
            });
            handleClose();
        } else {
            alert("모든 필드를 입력하세요.");
        }
    };

    const handleSetChange = (index, field, value) => {
        const newSets = [...sets];
        newSets[index][field] = value;
        setSets(newSets);
    };

    const handleAddSet = () => {
        setSets([...sets, { weight: "", times: "" }]);
    };
    return (
        <ModalBackground
            ref={modalBackground}
            onClick={(e) => {
                if (e.target === modalBackground.current) {
                    handleClose();
                }
            }}
        >
            <ModalContent>
                <ModalTitle>운동 추가</ModalTitle>
                <Select
                    value={selectedPart}
                    onChange={(e) => {
                        setSelectedPart(e.target.value);
                        setSelectedExercise("");
                    }}
                >
                    <option value="">부위 선택</option>
                    {Object.keys(exercisesData).map((part) => (
                        <option key={part} value={part}>
                            {part}
                        </option>
                    ))}
                </Select>
                <Select
                    value={selectedExercise}
                    onChange={(e) => setSelectedExercise(e.target.value)}
                    disabled={!selectedPart}
                >
                    <option value="">운동 선택</option>
                    {selectedPart &&
                        exercisesData[selectedPart].map((exercise) => (
                            <option key={exercise} value={exercise}>
                                {exercise}
                            </option>
                        ))}
                </Select>
                <div>
                    {sets.map((set, index) => (
                        <InputWrap key={index}>
                            <div>{index + 1}세트 </div>
                            <Input
                                type="text"
                                placeholder="무게"
                                value={set.weight}
                                maxLength={4}
                                onChange={(e) =>
                                    handleSetChange(
                                        index,
                                        "weight",
                                        e.target.value
                                    )
                                }
                            />
                            <div>kg </div>
                            <Input
                                type="text"
                                placeholder="횟수"
                                value={set.times}
                                maxLength={4}
                                onChange={(e) =>
                                    handleSetChange(
                                        index,
                                        "times",
                                        e.target.value
                                    )
                                }
                            />
                            <div>회</div>
                        </InputWrap>
                    ))}

                    <SetAdd>
                        <SetBtn onClick={handleAddSet}>세트 추가</SetBtn>
                    </SetAdd>
                </div>
                <Button onClick={handleAddExercise}>운동 추가</Button>
                <Button className="modal-close-btn" onClick={handleClose}>
                    취소
                </Button>
            </ModalContent>
        </ModalBackground>
    );
};

export default Modal;
