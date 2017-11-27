import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import List from 'grommet/components/List';
import UserListElem from './UserListElem';
import { loadUsers } from '../actions/usersActions';

class UserList extends React.Component {

    static propTypes = {
        userList: PropTypes.arrayOf(PropTypes.number),
        isLoading: PropTypes.bool,
        loadUsers: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
        userList: [],
        isLoading: false,
    };

    componentWillMount() {
        this.props.loadUsers(this.props.url);
    };

    render() {
        if (this.props.isLoading) {
            return <div className="b-post-list">Загрузка...</div>;
        }
        const users = this.props.userList.map(
            item => <UserListElem key={ item } id={ item } />,
        );
        return (
            <List>
                { users }
            </List>
        );
    }
}

const mapStateToProps = ({ usersReducer }, ) => {
    return {
        userList: usersReducer.userList,
        isLoading: usersReducer.isLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadUsers }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(UserList);