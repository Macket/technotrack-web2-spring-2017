import React from 'react';
import PropTypes from 'prop-types';
import PostList from './../components/PostList';
import PostForm from './../components/PostForm';
import Layout from './../components/Layout';
import Post from './../components/Post';
import Profile from './../components/Profile';

class Home extends React.Component {

    static propTypes = {
        onMenuSelect: PropTypes.func.isRequired,
        profile: PropTypes.shape(Profile.propTypes),
    };

    static defaultProps = {

    };

    render() {
        return(
            <Layout onSelect={ this.props.onMenuSelect }>
                <Profile id={ this.props.profile.id }
                         username={ this.props.profile.username }
                         date_joined={ this.props.profile.date_joined }
                         first_name={ this.props.profile.first_name }
                         last_name={ this.props.profile.last_name }
                         email={ this.props.profile.email }
                         avatar={ this.props.profile.avatar }/>
                <h1>Посты</h1>
                <PostForm/>
                <PostList/>
            </Layout>
        )
    }
}

export default Home;
