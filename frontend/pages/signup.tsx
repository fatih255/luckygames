import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { signUp } from '../redux/slices/authSlice';
import { Emailschema, PhoneSchema } from '../yupschemas'
type Inputs = {
    email: string,
    phone: string,
    password: string
    required: string
};



export default function login() {

    const [activeLoginType, setactiveLoginType] = useState('email');
    const [SubmittedForm, setSubmittedForm] = useState(false);
    const dispatch = useAppDispatch()

    const { register, handleSubmit, setValue, clearErrors, reset, getValues, setError, trigger, watch, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(activeLoginType === 'email' ? Emailschema : PhoneSchema),

    });
    const onSubmit: SubmitHandler<Inputs> = data => {
        setSubmittedForm(true)
        //fetch islemi
        dispatch(signUp(data))
    }
    const onError: SubmitErrorHandler<Inputs> = () => {
        setSubmittedForm(true)
    };

    useEffect(() => {
        reset()

    }, [activeLoginType])

    const SubmitAfterError = useAppSelector(state => state.auth.error) //from redux

    return (
        <div className="py-20 flex flex-col justify-start items-center mx-10">
            <div>
                <h1 className="text-4xl font-semibold  tracking-tight mb-4">Crypto Lucky Games Hesap Oluştur</h1>
                <p className="text-gray-500">E-posta veya Telefon Numaranızla Hemen Hesap Oluşturun</p>
                <div className="pt-12 flex mb-8">
                    <div className={`cursor-pointer font-semibold py-2 px-4 ${activeLoginType === 'email' ? 'bg-gray-100 text-black' : 'text-gray-500'} rounded-lg`} onClick={() => activeLoginType !== 'email' && setactiveLoginType('email')}>E-posta</div>
                    <div className={`cursor-pointer font-semibold py-2 px-4 ${activeLoginType === 'phone' ? 'bg-gray-100 text-black' : 'text-gray-500'} rounded-lg`} onClick={() => activeLoginType !== 'phone' && setactiveLoginType('phone')} >Mobil</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col" autoComplete="off">
                    {activeLoginType === 'email' ?
                        <>
                            <label className="mb-2" htmlFor="email">E-posta</label>
                            <input  {...register("email")} id="email" className={`${errors.email?.message ? 'border-red-600' : 'focus:border-purple-300 hover:border-purple-300'}  text-sm border-[1px] rounded-lg py-3 px-3 font-semibold  autofill-none focus:border-purple-300 hover:border-purple-300  focus:outline-none`} type="text" />
                            <p className="text-red-700 text-[14px] mt-2"  >{errors.email?.message}</p>
                            {SubmitAfterError && <p className="text-red-700 text-[14px] mt-2" >{SubmitAfterError}</p>}
                        </> :
                        <>
                            <label className="mb-2" htmlFor="email">Telefon Numarası</label>
                            <input {...register("phone",
                                {
                                    onBlur: () => getValues("phone").length > 0 && trigger("phone"),
                                    onChange: (event) => {
                                        event.target.value === '' && clearErrors('phone')
                                        setValue('phone', event.target.value.replace(/\D/, ''), { shouldValidate: !!errors.phone })
                                    }
                                })}
                                id="email" inputMode='numeric' maxLength={11} pattern="[0-9]*" className={`text-sm border-[1px] rounded-lg py-3 px-3 font-semibold  autofill-none ${errors.phone?.message ? 'border-red-600' : 'focus:border-purple-300 hover:border-purple-300'}   focus:outline-none`} type="tel" />
                            <p className="text-red-700 text-[14px] mt-2" >{errors.phone?.message}</p>
                        </>
                    }
                    <label className="mt-4 mb-2" htmlFor="password">Şifre</label>
                    <input {...register("password", {
                        onBlur: () => {
                            clearErrors('password')
                        },
                        onChange: (event) => {
                            if (SubmittedForm) {
                                setSubmittedForm(false)
                            }
                            setValue('password', event.target.value)
                            trigger("password")
                        }
                    })} id="password" autoComplete="false" className={`text-sm border-[1px] rounded-lg py-3 px-3 font-semibold bg-white ${errors.password ? 'border-red-600' : 'focus:border-purple-300 hover:border-purple-300'}   focus:outline-none`} type="password" />
                    <p className="text-red-700 text-[14px] mt-2" >{SubmittedForm && errors.password?.message}</p>
                    <input className="mt-10 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-opacity-95 cursor-pointer" value="Hesap Oluşturun" type="submit" />
                </form>
                <div className=" flex flex-col my-6">
                    <Link href="login">
                        <a className="mt-2 text-blue-600 font-semibold tracking-tight hover:underline hover:text-blue-400" href="#">Giriş Yap</a>
                    </Link>

                </div>
            </div>
        </div >

    )

}
