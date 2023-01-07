import React, {FC} from 'react'
import LockImg from 'assets/images/png/lock.png'
import ExitImg from 'assets/images/png/exit.png'
import styles from "./AuthButton.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuthUserData,
    selectAuthUserStatus,
    setOpenAuth, setOpenCreateLesson,
    setOpenLogin, setOpenLogout
} from "redux/counter/counterSlice";
import {Link} from "react-router-dom";

const AuthButton: FC = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectAuthUserData)
    const isTeacher = user.role === 'Teacher'
    const status = useSelector(selectAuthUserStatus)
    const onClickAuth = () => {
        dispatch(setOpenAuth(true))
    }
    const onClickLogin = () => {
        dispatch(setOpenLogin(true))
    }
    const onCreateLesson = () => {
        dispatch(setOpenCreateLesson(true))
    }
    const logoutUser = () => {
        dispatch(setOpenLogout(true))
    }
    const isEmpty = user.length !== 0
    return (
        <>{status ? <p> {'Завантаження..'}</p> :
            <div className={styles.AuthButtonWrapper}>
                {isTeacher && <Link to='students' className={styles.LessonCreate}>Список учнів</Link>}
                {isTeacher && <p className={styles.LessonCreate} onClick={onCreateLesson}>Запланувати пару</p>}
                {isEmpty ? <div className={styles.buttonWrapperAuth}> <img src={ExitImg} alt="exit-img"/><p onClick={logoutUser}>{user?.username}</p></div> :
                <div className={styles.buttonWrapperAuth}><img src={LockImg} alt="lock-img"/> <p onClick={onClickAuth}>Реєстрація</p>
                / <p onClick={onClickLogin}>Вхід</p></div>
                }
            </div>
        }</>
    )
}

export default AuthButton