import React, { useState, useRef, useMemo } from "react";
import styled from "styled-components";

const exercisesData = {
    가슴: ["벤치 프레스", "덤벨 프레스", "푸쉬업"],
    등: ["렛풀다운", "바벨 로우", "풀업"],
    어깨: ["오버헤드 프레스", "덤벨 숄더 프레스", "사이드 레터럴 레이즈"],
    하체: ["스쿼트", "레그 프레스", "런지"],
};

const ModalBackground = styled.div`
    /* position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center; */
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    /* width: 300px; */
    text-align: left;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
`;

const ModalTitle = styled.p`
    font-size: 1.5em;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 5px solid #f1f2f4;
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
`;

const Modal = ({ modalOpen, addExercise }) => {
    const modalBackground = useRef();
    const [selectedPart, setSelectedPart] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");
    const [weight, setWeight] = useState("");
    const [set, setSet] = useState("");

    const handleClose = () => {
        modalOpen(false); // 부모 컴포넌트로 모달 닫기 신호 전달
    };

    const handleAddExercise = () => {
        if (selectedPart && selectedExercise && weight && set) {
            addExercise({
                part: selectedPart,
                exercise: selectedExercise,
                weight,
                set,
            });
            handleClose();
        } else {
            alert("모든 필드를 입력하세요.");
        }
    };

    return (
        <ModalBackground
            ref={modalBackground}
            onClick={(e) => {
                if (e.target === modalBackground.current) {
                    // handleClose();
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
                    <button>세트추가</button>
                    <InputWrap>
                        <Input
                            type="text"
                            placeholder="무게"
                            value={weight}
                            maxLength={4}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <div>kg </div>
                        {/* <div>1세트</div>
                        <button>1세트</button> */}
                        <Input
                            type="text"
                            placeholder="세트"
                            value={set}
                            maxLength={4}
                            onChange={(e) => setSet(e.target.value)}
                        />
                        <div>1 세트</div>
                    </InputWrap>
                    {/* <InputWrap>
                        <Input
                            type="text"
                            placeholder="무게"
                            value={weight}
                            maxLength={4}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="세트"
                            value={set}
                            maxLength={4}
                            onChange={(e) => setSet(e.target.value)}
                        />
                    </InputWrap> */}
                </div>
                <Button onClick={handleAddExercise}>운동 추가1</Button>
                <Button className="modal-close-btn" onClick={handleClose}>
                    취소
                </Button>
            </ModalContent>
        </ModalBackground>
    );
};

export default Modal;
