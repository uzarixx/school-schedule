import React, {FC} from 'react'
import styles from './Logo.module.scss'
import LogoImage from 'assets/images/png/log.png'
import {Link} from "react-router-dom";

const Logo: FC = () => {
    return (
        <Link to='/' className={styles.wrapperLogo}>
            <img src={LogoImage} alt="logo-image"/>
            <p>NKKEP</p>
        </Link>
    )
}

export default Logo;