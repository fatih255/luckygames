import React, { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'
import Footer from '../src/components/userComponents/Footer'
import Navbar from '../src/components/userComponents/Navbar'
import { GetServerSideProps } from 'next'

interface WithRouterProps {
    router: NextRouter
}

interface defaultLayoutProps extends WithRouterProps {

}



class defaultLayout extends Component<defaultLayoutProps> {


    render() {
        let pathname = this.props.router.pathname;


        // we added custom classes to self and child parent pages
        let centered = pathname.includes('/profile') ? 'justify-center detailpage' : ''

        return (
            <div className="appdiv">
                <Navbar disableFixed={pathname !== '/'} />
                <main className={`${centered}`

                }>{this.props.children}</main>
                <Footer />
            </div >
        )
    }
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, res } = ctx

    const { cookies } = req

    return { props: { cookies } }
}

export default withRouter(defaultLayout)
