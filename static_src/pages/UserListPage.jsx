import React from 'react';
import PropTypes from 'prop-types';
import UserList from './../components/UserList';
import Layout from './../components/Layout';

class NewsPage extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
    };

    render() {
        return(
            <Layout>
                <UserList url={ this.props.url }/>
            </Layout>
        )
    }
}

export default NewsPage;