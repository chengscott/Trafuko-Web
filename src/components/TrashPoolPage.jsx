import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button, CardText} from 'reactstrap';
import {Animate} from 'react-move';

import './TrashPoolPage.css';

export default class TrashPoolPage extends React.Component {

    static propTypes = {
        userid: PropTypes.string.isRequired,
        firebase: PropTypes.object.isRequired,
        wrap: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const showNum = (screen.width >= 1024) ? 3 : (screen.width >= 700) ? 2 : 1;
        this.state = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5,
            showNum: showNum,
            style: {},
            ifPause: false,
            ptext: "",
            id: "",
            clicked: false,
            Data: []
        };
        this.tick = this.tick.bind(this);
        this.capture = this.capture.bind(this);
        this.handleClickout = this.handleClickout.bind(this);
        this.s1 = 0;
        this.s2 = 1;
        this.s3 = 2;
        this.s4 = 3;
        this.s5 = 4;
        this.s6 = 5;
        this.index = 5;
    }

    componentDidMount() {
        this.props.wrap(true); // overflow:hidden
        this.reRender = setInterval(
            () => this.tick(),
            5000
        );
        this.props.firebase.ref('posts').on('value', snapshot => {
            this.setState({Data: objToarr(snapshot.val())});
        });
    }

    componentWillUnmount() {
        clearInterval(this.reRender);
    }

    handleClickout(e) {

        if (!document.getElementById('PauseBox').contains(e.target)) {
            if (!this.state.clicked) {
                window.removeEventListener('click', this.handleClickout);
                this.setState({ifPause: false});
            }
            this.setState({clicked: false});
        }
    }

    tick() {
        this.index = this.index + 1;
        if (this.index >= Math.floor(this.state.Data.length / this.state.showNum)) this.index = 0;
        const stop = 1;
        this.s1 = (this.s1 + 1) % 6;
        this.s2 = (this.s2 + 1) % 6;
        this.s3 = (this.s3 + 1) % 6;
        this.s4 = (this.s4 + 1) % 6;
        this.s5 = (this.s5 + 1) % 6;
        this.s6 = (this.s6 + 1) % 6;

        if (this.s1 == stop) {
            this.setState({a: this.index});
        } else if (this.s2 == stop) {
            this.setState({b: this.index});
        } else if (this.s3 == stop) {
            this.setState({c: this.index});
        } else if (this.s4 == stop){
            this.setState({d: this.index});
        } else if (this.s5 == stop){
            this.setState({e: this.index});
        } else {
            this.setState({f: this.index});
        }
    }

    capture(style, text, id) {
        this.setState({
            style: style,
            ifPause: true,
            ptext: text,
            id: id,
            clicked: true
        });
        window.addEventListener('click', this.handleClickout);
    }

    render() {
        const showNum = this.state.showNum;
        const data1 = this.state.Data.slice( this.state.a * showNum, (this.state.a + 1) * showNum);
        const data2 = this.state.Data.slice( this.state.b * showNum, (this.state.b + 1) * showNum);
        const data3 = this.state.Data.slice( this.state.c * showNum, (this.state.c + 1) * showNum);
        const data4 = this.state.Data.slice( this.state.d * showNum, (this.state.d + 1) * showNum);
        const data5 = this.state.Data.slice( this.state.e * showNum, (this.state.e + 1) * showNum);
        const data6 = this.state.Data.slice( this.state.f * showNum, (this.state.f + 1) * showNum);

        const items1 = data1.map(a => (<Item text={a.text} key={a.id} id={a.id} status={this.s1} pause={this.capture}/>));
        const items2 = data2.map(a => (<Item text={a.text} key={a.id} id={a.id} status={this.s2} pause={this.capture}/>));
        const items3 = data3.map(a => (<Item text={a.text} key={a.id} id={a.id} status={this.s3} pause={this.capture}/>));
        const items4 = data4.map(a => (<Item text={a.text} key={a.id} id={a.id} status={this.s4} pause={this.capture}/>));
        const items5 = data5.map(a => (<Item text={a.text} key={a.id} id={a.id} status={this.s5} pause={this.capture}/>));
        const items6 = data6.map(a => (<Item text={a.text} key={a.id} id={a.id} status={this.s6} pause={this.capture}/>));
        return (
            <div className="trashPool">
                <Pause  firebase={this.props.firebase} userid={this.props.userid} style={this.state.style} ifPause={this.state.ifPause} text={this.state.ptext} id={this.state.id}/>
                {items1}
                {items2}
                {items3}
                {items4}
                {items5}
                {items6}
            </div>
        );
    }
}

