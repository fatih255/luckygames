import React, { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'

interface WithRouterProps {
    router: NextRouter
}

interface gameLayoutProps extends WithRouterProps { }

class gameLayout extends Component<gameLayoutProps> {

    render() {
        return (
            <main className="bg-indigo-700 ">{this.props.children} </main>

        )
    }
}
export default withRouter(gameLayout)
