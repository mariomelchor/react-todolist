import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxList extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {this.props.items.map((item, index) => (
          <ListItem key={index} role={undefined} onClick={() => this.props.complete(item)} dense button>
            <Checkbox
              checked={this.props.list === 'completed' ? true : false}
              tabIndex={-1}
              color="primary"
            />
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments" onClick={() => this.props.delete(this.props.items,item)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);