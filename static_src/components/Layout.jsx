import React from 'react';
import {Link} from 'react-router-dom';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Section from 'grommet/components/Section'
import Menu from 'grommet/components/Menu'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import Article from 'grommet/components/Article'
import User from 'grommet/components/icons/base/User'
import 'grommet/grommet.min.css';

class Layout extends React.Component {

    render() {
        return (
            <Article>
                <Header colorIndex='brand'>
                    <Title>
                        Track-WEB2
                    </Title>
                </Header>
                <Section pad='none'>
                    <Split flex='right' fixed={true}>
                        <Sidebar colorIndex='light' size='medium' full={false}>
                            <Menu>
                                <Link className="b-side-menu-link" to="/index/home/">Домашняя страница</Link>
                                <Link className="b-side-menu-link" to="/index/news/">Новости</Link>
                                <Link className="b-side-menu-link" to="/index/users/">Все пользователи</Link>
                                <Link className="b-side-menu-link" to="/index/profile/">Профиль</Link>
                            </Menu>
                            <Footer>
                                <Button icon={<User  />}/>
                            </Footer>
                        </Sidebar>
                        <Section colorIndex='light-2' pad='none'>
                            {this.props.children}
                        </Section>
                    </Split>
                </Section>
            </Article>
        )
    }
}

export default Layout;