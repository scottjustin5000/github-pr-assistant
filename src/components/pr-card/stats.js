import React from 'react'
import styled from 'styled-components'

const StatsWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  font-size: 0.75rem;
`
const StatsContainer = styled.div`
  border-top: 2px solid rgba(#7f8c8d, 0.2);
  border-right: 2px solid rgba(#7f8c8d, 0.2);
  min-width: 4rem;
  padding: 0.25rem;
  &:last-child {
    border-right: none;
  }
`
const StatValue = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  color: #2c3e50;
  font-weight: bold;
`

const StatName = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  color: #7f8c8d;
`
const Stats = (props) => {

  
    return (
      <StatsWrapper>
	{
	  stats.map((stat, i) => {
	    return (
      <StatsContainer key={`stat-container-${i}`}>
        <StatValue>
          {stat.value}
        </StatValue>
          <StatName>
          {stat.name}
        </StatName>`
	    </StatsContainer>
	    )
	  })
	}
      </StatsWrapper>
    )
  }

export default Stats;