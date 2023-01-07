import React, {FC} from 'react'
import styles from './DeleteLessonPopup.module.scss'
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";
import Bye from "assets/images/png/bb.png";
import ButtonColored from "../../ui/buttons/buttonColored/ButtonColored";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchTeacher,
    selectDeleteLesson,
    selectLessonId,
    setLessonId,
    setOpenDeleteLesson
} from "redux/counter/counterSlice";
import lessonsServices from "services/lessonsServices";

const DeleteLessonPopup: FC = () => {
    const dispatch = useDispatch<any>()
    const openLesson = useSelector(selectDeleteLesson)
    const lessonId = useSelector(selectLessonId)
    const closeLesson = () => {
        dispatch(setOpenDeleteLesson(false))
    }
    const deleteLesson = async () => {
        const {data} = await lessonsServices.deleteLessonById(lessonId)
        dispatch(fetchTeacher())
        closeLesson()
        dispatch(setLessonId(null))
    }
    return (
        <div onMouseDown={closeLesson} className={`${styles.LessonWrapper}${openLesson ? ' ' + styles.LessonActive : ''}`}>
            <div className={`${styles.FormWrapper}${openLesson ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={closeLesson}/>
                <div className={styles.FormHead}>
                    <img src={Bye} alt="hello-icon"/>
                    <p>Видалити заплановану пару?</p>
                </div>
                <div className={styles.ButtonsWrapper}>
                    <ButtonColored text={'Так'} color={'var(--success)'} onClick={deleteLesson}/>
                    <ButtonColored text={'Ні'} color={'var(--red)'} onClick={closeLesson}/>
                </div>
            </div>
        </div>
    )
}

export default DeleteLessonPopup;