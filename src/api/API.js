const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_PATH = 'api/v1';

const ENDPOINT = `${BASE_URL}/${API_PATH}`;

const MY_CHARS_URL = `${ENDPOINT}/mycharacters`;
const NEW_CHAR_URL = `${ENDPOINT}/generate/full_character`;
const GENERATE_URL = `${ENDPOINT}/generate/`;
const USER_URL = `${ENDPOINT}/users`;
const LOGIN_URL = `${ENDPOINT}/login`;
const VALIDATE_URL = `${ENDPOINT}/validate`;
const REFRESH_URL = `${ENDPOINT}/refresh`;
const LOGOUT_URL = `${ENDPOINT}/logout`;

const CHAR_URL = `${ENDPOINT}/characters`;
const CLONE_URL = `${CHAR_URL}/clone`;

async function get(url) {
  const resp = await fetch(url);
  return resp.json();
}

async function post(url, body) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return resp.json();
}

//================ AUTHORISED API CALLS ================//

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return null;

  const resp = await fetch(REFRESH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (resp.ok) {
    const data = await resp.json();
    localStorage.setItem('token', data.token);
    return data.token;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  return null;
}

async function authorizedFetch(url, options = {}) {
  const makeRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

  let resp = await makeRequest(localStorage.getItem('token'));

  if (resp.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) resp = await makeRequest(newToken);
  }

  return resp.json();
}

export function validate() {
  return authorizedFetch(VALIDATE_URL);
}

export function getUser(id) {
  return authorizedFetch(`${USER_URL}/${id}`);
}

export function deleteCharacter(id) {
  return authorizedFetch(CHAR_URL + `/${id}`, { method: 'DELETE' });
}

export const getMyCharacters = () => authorizedFetch(MY_CHARS_URL);

export const cloneCharacter = (characterId) =>
  authorizedFetch(CLONE_URL, {
    method: 'POST',
    body: JSON.stringify({ id: characterId }),
  });

export function updateCharacter(character) {
  return authorizedFetch(`${CHAR_URL}/${character.id}`, {
    method: 'PUT',
    body: JSON.stringify({ character }),
  });
}

//================ OPEN API CALLS ================//

export function getAllCharacters() {
  return get(CHAR_URL);
}

export function generateNewCharacter() {
  return get(NEW_CHAR_URL);
}

export function getCharacterById(id) {
  return get(`${CHAR_URL}/${id}`);
}

export function loginUser(user) {
  return post(LOGIN_URL, user);
}

export function logoutUser(refreshToken) {
  return fetch(LOGOUT_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

export const createCharacter = (character) =>
  authorizedFetch(CHAR_URL, {
    method: 'POST',
    body: JSON.stringify({ character }),
  });

export function generateAttribute(attribute) {
  return get(`${GENERATE_URL}/${attribute}`);
}

export const signUp = (user) => post(USER_URL, { user });
