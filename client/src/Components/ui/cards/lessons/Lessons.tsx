import React, {FC} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuthUserData,
    selectLessons,
    selectLessonsStatus,
    setLessonId, setOpenAuth, setOpenCreateLesson,
    setOpenDeleteLesson
} from "redux/counter/counterSlice";
import DeleteIcon from 'assets/images/png/delete.png'
import EditIcon from 'assets/images/png/edit.png'
import date from "utils/date";
import Teacher from 'assets/images/png/teacher.png'
import styles from './Lessons.module.scss'
import ButtonLink from "../../buttons/buttonLink/ButtonLink";
import Skeleton from "../../skeleton/Skeleton";
import PersonHello from "assets/images/png/personHello.png";
import ButtonSubmit from "../../buttons/buttonSubmit/ButtonSubmit";


interface LessonTypes {
    link: string;
    group: string;
    groupName: string;
    _id: string;
    info: string;
    username: string;
    date: string;
}

const Lessons: FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectAuthUserData)
    const isLoading = useSelector(selectLessonsStatus)
    const lessonsArray = useSelector(selectLessons)
    const isTeacher = isAuth.role === 'Teacher'
    const isEmpty = lessonsArray?.length === 0
    const isEmptyAuth = isAuth.length === 0
    const Preloader = ([...new Array(5)].map((_, i) => <div className={styles.spacing} key={i}><Skeleton/></div>))
    const onClickDeleteLesson = (props: string) => {
        dispatch(setOpenDeleteLesson(true))
        dispatch(setLessonId(props))
    }
    const onClickEditLesson = (props: string) => {
        dispatch(setOpenCreateLesson(true))
        dispatch(setLessonId(props))
    }
    const onClickAuth = () => {
        dispatch(setOpenAuth(true))
    }
    const authToken = localStorage.getItem('authToken')
    if (isEmptyAuth && !authToken) {
        return (
            <div className={styles.MainNoAuth}>
                <img src={PersonHello} alt="person-hello"/>
                <h2>Для того щоб розпочати потрібно зареєструватися.</h2>
                <ButtonSubmit onClick={onClickAuth} isDisabled={false} text={'Зареєструватися.'}/>
            </div>
        )
    }
    if (isEmpty) {
        return (
            <>{isLoading ? Preloader :
                <div className={styles.LessonIsEmpty}>
                    <img src={Teacher} alt="teacher-img"/><h2>Поки що не заплановано жодної пари.</h2>
                </div>}
            </>
        )
    }



    return (
        <>
            {isLoading ? Preloader :
                <div className={styles.LessonsWrapper}>
                    {lessonsArray?.map((el: LessonTypes, i: number) =>
                        <div className={styles.LessonCard} key={i}>
                            {isTeacher &&
                                <>
                                    <div className={styles.LessonAdmins}>
                                        <button onClick={() => onClickEditLesson(el._id)} className={styles.EditButton}>
                                            <img src={EditIcon} alt="EditIcon"/>
                                        </button>
                                        <button onClick={() => onClickDeleteLesson(el._id)}
                                                className={styles.DeleteButton}>
                                            <img src={DeleteIcon} alt="DeleteIcon"/>
                                        </button>
                                    </div>
                                    <p>Група: {el.groupName}</p>
                                </>
                            }
                            <p>Тема та назва: {el.info}</p>
                            <p>Викладач: {el.username}</p>
                            <p>Початок: {date(Number(el.date))}</p>
                            <ButtonLink link={el.link} text={'Підключитись'}/>
                        </div>
                    )}
                </div>}
        </>
    )
}

export default Lessons;