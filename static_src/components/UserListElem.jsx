import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import ListItem from 'grommet/components/ListItem'
import Image from 'grommet/components/Image'
import Button from 'grommet/components/Button'
import Pulse from 'grommet/components/icons/Pulse'
import { subscribe } from '../actions/usersActions'

class UserListElem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        username: PropTypes.string,
        avatar: PropTypes.string,
        currentUserId: PropTypes.number,
        subscribe: PropTypes.func.isRequired,
    };

    static defaultProps = {
        username: '',
        avatar: '',
    };

    state = {};

    subscribeClick = () => {
        console.log(1);
        this.props.subscribe(JSON.stringify({
            to_user: this.props.id,
            from_user: this.props.currentUserId
        }))
    };

    render() {
        return (
            <ListItem justify='between' separator='horizontal'>
                <span>
                    {/*<Image src={ this.props.avatar }/>*/}
                    {this.props.username}
                </span>
                <span className='secondary'>
                    <Button icon={<Pulse />}
                            label='Подписаться'
                            onClick={ this.subscribeClick }
                            primary={true}
                            secondary={false}/>
                </span>
            </ListItem>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.usersReducer.users[ownProps.id],
        currentUserId: state.profileReducer.profile[1].id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ subscribe }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListElem);