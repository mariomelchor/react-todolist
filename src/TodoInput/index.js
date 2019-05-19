import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';

const styles = {
  form: {
    marginBottom: '20px',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

function ToDoInput(props) {
  const { classes } = props;

  return (
    <form className={classes.form} onSubmit={props.additem}>
      <Paper className={classes.root}>
        <InputBase className={classes.input} placeholder="Add To-Do Item" value={props.value} onChange={props.handleChange} required={true}/>
        <IconButton type="submit" className={classes.iconButton} aria-label="Search">
          <AddBox />
        </IconButton>
      </Paper>
    </form>
  );
}

ToDoInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoInput);