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

const GameRoomSchema = yup.object({
    user_total: yup
        .number().typeError('Numara Girişi Olmalıdır')
        .min(2, 'Toplam Kişi Sayısı En Az 2 kişiden Oluşmalıdır')
        .max(500, 'Toplam Kişi Sayısı En Fazla 500 kişiden Oluşabilir')
        .required('Toplam Kişi Sayısı Zorunludur'),
    participation_fee: yup
        .number().typeError('Numara Girişi Olmalıdır')
        .min(10, 'Katılım Ücreti Minimum 10 Olmalıdır')
        .max(500, 'Katılım Ücreti En Fazla 500 Olabilir')
        .required('Katılım Ücreti Zorunludur'),
    label: yup
        .string().typeError('Sadece Karakterlerden Oluşmalıdır')
        .required('Oyun Başlığı Zorunludur')
});

export { Emailschema, PhoneSchema, GameRoomSchema }