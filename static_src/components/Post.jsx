import React from 'react';
import PropTypes from 'prop-types';



class Post extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.string,
        likes: PropTypes.number,
    };

    static defaultProps = {
        text: '',
        likes: 0,
    };

    render() {
        return (
            <div className="b-post">
                <div className="b-post__title">{ this.props.title }</div>
                <div className="b-post__content">{ this.props.text }</div>
                <div className="b-post__likes">Понравилось { this.props.likes }</div>
            </div>
        );
    }
}

export default Post;
