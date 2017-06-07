import React from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {connect} from 'react-redux';
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
    /*Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,*/
} from 'reactstrap';
import * as firebase from "firebase";

import Background from 'components/Background.jsx';
import TrafukoPage from 'components/TrafukoPage.jsx';
import RankPage from 'components/RankPage.jsx';
import TrashPoolPage from 'components/TrashPoolPage.jsx';
import FavorPage from 'components/FavorPage.jsx';
import FB from 'utilities/FacebookSDK.jsx';

import {
    toggleNav,
    toggleModal_a,
    toggleModal_l,
    toggleModal_Info,
    setwrap,
    setLogTxt,
    setUserid
} from 'states/main-action.js';

import './Main.css';

const config = {
    apiKey: "AIzaSyDUfoL0DdG_VDo5ijtZRqvVACwXQMARZrc",
    authDomain: "test-efd03.firebaseapp.com",
    databaseURL: "https://test-efd03.firebaseio.com",
    storageBucket: "test-efd03.appspot.com",
};
const fb = firebase.initializeApp(config).database();
const fbsdk = new FB();

class Main extends React.Component {

    static propTypes = {
        collapsed: PropTypes.bool.isRequired,
        modal_about: PropTypes.bool.isRequired,
        modal_logs:PropTypes.bool.isRequired,
        modal_info: PropTypes.bool.isRequired,
        wrapenable: PropTypes.bool.isRequired,
        logtxt: PropTypes.string.isRequired,
        userid: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.toggleInfo = this.toggleInfo.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleModal_A = this.toggleModal_A.bind(this);
        this.toggleModal_L = this.toggleModal_L.bind(this);
        this.setwrapEnable = this.setwrapEnable.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        fbsdk.init();
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.props.dispatch(setUserid(firebaseUser.uid));
                this.props.dispatch(setLogTxt("登出"));
            }
        });
    }

    toggleInfo() {
        this.props.dispatch(toggleModal_Info());
    }

    toggleNavbar() {
        this.props.dispatch(toggleNav());
    }

    toggleModal_A(e) {
        if(e !== undefined) e.preventDefault();
        this.props.dispatch(toggleModal_a());
    }

    toggleModal_L(e) {
        if(e !== undefined) e.preventDefault();
        this.props.dispatch(toggleModal_l());
    }

    setwrapEnable(flag) {
        this.props.dispatch(setwrap(flag));
    }

    signIn() {
        if (this.props.logtxt == "登入") {
            fbsdk.login().then(info => {
                this.props.dispatch(setUserid(info.uid));
                this.props.dispatch(setLogTxt("登出"));
                setTimeout(()=>{
                    this.props.dispatch(toggleModal_Info());
                },500);
            });
        }
    }

    signOut() {
        if (this.props.logtxt == "登出") {
            fbsdk.logout().then(() => {
                this.props.dispatch(setUserid(""));
                this.props.dispatch(setLogTxt("登入"));
            });
        }
    }

    render() {
        const wrapEnable = (this.props.wrapenable == 1) ? 'hidden' : 'hidden-x';
        return (
            <Router>
                <div id="id_wrapper" className={wrapEnable}>
                    <Background />
                    <div id="id_header">
                        <Navbar className='z-index-add' color="faded" light toggleable>
                            <NavbarToggler right onClick={this.toggleNavbar} />
                            <NavbarBrand href="/">Trafuko | 垃圾話</NavbarBrand>
                            <Collapse isOpen={this.props.collapsed} navbar>
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
                                        {/*
                                            old way need  state dropdownOpen
                                            this.props.logtxt == "登出"?(
                                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                                    <NavLink style={{cursor:"pointer"}} onClick={() => this.toggle()}><i className="fa fa-user" aria-hidden="true">&nbsp;</i>Welcome&nbsp;<i className="fa fa-chevron-down" aria-hidden="true"></i></NavLink>
                                                    <DropdownMenu>
                                                        <DropdownItem>收藏列表&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-star" aria-hidden="true"></i></DropdownItem>
                                                        <DropdownItem divider />
                                                        <DropdownItem onClick={() => this.signOut()}>登出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-sign-out" aria-hidden="true"></i></DropdownItem>
                                                    </DropdownMenu>
                                              </Dropdown>
                                            ):(
                                                <NavLink style={{cursor:"pointer"}} onClick={() => this.signIn()}><i className="fa fa-user-o" aria-hidden="true"></i></NavLink>
                                            )*/
                                        }
                                        {this.props.logtxt == "登出"?(
                                                <NavLink tag={Link} to='/Favor'>收藏列表&nbsp;<i className="fa fa-circle" aria-hidden="true"></i></NavLink>
                                            ):(
                                                <NavLink style={{cursor:"pointer"}} onClick={() => {this.toggleInfo();this.signIn();}} >收藏列表&nbsp;<i className="fa fa-circle-o" aria-hidden="true"></i></NavLink>
                                            )
                                        }
                                    </NavItem>
                                    {this.props.logtxt == "登出" &&
                                        <NavItem>
                                            <NavLink tag={Link} to='/' onClick={() => this.signOut()} >登出</NavLink>
                                        </NavItem>
                                    }
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>

                    <div id="id_content">
                        <Route exact path="/" render={() => (
                                <TrafukoPage firebase={fb} wrap={this.setwrapEnable}/>
                            )}/>
                        <Route exact path="/Rank" render={() => (
                                <RankPage logIn={this.signIn} auth={firebase.auth} firebase={fb} wrap={this.setwrapEnable}/>
                            )}/>
                        <Route exact path="/TrashPool" render={() => (
                                <TrashPoolPage logIn={this.signIn} auth={firebase.auth} userid={this.props.userid} firebase={fb} wrap={this.setwrapEnable}/>
                            )}/>
                        <Route exact path="/Favor" render={() => (
                                <FavorPage auth={firebase.auth} firebase={fb} wrap={this.setwrapEnable}/>
                            )}/>
                    </div>

                    <div id="id_footer">
                        <Breadcrumb className="nomargin">
                            <BreadcrumbItem>Trafuko | 垃圾話</BreadcrumbItem>
                            <BreadcrumbItem><a href="#" onClick={this.toggleModal_A}>關於我們</a></BreadcrumbItem>
                            <BreadcrumbItem active><a  href="#" onClick={this.toggleModal_L}>Log</a></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Modal isOpen={this.props.modal_info} toggle={this.toggleInfo} >
                        <ModalHeader toggle={this.toggleInfo}><strong>登入福利</strong></ModalHeader>
                        <ModalBody>
                            <strong>立即享有收藏幹話功能!!!</strong> <br/><br/>
                            <li>專屬個人空間</li>
                            <li>保存幹話回味無窮</li>
                            <li>當下立即保存s級幹話不再辛苦翻找</li>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleInfo}>確定</Button>
                        </ModalFooter>
                    </Modal>
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
                            2017-05-16 : &nbsp;&nbsp;MVP Demo<br/>
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

export default connect(state => ({
    ...state.main
}))(Main);
