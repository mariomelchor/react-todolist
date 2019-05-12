import React from 'react';
import List from './List';
import Input from './Input';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.additem = this.additem.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      items: [],
      value: ''
    }
  }

  componentDidMount(){

    let items = localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : this.state.items;
    
    if( !items ){
      return;
    }

    localStorage.setItem('todoItems', JSON.stringify(items));
    
    this.setState({
      items,
    });
  }

  additem(event) {
    event.preventDefault();

    let items = this.state.items;
    items.push(this.state.value);

    this.setState({
      items,
    });

    localStorage.setItem('todoItems', JSON.stringify(items));
  }


  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {

    return (
      <div className="App">
        <Input additem={this.additem} value={this.state.value} handleChange={this.handleChange} />
        <List items={this.state.items} />
      </div>
    );
  }
}

export default App;
