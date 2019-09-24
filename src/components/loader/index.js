import React from 'react'
import styled from 'styled-components'
import Progress from './progress'
const Wrapper = styled.div`
  position:absolute;
  width:100%;
  margin-top: 30%;
  z-index: 10;
`
const LoadingContainer = styled.div`
display: flex;
height: 100%;
justify-content: center;
align-items: center;
`

const Loader = () => {
  return (
    <Wrapper>
      <LoadingContainer>
        <Progress color='#122334' />
      </LoadingContainer>
    </Wrapper>
  )
}

export default Loader
