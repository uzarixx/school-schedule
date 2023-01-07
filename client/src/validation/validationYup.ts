import * as yup from 'yup'

export const registerValidate = yup
    .object()
    .shape({
        username: yup
            .string()
            .min(5, 'Мінімальна длина 5 символів')
            .max(30, 'Максимальна длина 30 символів'),
        email: yup
            .string()
            .email('Введіть коректний адрес електроної пошти')
            .required('Введіть адес електроної пошти'),
        password: yup
            .string()
            .min(5, 'Мінімальна длина паролю 5 символів')
            .required('Введіть пароль'),
    })
    .required();


export const loginValidate = yup
    .object()
    .shape({
        email: yup
            .string()
            .email('Введіть коректний адрес електроної пошти')
            .required('Введіть адес електроної пошти'),
        password: yup
            .string()
            .min(5, 'Мінімальна длина паролю 5 символів')
            .required('Введіть пароль'),
    })
    .required();

export const forgotValidate = yup.object().shape({
    email: yup.string().email('Введіть коректний адрес електроної пошти').required('Введіть адес електроної пошти')
})

export const forgotPasswordValidate = yup.object().shape({
    password: yup.string().min(5, 'Мінімальна длина паролю 5 символів').required('Введіть пароль'),
    repeatPassword: yup.string().min(5, 'Мінімальна длина паролю 5 символів').required('Повторіть пароль'),
})
