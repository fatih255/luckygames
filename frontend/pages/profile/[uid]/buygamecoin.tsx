import React from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useAppSelector } from '../../../redux/hooks';


interface User {
    id: string
    email: string
    password: string
    phone: string
}


export default function buygamecoin(props: User) {
    const { id, email, phone, balance } = useAppSelector(state => state.auth.user)

    // console.log(props)
    return (
        <div>
            {id && email}
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



