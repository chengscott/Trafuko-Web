import React from "react";
import {
	Container,
	Col,
	Raw,
	Button,
	Input,
	Label
}from "reactstrap";

import ReactMarkdown from 'react-markdown';
import './MarkdownEditor.css';
export default class MarkdownEditor extends React.Component{

	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.rawMarkup = this.rawMarkup.bind(this);
		this.state = {
			value: 'Type some *markdown* here!'
		}
	}
	render(){
		return (
			<div className = "MarkdownEditor">

				<Input className="textArea" onChange={this.handleChange} type="textarea" name="text"  defaultValue={this.state.value} />
				
				<ReactMarkdown className ="preview" source={this.rawMarkup()}/>
				<Container id="Selector">
					<Input className = "select" type="select" name="select" id="exampleSelect">
           				<option>靠北清大</option>
           				<option>靠北交大</option>
           				<option>靠北工程師</option>
           				<option>Trafuko幹話池</option>
          			</Input>
          			<div className ="Send">
          				<Button color="success">我要講幹話!</Button>
          			</div>
				</Container>
			</div>
		);
	}

	handleChange(e){
		this.setState({
			value:e.target.value
		});
	}

	rawMarkup(){
		const md = new Remarkable();
		return md.render(this.state.value);
	}

}