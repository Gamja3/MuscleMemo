// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./component/Footer";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Graph from "./pages/Graph";
import Record from "./pages/Record";
import SignUp from "./pages/SignUp";
import Header from "./component/Header";
import { auth, onAuthStateChanged } from "./firebase";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("app.jsx useEffect");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setDisplayName(user.displayName || "User");
            } else {
                setIsLoggedIn(false);
                navigate("/login");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <>
            {isLoggedIn && <Header displayName={displayName} />}
            <Routes>
                <Route path="/" element={isLoggedIn ? <Main /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/graph"
                    element={isLoggedIn ? <Graph /> : <Login />}
                />
                <Route
                    path="/record"
                    element={isLoggedIn ? <Record /> : <Login />}
                />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
