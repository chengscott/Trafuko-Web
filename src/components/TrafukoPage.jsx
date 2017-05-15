import React from 'react';
import PropTypes from 'prop-types';
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

const runNum = 7;

export default class TrafukoPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        const runtext = (screen.width >= 700) ? true : false;
        this.state = {
            isAgree: false,
            runtext: runtext,
            runtextPage: 0,
            Data: [{id: "0017", text:"積沙成塔，積少化痰", score: 120, order: 0},{id:"0018", text:"每天少喝一杯珍珠奶茶，一個禮拜後，就能買七杯珍珠奶茶", score: 63, order: 0},
{id: "0019", text:"我很喜歡你的聲音 特別是你閉嘴的聲音", score: 94, order: 0},{id:"0020", text:"我這個人，不說垃圾話的!!!", score: 174, order: 0},
{id: "0021", text:"你知道你媽跟你爸同一天結婚嗎?", score: 23, order: 0},{id:"0022", text:"一山還有一山高  蘿蔔還有蘿蔔糕", score: 26, order: 0},
{id: "0023", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0024", text:"每個成功的男人背後，都有一條脊椎", score: 79, order: 0},
{id: "0025", text:"柏穎啊~~~", score: 84, order: 0},{id:"0026", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{id: "0027", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0028", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{id: "0029", text:"每個成功的男人背後，都有一條脊椎", score: 84, order: 0},{id:"0030", text:"積沙成塔，積少化痰", score: 79, order: 0},
{id: "0031", text:"積沙成塔，積少化痰", score: 84, order: 0},{id:"0032", text:"每個成功的男人背後，都有一條脊椎", score: 79, order: 0},
{id: "0033", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0034", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
{id: "0035", text:"每個成功的男人背後，都有一條脊椎", score: 84, order: 0},{id:"0036", text:"積沙成塔，積少化痰", score: 79, order: 0},
]
        };

        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runtextClick = this.runtextClick.bind(this);

        this.props.firebase.on('value', snapshot => {
            const store = snapshot.val();
            console.log(store);
        });
    }

    componentDidMount() {
        this.reRender = setInterval(
            () => this.tick(),
            15000
        );
    }

    componentWillUnmount() {
        clearInterval(this.reRender);
    }

    tick() {
        let nextPage = this.state.runtextPage;
        nextPage = nextPage + 1;
        if(nextPage >= Math.floor(this.state.Data.length / runNum)) nextPage = 0;
        this.setState({runtextPage: nextPage});
    }

    render() {
        const runtext_label = (this.state.runtext === false)? "彈幕" : "取消彈幕";
        const page = this.state.runtextPage;
        const data = this.state.Data.slice(page * runNum, Math.min((page + 1) * runNum, this.state.Data.length - 1));
        const showList = this.state.runtext ? data.map(a => <RunText text={a.text} key={a.id}/>) : <div></div>;
        return (
            <div className = "trafuko">
                <FormGroup>
                    <Label className="ruleTitle" for="ruleText">規章</Label>
                      <Input type="textarea" name="text" className="ruleText" readOnly="true" defaultValue={RuleText}/>
                      <div className="checkbox">
                        <input className="checkbox-input hvr-bounce-in" onClick={this.handleClick} type="checkbox"/>
                        我同意上述規範
                        <input className="checkbox-input hvr-bounce-in" onClick={this.runtextClick} type="checkbox" />
                        {runtext_label}
                    </div>
                </FormGroup>
                <PostForm agreeCheck={this.state.isAgree}/>
                {showList}
            </div>
        );
    }

    runtextClick() {
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

    handleClick() {
        this.setState({
            isAgree: !this.state.isAgree
        });
    }
}
