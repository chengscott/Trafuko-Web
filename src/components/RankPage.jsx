import React from 'react';
import PropTypes from 'prop-types';
import './RankPage.css';
import {
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import classnames from 'classnames';

export default class RankPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        wrap: PropTypes.func.isRequired,
        auth: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const npp = (screen.width >= 700) ? 10 : 5;
        this.state = {
            page: 1,
            npp: npp,
            status: "top",
            Data: [],
            userid: "",
            ifLiked: false
        };
        this.handleSChange = this.handleSChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.getBtnStart = this.getBtnStart.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.ifLiked = false;
    }

    componentDidMount() {
        this.props.wrap(false); // overflow: auto
        this.props.firebase.ref('posts').on('value', snapshot => {
            this.setState({Data: objToarr(snapshot.val())});
        });
        this.props.auth().onAuthStateChanged(firebaseUser=>{
            if(firebaseUser){
                if(firebaseUser.uid != this.state.userid){
                    this.setState({
                        userid: firebaseUser.uid
                    });
                }
            }
        });
    }
    componentWillUnmount() {
        this.props.firebase.ref('posts').off();
    }
    changePage(page) {
        const showlen = (this.state.status == "top") ? 100 : 10;
        const page_num = Math.ceil(showlen/this.state.npp);
        if (page > 0 && page <= page_num) this.setState({page: page});
    }

    handleSChange(status) {
        if(status !== this.state.status) {
            this.setState({status: status, page: 1});
        }
        //refresh showlist
    }

    getBtnStart() {
        const page = this.state.page;
        if (page <= 3) return 1;
        else if (page >= 18) return 16;
        else return page - 2;
    }

    handleLike(id) {
        if (this.state.userid !== "") {

            const now = new Date();
            this.props.firebase.ref('fav/' + this.state.userid +'/' + id).set({
                id: id,
                ts: now.toString()
            });
            //console.log("add to favor list");
        } else {
            //console.log("login to get the benifit of favor list");
        }
    }

    render() {
        let btnarr = [];
        const status = this.state.status;
        let btnlen = (screen.width >= 700) ? 10 : (status == "top") ? 5 : 2;
        const page_num = (screen.width >= 700) ? (status == "top") ? 10 : 1 : (status == "top") ? 20 : 2;
        const btnstart = (screen.width < 700 && (status == "top")) ? this.getBtnStart() : 1;
        for (let i = btnstart; i < btnstart + btnlen; ++i) btnarr.push(i);
        const Btnlist = btnarr.map(j =>
            (j === this.state.page) ?
            (<PaginationItem active className="activebtn" key={"pagebtn_" + j} onClick={() => this.changePage(j)} >
                <PaginationLink>{j}</PaginationLink>
            </PaginationItem>) :
            (<PaginationItem className="clickHand" key={"pagebtn_" + j} onClick={() => this.changePage(j)} >
                <PaginationLink>{j}</PaginationLink>
            </PaginationItem>)
        );
        const npp = this.state.npp;
        const data = this.state.Data.sort(compare);
        const showList = data.slice((this.state.page - 1) * npp , Math.min(this.state.page * npp, this.state.Data.length - 1));
        const listItems = showList.map((each) =>
            <Box order={data.indexOf(each) + 1}
                 key={each.id}
                 text={each.text}
                 like={this.handleLike}
                 id={each.id}
                 userid={this.state.userid}
                 firebase={this.props.firebase}
            />);
        return(
            <div className="rankpage">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                          className={classnames({active: this.state.status == "top", statusbtn: true})}
                          onClick={() => { this.handleSChange("top"); }}
                        >
                          Top100
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                          className={classnames({active: this.state.status == "day", statusbtn: true})}
                          onClick={() => { this.handleSChange("day"); }}
                        >
                          本日前十
                        </NavLink>
                    </NavItem>
                    { (screen.width >= 700) && <NavItem>
                        <NavLink
                          className={classnames({active: this.state.status == "week", statusbtn: true})}
                          onClick={() => { this.handleSChange("week"); }}
                        >
                          本週前十
                        </NavLink>
                    </NavItem> }
                    { (screen.width >= 700) && <NavItem>
                        <NavLink
                          className={classnames({active: this.state.status == "mon", statusbtn: true})}
                          onClick={() => { this.handleSChange("mon"); }}
                        >
                          本月前十
                        </NavLink>
                    </NavItem> }
                </Nav>
                <TabContent activeTab={this.state.status}>
                    <TabPane tabId="top">
                        <Table bordered className="table"><tbody>
                            {listItems}
                        </tbody></Table>
                    </TabPane>
                    <TabPane tabId="day">
                        <Table bordered><tbody>
                            {listItems}
                        </tbody></Table>
                    </TabPane>
                    { (screen.width >= 700) && <TabPane tabId="week">
                        <Table bordered><tbody>
                            {listItems}
                        </tbody></Table>
                    </TabPane> }
                    { (screen.width >= 700) && <TabPane tabId="mon">
                        <Table bordered><tbody>
                            {listItems}
                        </tbody></Table>
                    </TabPane> }
                </TabContent>
                {
                (screen.width < 700 || this.state.status == "top") &&
                    <Pagination style={{'marginBottom':'72px'}}>
                        {
                        (this.state.page != 1) &&
                        <PaginationItem className="hvr-backward clickHand" onClick={() => this.changePage(this.state.page - 1)}>
                            <PaginationLink previous/>
                        </PaginationItem>
                        }
                        {Btnlist}
                        {
                        (this.state.page != page_num) &&
                        <PaginationItem className="hvr-forward clickHand" onClick={() => this.changePage(this.state.page + 1)}>
                            <PaginationLink next/>
                        </PaginationItem>
                        }
                    </Pagination>
                }
            </div>
        );
    }
}

class Box extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifLiked: false
        };
        this.clickLike = this.clickLike.bind(this);
    }

    componentDidMount() {
        this.props.firebase.ref('/fav/' + this.props.userid).once('value').then((snapshot) => {
            let val = snapshot.val();
            if (val !== null) {
                for (let x in val) {
                    if (x === this.props.id) {
                        this.setState({ifLiked: true});
                    }
                }
            }
        });
    }

    clickLike() {
        this.setState({ifLiked: true});
        this.props.like(this.props.id);
    }

    render() {
        return (
            <tr className="tableEntry">
                <th className="likebox">{this.props.order}&nbsp;&nbsp;
                    { (!this.state.ifLiked) &&
                    <i className="fa fa-bookmark-o clickHand"
                       aria-hidden="true"
                       onClick={this.clickLike}>
                    </i>
                    }
                    { (this.state.ifLiked) &&
                    <i className="fa fa-bookmark"
                       aria-hidden="true">
                    </i>
                    }
                </th>
                <td className="font">{this.props.text}</td>
            </tr>
        );
    }
}

Box.propTypes = {
    order: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    like: PropTypes.func,
    id: PropTypes.string,
    firebase: PropTypes.object.isRequired,
    userid: PropTypes.string
};

function compare(a, b) {
    if (a.vote < b.vote)
        return 1;
    if (a.vote > b.vote)
        return -1;
    return 0;
}

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}