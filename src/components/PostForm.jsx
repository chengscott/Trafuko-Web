import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Input, Button, Alert} from 'reactstrap';
import {connect} from 'react-redux';

import {input, inputDanger, colorChange, createPost} from 'states/post-action.js';

import './PostForm.css';

const defultText = '你今天都在幹話些什麼？';

class PostForm extends React.Component {

    static propTypes = {
        agreeCheck: PropTypes.bool.isRequired,
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        color: PropTypes.string.isRequired,
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
                        <Input style={{color:this.props.color}}className="TextArea" type="textarea" getRef={el => {this.inputEl = el}} onChange={this.handleInputChange} value={this.props.inputValue} placeholder={defultText}/>
                        <div className="toolList">
                            <Button className="box hvr-wobble-horizontal" style={{background: 'black'}} onClick={()=>{this.handleColorMode('black')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'red'}} onClick={()=>{this.handleColorMode('red')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'green'}} onClick={()=>{this.handleColorMode('green')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'blue'}} onClick={()=>{this.handleColorMode('blue')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'yellow'}} onClick={()=>{this.handleColorMode('yellow')}}></Button>
                        </div>
                    </div>
                    <div className="postForm">
                        <Button color="success" onClick={this.handlePost} className="button hvr-buzz-out">我要發文！！</Button>
                        <div className="checkbox">
                            <input className="checkbox-input hvr-grow" type="checkbox"/>
                            同時發文在靠北工程師
                        </div>
                    </div>
                </FormGroup>
            </div>
        );
    }

    handleInputChange(e) {
        const text = e.target.value;
        if(this.props.agreeCheck && this.props.inputDanger){
            this.props.dispatch(inputDanger(false));
        }
        this.props.dispatch(input(text));
    }

    handleCheckbox() {
        console.log("checkbox");
    }

    handleColorMode(color) {
        this.props.dispatch(colorChange(color));
    }

    handlePost() {
        if (this.props.agreeCheck) {
            if (!this.props.inputValue) {
                this.props.dispatch(inputDanger(true))
                return;
            }
            this.props.dispatch(createPost(this.props.color,this.props.inputValue));
        } else {
            this.props.dispatch(inputDanger(true))
            return;
        }
    }
}

export default connect(state => ({
    ...state.postForm
}))(PostForm);
