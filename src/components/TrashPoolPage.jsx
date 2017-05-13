import React from 'react';
import PropTypes from 'prop-types';

import { Animate } from 'react-move';


import './TrashPoolPage.css';

var Data = [{id: "0001", text:"11111", score: 23, order: 0},{id:"0002", text:"22222", score: 107, order: 0},
{id: "0003", text:"33333", score: 23, order: 0},{id:"0004", text:"444444", score: 213, order: 0},
{id: "0005", text:"5555555", score: 79, order: 0},{id:"0006", text:"66666666", score: 49, order: 0},
{id: "0007", text:"77777777", score: 12, order: 0},{id:"0008", text:"8888888", score: 47, order: 0},
{id: "0009", text:"我寫的不是Code，是寂寞", score: 3, order: 0},{id:"0010", text:"台灣競爭力低落，在美國就連小學生都會說流利的英語", score: 186, order: 0},
{id: "0011", text:"在非洲，每60秒就有1分鐘過去", score: 46, order: 0},{id:"0012", text:"我這個人，不說垃圾話的!!!", score: 200, order: 0},
{id: "0013", text:"麻雀雖小，五臟 小次郎", score: 89, order: 0},{id:"0014", text:"每個成功的男人背後，都有一條脊椎", score: 140, order: 0},
{id: "0015", text:"研究顯示，過越多生日的人越長壽", score: 167, order: 0},{id:"0016", text:"我這個人，不說垃圾話的!!!", score: 7, order: 0},
{id: "0017", text:"積沙成塔，積少化痰", score: 120, order: 0},{id:"0018", text:"每天少喝一杯珍珠奶茶，一個禮拜後，就能買七杯珍珠奶茶", score: 63, order: 0},
{id: "0019", text:"我很喜歡你的聲音 特別是你閉嘴的聲音", score: 94, order: 0},{id:"0020", text:"我這個人，不說垃圾話的!!!", score: 174, order: 0},
{id: "0021", text:"你知道你媽跟你爸同一天結婚嗎?", score: 23, order: 0},{id:"0022", text:"一山還有一山高  蘿蔔還有蘿蔔糕", score: 26, order: 0},
{id: "0023", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0024", text:"每個成功的男人背後，都有一條脊椎", score: 79, order: 0},
{id: "0025", text:"柏穎啊~~~", score: 84, order: 0},{id:"0026", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{id: "0027", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0028", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{id: "0029", text:"每個成功的男人背後，都有一條脊椎", score: 84, order: 0},{id:"0030", text:"積沙成塔，積少化痰", score: 79, order: 0},
{id: "0031", text:"積沙成塔，積少化痰", score: 84, order: 0},{id:"0032", text:"每個成功的男人背後，都有一條脊椎", score: 79, order: 0},
{id: "0033", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0034", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{id: "0035", text:"每個成功的男人背後，都有一條脊椎", score: 84, order: 0},{id:"0036", text:"積沙成塔，積少化痰", score: 79, order: 0},
];

const showNum = 3;

export default class TrashPoolPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5
        }
        this.s1 = 0;
        this.s2 = 1;
        this.s3 = 2;
        this.s4 = 3;
        this.s5 = 4;
        this.s6 = 5;
        this.index = 5;
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.reRender = setInterval(
            () => this.tick(),
            5000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.reRender);
    }
    
    tick() {
        //const page_num = Math.ceil(Data.length/showNum);
        this.index = this.index + 1;
        if(this.index >= Math.floor(Data.length / showNum)) this.index = 0;
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

    render() {

        const data1 = Data.slice( this.state.a * showNum, (this.state.a + 1) * showNum);
        const data2 = Data.slice( this.state.b * showNum, (this.state.b + 1) * showNum);
        const data3 = Data.slice( this.state.c * showNum, (this.state.c + 1) * showNum);
        const data4 = Data.slice( this.state.d * showNum, (this.state.d + 1) * showNum);
        const data5 = Data.slice( this.state.e * showNum, (this.state.e + 1) * showNum);
        const data6 = Data.slice( this.state.f * showNum, (this.state.f + 1) * showNum);

        const items1 = data1.map(a => (<Item text={a.text} key={a.id} status={this.s1} />));
        const items2 = data2.map(a => (<Item text={a.text} key={a.id} status={this.s2} />));
        const items3 = data3.map(a => (<Item text={a.text} key={a.id} status={this.s3} />));
        const items4 = data4.map(a => (<Item text={a.text} key={a.id} status={this.s4} />));
        const items5 = data5.map(a => (<Item text={a.text} key={a.id} status={this.s5} />));
        const items6 = data6.map(a => (<Item text={a.text} key={a.id} status={this.s6} />));
        return (
            <div>
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

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: change(this.props.status)
        }
        this.status = this.props.status;
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.change = setInterval(
            () => this.tick(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.change);
    }

    tick() {
        const s = this.status;
        this.setState({
            style: change(this.status)
        });
        this.status = (s + 1) % 6;
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
                            borderRadius: "10px",
                            transform: `scale(${data.scale})`,
                            background: data.color,
                            color: data.textcolor,
                            position: "absolute",
                            left: data.left,
                            top: data.top
                          }}
                          className="disable"
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
        const color = (num >= 0.75) ? "blue" : (num >= 0.5) ? "white" : (num >= 0.25) ? "yellow" : "black";
        const textcolor = (num >= 0.75) ? "yellow" : (num >= 0.5) ? "black" : (num >= 0.25) ? "black" : "red";
        let scale, left;
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
                scale = 1 + Math.random() * 0.4;
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
        const top = (200 + Math.random() * (screen.height - 500)) + "px";
        return {
            color: color,
            textcolor: textcolor,
            scale: scale,
            left: left,
            top: top
        }
}

Item.propTypes = {
        text: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired
};