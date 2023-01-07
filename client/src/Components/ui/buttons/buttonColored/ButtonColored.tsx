import React, {FC} from 'react'
import styles from './ButtonColored.module.scss'

interface ButtonColoredProps {
    text: string;
    color: string;
    onClick?: () => void;
}

const ButtonColored: FC<ButtonColoredProps> = ({text, color, onClick}) => {
    return (
        <button style={{backgroundColor: `${color}`}} onClick={onClick} className={styles.ButtonRed}>{text}</button>
    )
}

export default ButtonColored;