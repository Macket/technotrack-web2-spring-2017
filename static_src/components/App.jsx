import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import './../styles/base.scss';
import apiUrls from './../constants/apiUrls';


class App extends React.Component {
    state = {
        postList: [],
        isLoading: false,
    };

    onPostCreate = (post) => {
        this.setState({
            postList: [post, ...this.state.postList],
        });
    };

    componentDidMount() {
        this.setState({ isLoading: true});
        fetch(apiUrls.posts, {
            credentials: 'include',
        }).then(
            (body) => body.json()
        ).then(
            (json) => this.setState({ postList: json, isLoading: false })
        );
    }

    render() {
        return (
            <div className="b-wrapper">
                <h1>Посты</h1>
                <PostForm onCreate={this.onPostCreate()} />
                <PostList isLoading={this.state.isLoading} postList={this.state.postList} />
            </div>
        )
    }
}

export default App;
