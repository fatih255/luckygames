
import React, { Component } from 'react'
import { NextRouter } from "next/router";
import DefaultLayout from "./DefaultLayout";
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useEffect } from 'react'
import { Check } from '../redux/slices/authSlice';

interface WithRouterProps {
    router: NextRouter
    layouts: object
    children: { ReactNode: any, type: any }

}

export default function LayoutWrapper(props: WithRouterProps) {

    const dispatch = useAppDispatch()
    // const auth = useAppSelector(state => state.auth)
     useEffect(() => {
       dispatch(Check())
     }, [])
   
    const Layout = props.children.type.layout;
    return (Layout != null ? <Layout {...props}>{props.children}</Layout> : <DefaultLayout {...props}>{props.children}</DefaultLayout>)
}

