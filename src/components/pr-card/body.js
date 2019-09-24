import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: 1rem;
`
const Name = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: #2c3e50;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  color: #7f8c8d;

`
const Body = (props) => {
  return (
    <Wrapper>
      <Name>
        {props.name}
      </Name>
      <Title>
        {props.title}
      </Title>
      {props.children}
    </Wrapper>
  )
}

export default Body
