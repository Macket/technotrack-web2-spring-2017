import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { SearchForm } from './../components/SearchForm';

describe('<SearchForm />', () => {
    test('search form button', () => {
        const searchSpy = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <SearchForm loadPosts={ searchSpy } url={ '' } />,
        );
        const searchBtn = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            component, 'button',
        )[1];
        ReactTestUtils.Simulate.click(searchBtn);
        expect(searchSpy).toBeCalled();
    });
});