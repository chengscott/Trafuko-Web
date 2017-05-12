import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup , Label, Input,Button} from 'reactstrap';

import './PostForm.css';


export default class PostForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            inputValue: '',
            inputDanger: false,
            text: '你今天都在幹話些什麼？',
            color: 'black',
            fontstyle: ''
        };

        this.inputEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleColorMode = this.handleColorMode.bind(this);
    }

    render(){

        const inputDanger = (this.state.inputDanger == true)?'has-danger':'';
        return (
            <div>
                <FormGroup className={inputDanger}>
                    <div className="postFormDisplay">
                        <Input style={{color:this.state.color}}className="TextArea" type="textarea" getRef={el => {this.inputEl = el}} onChange={this.handleInputChange}  placeholder={this.state.text}/>
                        <div className="toolList">
                            <Button className="box" style={{background: 'black'}} onClick={()=>{this.handleColorMode('black')}}></Button>
                            <Button className="box" style={{background: 'red'}} onClick={()=>{this.handleColorMode('red')}}></Button>
                            <Button className="box" style={{background: 'green'}} onClick={()=>{this.handleColorMode('green')}}></Button>
                            <Button className="box" style={{background: 'blue'}} onClick={()=>{this.handleColorMode('blue')}}></Button>
                            <Button className="box" style={{background: 'yellow'}} onClick={()=>{this.handleColorMode('yellow')}}></Button>
                        </div>
                    </div>

                    <div className="postForm">
                        <Button color="success" onClick={this.handlePost} className="button">我要發文！！</Button>
                        <div className="checkbox">
                            <input className="checkbox-input" onClick={this.handleCheckbox} type="checkbox"/>
                            &nbsp;同時發文在靠北工程師
                        </div>
                    </div>
                </FormGroup>
            </div>
        );
    }

    handleInputChange(e) {
        const text = e.target.value;
        this.setState({
            inputValue: text
        });
        if (text) console.log("nothing");
        else console.log("input");
    }

    handleCheckbox(e) {
        console.log("checkbox");
    }

    handleColorMode(color) {
        console.log("done");
        this.setState({
            color:color
        });
    }
    handlePost(e) {
        if (this.props.agreeCheck) {
            if (!this.state.inputValue) {
                this.setState({
                    inputDanger: true
                });
                return;
            }
            this.setState({
                inputDanger: false
            });
            console.log("post");
        }
        else {
            this.setState({
                inputDanger: true
            });
            console.log("No Agree");
            return;
        }
    }
}
