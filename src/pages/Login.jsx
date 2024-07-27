import React, { useState } from "react";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth"; // Firebase import
import { useNavigate, Link } from "react-router-dom"; // Assuming you are using react-router-dom for navigation
import { auth } from "../firebase"; // Firebase 초기화 설정 가져오기
import styled from "styled-components";

const Container = styled.div`
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90vh;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const ButtonSNS = styled.button`
    border: 1px solid white;
    width: 100px;
    height: 50px;
`;

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // For navigation after successful sign-in

    // Handle input changes
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
            // Email regex
            const emailRegex = /^[a-zA-Z0-9-_]+@[a-zA-Z.]+$/;
            if (!value?.match(emailRegex)) {
                setError(
                    "이메일 형식이 올바르지 않습니다. 영문 대소문자, 숫자와 특수기호(_),(-),(@)만 사용 가능합니다."
                );
            } else {
                setError("");
            }
        } else if (name === "password") {
            setPassword(value);
            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요.");
            } else {
                setError("");
            }
        }
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // Navigate to home page on successful sign-in
        } catch (error) {
            console.log(error);
            setError("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }

        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const onClickSignUp = () => {
        console.log("onClickSignUp");
        navigate("/signup");
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="이메일"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="비밀번호"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">로그인하기</button>
            </form>
            <button onClick={onClickSignUp}>
                <div>회원가입</div>
            </button>
            <ButtonContainer>
                <ButtonSNS name="google" onClick={onSocialClick}>
                    구글
                </ButtonSNS>
                <ButtonSNS name="github" onClick={onSocialClick}>
                    깃허브
                </ButtonSNS>
            </ButtonContainer>
        </Container>
    );
};

export default SignIn;
