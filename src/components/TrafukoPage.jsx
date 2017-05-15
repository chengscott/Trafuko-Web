import React from 'react';

import {FormGroup , Label, Input} from 'reactstrap';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import $ from 'jquery';

import {setAgree, setRuntextPage, receiveData, setRuntext} from 'states/trafukoPage-action.js';
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

class TrafukoPage extends React.Component{

    static propTypes = {
        firebase: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runtextClick = this.runtextClick.bind(this);
    }

    componentDidMount() {
        const runtext = (screen.width >= 700) ? true : false;
        this.props.dispatch(setRuntext(runtext));
        this.reRender = setInterval(
            () => this.tick(),
            15000
        );
        this.props.firebase.ref('posts').on('value', snapshot => {

            const val = snapshot.val();
            const array = $.map(val, (value)=> {
                return [value];
            });
            this.props.dispatch(receiveData(array));
        });
    }

    componentWillUnmount() {
        clearInterval(this.reRender);
    }

    tick() {
        let nextPage = this.props.runtextPage;
        nextPage = nextPage + 1;

        if(nextPage >= Math.floor(this.props.Data.length / runNum)) nextPage = 0;

        this.props.dispatch(setRuntextPage(nextPage));
    }


    render() {
        const runtext_label = (this.props.runtext === false)? "彈幕" : "取消彈幕";
        const page = this.props.runtextPage;
        const data = this.props.Data.slice(page * runNum, Math.min((page + 1) * runNum, this.props.Data.length - 1));
        const showList = this.props.runtext ? data.map(a => <RunText text={a.text} key={a.id}/>) : <div></div>;
        
        return (
            <div className = "trafuko">
                <FormGroup>
                    <Label className="ruleTitle" for="ruleText">規章</Label>
                      <Input type="textarea" name="text" className="ruleText" readOnly="true" defaultValue={RuleText}/>
                      <div className="checkbox">
                        <input className="checkbox-input hvr-bounce-in" onClick={this.handleClick} type="checkbox" defaultValue={false} />
                        我同意上述規範
                        <input className="checkbox-input hvr-bounce-in" onClick={this.runtextClick} type="checkbox" defaultChecked={!this.props.runtext}/>
                        {runtext_label}
                    </div>
                </FormGroup>
                <PostForm agreeCheck={this.props.isAgree} firebase={this.props.firebase}/>
                {showList}
            </div>
        );
    }


    runtextClick(e) {
        const flag = e.target.checked;
        
        this.props.dispatch(setRuntext(flag));
        if (this.props.runtext) {
            this.reRender = setInterval(
                () => this.tick(),
                10000
            );
        } else {
            clearInterval(this.reRender);
        }
    }

    handleClick(e){
        const flag = e.target.checked; 
        this.props.dispatch(setAgree(flag));
    }
}

TrafukoPage.propTypes = {
    isAgree: PropTypes.bool.isRequired,
    runtext: PropTypes.bool.isRequired,
    runtextPage: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    Data: PropTypes.array.isRequired
}
export default connect(state => ({
    ...state.trafuko
}))(TrafukoPage);