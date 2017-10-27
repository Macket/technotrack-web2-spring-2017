import React from 'react';
import PropTypes from 'prop-types';
import PostList from './../components/PostList';
import Layout from './../components/Layout';
import Post from './../components/Post';

class News extends React.Component {

    static propTypes = {
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
        isLoading: PropTypes.bool,
        onMenuSelect: PropTypes.func.isRequired,
    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

    render() {
        return(
            <Layout onSelect={ this.props.onMenuSelect }>
                <h1>Посты</h1>
                <PostList/>
            </Layout>
        )
    }
}

export default News;