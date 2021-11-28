import React, { useState } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FaCoins } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import PaymentAmountCard from '../../src/components/userComponents/PaymentAmountCard';
import { AddGameCoinAction } from '../../redux/slices/userActionsSlice';


interface User {
    id: string
    email: string
    password: string
    phone: string
}

export interface FormInputs {
    amount: number
}

export default function buygamecoin(props: User) {

    const dispatch = useAppDispatch()
    const { id, email, phone, balance } = useAppSelector(state => state.auth.user)
    const { AddGameCoin } = useAppSelector(state => state.userActions)

    const { handleSubmit, setValue, watch } = useForm<FormInputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: false,
        delayError: undefined
    })
    const onSubmit: SubmitHandler<FormInputs> = data => {
        dispatch(AddGameCoinAction({ userid: id, amount: data.amount }))
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PaymentAmountCard HookFormFunctions={{ setValue, watch }} amounts="100,300,500" />
                <input type="submit" value="Oyun Parasını Yükle" className="mt-5 px-3 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-opacity-95 cursor-pointer" />
            </form>
            {AddGameCoin.response.message !== null && <span>{AddGameCoin.response.message}</span>}
        </div>
    )
}


/*

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.uid;
    const data = await fetch(`${process.env.SERVER_BASE_URL}/api/user/info/${id}`, {
        credentials: 'include',
        mode: "cors",
        headers: {
            cookie: context.req.headers.cookie || ''
        }
    }).then(response => {
        if (response.status >= 400 && response.status < 600) {
            return null
        } else {
            return response.json()
        }
    })

    if (!data) {
        return {
            notFound: true
      --
      redirect: {
                 destination: '/',
                 permanent: false,
               },
       --
        }
    }
    return {
        props: data
    }
}

*/



