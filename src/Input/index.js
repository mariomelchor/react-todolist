import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';

const styles = {
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
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function Input(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <form onSubmit={props.additem}>
        <InputBase className={classes.input} placeholder="Add To-Do Item" value={props.value} onChange={props.handleChange} />
        <IconButton type="submit" className={classes.iconButton} aria-label="Search">
          <AddBox />
        </IconButton>
      </form>
    </Paper>
  );
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Input);