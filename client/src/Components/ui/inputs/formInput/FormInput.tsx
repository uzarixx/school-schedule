import {useFormContext} from "react-hook-form";
import React, {FC} from "react";
import styles from './FormInput.module.scss'


interface FormInputProps {
    typeInput: string;
    placeholder: string;
    formValue: string
    errors?: object;
}

const FormInput: FC<FormInputProps> = ({typeInput, placeholder, formValue, errors}) => {
    const {register} = useFormContext();
    return (
        <input className={`${styles.Input}${errors ? ` ${styles.Active}` : ''}`} type={typeInput}
               placeholder={placeholder}
               {...register(formValue, {required: true})}/>
    )
}

export default FormInput;
