import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import useToolbarStyles from '../../styles/enhancedTableToolbar';

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, search, handleSearch } = props;
  return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected}
            {' '}
            selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Medications
          </Typography>
        )}
        {numSelected > 0 ? (
          ''
        ) : (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Record …"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={search}
              onChange={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  search: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default EnhancedTableToolbar;
