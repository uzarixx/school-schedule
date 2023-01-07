import React, {FC} from 'react'
import styles from './ButtonSubmit.module.scss'

interface ButtonProps {
    text: string;
    isDisabled?: boolean;
    onClick?: () => void;
}

const ButtonSubmit: FC<ButtonProps> = ({text, isDisabled, onClick}) => {
    return (
        <button
            className={styles.Button}
            disabled={isDisabled}
            onClick={onClick}
            type="submit">
            {text}
        </button>
    )
}

export default ButtonSubmit;