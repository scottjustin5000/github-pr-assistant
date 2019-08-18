const keytar = window.remote ? window.remote.require('keytar') : require('keytar')

const findPassword = (item) => {
  if(keytar && keytar.getPassord) {
      return keytar.getPassword('github-assistant', item.name)
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

const loadTokens = () => {
  const dbs = getTokens()
  return dbs.map(d => {
    d.password = findPassword(d)
    return d
  })
}

const deleteToken = (name) => {
  const tokens = getTokens()
  const updated = tokens.filter(d => d.name !== name)
  window.localStorage.setItem('tokens', JSON.stringify(updated))
}

const saveToken = (settings) => {
  if (settings.password) {
    const password = settings.password
    const key = settings.name
    keytar.setPassword('cache-workbench', key, password)
    settings = Object.assign({}, settings, { password: undefined })
  }
  const tokens = getTokens()
  tokens.push(settings)
  window.localStorage.setItem('tokens', JSON.stringify(tokens))
}

const editToken = (settings) => {
  if (settings.password) {
    const password = settings.password
    const key = settings.name
    keytar.setPassword('github-assistant', key, password)
    settings = Object.assign({}, settings, { password: undefined })
  }
  const tokens = getTokens()
  const item = tokens.find((d) => { return d.name === settings.name })
  if (!item) {
    tokens.push(settings)
  } else {
    item.name = settings.name
    item.userName = settings.userName
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
