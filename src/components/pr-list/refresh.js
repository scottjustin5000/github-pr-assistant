import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

const RefreshButton = styled.button`
height:44px;
-moz-appearance: none;
-moz-appearance: none;
cursor: pointer;
background: #ffffff;
border:solid 1px #dfdfdf;
width: 50px;
:focus{
  outline: none;
}`

const Refresh = styled.div`
padding-right: 15px;
display: flex;
width: 100%;
align-items: flex-end;
justify-content: flex-end;
`

const RefreshList = props => {
  return (
    <Refresh>
      <RefreshButton onClick={props.refresh}><FontAwesomeIcon icon={faRedo} /></RefreshButton>
    </Refresh>
  )
}

RefreshList.prototypes = {
  refresh: PropTypes.func
}

export default RefreshList
