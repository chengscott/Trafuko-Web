import React from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter  as Router,
    //HashRouter 
    Route,
    Link
} from 'react-router-dom';

import {connect} from 'react-redux';
import {toggleNav, toggleModal_a, toggleModal_l} from 'states/main-action.js';

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
import * as firebase from "firebase";

import Background from 'components/Background.jsx';
import TrafukoPage from 'components/TrafukoPage.jsx';
import RankPage from 'components/RankPage.jsx';
import TrashPoolPage from 'components/TrashPoolPage.jsx';

import './Main.css';


const config = {
    apiKey: "AIzaSyDUfoL0DdG_VDo5ijtZRqvVACwXQMARZrc",
    authDomain: "test-efd03.firebaseapp.com",
    databaseURL: "https://test-efd03.firebaseio.com",
    storageBucket: "test-efd03.appspot.com",
};
const fb = firebase.initializeApp(config).database().ref();

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleModal_A = this.toggleModal_A.bind(this);
        this.toggleModal_L = this.toggleModal_L.bind(this);
    }

    toggleNavbar() {
        this.props.dispatch(toggleNav());
    }

    toggleModal_A() {
        console.log('hello???');
        this.props.dispatch(toggleModal_a());
    }

    toggleModal_L() {
        console.log('hello');
        this.props.dispatch(toggleModal_l());
    }

    render() {

        return(
            <Router>
                <div id="id_wrapper" >
                    <Background />
                    <div id="id_header">
                        <Navbar color="faded" light toggleable>
                            <NavbarToggler  right onClick={this.toggleNavbar} />
                            <NavbarBrand href="/">Trafuko | 垃圾話</NavbarBrand>
                            <Collapse isOpen={this.props.collapsed} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/#'>講幹話</NavLink>
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
                                <TrafukoPage firebase={fb} />
                            )}/>
                        <Route exact path="/Rank" render={() => (
                                <RankPage firebase={fb} />
                            )}/>
                        <Route exact path="/TrashPool" render={() => (
                                <TrashPoolPage firebase={fb} />
                            )}/>
                    </div>

                    <div id="id_footer">
                        <Breadcrumb className="nomargin">
                            <BreadcrumbItem>Trafuko | 垃圾話</BreadcrumbItem>
                            <BreadcrumbItem><a href="#" onClick={this.toggleModal_A}>關於我們</a></BreadcrumbItem>
                            <BreadcrumbItem active><a href="#" onClick={this.toggleModal_L}>Log</a></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Modal isOpen={this.props.modal_about} toggle={this.toggleModal_A} >
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
                    <Modal isOpen={this.props.modal_logs} toggle={this.toggleModal_L} >
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

Main.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    modal_about: PropTypes.bool.isRequired,
    modal_logs:PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
    ...state.main
}))(Main);