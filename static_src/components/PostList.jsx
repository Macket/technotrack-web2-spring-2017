import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Post from './Post';
import { loadPosts } from './../actions/posts'
import apiUrls from './../constants/apiUrls';

class PostList extends React.Component {

    static propTypes = {
        postList: PropTypes.arrayOf(PropTypes.number),
        isLoading: PropTypes.bool,
        loadPosts: PropTypes.func.isRequired,

    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

    componentDidMount() {
        this.props.loadPosts(apiUrls.posts);
    };

    render() {
        if (this.props.isLoading) {
            return <div className="b-post-list">Загрузка...</div>
        }
        const posts = this.props.postList.map(
            item => <Post key = {item} id = {item} />,
        );
        return (
            <div className="b-post-list">
                { posts }
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => {
    return {
        postList: posts.postList,
        isLoading: posts.isLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadPosts }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(PostList);
