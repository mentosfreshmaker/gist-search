import axios from 'axios';

const gistUrl = 'https://api.github.com';
export async function searchGistByUser(username) {
    const url = gistUrl + '/users/' + username + '/gists';
    return await axios({
        method: 'GET',
        url: url
    });
}

export async function searchGistForks(gistId) {
    const url = gistUrl + '/gists/' + gistId + '/forks';
    return await axios({
        method: 'GET',
        url: url
    });
}
