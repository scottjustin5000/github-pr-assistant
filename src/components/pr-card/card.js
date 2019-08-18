import React from 'react'


class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {
      className
    } = this.props;
    return (
      <div className={classnames("card", className)}>
	{this.props.children}
      </div>
    );
  }
}
const CardWrapper = styled.div`
position: relative;
  max-width: 100%;
  width: 250px;
  min-width: 250px;
  min-height: 350px;
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

}

export default Card