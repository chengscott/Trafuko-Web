import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Input} from 'reactstrap';
import {connect} from 'react-redux';
import Toggle from 'react-toggle';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import PostForm from 'components/PostForm.jsx';
import RunText from 'components/RunText.jsx';

import {
    setAgree,
    setRuntextPage,
    receiveData,
    setRuntext
} from 'states/trafukoPage-action.js';

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

class TrafukoPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        isAgree: PropTypes.bool.isRequired,
        runtext: PropTypes.bool.isRequired,
        runtextPage: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired,
        wrap: PropTypes.func.isRequired,
        Data: PropTypes.array.isRequired,
        collapse: PropTypes.bool,
        inputDanger: PropTypes.bool,
        agreeCheck: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.runtextClick = this.runtextClick.bind(this);
    }

    componentDidMount() {
        this.props.wrap(true); // set overflow:hidden
        const runtext = screen.width >= 700;
        this.props.dispatch(setRuntext(runtext));
        this.reRender = setInterval(() => this.tick(), 15000);
        this.props.firebase.ref('posts').on('value', snapshot => {
            this.props.dispatch(receiveData(objToarr(snapshot.val())));
        });
    }

    componentWillUnmount() {
        this.props.firebase.ref('posts').off();
        clearInterval(this.reRender);
    }

    tick() {
        let nextPage = this.props.runtextPage + 1;
        if (nextPage >= Math.floor(this.props.Data.length / runNum))
            nextPage = 0;
        this.props.dispatch(setRuntextPage(nextPage));
    }

    render() {
        const page = this.props.runtextPage;
        const data = this.props.Data.slice(page * runNum, Math.min((page + 1) * runNum, this.props.Data.length - 1));
        const showList = this.props.runtext ? data.map(a => <RunText text={a.text} color={(a.color === 0)?'black':a.color} key={a.id} id={a.id}/>) : <div></div>;
        return (
            <div className="trafuko">
                <FormGroup>
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemTitle>
                                <div className="u-position-relative">
                                    規章
                                    <div className="accordion__arrow" role="presentation" />
                                </div>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <Input type="textarea" className="ruleText" name="text" readOnly="true" defaultValue={RuleText}/>
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>
                    <div className="togglebox">
                        <label className="togglebtn">
                            <Toggle
                              defaultChecked={false}
                              className="red"
                              onChange={this.handleClick} />
                              <div className={(this.props.inputDanger && !this.props.agreeCheck) ? "label error" : "label"}>&nbsp;我同意上述規範</div>
                        </label>
                        <label className="togglebtn runtext">
                            <Toggle
                              defaultChecked={(screen.width >= 700) ? true : false}
                              icons={false}
                              onChange={this.runtextClick} />
                            <div className="label">&nbsp;顯示彈幕</div>
                        </label>
                    </div>
                </FormGroup>
                <PostForm agreeCheck={this.props.isAgree} firebase={this.props.firebase}/>
                {showList}
            </div>
        );
    }

    runtextClick(e) {
        const isRunning = e.target.checked;
        this.props.dispatch(setRuntext(isRunning));
        if (this.props.runtext) {
            this.reRender = setInterval(
                () => this.tick(),
                10000
            );
        } else {
            clearInterval(this.reRender);
        }
    }

    handleClick(e) {
        const isAgree = e.target.checked;
        this.props.dispatch(setAgree(isAgree));
    }
}

export default connect(state => ({
    ...state.trafuko,
    inputDanger: state.postForm.inputDanger,
    agreeCheck: state.postForm.agreeCheck
}))(TrafukoPage);

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}
