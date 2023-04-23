import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home";
import AddItem from "../Components/AddItem";
import Login from "../Components/LogSign/Login";
import SignUp from "../Components/LogSign/SignUp";
import PrivateRoute from "../Route/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/add',
        element: <PrivateRoute><AddItem></AddItem></PrivateRoute>
    },
    {
        path: '/logsign',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    }
])