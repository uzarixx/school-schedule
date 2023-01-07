import React, {FC, useEffect, useState} from 'react'
import styles from './UserPanel.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGroups,
    fetchStudents,
    selectAuthUserData,
    selectGroups,
    selectStudents,
    selectStudentsStatus, setOpenDeleteUser, setUserId
} from "redux/counter/counterSlice";
import SelectGroups from "../../ui/select/selectGroups/SelectGroups";
import Teacher from "assets/images/png/teacher.png";
import Delete from "assets/images/png/delete.png"
import {Link} from "react-router-dom";
import Skeleton from "../../ui/skeleton/Skeleton";
import studentService from "services/studentServices";
import NotFound from "../NotFound/NotFound";

const UserPanel: FC = () => {
    const dispatch = useDispatch<any>()
    const students = useSelector(selectStudents)
    const isLoading = useSelector(selectStudentsStatus)
    const groups = useSelector(selectGroups)
    const authUser = useSelector(selectAuthUserData)
    const isTeacher = authUser?.role === 'Teacher'
    const [group, setGroup] = useState({group: '', groupName: ''})
    const [userId, setId] = useState('')
    const isEmptyUserGroup = group.group !== ''
    const isEmptyUserId = userId !== ''
    useEffect(() => {
        dispatch(fetchGroups())
        dispatch(fetchStudents())
    }, [])
    const onClickDeleteUser = (_id: string) => {
        dispatch(setOpenDeleteUser(true))
        dispatch(setUserId(_id))
    }
    const onClickGroup = (_id: string) => {
        setId(_id)
        if (isEmptyUserGroup && isEmptyUserId) {
            const changeUser = async () => {
                const {data} = await studentService.changeGroupStudent(userId, group.group)
                setId('')
                setGroup({...group, group: ''})
                dispatch(fetchStudents())
            }
            changeUser()
        }
    }
    if (isLoading) {
        return (
            <>
                {[...new Array(5)].map((_, i) =>
                    <div className={styles.spacing} key={i}>
                        <Skeleton/>
                    </div>)}
            </>
        )
    }
    if (!isTeacher) {
        return (
            <NotFound/>
        )
    }
    return (
        <>
            {students?.map((student: any, i: number) =>
                <div className={styles.userBlock} key={i}>
                    <p>{student.username}</p>
                    <div className={styles.selectWrapper} onClick={() => onClickGroup(student._id)}>
                        <SelectGroups options={groups} groupValue={student.group} onChange={setGroup} group={group}/>
                        <div className={styles.deleteUserButton} onClick={() => onClickDeleteUser(student._id)}>
                            <img src={Delete} alt="delete-icon"/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserPanel;