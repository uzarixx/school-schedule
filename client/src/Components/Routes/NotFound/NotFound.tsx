import React, {FC} from 'react'
import styles from "./NotFound.module.scss";
import Teacher from "assets/images/png/teacher.png";
import {Link} from "react-router-dom";


const NotFound: FC = () => {
    return (
        <div className={styles.isTeacher}>
            <img src={Teacher} alt="person-hello-icon"/>
            <h2>Напевно ви не туди потрапили.</h2>
            <Link to={'/'}>На головну</Link>
        </div>
    )
}

export default NotFound;