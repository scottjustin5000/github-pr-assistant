const keytar = window.remote ? window.remote.require('keytar') : require('keytar')

const findPassword = (item) => {
  if (keytar && keytar.getPassword) {
    return keytar.getPassword('githubassistant', item.name).catch((err) => { console.log(err) })
  }
}

const getTokens = () => {
  const data = window.localStorage.getItem('tokens')
  return data ? JSON.parse(data) : []
}

const getToken = (name) => {
  const tokens = getTokens() || []
  return tokens.find(d => d.name !== name)
}

const loadTokens = async () => {
  const tokens = getTokens()
  for (let token of tokens) {
    let value = await findPassword(token)
    token.value = value
  }
  return tokens
}

const deleteToken = (name) => {
  const tokens = getTokens()
  const updated = tokens.filter(d => d.name !== name)
  window.localStorage.setItem('tokens', JSON.stringify(updated))
}

const saveToken = (settings) => {
  if (settings.value) {
    const value = settings.value
    const key = settings.name

    keytar.setPassword('githubassistant', key, value)
    settings = Object.assign({}, settings, { value: undefined })
  }
  const tokens = getTokens()
  tokens.push(settings)
  window.localStorage.setItem('tokens', JSON.stringify(tokens))
}

const editToken = async (settings) => {
  if (settings.value) {
    const value = settings.value
    const key = settings.name
    await keytar.setPassword('githubassistant', key, value)
    settings = Object.assign({}, settings, { value: undefined })
  }
  const tokens = getTokens()
  const item = tokens.find((d) => { return d.name === settings.name })
  if (!item) {
    tokens.push(settings)
  } else {
    item.name = settings.name
    item.userName = settings.userName
    item.owner = settings.owner
    item.value = settings.value
  }
  window.localStorage.setItem('tokens', JSON.stringify(tokens))
}

export default {
  loadTokens,
  saveToken,
  editToken,
  deleteToken,
  getToken
}
