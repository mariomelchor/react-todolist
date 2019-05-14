import React from 'react';
import CheckboxList from './List';
import Input from './Input';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Ballot from '@material-ui/icons/Ballot';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: '50px',
  },
  search: {
    padding: '40px',
    marginBottom: '20px',
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

    let items = localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : this.state.items;
    
    if( !items ){
      return;
    }

    localStorage.setItem('todoItems', JSON.stringify(items));
    
    this.setState({
      items,
    });
  }

  tabChange = (event, tab) => {
    this.setState({ tab });
  };

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

    const { classes } = this.props;
    const { tab } = this.state;

    return (
      <div className={`${classes.root} App`}>
      <CssBaseline />
     
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          
      <Paper className={classes.search} square>
        <Input additem={this.additem} value={this.state.value} handleChange={this.handleChange} />
      </Paper>

      <Paper square>
        <Tabs
          value={this.state.tab}
          onChange={this.tabChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Ballot />} label="TO-DO" />
          <Tab icon={<CheckCircle />} label="COMPLETED" />
        </Tabs>

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
