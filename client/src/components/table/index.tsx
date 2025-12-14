import { Paper } from "@mui/material";
import { default as MuiTable } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";
import styles from "./style.module.scss";
import type { TProps } from "./type";

export default function Table<T>(props: TProps<T>) {
  const { columns, data, maxHeight } = props;

  return (
    <Paper className={styles["table-container"]}>
      <TableContainer sx={{ maxHeight }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <Fragment key={column.id}>
                  {column.sticky ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, width: column.width }}
                      className={clsx({
                        [styles["pinned-column-header-left"]]:
                          column.sticky === "left",
                        [styles["pinned-column-header-right"]]:
                          column.sticky === "right",
                      })}
                    >
                      {column.label}
                    </TableCell>
                  ) : (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, width: column.width }}
                    >
                      {column.label}
                    </TableCell>
                  )}
                </Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <Fragment key={column.id}>
                        {column.sticky ? (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className={clsx({
                              [styles["pinned-column-left"]]:
                                column.sticky === "left",
                              [styles["pinned-column-right"]]:
                                column.sticky === "right",
                            })}
                          >
                            {column.cell
                              ? column.cell(value, rowIndex, row)
                              : value}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {column.cell
                              ? column.cell(value, rowIndex, row)
                              : value}
                          </TableCell>
                        )}
                      </Fragment>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
}
