import React from 'react';
import CheckboxList from './List';
import TodoInput from './TodoInput';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Ballot from '@material-ui/icons/Ballot';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: '50px',
  },
  logo: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
  }
};

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
      value: '',
      tab: 0,
    }
  }

  componentDidMount(){
    // Load items from  Local Storage or Component State.
    let items = localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : this.state.items;
    
    if( !items ){
      return;
    }

    this.saveItems(items);  
  }

  // Handles Tab Change
  tabChange = (event, tab) => {
    this.setState({ tab });
  }

  // Handle Input Change
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  // Saving items to local storage and setting state
  saveItems(obj){
    localStorage.setItem('todoItems', JSON.stringify(obj));

    this.setState(obj);
  }

  // Handles adding an item 
  additem(event) {
    event.preventDefault();

    let items = this.state.items.todo;
    let value = this.state.value;

    if (value.trim() === '') {
      alert('this is empty');
      return;
    } else if ( items.includes(value) ) {
      alert('already in array');
      return;
    }

    items.push(value);

    const newItems = {
      items: {
        "todo": items,
        "completed": this.state.items.completed,
      },
      value: '',
      tab: 0
    }
      
    this.saveItems(newItems);

    this.setState({
      value: newItems.value,
      tab: newItems.tab
    })

  }

  // Handles completing an item
  completeItem(item){
    let items = this.state.items;
    let index = items.todo.indexOf(item);

    items.todo.splice(index,1);
    items.completed.push(item);

    const newItems = {
      items: {
        "todo": items.todo,
        "completed": items.completed
      },
    }

    this.saveItems(newItems);

  }

  // Removig from complete
  unCompleteItem(item){
    let items = this.state.items;
    let index = items.todo.indexOf(item);

    items.completed.splice(index,1);
    items.todo.push(item);

    const newItems = {
      items: {
        "todo": items.todo,
        "completed": items.completed
      },
    }

    this.saveItems(newItems);

  }

  // Deleting an Item
  deleteTodoItem(items, item){
    items.splice(item,1);

    const newItems = {
      items: {
        "todo": items,
        "completed":  this.state.items.completed,
      },
    }

    this.saveItems(newItems);
    
  }

  // Deleting Completed Item
  deleteCompletedItem(items, item){
    items.splice(item,1);

    const newItems = {
      items: {
        "todo": this.state.items.todo,
        "completed": items,
      },
    }

    this.saveItems(newItems);

  }

  render() {

    const { classes } = this.props;
    const { tab } = this.state;

    return (
      <div className={`${classes.root} App`}>
        <CssBaseline />
     
        <Grid container justify="center" alignItems="center">

          <Grid item xs={12}>
            <img className={classes.logo} src="todo-list-logo.png" alt="To-Do List" />
          </Grid>

          <Grid item xs={10} md={6} lg={4}>

            <TodoInput className={classes.search} additem={this.additem} value={this.state.value} handleChange={this.handleChange} />

            <Paper>
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.tab}
                  onChange={this.tabChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary">
                  <Tab icon={<Ballot />} label="TO-DO" />
                  <Tab icon={<CheckCircle />} label="COMPLETED" />
                </Tabs>
              </AppBar>

              { tab === 0 && <CheckboxList items={this.state.items.todo} delete={this.deleteTodoItem} complete={this.completeItem} list="todo" /> }
              { tab === 1 && <CheckboxList items={this.state.items.completed} delete={this.deleteCompletedItem} complete={this.unCompleteItem} list="completed" /> } 

            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);