class Pause extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        userid: PropTypes.string.isRequired,
        style: PropTypes.object,
        id: PropTypes.string,
        ifPause: PropTypes.bool,
        text: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike(id) {
        if (this.props.userid !== "") {

            const now = new Date();
            this.props.firebase.ref('fav/' + this.props.userid +'/' + id).set({
                id: id,
                ts: now.toString()
            });
            console.log("add to favor list");
        }else {
            console.log("login to get the benifit of favor list");
        }
    }

    render() {
        if (this.props.ifPause) {
            return (
                    <Card
                        id="PauseBox"
                        style={{
                            float: 'center',
                            width: '200px',
                            height: "auto",
                            padding: "8px",
                            borderRadius: "11px",
                            position: "absolute",
                            left: this.props.style.left,
                            top: this.props.style.top,
                            background: "linear-gradient(to right, #0575E6, #021B79)",
                            zIndex: 1,
                            display: this.props.ifPause ? "" : "none"
                        }}
                        className="disable"
                        /*onClick={() => this.props.clickOut()}*/>
                        <h4><CardText style={{color: "yellow"}}>{this.props.text}</CardText></h4>
                        <Button className="hvr-grow" onClick={() => this.handleLike(this.props.id)}>收藏</Button>
                    </Card>
            );
        } else return <div id="PauseBox"></div>;
    }
}

class Item extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        pause: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            style: change(this.props.status),
            show: true
        };
        this.status = this.props.status;
        this.handle = this.handle.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.change = setInterval(() => this.tick(), 5000);
    }

    handle() {
        let style = document.getElementById("i_" + this.props.id).style;
        style.color = this.state.style.color;
        style.textcolor = this.state.style.textcolor;
        this.props.pause(style, this.props.text, this.props.id);
        this.setState({show: false, style: style});
        clearInterval(this.change);
    }

    componentWillUnmount() {
        clearInterval(this.change);
    }

    tick() {
        const s = this.status;
        this.status = (s + 1) % 6;
        this.setState({
            style: change(s)
        });
    }

    render() {
        return (
            this.state.show ?
            <Animate
                default={{
                    scale: 0.3,
                    color: 'black',
                    left: "-300px"
                }}
                data={
                    this.state.style
                }
                duration={5000}
                easing='easeQuadInOut'
            >
                {data => (
                    <Card
                        style={{
                            float: 'center',
                            width: '200px',
                            height: "auto",
                            padding: "8px",
                            borderRadius: "11px",
                            transform: `scale(${data.scale})`,
                            background: data.color,
                            position: "absolute",
                            left: data.left,
                            top: data.top,
                            cursor: 'pointer'
                        }}
                        id={"i_" + this.props.id}
                        className="disable"
                        onClick={() => this.handle()}>
                        <h4><CardText style={{color: data.textcolor}}>{this.props.text}</CardText></h4>
                    </Card>
                )}
            </Animate>
            : <div></div>
        );
    }
}

function change(status) {
    let num = Math.random();
    let color1 = (num >= 0.75) ? "#fffc00" : (num >= 0.5) ? "#A1FFCE" : (num >= 0.25) ? "#4b6cb7" : "#FDFC47";
    let color2 = (num >= 0.75) ? "#ffffff" : (num >= 0.5) ? "#FAFFD1" : (num >= 0.25) ? "#182848" : "#24FE41";
    let color = (num >= 0.75) ? "#76FF03" : (num >= 0.5) ? "#18FFFF" : (num >= 0.25) ? "#D500F9" : "#FFFF00";
    let textcolor = (num >= 0.75) ? "blue" : (num >= 0.5) ? "black" : (num >= 0.25) ? "white" : "black";
    let scale, left;
    let top = (50 + Math.random() * (screen.height - 200)) + "px";
    switch (status) {
        case 0:
            scale = 0.5 + Math.random() * 0.5;
            left = (200 + Math.random() * (screen.width - 500)) + "px";
            break;
        case 1:
            scale = 0.5 + Math.random() * 0.5;
            left = (200 + Math.random() * (screen.width - 500)) + "px";
            break;
        case 2:
            scale = 0.6 + Math.random() * 0.4;
            left = (200 + Math.random() * (screen.width - 500)) + "px";
            break;
        case 3:
            scale = 0.8 + Math.random() * 0.2;
            left = (200 + Math.random() * (screen.width - 500)) + "px";
            break;
        case 4:
            scale = 0.6 + Math.random() * 0.4;
            left = (200 + Math.random() * (screen.width - 500)) + "px";
            break;
        default:
            scale = 0.5;
            left = screen.width + "px";
            break;
    }
    return {
        color1: color1,
        color2: color2,
        color: color,
        textcolor: textcolor,
        scale: scale,
        left: left,
        top: top
    };
}

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}
