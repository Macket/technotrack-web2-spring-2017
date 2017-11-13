import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section'
import Post from './Post';
import { loadPosts } from '../actions/postsActions'

class PostList extends React.Component {

    static propTypes = {
        postList: PropTypes.arrayOf(PropTypes.number),
        isLoading: PropTypes.bool,
        loadPosts: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

    componentDidMount() {
        this.props.loadPosts(this.props.url);
    };

    render() {
        if (this.props.isLoading) {
            return <div className="b-post-list">Загрузка...</div>;
        }
        const posts = this.props.postList.map(
            item => <Post key={ item } id={ item } />,
        );
        if ({ posts }.posts.length === 0) {
            return (
                <Section align="center" pad="none">
                    Нет ни одного поста
                </Section>
            );
        }
        return (
            <Section align="center" pad="none">
                { posts }
            </Section>
        );
    }
}

const mapStateToProps = ({ postsReducer }) => {
    return {
        postList: postsReducer.postList,
        isLoading: postsReducer.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadPosts }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(PostList);
