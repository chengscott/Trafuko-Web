import React from 'react';
import PropTypes from 'prop-types';
import './RankPage.css';
import {
    Button,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

export default class RankPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        wrap: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const npp = (screen.width >= 700) ? 8 : 4;
        this.state = {
            page: 1,
            npp: npp,
            dropdownOpen: false,
            status: "top",
            Data: []
        };
        this.handleSChange = this.handleSChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.wrap(false); // overflow: auto
        this.props.firebase.ref('posts').on('value', snapshot => {
            this.setState({Data: objToarr(snapshot.val())});
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changePage(page) {
        const page_num = Math.ceil(this.state.Data.length/this.state.npp);
        if (page > 0 && page <= page_num) this.setState({page: page});
    }

    changeNumPerPage(npp) {
        if (npp >= 3 && npp <= 15) this.setState({npp: npp, page: 1});
    }

    handleSChange(status) {
        if(status !== this.state.status) {
            this.setState({status: status, page: 1});
        }
    }

    render() {
        const page_num = Math.ceil(this.state.Data.length/this.state.npp);
        let i = 1;
        let btnlist = [];
        while (i <= page_num && i <= 10) {
            btnlist.push(i);
            ++i;
        }
        const Btnlist = btnlist.map(j =>
            (j === this.state.page) ?
            (<PaginationItem active key={"pagebtn_" + j} onClick={() => this.changePage(j)} >
                <PaginationLink>{j}</PaginationLink>
            </PaginationItem>) :
            (<PaginationItem className="clickHand" key={"pagebtn_" + j} onClick={() => this.changePage(j)} >
                <PaginationLink>{j}</PaginationLink>
            </PaginationItem>)
        );
        const npp = this.state.npp;
        const data = this.state.Data.sort(compare);
        const showList = data.slice((this.state.page - 1) * npp , Math.min(this.state.page * npp, this.state.Data.length - 1));
        const listItems = showList.map((each) => <Box order={data.indexOf(each) + 1} key={each.id} text={each.text}/>);
        return(
            <div className="rankpage">
                <Table responsive><tbody>
                    <tr>
                        <th width="25%"><Button onClick={() => this.handleSChange("top")} color={(this.state.status === "top") ? "warning" : "default"}>&nbsp;top100&nbsp;</Button></th>
                        <th width="25%"><Button onClick={() => this.handleSChange("day")} color={(this.state.status === "day") ? "warning" : "default"}>每日前十</Button></th>
                        <th width="25%"><Button onClick={() => this.handleSChange("week")} color={(this.state.status === "week") ? "warning" : "default"}>每週前百</Button></th>
                        <th width="25%"><Button onClick={() => this.handleSChange("mon")} color={(this.state.status === "mon") ? "warning" : "default"}>每月前百</Button></th>
                    </tr>
                </tbody></Table>

                <Table bordered inverse className="table"><tbody>
                    <tr>
                        <td width="10%">排名</td>
                        <td width="80%">幹話內容</td>
                        <td width="10%"></td>
                    </tr>
                    {listItems}
                </tbody></Table>

                <Pagination style={{'marginBottom':'72px'}}>
                    {(this.state.page != 1) &&
                    <PaginationItem className="hvr-backward clickHand" onClick={() => this.changePage(this.state.page - 1)}>
                        <PaginationLink previous/>
                    </PaginationItem>}
                    {Btnlist}
                    {(this.state.page != page_num) &&
                    <PaginationItem className="hvr-forward clickHand" onClick={() => this.changePage(this.state.page + 1)}>
                        <PaginationLink next/>
                    </PaginationItem>}
                </Pagination>

            </div>
        );
    }
}

const Box = (props) => (
    <tr>
        <th>{props.order}</th>
        <td className="font">{props.text}</td>
        <td><Button className="hvr-bounce-in" color="success">收藏</Button></td>
    </tr>
);

Box.propTypes = {
    order: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
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
