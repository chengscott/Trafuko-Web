import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Input, Button, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import fecha from 'fecha';
import uuidV4 from 'uuid/v4';

import {
    input,
    inputDanger,
    colorChange,
    lenDanger,
    setPosted,
    changeLen
} from 'states/post-action.js';

import './PostForm.css';

const defaultText = '你今天都在幹話些什麼？';

class PostForm extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        agreeCheck: PropTypes.bool.isRequired,
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        color: PropTypes.string.isRequired,
        len: PropTypes.number.isRequired,
        lenDanger: PropTypes.bool.isRequired,
        posted: PropTypes.bool.isRequired,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleColorMode = this.handleColorMode.bind(this);
    }

    render() {
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';
        return (
            <div>
                <FormGroup className={inputDanger}>
                    <div className="postFormDisplay">
                        {
                            (this.props.inputDanger && !this.props.agreeCheck) &&
                            <Alert color="danger" className="margin">
                                <strong>錯誤!</strong> 你需要同意上述規範
                            </Alert>
                        }
                        {
                            (this.props.lenDanger == true) &&
                            <Alert color="danger" className="margin">
                                <strong>錯誤!</strong> 超過 140 字
                            </Alert>
                        }
                        {
                            (this.props.posted) &&
                            <Alert color="success" className="margin fade-out">
                                <strong>送出成功</strong>
                            </Alert>
                        }
                        <Input
                            style={{color:this.props.color}}
                            className="TextArea"
                            type="textarea"
                            getRef={el => {this.inputEl = el;}}
                            onChange={this.handleInputChange}
                            value={this.props.inputValue}
                            placeholder={defaultText}
                            maxLength="140"
                        />
                        <div className="toolList">
                            <Button className="box hvr-wobble-horizontal" style={{background: 'black'}} onClick={()=>{this.handleColorMode('black');}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'red'}} onClick={()=>{this.handleColorMode('red');}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'green'}} onClick={()=>{this.handleColorMode('green');}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'blue'}} onClick={()=>{this.handleColorMode('blue');}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'yellow'}} onClick={()=>{this.handleColorMode('yellow');}}></Button>
                        </div>
                    </div>
                    <div className="postForm">
                        <Button color="success" onClick={this.handlePost} className="button hvr-buzz-out">我要發文！！</Button>
                    </div>
                </FormGroup>
            </div>
        );
    }

    handleInputChange(e) {
        const text = e.target.value;
        if (text.length >= 140) {
            this.props.dispatch(lenDanger(true));
            this.props.dispatch(changeLen(text.length));
        } else if (this.props.lenDanger) {
            this.props.dispatch(lenDanger(false));
        }
        if (this.props.agreeCheck && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
        this.props.dispatch(input(text));
    }

    handleColorMode(color) {
        this.props.dispatch(colorChange(color));
    }

    handlePost() {
        if (!this.props.agreeCheck || !this.props.inputValue || this.props.lenDanger) {
            this.props.dispatch(inputDanger(true));
            return;
        }
        const now = new Date();
        const postId = fecha.format(now, "YYYY-MM-DD") + '-' + uuidV4();
        this.props.firebase.ref('posts/' + postId).set({
            id: postId,
            text: this.props.inputValue,
            color: this.props.color,
            vote: 0,
            ts: now.toString()
        });

        this.props.dispatch(setPosted(true));
        setTimeout(()=>{
            this.props.dispatch(setPosted(false));
        },1000);

        this.props.dispatch(inputDanger(false));
        this.props.dispatch(input(''));
    }
}

export default connect(state => ({
    ...state.postForm
}))(PostForm);
