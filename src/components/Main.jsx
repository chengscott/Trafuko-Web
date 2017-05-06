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
import TrafukoPage from 'components/TrafukoPage.jsx';
import RankPage from 'components/RankPage.jsx';
import TrashPoolPage from 'components/TrashPoolPage.jsx';

import './Main.css';

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

				    <div id="id_content">
				    	<Route exact path="/" render={() => (
                        	<TrafukoPage />
               			 )}/>
                		<Route exact path="/Rank" render={() => (
                      	  	<RankPage />
               			 )}/>
                		<Route exact path="/TrashPool" render={() => (
                       		 <TrashPoolPage />
               			 )}/>
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