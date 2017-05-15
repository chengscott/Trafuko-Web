import React from 'react';
import PropTypes from 'prop-types';
import {Animate} from 'react-move';
import {
    Button
} from 'reactstrap';

import './TrashPoolPage.css';


export default class TrashPoolPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired
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
            Data: []
        };
        this.tick = this.tick.bind(this);
        this.capture = this.capture.bind(this);
        this.s1 = 0;
        this.s2 = 1;
        this.s3 = 2;
        this.s4 = 3;
        this.s5 = 4;
        this.s6 = 5;
        this.index = 5;
    }

    componentDidMount() {
        this.reRender = setInterval(
            () => this.tick(),
            5000
        );
        this.props.firebase.ref('posts').on('value', snapshot => {
            this.setState({Data: snapshot.val()});
        });
    }

    componentWillUnmount() {
        clearInterval(this.reRender);
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
            id: id
        });
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
            <div>
                <Pause style={this.state.style} ifPause={this.state.ifPause} text={this.state.ptext} id={"p_" + this.state.id}/>
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
            style: PropTypes.object,
            id: PropTypes.string,
            ifPause: PropTypes.bool,
            text: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    handleLike() {

    }

    render() {
        if (this.props.ifPause)
        return (
               <div style={{
                float: 'center',
                width: '200px',
                height: "auto",
                padding: "10px",
                borderRadius: "10px",
                position: "absolute",
                left: this.props.style.left,
                top: this.props.style.top,
                background: "black",
                color: "yellow",
                zIndex: 1
               }}>
                 <h2>{this.props.text}</h2>
                 <Button className="hvr-grow" onClick={() => this.handleLike(this.props.id)}>讚</Button>
               </div>
            );
        else return <div></div>;
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
            class: ""
        }
        this.status = this.props.status;
        this.handle = this.handle.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.change = setInterval(
            () => this.tick(),
            5000
        );
    }

    handle() {
        let style = document.getElementById("i_" + this.props.id).style;
        style.color = this.state.style.color;
        style.textcolor = this.state.style.textcolor;
        this.props.pause(style, this.props.text, this.props.id);
        this.setState({class: "disappear", style: style});
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
                    <div
                      style={{
                        float: 'center',
                        width: '200px',
                        height: "auto",
                        padding: "5px",
                        borderRadius: "15px",
                        transform: `scale(${data.scale})`,
                        background: data.color,
                        color: data.textcolor,
                        position: "absolute",
                        left: data.left,
                        top: data.top,
                        cursor: 'pointer'
                      }}
                      id={"i_" + this.props.id}
                      className={"disable " + this.state.class}
                      onClick={() => this.handle()}
                    >
                      <h2>{this.props.text}</h2>
                    </div>
                )}
            </Animate>
        );
    }
}

function change(status) {
    let num = Math.random();
    let color = (num >= 0.75) ? "blue" : (num >= 0.5) ? "white" : (num >= 0.25) ? "yellow" : "black";
    let textcolor = (num >= 0.75) ? "yellow" : (num >= 0.5) ? "black" : (num >= 0.25) ? "black" : "red";
    let scale, left;
    let top = (200 + Math.random() * (screen.height - 400)) + "px";
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
        color: color,
        textcolor: textcolor,
        scale: scale,
        left: left,
        top: top
    }
}
