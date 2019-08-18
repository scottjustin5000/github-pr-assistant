import styled from 'styled-components'

const Avatar = styled.div`
  position: absolute;
  display: flex;
  flex: 0 0 auto;
  height: 6rem;
  width: 6rem;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  background-image: ${props => props.url ? `url(${props.src})` : ``};
 `

export default Avatar
