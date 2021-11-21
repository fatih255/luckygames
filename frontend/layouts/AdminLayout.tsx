import React, { Component } from 'react'
import { withRouter, NextRouter } from 'next/router'
import Sidebar from '../src/components/adminComponents/Sidebar'
import { useAppSelector } from '../redux/hooks'
import { connect } from 'react-redux';

interface WithRouterProps {
    router: NextRouter
}

interface adminLayoutProps extends WithRouterProps {
    user: object
}


const adminLayout = withRouter(
    class extends Component<adminLayoutProps> {

        render() {
            return (
                <main>
                    <div className="flex flex-wrap bg-gray-100 w-full min-h-screen">
                        <Sidebar />
                        <div className="w-9/12">
                            <div className="p-10 text-gray-500">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </main>

            )
        }
    }
)


const mapStateToProps = function (state: any) {
    return {
        user: { ...state.auth.user.id || undefined }
    }
}

export default connect(mapStateToProps)(adminLayout);
