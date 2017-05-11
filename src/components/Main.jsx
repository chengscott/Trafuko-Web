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
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
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
        	collapsed: false,
        	modal_about: false,
        	modal_logs:false

        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleModal_A = this.toggleModal_A.bind(this);
        this.toggleModal_L = this.toggleModal_L.bind(this);
    }
   	toggleNavbar(){
   		this.setState({
   			collapsed: !this.state.collapsed
   		});

   	}
   	toggleModal_A(){
   		this.setState({
   			modal_about: !this.state.modal_about
   		});
   	}
   	toggleModal_L(){
   		this.setState({
   			modal_logs: !this.state.modal_logs
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
						        <BreadcrumbItem><a href="#" onClick={this.toggleModal_A}>About</a></BreadcrumbItem>
						        <BreadcrumbItem active><a href="#" onClick={this.toggleModal_L}>Log</a></BreadcrumbItem>
						</Breadcrumb>
					</div>
					<Modal  isOpen={this.state.modal_about} toggle={this.toggleModal_A} >
				        <ModalHeader toggle={this.toggleModal_A}>關於我們</ModalHeader>
					    <ModalBody>
					            Trafuko誕生於 2017-3-17 <br/>
					            總部設於虛擬世界芬蘭的某個小鎮中<br/>
					            相信幹話能帶給世界美好與歡笑
					    </ModalBody>
					    <ModalFooter>
					        <Button color="primary" onClick={this.toggleModal_A}>Cancel</Button>
				        </ModalFooter>
			        </Modal>
			        <Modal  isOpen={this.state.modal_logs} toggle={this.toggleModal_L} >
				        <ModalHeader toggle={this.toggleModal_L}>歷史紀錄</ModalHeader>
					    <ModalBody>
					            2017-3-16 : &nbsp;&nbsp;Finish Landing Page<br/>
					            2017-4-16 : &nbsp;&nbsp;Survey over 50 people <br/>
					            2017-5-07 : &nbsp;&nbsp;Basic struct build
					    </ModalBody>
					    <ModalFooter>
					        <Button color="primary" onClick={this.toggleModal_L}>Cancel</Button>
				        </ModalFooter>
			        </Modal>

				</div>

			</Router>
		);
	}
}
