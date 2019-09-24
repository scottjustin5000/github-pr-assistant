import React from 'react'
import styled from 'styled-components'
import Card from './card'
import Header from './header'
import Body from './body'
import Stats from './stats'

const CardLink = styled.a`
  display: flex;
  text-decoration: none;
`
const PrCard = (props) => {
  return (<CardLink>
    <Card>
      <Header src={props.avatar} />
      <Body
        name={props.name}
        positionName={props.positionName}
      >
        {props.children}
      </Body>
      { props.stats && <Stats stats={props.stats} /> }
    </Card>
  </CardLink>)
}

export default PrCard
