import React, {FC, useState} from 'react'
import {SubmitHandler, useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgotPasswordValidate} from "validation/validationYup";
import styles from "./Forgot.module.scss";
import FormInput from "../../ui/inputs/formInput/FormInput";
import ButtonSubmit from "../../ui/buttons/buttonSubmit/ButtonSubmit";
import {useLocation, useNavigate} from "react-router-dom";
import studentService from "services/studentServices";
import {
    fetchAuthUser,
    selectAuthUserData,
    selectAuthUserStatus
} from "redux/counter/counterSlice";
import {useDispatch, useSelector} from "react-redux";
import NotFound from "../NotFound/NotFound";


interface input {
    placeholder: string;
    formValue: string;
    typeInput: string;
}

const inputs: Array<input> = [
    {placeholder: 'Новий пароль', formValue: 'password', typeInput: 'password'},
    {placeholder: 'Повторіть пароль', formValue: 'repeatPassword', typeInput: 'password'},
]

const Forgot: FC = () => {
    const dispatch = useDispatch<any>()
    const location = useLocation()
    const navigate = useNavigate()
    const isLoading = useSelector(selectAuthUserStatus)
    const isAuth = useSelector(selectAuthUserData)
    const isEmptyAuth = isAuth.length === 0
    const authToken = localStorage.getItem('authToken')
    const [isDisabled, setIsDisabled] = useState(false)
    const methods = useForm({resolver: yupResolver(forgotPasswordValidate)});
    const onSubmit: SubmitHandler<any> = async (formValue) => {
        try {
            localStorage.removeItem('authToken')
            const token = location?.search?.slice(5)
            await setIsDisabled(true)
            if (formValue.password !== formValue.repeatPassword) {
                methods.setError('registeredError', {type: 'custom', message: 'Паролі не співпадають'});
                return;
            }
            const {data} = await studentService.changeForgotPassword({token, password: formValue.repeatPassword})
            localStorage.setItem('authToken', data)
            dispatch(fetchAuthUser())
            navigate('/')
            if (data) await setIsDisabled(false)
        } catch (e) {
            await setIsDisabled(false)
            console.log(e)
        }

    }


    if (isLoading) return <h2 style={{textAlign: 'center'}}>Завантаження...</h2>
    if (!isEmptyAuth && authToken) return <NotFound/>
    else if (!location.search) return <NotFound/>

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            </form>
        </FormProvider>
    )
}

export default Forgot;