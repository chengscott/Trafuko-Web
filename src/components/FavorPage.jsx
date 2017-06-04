import React from 'react';
import PropTypes from 'prop-types';
import fecha from 'fecha';

import './FavorPage.css';

export default class FavorPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        auth: PropTypes.func.isRequired,
        wrap: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            favlist: []
        };
        this.getFavList = this.getFavList.bind(this);
    }

    componentDidMount() {
        this.props.wrap(false); // overflow: auto
        this.props.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.props.firebase.ref('/fav/'+firebaseUser.uid).on('value', snapshot => {
                    let arr = objToarr(snapshot.val());
                    arr.forEach(function(element){
                        this.getFavList(firebaseUser.uid,element.id,element.ts);
                    }.bind(this));
                });
            }
        });
    }

    getFavList(uid,pid,ts){
        this.props.firebase.ref('/posts/' + pid).on('value', (snapshot) =>{
            let val = snapshot.val();
            if(val !== null) {
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
    render() {
        //const items = this.state.favlist.map(a=> (<Item text={()=>this.getPost(a.id)} time={a.ts}/>));
        const items = this.state.favlist.map( a=>(<Item key={a.id} post={a} firebase={this.props.firebase}/>));
        return (
            <div id="favorpage">
                <div className="title">
                    <h1> Trafuko favorite list</h1>
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
        post: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            showable: false
        };
        this.deleteFav = this.deleteFav.bind(this);
    }

    deleteFav(id){
        this.props.firebase.ref('/fav/'+this.props.post.uid+'/'+id).remove();
        this.setState({
            showable: true
        });
    }
    render() {
        const time = new Date(this.props.post.ts);
        const favtime = fecha.format(time, "YYYY-MM-DD");
        const show = (this.state.showable)?'none':'block';
        return (
            <li style={{display:show}} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
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