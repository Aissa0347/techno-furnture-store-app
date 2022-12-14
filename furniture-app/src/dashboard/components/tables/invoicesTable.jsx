import React, { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { show, download, edit, editMenu } from "../icons";
import { Users } from "../icons";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";
import {
  CloseButton,
  Group,
  MantineProvider,
  Modal,
  NativeSelect,
  Select,
} from "@mantine/core";
import InvoiceView from "../detailsView/invoiceView";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import { setStaticValue } from "../../../App";
import MainPDF from "../../../invoicePDF/mainPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTable({ rows, headCells }) {
  const [order, setOrder] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [showInvoice, setShowInvoice] = React.useState({
    state: false,
    data: {},
    id: "",
  });

  console.log(orderBy);
  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell> */}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.isNotSorted ? (
                <span className="not-sorted-head">{headCell.label}</span>
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Invoices List
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton></IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton></IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.orderId);
      setSelected(newSelected);
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  console.log(selected);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //* ---------------------------- Status Component ---------------------------- */

  function SelectStatus({ row }) {
    const [currentStatus, setCurrentStatus] = useState(row.orderStatus);

    function updateStatus(currentObj, newStatus) {
      const orderRef = doc(db, "Orders", currentObj.id);
      updateDoc(orderRef, { status: newStatus }).then((res) => {
        console.log("the current :", currentStatus);
        console.log("the new one : ", currentObj);
        setStaticValue("ordersStatus", 1, newStatus, currentStatus);
        row.orderStatus = newStatus;
        setCurrentStatus(newStatus);
        if (newStatus === "completed") {
          setStaticValue("sales", currentObj.orderCost);
        } else if (currentStatus === "completed") {
          setStaticValue("sales", -currentObj.orderCost);
        }
      });
    }

    useEffect(() => {
      console.log(currentStatus);
    }, [currentStatus]);

    return (
      <Select
        variant="unstyled"
        rightSection={<span></span>}
        rightSectionWidth={0}
        size={"sm"}
        radius={"none"}
        data={[
          { value: "pending", label: "En attente" },
          { value: "ongoing", label: "En cours" },
          { value: "returned", label: "Retour" },
          { value: "completed", label: "Compl??t??" },
          { value: "cancelled", label: "Annul??e" },
        ]}
        value={currentStatus}
        onChange={(selectedValue) => updateStatus(row, selectedValue)}
        className={"status " + currentStatus}
      />
    );
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.orderId);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    console.log("this is the row : ", row);
                    let createdAtMoment = moment.unix(row.inDate?.seconds);
                    let createdAt = moment(createdAtMoment).format("MMM DD, y");
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className="customers-table invoices-table"
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.orderId)}
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell> */}
                        <TableCell>
                          <span className="customer-avatar">
                            <img loading="lazy" src={row.avatarImg} />
                            {row.name}
                          </span>
                        </TableCell>
                        <TableCell align="left">{row.orderId}</TableCell>
                        <TableCell align="left">{row.orderAddress}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>
                        <TableCell align="left">{createdAt}</TableCell>
                        <TableCell align="left">{row.orderQuantity}</TableCell>
                        <TableCell align="left">
                          {row?.orderCostHT} DA
                        </TableCell>
                        <TableCell align="left">{row.orderCost} DA</TableCell>
                        <TableCell align="left">
                          <SelectStatus row={row} />
                        </TableCell>
                        <TableCell align="left">
                          <div className="invoices-actions dash-actions">
                            <span
                              className="action"
                              onClick={() =>
                                setShowInvoice({
                                  state: true,
                                  data: { ...row.order },
                                  id: row.id,
                                })
                              }
                            >
                              {show}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
      <MantineProvider
        theme={{
          colors: {
            blue: [
              "#d7feff",
              "#aaf3ff",
              "#7aebff",
              "#48e1ff",
              "#1ad9ff",
              "#00bfe6",
              "#0095b4",
              "#006a82",
              "#004150",
              "#00171f",
            ],
            red: [
              "#FFDBDC",
              "#FFDBDC",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
              "#FF0000",
            ],
          },
        }}
      >
        {showInvoice.state ? (
          <Modal
            size="min(1200px,90%)"
            radius="none"
            overflow="outside"
            title={<h3>D??tails de la facture</h3>}
            withCloseButton={false}
            onClose={() =>
              setShowInvoice((prev) => ({ ...prev, state: false }))
            }
            opened={true}
            // centered
          >
            <CloseButton
              size={"lg"}
              style={{ position: "absolute", top: "0px", right: "0px" }}
              color="red"
              onClick={() =>
                setShowInvoice((prev) => ({ ...prev, state: false }))
              }
            />
            <InvoiceView data={showInvoice.data} id={showInvoice.id} />
          </Modal>
        ) : null}
      </MantineProvider>
    </>
  );
}

export default React.memo(EnhancedTable);
