import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";
import { Header } from './Header.jsx';
import { Outlet } from "react-router-dom";

export const EditCookBook = () => {

    return(
        <div></div>
    )
}