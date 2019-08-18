import React, { useState, useEffect, useRef  } from 'react'
import styled from 'styled-components'
import TokenService  from './services/token-manager'
import TokenSelector from './components/token-management/token-selector'
import TokenEditor from './components/token-management/token-editor'

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
const App = () => {
  const tokens = TokenService.loadTokens()
  const [items, setItems] = useState(tokens || [])
  const [showEditor, setShowEditor] = useState(false)
  console.log(tokens)

  useEffect(() => {
    return () => {
    }
  },[])

  const selectItem =(item) => {


  }

  const onShowEditor =(e) => {
    setShowEditor(true)
  }

  const closeEditor =() => {
    setShowEditor(false)
  }

  const saveToken = (token) => {
    TokenService.saveToken(token)
    setItems(TokenService.loadTokens())
    console.log('TOKEN', token)
    setShowEditor(false)
  }

  return (<div style={{display:'flex', fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', fontWeight:400, lineHeight: '1.5em'}}>
    <div style={{maxWidth:'220px'}}>
    <TokenSelector items={items} selectItem={selectItem} header={'Token'} />
    </div>
    <div>
     <NewButton onClick={onShowEditor}>NEW</NewButton>
    </div>
    <TokenEditor show={showEditor} onCancel={closeEditor} onSubmit={saveToken}></TokenEditor>
  </div>)
}

export default App
