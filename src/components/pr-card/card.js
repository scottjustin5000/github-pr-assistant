import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
position: relative;
  max-width: 100%;
  width: 220px;
  min-width: 220px;
  min-height: 200px;
  display: flex;
  flex-flow: column;
  background-color: #ecf0f1;
  border-radius: 0.25rem;
  margin: 1rem;
  user-select: none;
  transition: 0.25s;
  
  &.float:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 10px -10px rgba(#7f8c8d, 1);
  }
`

const Card = (props) => {
  return (
    <CardWrapper>
      { props.children }
    </CardWrapper>
  )
}

export default Card
