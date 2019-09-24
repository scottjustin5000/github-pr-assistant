import React from 'react'
import styled from 'styled-components'

import PrCard from './pr-card'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
flex-flow: wrap;
`
const PrList = props => {
  if (!props.stats || !props.stats.length) return <div />

  return (
    <Container>
      {
        props.stats.map(m => {
          return (<PrCard
            key={m.login}
            stats={[{name: 'Pr', value: m.openPrs.length}, {name: 'Reviews', value: m.reviewRequests.length}]}
            name={m.login}
            avatar={m.avatarUrl}
          />)
        })
      }
    </Container>
  )
}

export default PrList
