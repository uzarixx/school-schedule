import React, {FC, useEffect, useState} from 'react'
import styles from './CreateLessonPopup.module.scss'
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";
import Bell from "assets/images/png/bell.png";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGroups,
    fetchTeacher,
    selectCreateLesson,
    selectGroups, selectLessonId, setLessonId,
    setOpenCreateLesson
} from "redux/counter/counterSlice";
import Select from "../../ui/select/selectCalendar/Select";
import {selectsArray} from "utils/datesArray";
import Input from "../../ui/inputs/input/Input";
import SelectGroups from "../../ui/select/selectGroups/SelectGroups";
import ButtonSubmit from "../../ui/buttons/buttonSubmit/ButtonSubmit";
import lessonsServices from "services/lessonsServices";


const CreateLessonPopup: FC = () => {
    const [date, setDate] = useState({day: '01', month: '01', time: '8:15'})
    const [groupValues, setGroupValues] = useState({group: 'ptbd31', groupName: 'ПТБД-31'})
    const [link, setLink] = useState('')
    const [info, setInfo] = useState('')
    const lessonId = useSelector(selectLessonId)
    const dispatch = useDispatch<any>()
    const openLesson = useSelector(selectCreateLesson)
    const groups = useSelector(selectGroups)
    const closeLesson = () => {
        dispatch(setOpenCreateLesson(false))
        dispatch(setLessonId(null))
        setLink('')
        setInfo('')
        setGroupValues({...groupValues, group: 'ptbd31', groupName: 'ПТБД-31'})
    }
    useEffect(() => {
        if (openLesson) dispatch(fetchGroups())
        if (lessonId && openLesson) {
            const fetchLesson = async () => {
                const {data} = await lessonsServices.getLessonById(lessonId)
                setLink(data[0].link)
                setInfo(data[0].info)
                setGroupValues({...groupValues, group: data[0].group, groupName: data[0].groupName})
            }
            fetchLesson()
        }
    }, [openLesson, lessonId])
    const createOrUpdateLesson = async () => {
        const dateParse = Date.parse(`${new Date().getFullYear()}/${date.month}/${date.day}/ ${date.time}:00`)
        try {
            const {data} = await lessonsServices[lessonId ? 'changeLesson' : 'createLesson'](
                {
                    id: lessonId,
                    link,
                    dateParse,
                    groupValues,
                    info
                })
            closeLesson()
            dispatch(fetchTeacher())
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div onMouseDown={closeLesson} className={`${styles.LessonWrapper}${openLesson ? ' ' + styles.LessonActive : ''}`}>
            <div className={`${styles.FormWrapper}${openLesson ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={closeLesson}/>
                <div className={styles.FormHead}>
                    <img src={Bell} alt="hello-icon"/>
                    <p>Створення та редагування пар</p>
                </div>
                <Input typeInput={'text'} onChange={setInfo} value={info} placeholder={'Тема та назва пари'}/>
                <Input typeInput={'text'} onChange={setLink} value={link} placeholder={'Посилання на пару'}/>
                <div className={styles.MainSelects}>
                    {selectsArray.map((el, i) =>
                        <div className={styles.Select} key={i}>
                            <p>{el.title}</p>
                            <Select options={el.date} id={i} onChange={setDate} date={date}/>
                        </div>
                    )}
                </div>
                <div className={styles.MainSelects}>
                    <div className={styles.Select}>
                        <p>Група</p>
                        <SelectGroups options={groups} onChange={setGroupValues} group={groupValues}/>
                    </div>
                </div>
                <ButtonSubmit onClick={createOrUpdateLesson} text={'Далі'}/>
            </div>
        </div>
    )
}

export default CreateLessonPopup;