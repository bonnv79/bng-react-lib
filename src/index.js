import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Button, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const ChipsArray = ({
  data: chipData = [],
  onChange = () => { }
}) => {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => () => {
    const newData = (chips) => chips.filter((chip) => chip.key !== chipToDelete.key);
    onChange(newData);
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}

export default {
  Button,
  Icon
}