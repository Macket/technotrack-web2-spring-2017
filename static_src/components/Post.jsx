import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const author = {
    name: 'Неизвестный автор'
};

class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        likes_count: PropTypes.number,
        comments_count: PropTypes.number,
    };

    static defaultProps = {
        text: '',
        likes: 0,
        comments: 0,
    };

    render() {
        return (
            <div className="b-post">
                <div className="b-post__title">{ this.props.title }</div>
                <div className="b-post__author">{ author.name }</div>
                <div className="b-post__content">{ this.props.text }</div>
                <div>
                    <div className="b-post__comments">Комментарии: { this.props.comments_count }</div>
                    <div className="b-post__likes">Понравилось { this.props.likes_count }</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    return {
        ...posts.posts[ownProps.id],
    }

};

const mapDispatchToProps = (dispatch) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
