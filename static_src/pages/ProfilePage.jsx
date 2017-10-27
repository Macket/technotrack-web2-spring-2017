import React from 'react';
import PropTypes from 'prop-types';
import Layout from './../components/Layout';
import Profile from './../components/Profile';

class ProfilePage extends React.Component {

    static propTypes = {
        profile: PropTypes.object.isRequired,
        onMenuSelect: PropTypes.func.isRequired,
    };

    render() {
        return(
            <Layout onSelect={ this.props.onMenuSelect }>
                <h1>Профиль</h1>
                <Profile id={ this.props.profile.id }
                         username={ this.props.profile.username }
                         date_joined={ this.props.profile.date_joined }
                         first_name={ this.props.profile.first_name }
                         last_name={ this.props.profile.last_name }
                         email={ this.props.profile.email }
                         avatar={ this.props.profile.avatar }/>
            </Layout>
        )
    }
}

export default ProfilePage;