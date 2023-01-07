import React, {FC} from "react";
import styles from './Input.module.scss'


interface FormInputProps {
    typeInput: string;
    placeholder: string;
    onChange?: any;
    value?: string;
}

const Input: FC<FormInputProps> = ({typeInput, placeholder, onChange, value}) => {
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (
        <input className={`${styles.Input}`} type={typeInput}
               onChange={onChangeInput}
               value={value}
               placeholder={placeholder}/>
    )
}

export default Input;
