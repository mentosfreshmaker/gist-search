import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import mockResponse from './mock_gists.json';
import SingleGist from '../SingleGist';
import Search from '../Search';
import { searchGistByUser } from '../gistService';

it('renders properly with results', () => {
    const { queryByText, getAllByText } = render(mockResponse.map((gist) => {
        return <SingleGist key={gist.id} gist={gist} />
    }));
    // check username exist
    expect(getAllByText(mockResponse[0].owner.login)).not.toBeNull();
    // check no results heading does not exist
    expect(queryByText('No Result Found.')).toBeNull();
});

it('renders properly with no results', () => {
    const result = [];
    const { queryByText } = render(result.map((gist) => {
        return <SingleGist key={gist.id} gist={gist} />
    })
    );
    // check proper heading exists
    expect(queryByText('No Result Found.'));
});
