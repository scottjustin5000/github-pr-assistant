import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Arrow = styled.span`
width: 13px;
height: 13px;
display: inline-block;
position: relative;
bottom: -5px;
left: -10px;
transition: ${props => props.open ? 'all .25s ease-out' : 'all 0.4s ease-in'};
transform: ${props => props.open ? 'rotate(-45deg)' : 'rotate(45deg)'};
transform-style: preserve-3d;
margin-top: 2px;
text-align: left;

&::before,&::after {
      content: '';
      position: absolute;
      display: inline-block;
      width: 12px;
      height: 3px;
      background-color: #000;
      transition: 0.4s ease;
  }
  &::after {
    position: absolute;
    transform: rotate(90deg);
    top: -5px;
    left: 5px;
  }
`

const DropDownWrapper = styled.div`
-webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  position: relative;
  min-width: 200px;
  transition: 0.15s ease;
 
`

const DropDownHeader = styled.div`
display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  line-height: 38px;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  cursor: default;
  position: relative;
  background-color: #fff;
 span {
  margin-right: 20px;
  cursor: pointer;
  transition: 0.15s ease;
 }
}
`

const HeaderTitle = styled.div`
font-weight: 300;
margin: 2px 20px;
margin-right: 30px;
transition: 0.15s ease;
`

const DropDownList = styled.div`
  overflow:hidden;
  width: 100%;
  position: absolute;
  background-color: #fff;
  font-weight: 300;
  margin:0;
  padding: 5px 0;
  z-index: 2;
  border: 1px solid #dfdfdf;
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  box-shadow: ${props => props.open ? '0 5px 8px -1px #e8e8e8' : ''}
  height: ${props => props.open ? props.length * 36 + 'px' : 0};
  visibility: ${props => !props.open ? 'hidden' : 'visible'};
  transform:  ${props => props.open ? 'scaleY(1)' : 'scaleY(0)'};
  transition: transform 200ms ease-in-out;
  margin-top: -36px;
`
const DropDownListItem = styled.div`
width: 100%;
padding: 8px 10px;
line-height:1.6rem;
cursor: default;
white-space: nowrap;
text-overflow: ellipsis;
`

const ItemWrapper = styled.div`
display: inline-block;
width: 100%;
cursor: pointer;
`
const ItemName = styled.div`
  width: 50%;
  display: inline-block;
  text-align: left;
`

const ItemControlWrapper = styled.div`
  width: 50%; 
  display: inline-block;
`
const ItemControlButton = styled.div`
  width: 50%; 
  cursor: pointer;
  display: inline-block;
`

const TokenSelector = (props) => {
  const [open, setOpen] = useState(false)
  const inputEl = useRef(null)

  const onDocumentClick = (e) => {
    if (inputEl.current.contains(e.target)) return
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', onDocumentClick)
    } else {
      document.removeEventListener('mousedown', onDocumentClick)
    }

    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
    }
  }, [open])

  const selectItem = (item) => {
    props.selectItem(item)
    setOpen(false)
  }

  const onEditClick = (e, item) => {
    props.onEditClick(e, item)
    setOpen(false)
  }

  const onDeleteClick = (e, name) => {
    props.onDeleteClick(e, name)
    setOpen(false)
  }

  return (
    <DropDownWrapper ref={inputEl}>
      <DropDownHeader onClick={() => { setOpen(!open) }}>
        <HeaderTitle>{props.header}</HeaderTitle>
        <Arrow open={open} />
      </DropDownHeader>
      <DropDownList open={open} count={props.items ? props.items.length : 0}>
        { props.items.map((item, i) => {
          return (
            <DropDownListItem key={`ddl-${i}`} onClick={() => selectItem(item)}>
              <ItemWrapper>
                <ItemName>
                  {item.name}
                </ItemName>
                <ItemControlWrapper>
                  <ItemControlButton onClick={(e) => { onEditClick(e, item) }}><FontAwesomeIcon icon={faEdit} /></ItemControlButton>
                  <ItemControlButton onClick={(e) => { onDeleteClick(e, item.name) }}><FontAwesomeIcon icon={faTrash} /></ItemControlButton>
                </ItemControlWrapper>
              </ItemWrapper>
            </DropDownListItem>)
        })}
      </DropDownList>

    </DropDownWrapper>
  )
}

export default TokenSelector
