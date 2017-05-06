import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import {
	Nav,
	Navbar,
	NavItem,
	NavLink,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Breadcrumb, 
	BreadcrumbItem,
	FormGroup,
	Input,
	Label
 } from 'reactstrap';

import MarkdownEditor from 'components/MarkdownEditor.jsx';
import PictureShow from 'components/PictureShow.jsx';
import './Main.css';

const RuleStr = 
"0.當你勾選後，即代表您同意遵守 Facebook 社群使用規則.\n\
1.嚴禁發表任何霸凌內容、或有相關意圖之內容，違反將被刪除\n\
2.靠北勿指名道姓、透漏任何個資或隱私資訊，或在文中直接提到任何公司、機構、學校名稱，違反者一律刪文\n\
3.嚴禁發表任何情色、暴力之相關內容，或有相關意圖之內容，違反將被刪除\n\
4.與本版主題無關、或發文內容明顯為測試意圖、或無關之推薦文、廣告文、職缺文，將被刪除\n\
5.轉載他人原創發文時，一律需經過原作者同意並註明出處\n\
6.因應臉書政策，涉及種族歧視之發文格殺勿論\n\
7.請善用「███」取代敏感字詞" 

export default class Main extends React.Component{


	constructor(props) {
        super(props);

        this.state = {
        	collapsed: false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }
   	toggleNavbar(){
   		this.setState({
   			collapsed: !this.state.collapsed
   		});
   	}
	render(){
		return(
			<Router>
				<div id="id_wrapper">
					<div id="id_header">
						<Navbar color="faded" light toggleable>
				         	<NavbarToggler  right onClick={this.toggleNavbar} />
				          	<NavbarBrand href="/">Trafuko</NavbarBrand>
				          	<Collapse isOpen={this.state.collapsed} navbar>
				            <Nav className="ml-auto" navbar>
				            	<NavItem>
				                	<NavLink tag={Link} to='/Rank'>排名榜</NavLink>
				              	</NavItem>
				              	<NavItem>
				                	<NavLink tag={Link} to='/TrashPool'>幹話池</NavLink>
				              	</NavItem>
								<NavItem>
								    <NavLink tag={Link} to='/Login'>登入</NavLink>
								</NavItem>
				            	</Nav>
				          	</Collapse>
				        </Navbar>
				    </div>


			        <div id="id_footer">
						<Breadcrumb className="nomargin">
						        <BreadcrumbItem>Trafuko</BreadcrumbItem>
						        <BreadcrumbItem><a href="#">About</a></BreadcrumbItem>
						        <BreadcrumbItem active><a href="#">Log</a></BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>
			</Router>
		);
	}

}

/*
<div id="id_content">
				    	<FormGroup>
          					<Label for="ruleText">規章</Label>
          					<Input type="textarea" name="text" className="ruleText" readOnly="true" defaultValue={RuleStr}/>
        				</FormGroup>

        				<MarkdownEditor/>
				    </div>
<NavItem>
			                	<NavLink tag={Link} to='/Register'>註冊</NavLink>
			              	</NavItem>
			              	<NavItem>
			                	<NavLink tag={Link} to='/Login'>登入</NavLink>
			              	</NavItem>

			              	  <Route exact path="/" render={() => (
                        <Today searchText={this.state.searchText} />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast />
                    )}/>*/