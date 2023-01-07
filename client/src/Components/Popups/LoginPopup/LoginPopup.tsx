import React, {FC} from 'react'
import styles from './LoginPopup.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, setOpenAuth, setOpenForgot, setOpenLogin} from "redux/counter/counterSlice";
import HelloIcon from "assets/images/png/hello.png";
import LoginInputs from "./LoginInputs";
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";

const LoginPopup: FC = () => {
    const dispatch = useDispatch()
    const openLogin = useSelector(selectLogin)
    const onCloseLogin = () => {
        dispatch(setOpenLogin(false))
    }
    const onClickAuth = () => {
        dispatch(setOpenAuth(true))
        onCloseLogin()
    }

    const onClickForgot = () => {
        dispatch(setOpenForgot(true))
        onCloseLogin()
    }

    return (
        <div onMouseDown={onCloseLogin} className={`${styles.LoginWrapper}${openLogin ? ' ' + styles.LoginActive : ''}`}>
            <div className={`${styles.FormWrapper}${openLogin ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={onCloseLogin}/>
                <div className={styles.FormHead}>
                    <img src={HelloIcon} alt="hello-icon"/>
                    <p>Вхід</p>
                </div>
                <LoginInputs/>
                <span>Ще не зареєстровані? <p onClick={onClickAuth}>{' Реєстрація'}</p> </span>
                <span onClick={onClickForgot}><p>Забули пароль?</p></span>
            </div>
        </div>
    )
}
export default LoginPopup;