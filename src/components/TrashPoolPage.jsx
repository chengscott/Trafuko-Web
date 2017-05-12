import React from 'react';
import ReactDOM from 'react-dom';

import { Animate } from 'react-move';


import './TrashPoolPage.css';

var Data = [{title:"", id: "0001", content:"我這個人，不說垃圾話的!!!", score: 23, order: 0},{title:"", id:"0002", content:"我這個人，不說垃圾話的!!!", score: 107, order: 0},
{title:"", id: "0003", content:"華碩電池 一個小時", score: 23, order: 0},{title:"", id:"0004", content:"玩遊戲輸了，一定是隊友的問題，要是他們夠強，我根本扯不了後腿", score: 213, order: 0},
{title:"", id: "0005", content:"下過雨的天空，有下過雨的感覺", score: 79, order: 0},{title:"", id:"0006", content:"台灣人在睡覺時，大多數的美國人都在工作", score: 49, order: 0},
{title:"", id: "0007", content:"肥宅不要再對號入座了，椅子坐不下!", score: 12, order: 0},{title:"", id:"0008", content:"我這個人，不說垃圾話的!!!", score: 47, order: 0},
{title:"", id: "0009", content:"我寫的不是Code，是寂寞", score: 3, order: 0},{title:"", id:"0010", content:"台灣競爭力低落，在美國就連小學生都會說流利的英語", score: 186, order: 0},
{title:"", id: "0011", content:"在非洲，每60秒就有1分鐘過去", score: 46, order: 0},{title:"", id:"0012", content:"我這個人，不說垃圾話的!!!", score: 200, order: 0},
{title:"", id: "0013", content:"麻雀雖小，五臟 小次郎", score: 89, order: 0},{title:"", id:"0014", content:"每個成功的男人背後，都有一條脊椎", score: 140, order: 0},
{title:"", id: "0015", content:"研究顯示，過越多生日的人越長壽", score: 167, order: 0},{title:"", id:"0016", content:"我這個人，不說垃圾話的!!!", score: 7, order: 0},
{title:"", id: "0017", content:"積沙成塔，積少化痰", score: 120, order: 0},{title:"", id:"0018", content:"每天少喝一杯珍珠奶茶，一個禮拜後，就能買七杯珍珠奶茶", score: 63, order: 0},
{title:"", id: "0019", content:"我很喜歡你的聲音 特別是你閉嘴的聲音", score: 94, order: 0},{title:"", id:"0020", content:"我這個人，不說垃圾話的!!!", score: 174, order: 0},
{title:"", id: "0021", content:"你知道你媽跟你爸同一天結婚嗎?", score: 23, order: 0},{title:"", id:"0022", content:"一山還有一山高  蘿蔔還有蘿蔔糕", score: 26, order: 0},
{title:"", id: "0023", content:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{title:"", id:"0024", content:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
];

export default class TrashPoolPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        //let data = [{title:"", id: "0001", content:"我這個人，不說垃圾話的!!!", score: 23, order: 0}, {title:"", id:"0002", content:"柏穎啊", score: 107, order: 0}, {title:"", id: "0003", content:"華碩電池 一個小時", score: 23, order: 0}];
        const items = Data.map(a => (<Item text={a.content} key={a.id}/>));
        return (
            <div>
                {items}
            </div>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: makeItem()
        }
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
        this.setState({
            item: makeItem()
        });
    }

    render() {
        return (
                <Animate
                      // Set some default data
                      default={{
                        scale: 0.3,
                        color: 'white'
                      }}
                      // Update your data to whatever you want
                      data={
                        this.state.item
                      }
                      duration={5000}
                      easing='easeQuadInOut' // anything from https://github.com/d3/d3-ease
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

function makeItem() {
    let num = Math.random();
    const color = (num >= 0.75) ? "blue" : (num >= 0.5) ? "white" : (num >= 0.25) ? "yellow" : "black";
    const textcolor = (num >= 0.75) ? "yellow" : (num >= 0.5) ? "black" : (num >= 0.25) ? "black" : "red";
    const left = Math.random() * (screen.width - 350) + "px";
    const top = (200 + Math.random() * (screen.height - 500)) + "px";
    //console.log(left);
    //console.log(top);
    return {
        color: color,
        textcolor: textcolor,
        scale: 0.3 + Math.random() * 0.7,
        left: left,
        top: top
    }
}
