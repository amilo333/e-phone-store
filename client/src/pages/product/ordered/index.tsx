import { Button, Dialog, Field, Table, TextField, Tooltip } from "@/components";
import type { TColumn } from "@/components/table/type";
import { usePageStore } from "@/stores";
import { CheckCircle, Hand, Truck01 } from "@untitledui/icons";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { tableDatas } from "./constant";
import styles from "./style.module.scss";
import type { TTableData } from "./type";

export default function ProductOrdered() {
  const { setPageName } = usePageStore();

  const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false);

  const { control: searchFormControl } = useForm({});

  const renderStatus = (value: string) => {
    let statusClassName;
    switch (value) {
      case "Đã đặt hàng":
        statusClassName = styles["ordered"];
        break;
      case "Đang chuẩn bị":
        statusClassName = styles["preparing"];
        break;
      case "Đã giao cho shipper":
        statusClassName = styles["shipping"];
        break;
      default:
        break;
    }
    return (
      <span className={clsx(styles["status-badge"], statusClassName)}>
        {value}
      </span>
    );
  };

  const renderActionTableCell = (row: TTableData) => {
    console.log(row);
    return (
      <div className={styles["action-group"]}>
        {row.status === "Đã đặt hàng" ? (
          <Tooltip title="Chuyển trạng thái: Đang chuẩn bị">
            <Hand
              width={20}
              height={20}
              className={styles["edit-status"]}
              style={{ color: "var(--error-primary)" }}
            />
          </Tooltip>
        ) : row.status === "Đang chuẩn bị" ? (
          <Tooltip title="Chuyển trạng thái: Đã giao cho shipper">
            <Truck01
              width={20}
              height={20}
              className={styles["edit-status"]}
              style={{ color: "var(--warn-color)" }}
            />
          </Tooltip>
        ) : (
          <CheckCircle
            width={20}
            height={20}
            className={styles["edit-status"]}
            style={{ color: "var(--success-color)" }}
          />
        )}
      </div>
    );
  };

  const tableColumns: TColumn[] = useMemo(
    () => [
      {
        id: "no",
        label: "No.",
        width: 30,
        align: "center",
        cell: (_, index) => <>{index + 1}</>,
      },
      {
        id: "product",
        label: "Tên sản phẩm",
      },
      {
        id: "status",
        label: "Trạng thái",
        cell: (val) => renderStatus(val),
      },
      {
        id: "createdAt",
        label: "Ngày đặt",
      },
      {
        id: "action",
        label: "Hành động",
        align: "center",
        width: 150,
        cell: (_, __, row) => renderActionTableCell(row as TTableData),
      },
    ],
    []
  );

  useEffect(() => {
    setPageName("Quản lý đơn hàng");
  }, []);

  return (
    <div className={styles["product-ordered-container"]}>
      <div className={styles["action-section"]}>
        <div className={styles["search-field-group"]}>
          <Field control={searchFormControl} name="search">
            <TextField
              className={styles["search-field"]}
              placeholder="Tìm kiếm sản phẩm"
            />
          </Field>
          <Button>Tìm kiếm</Button>
        </div>
      </div>

      <Table
        columns={tableColumns}
        data={tableDatas}
        maxHeight="calc(100dvh - 200px)"
      />

      <Dialog
        open={openUpdateStatusDialog}
        onClose={() => setOpenUpdateStatusDialog(false)}
      >
        <p>Bạn đồng ý xoá danh mục này?</p>
      </Dialog>
    </div>
  );
}
