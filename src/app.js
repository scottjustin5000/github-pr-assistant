import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TokenService from './services/token-manager'
import Github from './services/github'
import TokenSelector from './components/token-management/token-selector'
import TokenEditor from './components/token-management/token-editor'
import Loader from './components/loader'
import PrList from './components/pr-list'

const NewButton = styled.button`
height:44px;
-moz-appearance: none;
-moz-appearance: none;
cursor: pointer;
background: #ffffff;
border:solid 1px #dfdfdf;
:focus{
  outline: none;
} 
`
const AppWrapper = styled.div`
  font-family:"Roboto", "Helvetica", "Arial", sans-serif;
  font-weight:400;
  line-height: 1.5em
`

const ListWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
flex-flow: wrap;
`
const App = () => {
  const defaultToken = { name: '', owner: '', userName: '', value: '' }
  const [selectedToken, setSelectedToken] = useState(defaultToken)
  const [items, setItems] = useState([])
  const [showEditor, setShowEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState([])

  useEffect(() => {
    const fetchTokens = async () => {
      const tokens = await TokenService.loadTokens()
      setItems(tokens)
    }

    fetchTokens()

    return () => {
    }
  }, [])

  const selectItem = async (item) => {
    setSelectedToken(item)
    setLoading(true)
    const repos = await Github.loadOrgPrStats(item.value, item.owner)
    setLoading(false)
    setStats(repos)
  }

  const onShowEditor = (e) => {
    setShowEditor(true)
  }

  const cancelEditor = () => {
    setSelectedToken(defaultToken)
    setShowEditor(false)
  }

  const saveToken = async () => {
    TokenService.editToken(selectedToken)
    const tokens = await TokenService.loadTokens()
    setItems(tokens)
    setShowEditor(false)
  }

  const onTokenChanged = (key, value) => {
    const obj = {}
    obj[key] = value
    const copiedToken = Object.assign({}, selectedToken, obj)
    setSelectedToken(copiedToken)
  }

  const onEditClick = (e, item) => {
    e.stopPropagation()
    const copiedToken = Object.assign({}, item)
    setSelectedToken(copiedToken)
    setShowEditor(true)
  }

  const onDeleteClick = async (e, name) => {
    e.stopPropagation()
    TokenService.deleteToken(name)
    const tokens = await TokenService.loadTokens()
    setItems(tokens)
  }

  const refreshList = async () => {
    setLoading(true)
    const repos = await Github.loadOrgPrStats(selectedToken.value, selectedToken.owner)
    setLoading(false)
    setStats(repos)
  }

  return (

    <AppWrapper>
      <div style={{display: 'flex'}}>
        <div style={{maxWidth: '220px'}}>
          <TokenSelector
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            items={items}
            selectItem={selectItem}
            header={'Token'} />
        </div>
        <div>
          <NewButton onClick={onShowEditor}>NEW</NewButton>
        </div>
      </div>
      <TokenEditor
        token={selectedToken}
        onTokenChanged={onTokenChanged}
        show={showEditor}
        onCancel={cancelEditor}
        onSubmit={saveToken} />
      { loading && <Loader /> }

      <ListWrapper>
        <PrList refresh={refreshList} stats={stats} />
      </ListWrapper>
    </AppWrapper>)
}
export default App
