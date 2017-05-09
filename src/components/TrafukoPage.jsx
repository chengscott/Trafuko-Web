import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup , Label, Input} from 'reactstrap';

import PostForm from 'components/PostForm.jsx';

import './TrafukoPage.css';

const RuleText = "0.當你勾選後，即代表您同意遵守 Facebook 社群使用規則.\n\
1.嚴禁發表任何霸凌內容、或有相關意圖之內容，違反將被刪除\n\
2.靠北勿指名道姓、透漏任何個資或隱私資訊，或在文中直接提到任何公司、機構、學校名稱，違反者一律刪文\n\
3.嚴禁發表任何情色、暴力之相關內容，或有相關意圖之內容，違反將被刪除\n\
4.與本版主題無關、或發文內容明顯為測試意圖、或無關之推薦文、廣告文、職缺文，將被刪除\n\
5.轉載他人原創發文時，一律需經過原作者同意並註明出處\n\
6.因應臉書政策，涉及種族歧視之發文格殺勿論\n\
7.請善用「███」取代敏感字詞" ;

export default class TrafukoPage extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			isAgree: false
		}

		this.handleClick = this.handleClick.bind(this);
	}
    
	render(){
		return (
			<div className = "trafuko">
				<FormGroup>
					<Label className="ruleTitle" for="ruleText">規章</Label>
          			<Input type="textarea" name="text" className="ruleText" readOnly="true" defaultValue={RuleText}/>
          			<div className="checkbox">
            			<input className="checkbox-input" type="checkbox"/>
            			我同意上述規範
            		</div>
				</FormGroup>
				<PostForm/>
			</div>
		);
	}
	handleClick(e){
		
	}

}