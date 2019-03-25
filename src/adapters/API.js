const BASE_URL = window.location.href.includes('ngrok')
  ? 'https://11e9b152.ngrok.io/api/v1'
  : 'http://localhost:3000/api/v1'

const CHAR_URL = BASE_URL + '/characters'
const NEW_CHAR_URL = BASE_URL + '/generate/full_character'

const getAllCharacters = () => fetch(CHAR_URL).then(resp => resp.json())

const getCharacterById = id =>
  fetch(`${CHAR_URL}/${id}`).then(resp => resp.json())

const generateNewCharacter = () => fetch(NEW_CHAR_URL).then(resp => resp.json())

const createCharacter = character => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character)
  }

  return fetch(CHAR_URL, options).then(resp => resp.json())
}

const updateCharacter = character => {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character)
  }

  return fetch(CHAR_URL + `/${character.id}`, options).then(resp => resp.json())
}

const deleteCharacter = id =>
  fetch(CHAR_URL + `/${id}`, { method: 'DELETE' }).then(resp => resp.json())

const generateFirstName = () =>
  fetch(BASE_URL + 'generate/first_name').then(resp => resp.json())

const generateLastName = () =>
  fetch(BASE_URL + 'generate/last_name').then(resp => resp.json())

const generateAlias = () =>
  fetch(BASE_URL + 'generate/alias').then(resp => resp.json())

const generateMotto = () =>
  fetch(BASE_URL + 'generate/motto').then(resp => resp.json())

const generateSpecies = () =>
  fetch(BASE_URL + 'generate/species').then(resp => resp.json())

const generateBio = () =>
  fetch(BASE_URL + 'generate/bio').then(resp => resp.json())

const generateAlignment = () =>
  fetch(BASE_URL + 'generate/alignment').then(resp => resp.json())

const generateTraitsPositive = () =>
  fetch(BASE_URL + 'generate/trait_positive').then(resp => resp.json())

const generateTraitsNegative = () =>
  fetch(BASE_URL + 'generate/trait_negative').then(resp => resp.json())

const generateAge = () =>
  fetch(BASE_URL + 'generate/age').then(resp => resp.json())

const generateGender = () =>
  fetch(BASE_URL + 'generate/gender').then(resp => resp.json())

const generateStatus = () =>
  fetch(BASE_URL + 'generate/status').then(resp => resp.json())

const generateFeats = () =>
  fetch(BASE_URL + 'generate/feats').then(resp => resp.json())

export default {
  getAllCharacters,
  deleteCharacter,
  createCharacter,
  getCharacterById,
  generateNewCharacter,
  updateCharacter,
  generateFirstName,
  generateLastName,
  generateAlias,
  generateMotto,
  generateSpecies,
  generateBio,
  generateAlignment,
  generateTraitsPositive,
  generateTraitsNegative,
  generateAge,
  generateGender,
  generateStatus,
  generateFeats
}
