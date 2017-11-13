import React from 'react';
import PropTypes from 'prop-types';
import PostList from './../components/PostList';
import PostForm from './../components/PostForm';
import Layout from './../components/Layout';
import Profile from './../components/Profile';

class HomePage extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {

    };

    render() {
        return (
            <Layout>
                <Profile />
                <PostForm />
                <PostList url={ this.props.url } />
            </Layout>
        );
    }
}

export default HomePage;
