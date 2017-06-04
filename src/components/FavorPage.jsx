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
        const time = new Date();
        const item1 = (<Item text={"Testing"} time={time.toString()}/>);

        return (
            <div id="favorpage">
                <div className="title">
                    <h1> Trafuko favorite list</h1>
                </div>
                <ui className="list">
                    {item1}
                    {item1}
                    {item1}
                    {item1}
                    {item1}
                    {item1}
                </ui>
            </div>
        );
    }
}
class Item extends React.Component {
    // time // text //
    static propTypes = {
        time: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div className="item">
                <div className="content">
                    <h4 className="text">{this.props.text}</h4>
                    <p>
                        <i><i className="fa fa-clock-o"></i>{this.props.time}</i>
                        <br/>
                    </p>
                </div>
                </div>
            </li>
        );
    }
}