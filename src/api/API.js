const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_PATH = 'api/v1';

const ENDPOINT = `${BASE_URL}/${API_PATH}`;

const CHAR_URL = `${ENDPOINT}/characters`;
const NEW_CHAR_URL = `${ENDPOINT}/generate/full_character`;
const GENERATE_URL = `${ENDPOINT}/generate/`;
const USER_URL = `${ENDPOINT}/users`;
const CLONE_URL = `${ENDPOINT}/clone`;
const LOGIN_URL = `${ENDPOINT}/login`;
const VALIDATE_URL = `${ENDPOINT}/validate`;

async function get(url) {
  const resp = await fetch(url);
  return await resp.json();
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
async function authorizedFetch(url, options = {}) {
  const resp = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });

  return await resp.json();
}

export function validate() {
  return authorizedFetch(VALIDATE_URL);
}

export function deleteCharacter(id) {
  return authorizedFetch(CHAR_URL + `/${id}`, { method: 'DELETE' });
}

export const getMyCharacters = () =>
  authorizedFetch(BASE_URL + '/mycharacters');

export const cloneCharacter = (characterId, userId) => {
  return authorizedFetch(CLONE_URL, {
    method: 'POST',
    body: JSON.stringify({ id: characterId, user: userId }),
  });
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
