import React, { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'
import Footer from '../src/components/Footer'
import Navbar from '../src/components/Navbar'
import { GetServerSideProps } from 'next'

interface WithRouterProps {
    router: NextRouter
}

interface defaultLayoutProps extends WithRouterProps { }

class defaultLayout extends Component<defaultLayoutProps> {


    render() {

        return (
            <div className="appdiv">
                <Navbar disableFixed={this.props.router.pathname !== '/'} />
                <main>{this.props.children}</main>

                <Footer />
            </div>
        )
    }
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, res } = ctx

    const { cookies } = req

    return { props: { cookies } }
}

export default withRouter(defaultLayout)
