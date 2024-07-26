import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle input changes
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
            const emailRegex = /^[a-zA-Z0-9-_]+@[a-zA-Z.]+$/;
            if (!value?.match(emailRegex)) {
                setError("이메일 형식이 올바르지 않습니다.");
            } else {
                setError("");
            }
        } else if (name === "password") {
            setPassword(value);
            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요.");
            } else if (
                passwordConfirm?.length > 0 &&
                value !== passwordConfirm
            ) {
                setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
            } else {
                setError("");
            }
        } else if (name === "passwordConfirm") {
            setPasswordConfirm(value);
            if (password !== value) {
                setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
            } else {
                setError("");
            }
        } else if (name === "nickname") {
            setNickname(value);
            if (value?.length < 2) {
                setError("닉네임은 2자리 이상으로 입력해주세요.");
            } else {
                setError("");
            }
        }
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            toast.error(error);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Save user info to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email,
                nickname,
                createdAt: new Date(),
            });

            toast.success("회원가입에 성공하였습니다.");
            navigate("/");
        } catch (error) {
            toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
            console.log(error);
            setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
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
                <input
                    type="password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={onChange}
                    placeholder="비밀번호 확인"
                />
                <input
                    type="text"
                    name="nickname"
                    value={nickname}
                    onChange={onChange}
                    placeholder="닉네임"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">회원가입하기</button>
            </form>
        </div>
    );
};

export default SignUp;
