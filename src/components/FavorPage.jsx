import React from 'react';
import PropTypes from 'prop-types';
import './FavorPage.css';

export default class FavorPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        wrap: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.wrap(false); // overflow: auto
    }
    render() {
        return (
            <div id="favorpage">
                <div className="title">
                    <h1> Trafuko favorite list</h1>
                </div>
                <ui className="list">
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                    <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="item">
                        <div className="content">
                            <h4 className="text">test</h4>
                            <p>
                                <i><i className="fa fa-clock-o"></i> visited </i><i className="fromNow">3 months ago</i>
                                <br/>
                            </p>
                        </div>
                        </div>
                    </li>
                </ui>
            </div>
        );
    }
}
