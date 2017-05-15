import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Label, Input} from 'reactstrap';

import PostForm from 'components/PostForm.jsx';
import RunText from 'components/runtext.jsx';

import './TrafukoPage.css';

const RuleText = `0. 當你勾選後，即代表您同意遵守 Facebook 社群使用規則.
1. 嚴禁發表任何霸凌內容、或有相關意圖之內容，違反將被刪除
2. 靠北勿指名道姓、透漏任何個資或隱私資訊，或在文中直接提到任何公司、機構、學校名稱，違反者一律刪文
3. 嚴禁發表任何情色、暴力之相關內容，或有相關意圖之內容，違反將被刪除
4. 與本版主題無關、或發文內容明顯為測試意圖、或無關之推薦文、廣告文、職缺文，將被刪除
5. 轉載他人原創發文時，一律需經過原作者同意並註明出處
6. 因應臉書政策，涉及種族歧視之發文格殺勿論
7. 請善用「███」取代敏感字詞`;

const runNum = 7;

export default class TrafukoPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isAgree: false,
            runtext: true,
            runtextPage: 0,
            Data: []
        };
        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runtextClick = this.runtextClick.bind(this);
    }

    componentDidMount() {
        this.reRender = setInterval(
            () => this.tick(),
            15000
        );
        this.props.firebase.on('value', snapshot => {
            this.setState({Data: snapshot.val().posts});
        });
    }

    componentWillUnmount() {
        clearInterval(this.reRender);
    }

    tick() {
        let nextPage = this.state.runtextPage;
        nextPage = nextPage + 1;
        if (nextPage >= Math.floor(this.state.Data.length / runNum)) nextPage = 0;
        this.setState({runtextPage: nextPage});
    }

    render() {
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
                        <input className="checkbox-input hvr-bounce-in" onClick={this.runtextClick} type="checkbox"/>
                        取消彈幕
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
