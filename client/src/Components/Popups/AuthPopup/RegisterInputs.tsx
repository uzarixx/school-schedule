import React, {FC, useState} from 'react'
import styles from './RegisterInputs.module.scss'
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm, FormProvider} from "react-hook-form";
import ButtonSubmit from "../../ui/buttons/buttonSubmit/ButtonSubmit";
import authServices from "services/authServices";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthUser, fetchLessons, selectAuthUserData, setOpenAuth} from "redux/counter/counterSlice";
import {registerValidate} from "validation/validationYup";
import FormInput from "../../ui/inputs/formInput/FormInput";

interface input {
    placeholder: string;
    formValue: string;
    typeInput: string;
}

const inputs: Array<input> = [
    {placeholder: 'ім\'я та призвище', formValue: 'username', typeInput: 'text'},
    {placeholder: 'e-mail', formValue: 'email', typeInput: 'text'},
    {placeholder: 'пароль', formValue: 'password', typeInput: 'password'},
]
const RegisterInputs: FC<any> = () => {
    const dispatch = useDispatch<any>()
    const authUser = useSelector(selectAuthUserData)
    const isStudent = authUser.role === 'Student'
    const [isDisabled, setIsDisabled] = useState(false)
    const methods = useForm<any>({
        resolver: yupResolver(registerValidate)
    });
    const onSubmit: SubmitHandler<any> = async (formValue) => {
        try {
            setIsDisabled(true)
            const {data} = await authServices.registerData(formValue.email, formValue.username, formValue.password)
            data && setIsDisabled(false)
            localStorage.setItem('authToken', data.token)
            dispatch(setOpenAuth(false))
            dispatch(fetchAuthUser())
            if (isStudent) {
                dispatch(fetchLessons(authUser?.group))
            }
        } catch (error: any) {
            methods.setError('registeredError', {type: 'custom', message: error.response.data.message});
            setIsDisabled(false)
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles.FormWrapper}>
                    {inputs.map((el: any, i: number) =>
                        <div className={styles.InputWrapper} key={i}>
                            <FormInput errors={methods.formState.errors[el.formValue] as object}
                                       typeInput={el.typeInput} formValue={el.formValue} placeholder={el.placeholder}/>
                            {methods.formState.errors[el.formValue] &&
                                <p>{methods.formState.errors[el.formValue]?.message as string}</p>}
                        </div>
                    )}
                    <ButtonSubmit isDisabled={isDisabled} text={'Далі'}/>
                    {methods.formState.errors.registeredError &&
                        <span>{methods.formState.errors.registeredError?.message as string}</span>}
                </div>
            </form>
        </FormProvider>
    )
}

export default RegisterInputs;