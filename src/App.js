import React from 'react';
import List from './List';
import Input from './Input';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.additem = this.additem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
    this.deleteCompletedItem = this.deleteCompletedItem.bind(this);
    this.unCompleteItem = this.unCompleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      items: {
        "todo": [],
        "completed": [],
      },
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

    let items = this.state.items.todo;
    let value = this.state.value;

    if (value.trim === '') {
      alert('this is empty');
      return;
    }

    items.push(this.state.value);
      
    this.setState({
      items: {
        "todo": items,
        "completed": this.state.items.completed,
      },
      value: '',
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.items));

  }

  completeItem(item){
    let items = this.state.items;
    let index = items.todo.indexOf(item);

    items.todo.splice(index,1);
    items.completed.push(item);

    this.setState({
      items: {
        "todo": items.todo,
        "completed": items.completed
      },
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.items));
  }

  unCompleteItem(item){
    let items = this.state.items;
    let index = items.todo.indexOf(item);

    items.completed.splice(index,1);
    items.todo.push(item);

    this.setState({
      items: {
        "todo": items.todo,
        "completed": items.completed
      },
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.items));
  }

  deleteTodoItem(items, item){

    items.splice(item,1);

    this.setState({
      items: {
        "todo": items,
        "completed": this.state.items.completed,
      },
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.items));
    
  }

  deleteCompletedItem(items, item){

    items.splice(item,1);

    this.setState({
      items: {
        "todo": this.state.items.todo,
        "completed": items ,
      },
    });

    localStorage.setItem('todoItems', JSON.stringify(this.state.items));

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

        Todo Items
        { this.state.items.todo && <List items={this.state.items.todo} delete={this.deleteTodoItem} complete={this.completeItem} list="todo" /> }

        Completed Items
        { this.state.items.completed && <List items={this.state.items.completed} delete={this.deleteCompletedItem} complete={this.unCompleteItem} list="completed" /> } 

      </div>
    );
  }
}

export default App;
