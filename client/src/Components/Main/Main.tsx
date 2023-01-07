import React, {FC} from 'react'
import Lessons from "../ui/cards/lessons/Lessons";
import styles from './Main.module.scss'
import {Route, Routes} from "react-router-dom";
import UserPanel from "../Routes/Students/UserPanel";
import Forgot from "../Routes/Forgot/Forgot";

const Main: FC = () => {
    return (
        <main className={styles.Main}>
            <Routes>
                <Route path="/" element={<Lessons/>}/>
                <Route path="students" element={<UserPanel/>}/>
                <Route path="forgot" element={<Forgot/>}/>
                <Route path="*" element={'NotFound'}/>
            </Routes>
        </main>
    )
}

export default Main;