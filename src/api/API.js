// const BASE_URL = 'https://mythos-server.herokuapp.com/api/v1'
const BASE_URL = 'http://localhost:8080/api/v1';

const CHAR_URL = BASE_URL + '/characters';
const NEW_CHAR_URL = BASE_URL + '/generate/full_character';
const GENERATE_URL = BASE_URL + '/generate/';
const USER_URL = BASE_URL + '/users';
const CLONE_URL = CHAR_URL + '/clone';

//================ AUTHORISED API CALLS ================//

//Used to control access to authorised endpoint for signed up users only
const authorizedFetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  });
};

export const validate = () =>
  authorizedFetch(BASE_URL + '/validate').then(resp => resp.json());

export const deleteCharacter = (id) =>
  authorizedFetch(CHAR_URL + `/${id}`, { method: 'DELETE' }).then(resp =>
    resp.json()
  );

export const getMyCharacters = () =>
  authorizedFetch(BASE_URL + '/mycharacters').then(resp => resp.json());

export const cloneCharacter = (characterId, userId) => {
  return authorizedFetch(CLONE_URL, {
    method: 'POST',
    body: JSON.stringify({ id: characterId, user: userId })
  }).then(resp => resp.json());
};

export const updateCharacter = character =>
  fetch(CHAR_URL + `/${character.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character)
  }).then(resp => resp.json());

//================ OPEN API CALLS ================//

function get(url) {
  return fetch(url).then(resp => resp.json());
}

export const getAllCharacters = () => get(CHAR_URL);

export const generateNewCharacter = () => fetch(NEW_CHAR_URL).then(resp => resp.json());

export const getCharacterById = (id) =>
  fetch(`${CHAR_URL}/${id}`).then(resp => resp.json());

export const loginUser = (user) => {
  return fetch(BASE_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(resp => resp.json());
};

export const createCharacter = characterData => {
  return fetch(CHAR_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ character: characterData })
  }).then(resp => resp.json());
};

export const generateAttribute = attribute =>
  fetch(GENERATE_URL + `${attribute}`).then(resp => resp.json());

export const signUp = userData => {
  return fetch(USER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userData })
  }).then(resp => resp.json());
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
