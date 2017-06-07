import React from 'react';
import PropTypes from 'prop-types';
import {Animate} from 'react-move';

export default class RunText extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        color: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            leftEnd: (-200 - Math.random() * 300 ) + "px",
            top: (screen.height * Math.random() * 0.8) + "px",
            text: (this.props.text.length < 30) ? this.props.text : "",
            color: this.props.color,
            duration: 10000,
            leftStart: screen.width + "px"
        };
        this.hover = this.hover.bind(this);
        this.hoverout = this.hoverout.bind(this);
    }
    //`${(screen.width - 400 + Math.random() * 700 ) + "px"}`

    componentDidMount() {
        document.getElementById("runtext_" + this.props.id).addEventListener("mouseover", this.hover);
        document.getElementById("runtext_" + this.props.id).addEventListener("mouseout", this.hoverout);
    }

    componentWillUnmount() {
        document.getElementById("runtext_" + this.props.id).removeEventListener("mouseover", this.hover);
        document.getElementById("runtext_" + this.props.id).removeEventListener("mouseout", this.hoverout);
    }

    hover() {
        this.setState({duration: 15000, leftStart: "-200px"});
    }

    hoverout() {
        this.setState({duration: 6000, leftStart: "-1200px"});
    }

    render() {
        return (
            <Animate
                default={{
                    color: 'black',
                    left: this.state.leftStart
                }}
                data={{
                    left: this.state.leftEnd,
                    top: this.state.top
                }}
                duration={this.state.duration}
                easing='easeLinear'
                >
                {data => (
                    <div
                        style={{
                            float: 'center',
                            width: '200px',
                            height: "auto",
                            position: "absolute",
                            left: data.left,
                            top: data.top,
                            Zindex: 2
                        }}
                        className="disable hvr-grow"
                        id={"runtext_" + this.props.id}
                        >
                        {this.state.text}
                    </div>
                )}
            </Animate>
        );
    }
}
