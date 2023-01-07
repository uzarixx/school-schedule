import React, {FC} from 'react'
import styles from './LogoutPopup.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectLogout, setClearAuthUser, setClearLessons, setOpenLogout} from "redux/counter/counterSlice";
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";
import Bye from "assets/images/png/bb.png";
import ButtonColored from "../../ui/buttons/buttonColored/ButtonColored";
import {useNavigate} from 'react-router-dom'

const LogoutPopup: FC = () => {
    const dispatch = useDispatch()
    const openLogout = useSelector(selectLogout)
    const navigate = useNavigate()
    const closeLogout = () => {
        dispatch(setOpenLogout(false))
    }

    const onLogout = () => {
        dispatch(setClearLessons([]))
        dispatch(setClearAuthUser([]))
        dispatch(setOpenLogout(false))
        localStorage.removeItem('authToken')
        navigate('/')
    }

    return (
        <div onMouseDown={closeLogout}
             className={`${styles.LogoutWrapper}${openLogout ? ' ' + styles.LogoutActive : ''}`}>
            <div className={`${styles.FormWrapper}${openLogout ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={closeLogout}/>
                <div className={styles.FormHead}>
                    <img src={Bye} alt="hello-icon"/>
                    <p>Здійснити вихід?</p>
                </div>
                <div className={styles.ButtonsWrapper}>
                    <ButtonColored text={'Так'} color={'var(--success)'} onClick={onLogout}/>
                    <ButtonColored text={'Ні'} color={'var(--red)'} onClick={closeLogout}/>
                </div>
            </div>
        </div>
    )
}

export default LogoutPopup;