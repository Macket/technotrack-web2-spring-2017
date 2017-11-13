import React from 'react';
import PropTypes from 'prop-types';
import PostList from './../components/PostList';
import Layout from './../components/Layout';
import UserInfo from './../components/UserInfo';
import Section from 'grommet/components/Section'

class UserPage extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {

    };

    render() {
        const url = `${this.props.url}?author_id=${this.props.match.params.id}`;
        return (
            <Layout>
                <UserInfo id={ Number(this.props.match.params.id) } />
                <Section align="center" pad="none" ><h1>Посты</h1></Section>
                <PostList url={ url } />
            </Layout>
        );
    }
}

export default UserPage;
