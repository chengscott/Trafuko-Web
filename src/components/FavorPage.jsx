import React from 'react';
import PropTypes from 'prop-types';
import fecha from 'fecha';

import './FavorPage.css';
import {connect} from 'react-redux';

import {setDataifFav} from 'states/main-action.js';

class FavorPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        auth: PropTypes.func.isRequired,
        wrap: PropTypes.func.isRequired,
        Data: PropTypes.array,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            favlist: []
        };
        this.getFavList = this.getFavList.bind(this);
        this.deleteFav = this.deleteFav.bind(this);
    }

    componentDidMount() {
        this.props.wrap(false); // overflow: auto
        this.props.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.props.firebase.ref('/fav/' + firebaseUser.uid)
                    .once('value').then(snapshot => {
                        let arr = objToarr(snapshot.val());
                        arr.sort(function(a, b) {
                            let a_t = new Date(a.ts);
                            let b_t = new Date(b.ts);
                            return b_t.getTime() - a_t.getTime();
                        });
                        arr.forEach(element => {
                            this.getFavList(firebaseUser.uid,element.id,element.ts);
                        });
                    });
            }
        });
    }

    getFavList(uid, pid, ts) {
        this.props.firebase.ref('/posts/' + pid).once('value').then((snapshot) => {
            let val = snapshot.val();
            if (val !== null) {
                let obj = {
                    uid: uid,
                    id: pid,
                    text: val.text,
                    color: val.color,
                    ts: ts
                };
                let objs = this.state.favlist;
                objs.push(obj);
                this.setState({
                    favlist: objs
                });
            }
        });
    }

    deleteFav(id) {
        let Data = this.props.Data;
        for (let x in Data) {
            if (Data[x].id == id) {
                Data[x].ifFav = false;
                this.props.dispatch(setDataifFav(Data));
                break;
            }
        }
    }

    render() {
        //const items = this.state.favlist.map(a=> (<Item text={()=>this.getPost(a.id)} time={a.ts}/>));
        const items = this.state.favlist.map(a =>(<Item key={a.id} post={a} firebase={this.props.firebase} delFav={this.deleteFav}/>));
        return (
            <div id="favorpage">
                <div className="title">
                    <h1>幹話書籤</h1>
                </div>
                <ui className="list">
                    {items}
                </ui>
            </div>
        );
    }
}

class Item extends React.Component {
    // time // text //
    static propTypes = {
        firebase: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired,
        delFav: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            showable: false
        };
        this.deleteFav = this.deleteFav.bind(this);
    }

    deleteFav(id) {
        this.props.delFav(id);
        this.props.firebase.ref('/fav/' + this.props.post.uid + '/' + id).remove();
        this.setState({
            showable: true
        });
    }

    render() {
        const time = new Date(this.props.post.ts);
        const favtime = fecha.format(time, "YYYY-MM-DD");
        const show = this.state.showable ? 'none' : 'block';
        return (
            <li style={{display:show}} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 fade-in">
                <div className="ui-history-close fa fa-close fa-fw" onClick={()=>this.deleteFav(this.props.post.id)}></div>
                <div className="item">
                <div className="content">
                    <h4 className="text"
                        color={this.props.post.color}
                    >{this.props.post.text}</h4>
                    <p>
                        <i><i className="fa fa-clock-o">&nbsp;&nbsp;</i>{favtime}</i>
                        <br/>
                    </p>
                </div>
                </div>
            </li>
        );
    }
}


function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}

export default connect(state => ({
    Data: state.main.Data
}))(FavorPage);