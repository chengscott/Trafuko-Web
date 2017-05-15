import React from 'react';
import PropTypes from 'prop-types';
import './RankPage.css';
import {
    Button,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap';

function compare(a, b) {
    if (a.score < b.score)
        return 1;
    if (a.score > b.score)
        return -1;
    return 0;
}

export default class RankPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            npp: 6,
            dropdownOpen: false,
            status: "top100",
            Data: [{id: "0001", text:"我這個人，不說垃圾話的!!!", score: 23, order: 0},{id:"0002", text:"我這個人，不說垃圾話的!!!", score: 107, order: 0},
{id: "0003", text:"華碩電池 一個小時", score: 23, order: 0},{id:"0004", text:"玩遊戲輸了，一定是隊友的問題，要是他們夠強，我根本扯不了後腿", score: 213, order: 0},
{id: "0005", text:"下過雨的天空，有下過雨的感覺", score: 79, order: 0},{id:"0006", text:"台灣人在睡覺時，大多數的美國人都在工作", score: 49, order: 0},
{id: "0007", text:"肥宅不要再對號入座了，椅子坐不下!", score: 12, order: 0},{id:"0008", text:"我這個人，不說垃圾話的!!!", score: 47, order: 0},
{id: "0009", text:"我寫的不是Code，是寂寞", score: 3, order: 0},{id:"0010", text:"台灣競爭力低落，在美國就連小學生都會說流利的英語", score: 186, order: 0},
{id: "0011", text:"在非洲，每60秒就有1分鐘過去", score: 46, order: 0},{id:"0012", text:"我這個人，不說垃圾話的!!!", score: 200, order: 0},
{id: "0013", text:"麻雀雖小，五臟 小次郎", score: 89, order: 0},{id:"0014", text:"每個成功的男人背後，都有一條脊椎", score: 140, order: 0},
{id: "0015", text:"研究顯示，過越多生日的人越長壽", score: 167, order: 0},{id:"0016", text:"我這個人，不說垃圾話的!!!", score: 7, order: 0},
{id: "0017", text:"積沙成塔，積少化痰", score: 120, order: 0},{id:"0018", text:"每天少喝一杯珍珠奶茶，一個禮拜後，就能買七杯珍珠奶茶", score: 63, order: 0},
{id: "0019", text:"我很喜歡你的聲音 特別是你閉嘴的聲音", score: 94, order: 0},{id:"0020", text:"我這個人，不說垃圾話的!!!", score: 174, order: 0},
{id: "0021", text:"你知道你媽跟你爸同一天結婚嗎?", score: 23, order: 0},{id:"0022", text:"一山還有一山高  蘿蔔還有蘿蔔糕", score: 26, order: 0},
{id: "0023", text:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{id:"0024", text:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
]
        };
        this.handleSChange = this.handleSChange.bind(this);
        this.toggle = this.toggle.bind(this);
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
                        <PaginationLink>{this.state.page}</PaginationLink>
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
