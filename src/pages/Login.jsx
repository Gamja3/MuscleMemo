import React, { useState } from "react";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth"; // Firebase import
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom for navigation
import { auth } from "../firebase"; // Firebase 초기화 설정 가져오기

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
            // toast.success("로그인에 성공하였습니다."); // Uncomment if you are using toast notifications
            navigate("/"); // Navigate to home page on successful sign-in
        } catch (error) {
            // toast.error(error?.code); // Uncomment if you are using toast notifications
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
            const data = await signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                    // ...
                    console.log(errorCode, errorMessage, email);
                });
            navigate("/");
        } else if (name === "github") {
            provider = new GithubAuthProvider();
            const data = await signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                        GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GithubAuthProvider.credentialFromError(error);
                    // ...
                    console.log(errorCode, errorMessage, email);
                });
            navigate("/");
        }

        // console.log(data);
    };

    return (
        <div>
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
                <button name="google" onClick={onSocialClick}>
                    구글
                </button>
                <button name="github" onClick={onSocialClick}>
                    깃허브
                </button>
            </form>
        </div>
    );
};

export default SignIn;
