import React from 'react';
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

import Background from 'components/Background.jsx';
import TrafukoPage from 'components/TrafukoPage.jsx';
import RankPage from 'components/RankPage.jsx';
import TrashPoolPage from 'components/TrashPoolPage.jsx';

import './Main.css';

export default class Main extends React.Component {

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

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });

    }

    toggleModal_A() {
        this.setState({
            modal_about: !this.state.modal_about
        });
    }

    toggleModal_L() {
        this.setState({
            modal_logs: !this.state.modal_logs
        });
    }

    render() {
        return(
            <Router>
                <div id="id_wrapper" >
                    <div id="id_header">
                        <Navbar color="faded" light toggleable>
                            <NavbarToggler  right onClick={this.toggleNavbar} />
                            <NavbarBrand href="/">Trafuko | 垃圾話</NavbarBrand>
                            <Collapse isOpen={this.state.collapsed} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>講幹話</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/TrashPool'>幹話池</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/Rank'>排行榜</NavLink>
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
                            <BreadcrumbItem>Trafuko | 垃圾話</BreadcrumbItem>
                            <BreadcrumbItem><a href="#" onClick={this.toggleModal_A}>關於我們</a></BreadcrumbItem>
                            <BreadcrumbItem active><a href="#" onClick={this.toggleModal_L}>Log</a></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Modal isOpen={this.state.modal_about} toggle={this.toggleModal_A} >
                        <ModalHeader toggle={this.toggleModal_A}>關於我們</ModalHeader>
                        <ModalBody>
                                Trafuko 誕生於 2017-3-17<br/>
                                總部設於芬蘭的某個小鎮中<br/>
                                相信幹話能帶給世界美好與歡笑
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleModal_A}>確定</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modal_logs} toggle={this.toggleModal_L} >
                        <ModalHeader toggle={this.toggleModal_L}>歷史紀錄</ModalHeader>
                        <ModalBody>
                            2017-05-07 : &nbsp;&nbsp;完成基本功能<br/>
                            2017-04-16 : &nbsp;&nbsp;問卷調查超過 50 人<br/>
                            2017-03-16 : &nbsp;&nbsp;Landing Page 上線
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleModal_L}>確定</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Router>
        );
    }
}
