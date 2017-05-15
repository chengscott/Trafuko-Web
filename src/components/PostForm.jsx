import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup , Input, Button, Alert} from 'reactstrap';
import {createPost as createPostFormApi} from 'api/post';

import './PostForm.css';

export default class PostForm extends React.Component {

    static propTypes = {
        agreeCheck: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            inputDanger: false,
            agreeToCumba: false,
            text: '你今天都在幹話些什麼？',
            color: 'black'
        };

        this.inputEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleColorMode = this.handleColorMode.bind(this);
    }

    render() {
        const inputDanger = this.state.inputDanger ? 'has-danger' : '';
        return (
            <div>
                <FormGroup className={inputDanger}>
                    <div className="postFormDisplay">
                        {
                            (this.state.inputDanger && !this.props.agreeCheck) &&
                            <Alert color="danger" className="margin">
                                <strong>錯誤!</strong> 你需要同意上述規範
                            </Alert>
                        }
                        <Input style={{color: this.state.color}} className="TextArea" type="textarea" getRef={el => {this.inputEl = el}} onChange={this.handleInputChange} value={this.state.inputValue} placeholder={this.state.text}/>
                        <div className="toolList">
                            <Button className="box hvr-wobble-horizontal" style={{background: 'black'}} onClick={()=>{this.handleColorMode('black')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'red'}} onClick={()=>{this.handleColorMode('red')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'green'}} onClick={()=>{this.handleColorMode('green')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'blue'}} onClick={()=>{this.handleColorMode('blue')}}></Button>
                            <Button className="box hvr-wobble-horizontal" style={{background: 'yellow'}} onClick={()=>{this.handleColorMode('yellow')}}></Button>
                        </div>
                    </div>

                    <div className="postForm">
                        <Button color="success" onClick={this.handlePost} className="button hvr-buzz">我要發文！！</Button>
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
        if (this.props.agreeCheck && this.state.inputDanger) {
            this.setState({
                inputDanger: !this.state.inputDanger
            });
        }
        this.setState({
            inputValue: text
        });
    }

    handleColorMode(color) {
        this.setState({
            color:color
        });
    }

    handlePost() {
        if (this.props.agreeCheck) {
            if (!this.state.inputValue) {
                this.setState({
                    inputDanger: true
                });
                return;
            }
            createPostFormApi(this.state.color, this.state.inputValue).then(value => {
                console.log(this.state.inputValue);
                this.setState({
                    inputDanger: false,
                    inputValue:''
                });
                if (value) {
                    alert("I got it");
                }
            });
            //console.log("post");
        } else {
            this.setState({
                inputDanger: true
            });
            //console.log("No Agree");
            return;
        }
    }
}
