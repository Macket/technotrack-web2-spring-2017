import React from 'react';
import PropTypes from 'prop-types';
import PostList from './../components/PostList';
import Layout from './../components/Layout';

class NewsPage extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
    };

    render() {
        return (
            <Layout>
                <PostList url={ this.props.url } />
            </Layout>
        )
    }
}

export default NewsPage;