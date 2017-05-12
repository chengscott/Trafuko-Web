import React from 'react';
import ReactDOM from 'react-dom';
import './RankPage.css';
import {
    Button,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

var Data = [{title:"", id: "0001", content:"我這個人，不說垃圾話的!!!", score: 23, order: 0},{title:"", id:"0002", content:"我這個人，不說垃圾話的!!!", score: 107, order: 0},
{title:"", id: "0003", content:"華碩電池 一個小時", score: 23, order: 0},{title:"", id:"0004", content:"玩遊戲輸了，一定是隊友的問題，要是他們夠強，我根本扯不了後腿", score: 213, order: 0},
{title:"", id: "0005", content:"下過雨的天空，有下過雨的感覺", score: 79, order: 0},{title:"", id:"0006", content:"台灣人在睡覺時，大多數的美國人都在工作", score: 49, order: 0},
{title:"", id: "0007", content:"肥宅不要再對號入座了，椅子坐不下!", score: 12, order: 0},{title:"", id:"0008", content:"我這個人，不說垃圾話的!!!", score: 47, order: 0},
{title:"", id: "0009", content:"我寫的不是Code，是寂寞", score: 3, order: 0},{title:"", id:"0010", content:"台灣競爭力低落，在美國就連小學生都會說流利的英語", score: 186, order: 0},
{title:"", id: "0011", content:"在非洲，每60秒就有1分鐘過去", score: 46, order: 0},{title:"", id:"0012", content:"我這個人，不說垃圾話的!!!", score: 200, order: 0},
{title:"", id: "0013", content:"麻雀雖小，五臟 小次郎", score: 89, order: 0},{title:"", id:"0014", content:"每個成功的男人背後，都有一條脊椎", score: 140, order: 0},
{title:"", id: "0015", content:"研究顯示，過越多生日的人越長壽", score: 167, order: 0},{title:"", id:"0016", content:"我這個人，不說垃圾話的!!!", score: 7, order: 0},
{title:"", id: "0017", content:"積沙成塔，積少化痰", score: 120, order: 0},{title:"", id:"0018", content:"每天少喝一杯珍珠奶茶，一個禮拜後，就能買七杯珍珠奶茶", score: 63, order: 0},
{title:"", id: "0019", content:"我很喜歡你的聲音 特別是你閉嘴的聲音", score: 94, order: 0},{title:"", id:"0020", content:"我這個人，不說垃圾話的!!!", score: 174, order: 0},
{title:"", id: "0021", content:"你知道你媽跟你爸同一天結婚嗎?", score: 23, order: 0},{title:"", id:"0022", content:"一山還有一山高  蘿蔔還有蘿蔔糕", score: 26, order: 0},
{title:"", id: "0023", content:"在非洲，不用電腦也能玩踩地雷", score: 84, order: 0},{title:"", id:"0024", content:"我不是胖，我只是瘦的不明顯而已", score: 79, order: 0},
];

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
            npp: 6
        };
    }

    changePage(page) {
        const page_num = Math.ceil(Data.length/this.state.npp);
        if (page > 0 && page <= page_num) this.setState({page: page});
    }

    changeNumPerPage(npp) {
        if (npp >= 3 && npp <= 15) this.setState({npp: npp});
    }

    render() {
        const npp = this.state.npp;
        const data = Data.sort(compare);
        const showList = data.slice((this.state.page - 1) * npp , Math.min(this.state.page * npp, Data.length - 1));
        const listItems = showList.map((each) => <Box order={data.indexOf(each) + 1} key={each.id} info={each}/>);
        return(
            <div>
                <Table><tbody>
                    <tr>
                        <td>排名</td>
                        <td>幹話內容</td>
                        <td></td>
                    </tr>
                    {listItems}
                </tbody></Table>

                <Pagination>
                    <PaginationItem onClick={() => this.changePage(this.state.page - 1)}>
                        <PaginationLink previous/>
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink>{this.state.page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem onClick={() => this.changePage(this.state.page + 1)}>
                        <PaginationLink next/>
                    </PaginationItem>
                    <PaginationItem>
                        <input id="npp_input" placeholder="每頁顯示數量"></input>
                    </PaginationItem>
                    <PaginationItem>
                        <Button onClick={() => this.changeNumPerPage(npp_input.value)}>確認</Button>
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}

function Box(props) {
    return (
        <tr>
            <th>{props.order}</th>
            <td>{props.info.content}</td>
            <td><Button color="success">讚</Button></td>
        </tr>
    );
}
