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

function compare(a, b) {
    if (a.score < b.score)
        return 1;
    if (a.score > b.score)
        return -1;
    return 0;
}

export default class RankPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            npp: 6,
            dropdownOpen: false,
            status: "top100",
            Data: []
        };
        this.handleSChange = this.handleSChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

        this.props.firebase.on('value', snapshot => {
            this.setState({Data: snapshot.val().posts});
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
        if (npp >= 3 && npp <= 15) this.setState({npp: npp});
    }

    handleSChange(status) {
        if(status !== this.state.status) {
            this.setState({status: status});
        }
    }

    render() {
        const npp = this.state.npp;
        const data = this.state.Data.sort(compare);
        const showList = data.slice((this.state.page - 1) * npp , Math.min(this.state.page * npp, this.state.Data.length - 1));
        const listItems = showList.map((each) => <Box order={data.indexOf(each) + 1} key={each.id} text={each.text}/>);
        return(
            <div className="rankpage">
                <Table responsive><tbody>
                    <tr>
                        <th width="25%"><Button><h2>&nbsp;top100&nbsp;</h2></Button></th>
                        <th width="25%"><Button><h2>每日前十</h2></Button></th>
                        <th width="25%"><Button><h2>每週前百</h2></Button></th>
                        <th width="25%"><Button><h2>每月前百</h2></Button></th>
                    </tr>
                    <tr></tr>
                </tbody></Table>

                <Table bordered inverse className="table"><tbody>
                    <tr>
                        <td width="10%">排名</td>
                        <td width="80%">幹話內容</td>
                        <td width="10%"></td>
                    </tr>
                    {listItems}
                </tbody></Table>

                <Pagination>
                    <PaginationItem className="hvr-backward clickHand" onClick={() => this.changePage(this.state.page - 1)}>
                        <PaginationLink previous/>
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink  className="z-index-modify">{this.state.page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hvr-forward clickHand" onClick={() => this.changePage(this.state.page + 1)}>
                        <PaginationLink next/>
                    </PaginationItem>
                    <PaginationItem>
                        &nbsp;<input id="npp_input" placeholder="每頁顯示數量"></input>&nbsp;
                    </PaginationItem>
                    <PaginationItem>
                        <Button className="hvr-wobble-vertical" color="danger" onClick={() => this.changeNumPerPage(document.getElementById("npp_input").value)}>確認</Button>&nbsp;
                    </PaginationItem>
                </Pagination>

            </div>
        );
    }
}

const Box = (props) => (
    <tr>
        <th>{props.order}</th>
        <td>{props.text}</td>
        <td><Button className="hvr-bounce-in" color="success">收藏</Button></td>
    </tr>
);

Box.propTypes = {
    order: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};
