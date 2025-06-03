// const BASE_URL = 'https://mythos-server.herokuapp.com/api/v1'
// const BASE_URL = 'http://localhost:8080/api/v1';

// use the env variable for the base URL in production
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const PATH = '/api/v1';

const ENDPOINT = `${BASE_URL}/${PATH}`;

const CHAR_URL = `${ENDPOINT}/characters`;
const NEW_CHAR_URL = `${ENDPOINT}/generate/full_character`;
const GENERATE_URL = `${ENDPOINT}/generate/`;
const USER_URL = `${ENDPOINT}/users`;
const CLONE_URL = `${ENDPOINT}/clone`;
const LOGIN_URL = `${ENDPOINT}/login`;

function get(url) {
  return fetch(url).then((resp) => resp.json());
}

export async function post(url, body) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await resp.json();

  return json;
}

//================ AUTHORISED API CALLS ================//

//Used to control access to authorised endpoint for signed up users only
const authorizedFetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const validate = () =>
  authorizedFetch(BASE_URL + '/validate').then((resp) => resp.json());

export const deleteCharacter = (id) =>
  authorizedFetch(CHAR_URL + `/${id}`, { method: 'DELETE' }).then((resp) =>
    resp.json()
  );

export const getMyCharacters = () =>
  authorizedFetch(BASE_URL + '/mycharacters').then((resp) => resp.json());

export const cloneCharacter = (characterId, userId) => {
  return authorizedFetch(CLONE_URL, {
    method: 'POST',
    body: JSON.stringify({ id: characterId, user: userId }),
  }).then((resp) => resp.json());
};

export function updateCharacter(character) {
  return post(`${CHAR_URL}/${character.id}`, character);
}

//================ OPEN API CALLS ================//

// export const post = (url, body) => {
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   }).then((resp) => resp.json());
// };

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

export const createCharacter = (character) => {
  return post(CHAR_URL, { character });
};

export function generateAttribute(attribute) {
  return get(`${GENERATE_URL}/${attribute}`);
}

export const signUp = (user) => {
  return post(USER_URL, { user });
};

// export default {
//   login,
//   validate,
//   getMyCharacters,
//   getAllCharacters,
//   deleteCharacter,
//   createCharacter,
//   getCharacterById,
//   generateNewCharacter,
//   updateCharacter,
//   generateAttribute,
//   cloneCharacter,
//   signUp
// };
