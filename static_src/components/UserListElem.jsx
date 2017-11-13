import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ListItem from 'grommet/components/ListItem';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import { subscribe } from '../actions/profileActions';

class UserListElem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        username: PropTypes.string,
        avatar: PropTypes.string,
        currentUserId: PropTypes.number,
        subscribe: PropTypes.func.isRequired,
        currentUserSubscriptions: PropTypes.arrayOf(PropTypes.number),
    };

    static defaultProps = {
        username: '',
        avatar: '',
        currentUserId: 0,
        currentUserSubscriptions: [],
    };

    state = {
        is_subscribed: Boolean(this.props.currentUserSubscriptions.indexOf(this.props.id) + 1),
    };

    subscribeClick = () => {
        this.setState({ is_subscribed: !this.state.is_subscribed });
        this.props.subscribe(JSON.stringify({
            to_user: this.props.id,
            from_user: this.props.currentUserId,
        }));
    };

    render() {
        let label = '';
        if (this.state.is_subscribed) {
            label = 'Отписаться';
        } else {
            label = 'Подписаться';
        }
        return (
            <ListItem justify="between" separator="horizontal">
                <span>
                    <Link to={ `/index/users/${this.props.id}` }><div className="b-icon" ><Image src={ this.props.avatar } /></div></Link>
                    <Link className="b-side-menu-link" to={ `/index/users/${this.props.id}` }>{this.props.username}</Link>
                </span>
                <span className="secondary">
                    <Box size="small">
                        <Button
                            label={ label }
                            onClick={ this.subscribeClick }
                            primary={ true }
                            secondary={ false }
                        />
                    </Box>
                </span>
            </ListItem>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.usersReducer.users[ownProps.id],
        currentUserId: state.profileReducer.profile.id,
        currentUserSubscriptions: state.profileReducer.profile.subscriptions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ subscribe }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListElem);