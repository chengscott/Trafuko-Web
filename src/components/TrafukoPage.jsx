import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup , Label, Input} from 'reactstrap';

import PostForm from 'components/PostForm.jsx';
import RunText from 'components/runtext.jsx';

import './TrafukoPage.css';

const RuleText = "0.當你勾選後，即代表您同意遵守 Facebook 社群使用規則.\n\
1.嚴禁發表任何霸凌內容、或有相關意圖之內容，違反將被刪除\n\
2.靠北勿指名道姓、透漏任何個資或隱私資訊，或在文中直接提到任何公司、機構、學校名稱，違反者一律刪文\n\
3.嚴禁發表任何情色、暴力之相關內容，或有相關意圖之內容，違反將被刪除\n\
4.與本版主題無關、或發文內容明顯為測試意圖、或無關之推薦文、廣告文、職缺文，將被刪除\n\
5.轉載他人原創發文時，一律需經過原作者同意並註明出處\n\
6.因應臉書政策，涉及種族歧視之發文格殺勿論\n\
7.請善用「███」取代敏感字詞" ;

var Data = [{title:"", id: "0017", content:"積沙成塔，積少化痰", score: 120, order: 0},{title:"", id:"0018", content:"每天少喝一杯珍珠奶茶，一個禮拜後，就能買七杯珍珠奶茶", score: 63, order: 0},
{title:"", id: "0019", content:"我很喜歡你的聲音 特別是你閉嘴的聲音", score: 94, order: 0},{title:"", id:"0020", content:"我這個人，不說垃圾話的!!!", score: 174, order: 0},
{title:"", id: "0021", content:"你知道你媽跟你爸同一天結婚嗎?", score: 23, order: 0},{title:"", id:"0022", content:"一山還有一山高  蘿蔔還有蘿蔔糕", score: 26, order: 0},
{title:"", id: "0023", content:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{title:"", id:"0024", content:"每個成功的男人背後，都有一條脊椎", score: 79, order: 0},
{title:"", id: "0025", content:"柏穎啊~~~", score: 84, order: 0},{title:"", id:"0026", content:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{title:"", id: "0027", content:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{title:"", id:"0028", content:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{title:"", id: "0029", content:"每個成功的男人背後，都有一條脊椎", score: 84, order: 0},{title:"", id:"0030", content:"積沙成塔，積少化痰", score: 79, order: 0},
{title:"", id: "0031", content:"積沙成塔，積少化痰", score: 84, order: 0},{title:"", id:"0032", content:"每個成功的男人背後，都有一條脊椎", score: 79, order: 0},
{title:"", id: "0033", content:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{title:"", id:"0034", content:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{title:"", id: "0035", content:"每個成功的男人背後，都有一條脊椎", score: 84, order: 0},{title:"", id:"0036", content:"積沙成塔，積少化痰", score: 79, order: 0},
];

const runNum = 7;

export default class TrafukoPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isAgree: false,
            runtext: true,
            runtextPage: 0
        }

        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runtextClick = this.runtextClick.bind(this);
    }

    componentDidMount() {
        this.reRender = setInterval(
            () => this.tick(),
            8000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.reRender);
    }

    tick() {
        let nextPage = this.state.runtextPage;
        nextPage = nextPage + 1;
        if(nextPage >= Math.floor(Data.length / runNum)) nextPage = 0;
        this.setState({runtextPage: nextPage});
        this.forceUpdate();
    }

    render(){
        const page = this.state.runtextPage;
        const data = Data.slice(page * runNum, Math.min((page + 1) * runNum, Data.length - 1));
        const showList = (this.state.runtext) ? data.map(a => <RunText text={a.content} key={a.ip} />) : <div></div>;
        return (
            <div className = "trafuko">
                <FormGroup>
                    <Label className="ruleTitle" for="ruleText">規章</Label>
                      <Input type="textarea" name="text" className="ruleText" readOnly="true" defaultValue={RuleText}/>
                      <div className="checkbox">
                        <input className="checkbox-input" onClick={this.handleClick} type="checkbox"/>
                        我同意上述規範
                        <input className="checkbox-input" onClick={this.runtextClick} type="checkbox"/>
                        取消彈幕
                    </div>
                </FormGroup>
                <PostForm agreeCheck={this.state.isAgree}/>
                {showList}
            </div>
        );
    }

    runtextClick(e) {
        this.setState({
            runtext: !this.state.runtext
        });
        if (this.state.runtext) {
            this.reRender = setInterval(
                () => this.tick(),
                10000
            );
        } else {
            clearInterval(this.reRender);
        }
    }

    handleClick(e){
        this.setState({
            isAgree: !this.state.isAgree
        });
    }
}
