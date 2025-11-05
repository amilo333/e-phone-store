import Paper from "@mui/material/Paper";
import { default as MuiTable } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { TProps } from "./type";
import styles from "./style.module.scss";
import clsx from "clsx";

export default function Table<T>(props: TProps<T>) {
  const { columns, data, maxHeight } = props;

  return (
    <Paper className={styles["table-container"]}>
      <TableContainer sx={{ maxHeight }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <>
                  {column.sticky ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <>
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
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        )}
                      </>
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
