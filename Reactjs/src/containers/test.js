import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { createAxiosJWT } from '../axiosJWT';



class DefaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    clickMe = async () => {
        let user = {
            id: '1',
            roleId: 'R1',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoiUjEiLCJpYXQiOjE2OTM0MDgzMzksImV4cCI6MTY5MzQwODM2OX0.w0HmPa4gtn9LnpY4OpMKTjLHUql2x8V6AieYgZE6w8I'
        }
        let res = await createAxiosJWT(user)
        console.log('=====res', res.newInstance)
    }
    render() {
        return (
            <div>
                <button onClick={() => this.clickMe()}>
                    this
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
