import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import React, { Component } from "react";
import AlertMessageContainer from "./components/AlertMessageContainer";

class App extends Component {
    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <BrowserRouter>
                    <Header />
                    <AlertMessageContainer />
                    <Container className="mt-3">
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
