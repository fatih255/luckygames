import React, { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'
import socketService from '../services/socketService'

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
        connectSocket()
    }

    render() {
        return (
            <main className="bg-blue-700 ">{this.props.children} </main>

        )
    }
}
export default withRouter(gameLayout)
