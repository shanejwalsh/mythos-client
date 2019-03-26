const BASE_URL = window.location.href.includes("ngrok")
  ? "https://11e9b152.ngrok.io/api/v1"
  : "http://localhost:3000/api/v1"

const CHAR_URL = BASE_URL + "/characters"
const NEW_CHAR_URL = BASE_URL + "/generate/full_character"
const GENERATE_URL = BASE_URL + "/generate/"
const USER_URL = BASE_URL + "/users"
const CLONE_URL = CHAR_URL + ":id/clone"

const getAllCharacters = () => fetch(CHAR_URL).then(resp => resp.json())

const getCharacterById = id =>
  fetch(`${CHAR_URL}/${id}`).then(resp => resp.json())

const generateNewCharacter = () => fetch(NEW_CHAR_URL).then(resp => resp.json())

const createCharacter = character => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(character)
  }

  return fetch(CHAR_URL, options).then(resp => resp.json())
}

const updateCharacter = character => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(character)
  }

  return fetch(CHAR_URL + `/${character.id}`, options).then(resp => resp.json())
}

const deleteCharacter = id =>
  fetch(CHAR_URL + `/${id}`, { method: "DELETE" }).then(resp => resp.json())

const generateAttribute = attribute =>
  fetch(GENERATE_URL + `${attribute}`).then(resp => resp.json())

const createNewUser = userData => {
  userData.username = "@" + userData.username

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: userData })
  }

  return fetch(USER_URL, options).then(resp => resp.json())
}

const cloneCharcter = (characterId, userId) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: characterId, user: userId })
  }

  return fetch(CLONE_URL, options).then(resp => resp.json())
}

export default {
  getAllCharacters,
  deleteCharacter,
  createCharacter,
  getCharacterById,
  generateNewCharacter,
  updateCharacter,
  generateAttribute,
  createNewUser,
  cloneCharcter
}
