const BASE_URL = window.location.href.includes('ngrok')
  ? 'https://11e9b152.ngrok.io/api/v1'
  : 'http://localhost:3000/api/v1'

const CHAR_URL = BASE_URL + '/characters'
const NEW_CHAR_URL = BASE_URL + '/generate/full_character'

const getAllCharacters = () => fetch(CHAR_URL).then(resp => resp.json())

const deleteCharacter = id =>
  fetch(CHAR_URL + `/${id}`, { method: 'DELETE' }).then(resp => resp.json())

const createCharacter = character => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character)
  }

  fetch(CHAR_URL, options).then(resp => resp.json())
}

const getCharacterById = id =>
  fetch(`${CHAR_URL}/${id}`).then(resp => resp.json())

const generateNewCharacter = () => fetch(NEW_CHAR_URL).then(resp => resp.json())

export default {
  getAllCharacters,
  deleteCharacter,
  createCharacter,
  getCharacterById,
  generateNewCharacter
}
