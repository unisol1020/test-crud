import React from "react";import {Route, Routes} from "react-router-dom";import ProductPage from "../screens/ProductPage/ProductPage";const Router = () => {    return (        <Routes>            <Route path="/" element={<ProductPage/>} />        </Routes>    );};export default Router;