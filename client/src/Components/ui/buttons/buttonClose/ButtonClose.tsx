import React, {FC} from 'react'
import styles from "./ButtonClose.module.scss"
import CloseIcon from "assets/images/png/close.png";


interface ButtonCloseProps {
    onClick?: () => void;
}

const ButtonClose: FC<ButtonCloseProps> = ({onClick}) => {
    return (
        <div className={styles.CloseIcon}>
            <div onClick={onClick} className={styles.CloseIconWrap}>
                <img src={CloseIcon} alt="close-icon"/>
            </div>
        </div>
    )
}

export default ButtonClose;