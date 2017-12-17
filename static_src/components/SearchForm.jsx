import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import SearchInput from 'grommet/components/SearchInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import { loadPosts } from '../actions/postsActions';


export class SearchForm extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        loadPosts: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
        isLoading: false,
    };

    state = {
        query: '',
    };

    handleOnClick = (e) => {
        e.preventDefault();
        const url = `${this.props.url}?query=${this.state.query}`;
        this.props.loadPosts(url);
    };
    handleOnChange = (e) => {
        this.setState({ query: e.target.value });
    };

    render() {
        return (
            <Section align="center" pad="large">
                <Form>
                    <SearchInput placeHolder="Поиск" value={ this.state.query } onDOMChange={ this.handleOnChange } />
                    <Footer pad={ { 'vertical': 'medium' } }>
                        <Button
                            label="Найти"
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


const mapDispatchToProps = dispatch => bindActionCreators({ loadPosts }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
