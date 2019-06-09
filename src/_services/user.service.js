import { authHeader, handleResponse } from '../_helpers';

const baseUrl = 'http://localhost:4000';

export const userService = {
    getAll,
    getById,
    create
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${baseUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${baseUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function create(user) {
    const requestOptions = { method: 'POST', headers: authHeader() };
    return fetch(`${baseUrl}/users/`, user, requestOptions).then(handleResponse);
}