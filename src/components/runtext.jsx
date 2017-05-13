import React from 'react';
import PropTypes from 'prop-types';

import { Animate } from 'react-move';

export default class RunText extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            style: makeItem()
        };
    }

    render() {
        return (
            <Animate
                      default={{
                        color: 'black',
                        left: `${(screen.width - 400 + Math.random() * 700 ) + "px"}`
                      }}
                      data={
                        this.state.style
                      }
                      duration={10000}
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
                            top: data.top
                          }}
                          className="disable"
                        >
                          {this.props.text}
                        </div>
                      )}
                </Animate>
            );
    }

}

function makeItem() {
    const left = (-200 - Math.random() * 300 ) + "px";
    const top =  (screen.height * Math.random() * 0.8) + "px";
    return {
        left: left,
        top: top
    }
}

RunText.propTypes = {
        text: PropTypes.string.isRequired
};