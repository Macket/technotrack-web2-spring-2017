import React from 'react';
import PropTypes from 'prop-types';



class Profile extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        email: PropTypes.string,
        date_joined: PropTypes.string,
        avatar: PropTypes.string,
    };

    static defaultProps = {
        first_name: '',
        last_name: '',
        email: '',
        date_joined: '',
        avatar: '',
    };

    render() {
        return (
            <div className="b-post">
                <img className="b-user__avatar" src={ this.props.avatar } />
                <div className="b-user__username">Псевдоним: { this.props.username }</div>
                <div className="b-user__first_name">Имя: { this.props.first_name }</div>
                <div className="b-user__last_name">Фамилия: { this.props.last_name }</div>
                <div className="b-user_email">email: { this.props.email }</div>
                <div className="b-user__date_joined">С нами с { this.props.date_joined }</div>
                <div className="b-user__id">id: { this.props.id }</div>
            </div>
        );
    }
}

export default Profile;