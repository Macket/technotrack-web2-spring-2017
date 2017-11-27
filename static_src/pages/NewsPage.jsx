import React from 'react';
import PropTypes from 'prop-types';
import PostList from './../components/PostList';
import Layout from './../components/Layout';
import SearchForm from './../components/SearchForm';

class NewsPage extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
    };

    render() {
        return (
            <Layout>
                <SearchForm url={ this.props.url } />
                <PostList url={ this.props.url } />
            </Layout>
        );
    }
}

export default NewsPage;
