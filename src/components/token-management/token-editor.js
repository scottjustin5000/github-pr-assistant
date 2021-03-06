import React from 'react'
import styled from 'styled-components'

const ModalWrapper = styled.div`
position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.show ? `block` : `none`};
`

const ConfigRow = styled.div`
width: 100%; 
display:flex; 
justify-content:center; 
padding-top:20px;
`

const MainModal = styled.div`
display: flex;
flex-direction: column;
position:absolute;
z-index:100;
background: white;
height: auto;
top:50%;
left:50%;
min-height: 340px;
min-width: 300px;
border-radius: 3px;
padding:5px;
transform: translate(-50%,-50%);
`

const NameTextBox = styled.input`
type: text;
height: 44px;
width: 80%;
`
const ConfigButton = styled.button`
height:44px;
-moz-appearance: none;
-moz-appearance: none;
cursor: pointer;
width:80px;
color: ${props => props.color ? props.color : '#000000'}
background: ${props => props.background};
border: ${props => props.border};
:focus{
  outline: none;
} 
`

const ButtonWrapper = styled.div`
width:90%;
display: flex; 
justify-content:flex-end;
padding-top:20px;
`

const TokenWrapper = styled.div`
width: 100%; 
display: flex;
justify-content:center;
padding-top:20px;
`

const TokenEditor = (props) => {
  const onTokenNameChange = (val) => {
    props.onTokenChanged('name', val.target.value)
  }
  const onUserNameChange = (val) => {
    props.onTokenChanged('userName', val.target.value)
  }
  const onTokenChange = (val) => {
    props.onTokenChanged('value', val.target.value)
  }

  const onOwnerChange = (val) => {
    props.onTokenChanged('owner', val.target.value)
  }
  return (
    <ModalWrapper show={props.show}>
      <MainModal>
        <ConfigRow>
      GitHub API Configuration
        </ConfigRow>
        <ConfigRow>
          <NameTextBox placeholder=' Token Name' onChange={onTokenNameChange} value={props.token.name} />
        </ConfigRow>
        <ConfigRow>
          <NameTextBox placeholder=' Owner' onChange={onOwnerChange} value={(props.token.owner || '')} />
        </ConfigRow>
        <ConfigRow>
          <NameTextBox placeholder=' User Name' onChange={onUserNameChange} value={props.token.userName} />
        </ConfigRow>
        <TokenWrapper>
          <NameTextBox placeholder=' Token' onChange={onTokenChange} value={props.token.value} />
        </TokenWrapper>
        <ButtonWrapper>
          <ConfigButton background='#ffffff' border='solid 1px #dfdfdf' onClick={props.onCancel}>CANCEL</ConfigButton>
          <ConfigButton background='#6cc644' color='#ffffff' border='none' onClick={props.onSubmit}>SUBMIT</ConfigButton>
        </ButtonWrapper>
      </MainModal>
    </ModalWrapper>
  )
}
export default TokenEditor
