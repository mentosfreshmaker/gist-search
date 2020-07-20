import axios from 'axios';
import { searchGistByUser, searchGistForks } from '../gistService';
import { mockGists } from './mock_gists.json';

jest.mock('axios');

describe('searchGistByUser', () => {
    it('should return array', () => {
        const username = 'schacon';
        const results = searchGistByUser(username)
        expect(results).toBeTruthy();
    });

    it('should fetch data from an API', async () => {
        axios.get.mockImplementationOnce(() =>
            Promise.resolve(mockGists)
        );
        await expect(searchGistByUser('schacon')).resolves.toEqual(mockGists);
    });
})

describe('searchGistForks', () => {
    it('should return array', () => {
        const forkUrl = 'https://api.github.com/gists/793c8fdea738fd3d04a7/forks';
        const results = searchGistForks(forkUrl)
        expect(results).toBeTruthy();
    })
})
