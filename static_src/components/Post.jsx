import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Paragraph from 'grommet/components/Paragraph'
import Title from 'grommet/components/Title'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'


class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        likes_count: PropTypes.number,
        comments_count: PropTypes.number,
        username: PropTypes.string,
    };

    static defaultProps = {
        text: '',
        likes: 0,
        comments: 0,
    };

    render() {
        return (
            <Box size={{width: 'xlarge'}} pad='large'>
                <Heading tag="h4" strong={true}>{ this.props.title }</Heading>
                <Label>{ this.props.username }</Label>
                <Paragraph width='large'>{ this.props.text }</Paragraph>
                <div>
                    <div className="b-post__comments">Комментарии: { this.props.comments_count }</div>
                    <div className="b-post__likes">Понравилось: { this.props.likes_count }</div>
                </div>
            </Box>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        ...store.postsReducer.posts[ownProps.id],
        ...store.usersReducer.users[store.postsReducer.posts[ownProps.id].author],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
