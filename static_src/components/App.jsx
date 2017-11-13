import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import NewsPage from '../pages/NewsPage'
import UserListPage from '../pages/UserListPage'
import UserPage from '../pages/UserPage'
import apiUrls from './../constants/apiUrls';

const Users = () => (
    <Switch>
        <Route exact path="/index/users/" render={ props => <UserListPage { ...props } url={ apiUrls.users } /> }/>
        <Route path="/index/users/:id" render={ props => <UserPage { ...props } url={ apiUrls.posts } /> } />
    </Switch>);

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/index/home/" render={ props => <HomePage { ...props } url={ apiUrls.posts } /> } />
                <Route exact path="/index/news/" render={ props => <NewsPage { ...props } url={ apiUrls.news } /> } />
                <Route path="/index/users/" component={ Users } />
                <Route exact path="/index/profile/" component={ () => <ProfilePage /> } />
            </Switch>
        );
    }
}

export default App;
