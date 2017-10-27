import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Layout extends React.Component {

    static propTypes = {
        onSelect: PropTypes.func.isRequired,
    };


    render() {
        return (
            <div className="b-base">
                <div className="b-header">IVAN MAKEEV</div>
                <div className="b-side-menu">
                    <button onClick={ () => this.props.onSelect("Моя страница")} className="b-side-menu-button">Моя страница</button>
                    <button onClick={ () => this.props.onSelect("Новости")} className="b-side-menu-button">Новости</button>
                    <button onClick={ () => this.props.onSelect("Профиль")} className="b-side-menu-button">Профиль</button>
                    <Link className="b-side-menu-button" to="/index/HomePage/">Список</Link>
                </div>

                <div className="b-wrapper"> {this.props.children} </div>
            </div>
        )
    }
}

export default Layout;