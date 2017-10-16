import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';


class PostList extends React.Component {
    static propTypes = {
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
        isLoading: PropTypes.bool,
    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

    render() {
        if (this.props.isLoading) {
            return <div className="b-post-list">Загрузка...</div>
        }

        const posts = this.props.postList.map(
            item => <Post key = {item.id} title = {item.title} text = {item.text} likes = {item.likes_count}/>,
        );
        return (
            <div className="b-post-list">
                { posts }
            </div>
        );
    }
}

export default PostList;
