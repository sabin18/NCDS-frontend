import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
  {
    id: 'Name', numeric: false, disablePadding: true, label: 'Name',
  },
  {
    id: 'District', numeric: false, disablePadding: false, label: 'District',
  },
  {
    id: 'Sector', numeric: false, disablePadding: false, label: 'Sector',
  },
  {
    id: 'Owner', numeric: false, disablePadding: false, label: 'Owner',
  },
  {
    id: 'Owner Phone', numeric: true, disablePadding: false, label: 'Owner Phone',
  },
  {
    id: 'Owner Email', numeric: false, disablePadding: false, label: 'Owner Email',
  },
  {
    id: 'Payed Date', numeric: false, disablePadding: false, label: 'Payed Date',
  },
  {
    id: 'Expiry Date', numeric: false, disablePadding: false, label: 'Expiry Date',
  },
  {
    id: 'Actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const EnhancedTableHead = (props) => {
  const {
    classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
