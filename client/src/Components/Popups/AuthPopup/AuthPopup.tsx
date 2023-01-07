import React, {FC} from 'react'
import styles from './AuthPopup.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, setOpenAuth, setOpenLogin} from "redux/counter/counterSlice";
import HelloIcon from 'assets/images/png/hello.png'
import RegisterInputs from "./RegisterInputs";
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";


const AuthPopup: FC = () => {
    const dispatch = useDispatch()
    const openAuth = useSelector(selectAuth)
    const onClickAuth = () => {
        dispatch(setOpenAuth(false))
    }
    const onClickLogin = () => {
        dispatch(setOpenLogin(true))
        onClickAuth()
    }
    return (
        <div onMouseDown={onClickAuth} className={`${styles.AuthWrapper}${openAuth ? ' ' + styles.WrapperActive : ''}`}>
            <div className={`${styles.FormWrapper}${openAuth ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={onClickAuth}/>
                <div className={styles.FormHead}>
                    <img src={HelloIcon} alt="hello-icon"/>
                    <p>Реєстрація</p>
                </div>
                <RegisterInputs/>
                <span>Вже зареєстровані? <p onClick={onClickLogin}>Вхід</p> </span>
            </div>
        </div>
    )
}

export default AuthPopup;