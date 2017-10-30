import React from 'react';
import PropTypes from 'prop-types';
import Layout from './../components/Layout';
import Profile from './../components/Profile';

class ProfilePage extends React.Component {

    // static propTypes = {
    //     profile: PropTypes.object.isRequired,
    //     onMenuSelect: PropTypes.func.isRequired,
    // };

    render() {
        return(
            <Layout onSelect={ this.props.onMenuSelect }>
                <h1>Профиль</h1>
                <Profile />
            </Layout>
        )
    }
}

export default ProfilePage;