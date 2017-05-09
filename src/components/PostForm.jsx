import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup , Label, Input,Button} from 'reactstrap';

import './PostForm.css';


export default class PostForm extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			inputValue: '',
			text: 'type some here',
			color: 'black',
			fontstyle: ''
		};

		this.inputEl = null;

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handlePost = this.handlePost.bind(this);

	}

	render(){
		return (
			<div>
				<FormGroup>
					<Input type="textarea" getRef={el => {this.inputEl = el}} onChange={this.handleInputChange} className="postFormDisplay" defaultValue={this.state.text}/>
					<div className = "postForm">
						<Button color="success" onClick={this.handlePost} className="button">我要講幹話!!!</Button>
						<div className="checkbox">
		        			<input className="checkbox-input" onClick={this.handleCheckbox} type="checkbox"/>
		        			發文在靠北工程師fb
		        		</div>
		        	</div>
	        	</FormGroup>
			</div>
		);
	}

	handleInputChange(e){
		console.log("input");
	}

	handleCheckbox(e){
		console.log("checkbox");		
	}

	handlePost(e){
		console.log("post");		
	}
}