import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { publishPost } from '../actions/postsActions'
import apiUrls from './../constants/apiUrls';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import TextInput from 'grommet/components/TextInput'
import Section from 'grommet/components/Section'


class PostForm extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        publishPost: PropTypes.func.isRequired,
    };

    static defaultProps = {
    };

    state = {
        text: '',
        title: '',
    };

    handleOnClick = (e) => {
        e.preventDefault();
        this.props.publishPost(apiUrls.posts, JSON.stringify(this.state));
    };
    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Section align="center" pad="large">
                <Form>
                    <Header size="small">
                        <Heading tag="h3" strong={ true }>
                            Новый пост
                        </Heading>
                    </Header>
                    <FormFields>
                        <TextInput onDOMChange={ this.handleOnChange } value={ this.state.title } name="title" placeholder="Заголовок" />
                        <FormField>
                            <TextInput onDOMChange={ this.handleOnChange } value={ this.state.text } name="text" placeholder="Текст..."  />
                        </FormField>
                    </FormFields >
                    <Footer pad={ { 'vertical': 'medium' } }>
                        <Button
                            label="Опубликовать"
                            type="submit"
                            primary={ true }
                            onClick={ this.handleOnClick }
                        />
                    </Footer>
                </Form>
            </Section>
        );
    }
}

const mapStateToProps = ({ postsReducer }) => {
    return {
        isLoading: postsReducer.isLoading,
    };
};


const mapDispatchToProps = dispatch => bindActionCreators({ publishPost }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

