import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import apiUrls from './../constants/apiUrls';
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'

import { loadProfile } from '../actions/profileActions'


class Profile extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        email: PropTypes.string,
        date_joined: PropTypes.string,
        avatar: PropTypes.string,
        loadProfile: PropTypes.func.isRequired,
    };

    static defaultProps = {
        id: 0,
        username: '-',
        first_name: '-',
        last_name: '-',
        email: '-',
        date_joined: '-',
        avatar: '',
    };

    componentDidMount() {
        this.props.loadProfile(apiUrls.profile);
    };

    render() {
        return (

            <List>
                <ListItem justify='between' separator='horizontal'>
                    <span>Псевдоним</span>
                    <span className='secondary'>{ this.props.username }</span>
                </ListItem>
                <ListItem justify='between'>
                    <span>Имя</span>
                    <span className='secondary'>{ this.props.first_name }</span>
                </ListItem>
                <ListItem justify='between'>
                    <span>Фамилия</span>
                    <span className='secondary'>{ this.props.last_name }</span>
                </ListItem>
                <ListItem justify='between'>
                    <span>email</span>
                    <span className='secondary'>{ this.props.email }</span>
                </ListItem>
                <ListItem justify='between'>
                    <span>Дата регистрации</span>
                    <span className='secondary'>{ this.props.date_joined }</span>
                </ListItem>
                <ListItem justify='between'>
                    <span>id</span>
                    <span className='secondary'>{ this.props.id }</span>
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = ({ profileReducer }) => {
    return {
        ...profileReducer.profile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadProfile}, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);