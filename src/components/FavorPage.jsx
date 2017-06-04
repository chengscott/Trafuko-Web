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

        const time = new Date("Sat May 27 2017 17:37:59 GMT+0800");
        const time_str = timeTransfer(time);
        const item1 = (<Item text={"努力不一定會成功，但是不努力的話，就會很輕鬆喔～"} time={time_str}/>);

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
        text: PropTypes.string.isRequired,
        color: PropTypes.string
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
                        <i><i className="fa fa-clock-o">&nbsp;&nbsp;</i>{this.props.time}</i>
                        <br/>
                    </p>
                </div>
                </div>
            </li>
        );
    }
}

function timeTransfer(time){

    var Y = (time.getYear()+1900).toString();
    var M = (time.getMonth()+1).toString();
    var dd = time.getDate();
    var hh = time.getHours();
    var mm = time.getMinutes();

    dd = (dd < 10)?('0'+dd.toString()):dd.toString();
    hh = (hh == 0)?'00':
         (hh < 10)?('0'+hh.toString()):hh.toString();
    mm = (mm == 0)?'00':
         (mm < 10)?('0'+mm.toString()):mm.toString();

    var str = Y + "-" + M + '-' + dd + " " + hh + ":" + mm;
    return str;
}