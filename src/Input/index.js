import React from 'react';

class Input extends React.Component {
  render(){
    return(
      <div>
        <form onSubmit={this.props.additem}>
          <input name="todoitem" type="text" value={this.props.value} onChange={this.props.handleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default Input;