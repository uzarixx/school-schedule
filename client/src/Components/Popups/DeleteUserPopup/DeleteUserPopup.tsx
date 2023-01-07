import React, {FC} from 'react'
import styles from './DeleteUserPopup.module.scss'
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";
import Bye from "assets/images/png/bb.png";
import ButtonColored from "../../ui/buttons/buttonColored/ButtonColored";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchStudents,
    selectDeleteUser, selectUserId, setOpenDeleteUser
} from "redux/counter/counterSlice";
import studentService from "services/studentServices";


const DeleteLessonPopup: FC = () => {
    const dispatch = useDispatch<any>()
    const openDeleteUser = useSelector(selectDeleteUser)
    const userId = useSelector(selectUserId)
    const closeDeleteUser = () => {
        dispatch(setOpenDeleteUser(false))
    }
    const onDeleteUser = async () => {
        const {data} = await studentService.deleteStudent(userId)
        closeDeleteUser()
        dispatch(fetchStudents())
    }
    return (
        <div onMouseDown={closeDeleteUser}
             className={`${styles.UserWrapper}${openDeleteUser ? ' ' + styles.UserActive : ''}`}>
            <div className={`${styles.FormWrapper}${openDeleteUser ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={closeDeleteUser}/>
                <div className={styles.FormHead}>
                    <img src={Bye} alt="hello-icon"/>
                    <p>Видалити студента?</p>
                </div>
                <div className={styles.ButtonsWrapper}>
                    <ButtonColored text={'Так'} color={'var(--success)'} onClick={onDeleteUser}/>
                    <ButtonColored text={'Ні'} color={'var(--red)'} onClick={closeDeleteUser}/>
                </div>
            </div>
        </div>
    )
}

export default DeleteLessonPopup;