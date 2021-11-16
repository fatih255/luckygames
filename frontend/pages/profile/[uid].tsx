import React from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

import { useAppSelector } from '../../redux/hooks'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

interface User {
    id: string
    email: string
    password: string
    phone: string
}


export default function profile(props: User) {

    const { id, email, phone, balance } = useAppSelector(state => state.auth.user)

    // console.log(props)
    return (
        <div className="flex gap-x-10">
            <div>
                <h1 className="font-bold text-2xl mb-4">Profilim</h1>
                <div className="flex items-center"><AiOutlinePhone className="text-blue-700 w-8 h-8 mr-4" /><span className={`${!phone && 'text-gray-400'}`} >{phone || 'Kayıtlı Telefon Yok'}</span></div>
                <div className="flex items-center"><AiOutlineMail className="text-blue-700 w-8 h-8 mr-4" /><span className={`${!email && 'text-gray-400'}`} >{email || 'Kayıtlı E-posta Adresiniz Yok'}</span></div>
            </div>
            <div className="max-h-screen flex flex-col flex-1">
                <h2 className="font-bold text-2xl mb-4">Oyun Geçmişi</h2>
                <div className="">
                    <div className="flex justify-between">
                        <div>ID</div>
                        <div>Oyun Adı</div>
                        <div>Kazanılan</div>
                    </div>
                    <div className="flex justify-between">

                    </div>
                </div>
            </div>
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
            /* ---
             redirect: {
                 destination: '/',
                 permanent: false,
             },
            ---  */
/*    }
}
return {
    props: data
}
} */
