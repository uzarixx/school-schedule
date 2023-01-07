import React, {FC, useState} from 'react'
import styles from "./ForgotPopup.module.scss";
import ButtonClose from "../../ui/buttons/buttonClose/ButtonClose";
import SearchIcon from "assets/images/png/search.png";
import {useDispatch, useSelector} from "react-redux";
import {selectOpenForgot, setOpenForgot, setOpenLogin} from "redux/counter/counterSlice";
import {SubmitHandler, useForm} from "react-hook-form";
import ButtonSubmit from "../../ui/buttons/buttonSubmit/ButtonSubmit";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgotValidate} from "validation/validationYup";
import studentService from "../../../services/studentServices";

const ForgotPopup: FC = () => {
    const dispatch = useDispatch()
    const openForgot = useSelector(selectOpenForgot)
    const [isLoading, setIsLoading] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(forgotValidate)});
    const onSubmit: SubmitHandler<any> = async (formValue) => {
        try {
            await setIsLoading(true)
            const {data} = await studentService.forgotPassword(formValue.email)
            await setIsLoading(false)
            if (data) setIsResponse(true)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            setIsResponse(false)
        }
    }
    const onCloseForgot = () => {
        dispatch(setOpenForgot(false))
    }
    const onClickLogin = () => {
        dispatch(setOpenLogin(true))
        onCloseForgot()
    }
    return (
        <div onMouseDown={onCloseForgot}
             className={`${styles.ForgotWrapper}${openForgot ? ' ' + styles.ForgotActive : ''}`}>
            <div className={`${styles.FormWrapper}${openForgot ? ' ' + styles.FormActive : ''}`}
                 onMouseDown={(e) => e.stopPropagation()}>
                <ButtonClose onClick={onCloseForgot}/>
                <div className={styles.FormHead}>
                    <img src={SearchIcon} alt="hello-icon"/>
                    <p>Відновлення акаунту</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {isResponse ? <h4>На ваш e-mail надіслано листа</h4> : <> <input
                        className={`${styles.Input}${errors.email ? ` ${styles.Active}` : ''}`}
                        placeholder={'email'}
                        {...register('email', {required: true})}/>
                        {errors.email && <p>{errors.email?.message as string}</p>}
                        <ButtonSubmit isDisabled={isLoading} text={'Відправити повідомлення'}/> </>}
                </form>
                <span>Повернутись?<p onClick={onClickLogin}>{' Вхід'}</p> </span>
            </div>
        </div>
    )
}


export default ForgotPopup;