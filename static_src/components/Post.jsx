import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paragraph from 'grommet/components/Paragraph';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';

import { putLike } from '../actions/likesActions'

class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        likes_count: PropTypes.number,
        comments_count: PropTypes.number,
        username: PropTypes.string,
        author: PropTypes.number.isRequired,
        putLike: PropTypes.func.isRequired,
    };

    static defaultProps = {
        title: '',
        text: '',
        likes_count: 0,
        comments_count: 0,
        username: '',
    };

    handleOnClick = (e) => {
        e.preventDefault();
        this.props.putLike(JSON.stringify({
            content_type: '8',
            object_id: this.props.id,
            author: this.props.author,
        }));
    };

    render() {
        return (
            <Box size={ { width: 'xlarge' } } pad="large">
                <Heading tag="h4" strong={ true }>{ this.props.title }</Heading>
                <Label>{ this.props.username }</Label>
                <Paragraph width="large">{ this.props.text }</Paragraph>
                <div>
                    <div className="b-post__comments">Комментарии: { this.props.comments_count }</div>
                    <div className="b-post__likes" onClick={ this.handleOnClick }>Понравилось: { this.props.likes_count }</div>
                </div>
            </Box>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        ...store.postsReducer.posts[ownProps.id],
        author: store.usersReducer.users[store.postsReducer.posts[ownProps.id].author].id,
        username: store.usersReducer.users[store.postsReducer.posts[ownProps.id].author].username,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ putLike }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Post);
