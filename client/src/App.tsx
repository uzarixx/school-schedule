import React, {useEffect} from 'react';
import Header from "./Components/Header/Header";
import './assets/styles/global/root.scss'
import './assets/styles/global/_resets.scss'
import AuthPopup from "./Components/Popups/AuthPopup/AuthPopup";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthUser, fetchLessons, fetchTeacher, selectAuthUserData} from "./redux/counter/counterSlice";
import LoginPopup from "./Components/Popups/LoginPopup/LoginPopup";
import Main from "./Components/Main/Main";
import LogoutPopup from "./Components/Popups/LogoutPopup/LogoutPopup";
import DeleteLessonPopup from "./Components/Popups/DeleteLessonPopup/DeleteLessonPopup";
import CreateLessonPopup from "./Components/Popups/CreateLessonPopup/CreateLessonPopup";
import DeleteUserPopup from "./Components/Popups/DeleteUserPopup/DeleteUserPopup";
import ForgotPopup from "./Components/Popups/ForgotPopup/ForgotPopup";


const App = () => {
    const dispatch = useDispatch<any>()
    const authUser = useSelector(selectAuthUserData)
    const userIsAuth = localStorage.getItem('authToken')
    const isTeacher = authUser.role === 'Teacher'
    const isStudent = authUser.role === 'Student'
    useEffect(() => {
        if (userIsAuth)
            dispatch(fetchAuthUser())
    }, [])
    useEffect(() => {
        if (isStudent) {
            dispatch(fetchLessons(authUser?.group))
            setInterval(() => {
                dispatch(fetchLessons(authUser?.group))
            }, 30000)
        } else if (isTeacher)
            dispatch(fetchTeacher())
    }, [authUser])

    return (
        <div className='rootWrapper'>
            {userIsAuth && <LogoutPopup/>}
            {userIsAuth && isTeacher && <>
                <DeleteLessonPopup/>
                <CreateLessonPopup/>
                <DeleteUserPopup/>
            </>}
            {!userIsAuth && <>
                <LoginPopup/>
                <AuthPopup/>
                <ForgotPopup/>
            </>}
            <Header/>
            <Main/>
        </div>
    );
}

export default App;
