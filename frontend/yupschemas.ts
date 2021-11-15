import * as yup from "yup";

const Emailschema = yup.object({
    email: yup
        .string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Lütfen geçerli bir e-posta adresi girin.')
        .required('Lütfen geçerli bir e-posta adresi girin.'),
    password: yup
        .string()
        .min(8, 'Şifreniz En Az 8 Karakterden Oluşmalıdır')
        .required('Lütfen şifrenizi girin'),
}).required();

const PhoneSchema = yup.object({
    phone: yup
        .string()
        .matches(/^[0-9]+$/, "Lütfen geçerli bir telefon numarası girin.")
        .min(11, 'Lütfen geçerli bir telefon numarası girin.')
        .max(11, 'Lütfen geçerli bir telefon numarası girin.')
        .required('Lütfen geçerli bir telefon numarası girin.'),
    password: yup
        .string()
        .min(8, 'Şifreniz En Az 8 Karakterden Oluşmalıdır')
        .required('Lütfen şifrenizi girin'),
}).required();

export { Emailschema, PhoneSchema }