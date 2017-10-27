import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import NewsPage from '../pages/NewsPage'
import apiUrls from './../constants/apiUrls';

class App extends React.Component {

    state = {
        postList: [],
        newsPostList: [],
        isLoading: false,
        currentPageName: 'Новости',
        profile: null,
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

        fetch(apiUrls.news, {
            credentials: 'include',
        }).then(
            (body) => body.json()
        ).then(
            (json) => this.setState({ newsPostList: json, isLoading: false })
        );

        fetch(apiUrls.profile, {
            credentials: 'include',
        }).then(
            (body) => body.json()
        ).then(
            (json) => {
                this.setState({ profile: json, isLoading: false })
            }
        );
    }

    onMenuSelect = (currentMenu) => {
        this.setState({ currentPageName: currentMenu });
    };

    render() {
        return (
            <div className="b-wrapper">
                <Link to="/index/HomePage/">Список</Link>
                {/*<Link to="/index/HomePage/"><button>fdjg;sf</button></Link>*/}
                <h1>TaskTracker</h1>
                <Switch>
                    <Route exact path="/index/gh" component={ () => <h2>jhdfbg</h2> } />
                    <Route exact path="/index/HomePage/" render={ props => <HomePage { ...props } onMenuSelect={ this.onMenuSelect } profile={ this.state.profile } />} />
                </Switch>
            </div>
        );
    }
    //     switch (this.state.currentPageName) {
    //         case 'Моя страница':
    //              return (
    //                  <HomePage postList = { this.state.postList} isLoading = { this.state.isLoading }
    //                        onMenuSelect={ this.onMenuSelect } profile={ this.state.profile } />
    //              );
    //              break;
    //         case 'Новости':
    //             return (
    //                 <NewsPage postList = { this.state.newsPostList} isLoading = { this.state.isLoading }
    //                       onMenuSelect={ this.onMenuSelect } />
    //              );
    //             break;
    //         case 'Профиль':
    //             return (
    //                 <ProfilePage profile={ this.state.profile } onMenuSelect={ this.onMenuSelect }/>
    //              );
    //             break;
    //     }
    // }
}

export default App;
