import React, {FC} from 'react'
import Logo from "./Logo/Logo"
import styles from "./Header.module.scss"
import AuthButton from "./AuthButton/AuthButton";

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <AuthButton/>
        </header>
    )
}
export default Header;
