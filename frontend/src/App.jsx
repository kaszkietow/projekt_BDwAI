import { Button } from "./components/ui/button.jsx";
import { Card, Container, Grid, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx";
import CardLogin from "./components/CardLogin.jsx";
import CardRegister from "./components/CardRegister.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import HomePage from "./components/HomePage.jsx";
import CarsGrid from "./components/CarsGrid.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";


function App() {
    return (
        <Router>
            <Stack minH={"100vh"}>
                <Container my={4}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PublicRoute>
                                    <HomePage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <RegisterPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/cars"
                            element={
                                <PrivateRoute>
                                    <CarsGrid />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Container>
            </Stack>
        </Router>
    );
}

export default App;