import React, { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'
import socketService from '../services/socketService'
import Navbar from '../src/components/userComponents/Navbar'

interface WithRouterProps {
    router: NextRouter
}

interface gameLayoutProps extends WithRouterProps { }

//game layout includes socket server connection
const connectSocket = async () => {
    const socket = await socketService
        .connect("http://localhost:3001")
        .catch(err => {
            console.log("Error: ", err)
        })
}


class gameLayout extends Component<gameLayoutProps> {

    componentDidMount() {
        !socketService.socket && connectSocket()
    }

    render() {
        return (
            <div>
                <Navbar />
                <main className="bg-blue-700 ">{this.props.children} </main>
            </div>

        )
    }
}
export default withRouter(gameLayout)
