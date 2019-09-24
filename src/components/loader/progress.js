import React from 'react'
import styled from 'styled-components/macro'

const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 56px;
  height: 56px;

div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid ${props => props.color || '#85D3FF'};
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${props => props.color || '#85D3FF'} transparent transparent transparent;
}

div:nth-child(1) {
  animation-delay: -0.45s;
}

div:nth-child(2) {
  animation-delay: -0.3s;
}

div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`

const CircularProgress = props => {
  return (
    <Ring color='#12233A'><div /><div /><div /><div /></Ring>
  )
}

export default CircularProgress
