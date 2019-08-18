import styled from 'styled-components'

const Header = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  height: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 0.25rem 0.25rem 0 0;
  background-image: ${props => props.url ? `url(${props.src})` : ``};
 `

export default Header