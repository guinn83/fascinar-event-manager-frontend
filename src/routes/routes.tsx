import { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/AppBar";
import EventPage from "../pages/EventPage";
import EventList from "../pages/Events";
import Login from "../pages/Singin";
import User from "../pages/UserComponent";
import authService from "../services/auth.service";



const RoutesApp = () => {
    const Private = ({ Item }) => {
        return authService.isSigned() ? <Item /> : <Login />;
    };
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/user" element={<Private Item={User} />} />
                    <Route path="/eventlist" element={<Private Item={EventList} />} />
                    <Route path="/event/:id" element={<Private Item={EventPage} />} />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;