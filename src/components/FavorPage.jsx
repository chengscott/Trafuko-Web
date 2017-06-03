import React from 'react';
import PropTypes from 'prop-types';
import './FavorPage.css';

export default class FavorPage extends React.Component {

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        wrap: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
             <div></div>
        );
    }
}
