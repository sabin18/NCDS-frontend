import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TableStyles from '../../styles/patientsTableStyles';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
const searching = (search) => (x) => x.invoiceNumber.toLowerCase().includes(search.toLowerCase())
|| x.date.toLowerCase().includes(search.toLowerCase())
|| x.expiryDate.toLowerCase().includes(search.toLowerCase())
|| x.patient.firstName.toLowerCase().includes(search.toLowerCase())
|| x.patient.lastName.toLowerCase().includes(search.toLowerCase())
|| x.patient.phone.toLowerCase().includes(search.toLowerCase())
|| x.users.lastName.toLowerCase().includes(search.toLowerCase())
|| x.users.firstName.toLowerCase().includes(search.toLowerCase())
|| x.users.phoneNumber.toLowerCase().includes(search.toLowerCase())
|| x.pharmacy.name.toLowerCase().includes(search.toLowerCase())
|| !search;

// table component
const EnhancedTable = (props) => {
  const { data, search, handleSearch } = props;
  const rows = data;
  const classes = TableStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} handleSearch={handleSearch} search={search} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .filter(searching(search)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {row.invoiceNumber}
                      </TableCell>
                      <TableCell align="left">
                        {row.patient.firstName} {row.patient.lastName}
                      </TableCell>
                      <TableCell align="left">
                        {row.patient.phone}
                      </TableCell>
                      <TableCell align="left">
                        {row.diseases.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.medications.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.quantity} {row.quantityType}
                      </TableCell>
                      <TableCell align="left">
                        {row.date}
                      </TableCell>
                      <TableCell align="left">
                        {row.expiryDate}
                      </TableCell>
                      <TableCell align="left">
                        {row.pharmacy.name}
                      </TableCell>
                      <TableCell align="right">
                      <ButtonGroup>
                      <Link to={`/diseases/${row.id}`}>
                      <Tooltip title="Edit">
                                  <IconButton aria-label="Edit">
                                    <EditIcon />
                                  </IconButton>
                      </Tooltip>
                      </Link>
                      </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};
export default EnhancedTable;

EnhancedTable.propTypes = {
  data: PropTypes.object,
  search: PropTypes.string,
  handleSearch: PropTypes.func,
};
