import { Button, Dialog, Field, Table, TextField, Tooltip } from "@/components";
import type { TColumn } from "@/components/table/type";
import { apiService } from "@/services";
import { usePageStore } from "@/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircle, Hand, Truck01 } from "@untitledui/icons";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import type { TTableData } from "./type";

export default function ProductOrdered() {
  const { setPageName } = usePageStore();

  const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [orderId, setOrderId] = useState("");

  const {
    control: searchFormControl,
    getValues,
    handleSubmit: onSearchSubmit,
  } = useForm({});

  const { data: orderList, refetch: refetchOrderList } = useQuery({
    queryKey: ["ordered-products"],
    queryFn: async () => {
      const payload = {
        search: getValues("search") || "",
      };
      const response = await apiService("/get-orders", {
        params: payload,
      });
      return response.data.data;
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: string;
    }) => {
      const response = await apiService.put(`/update-order/${orderId}`, {
        status,
      });
      return response.data;
    },
    onSuccess: () => {
      refetchOrderList();
      setOpenUpdateStatusDialog(false);
      setNextStatus("");
      setOrderId("");
    },
  });

  const handleSearch = () => {
    refetchOrderList();
  };

  const changeOrderStatus = () => {
    updateOrderStatusMutation.mutate({ orderId, status: nextStatus });
  };

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
    return (
      <div className={styles["action-group"]}>
        {row.status === "Đã đặt hàng" ? (
          <Tooltip title="Chuyển trạng thái: Đang chuẩn bị">
            <Hand
              width={20}
              height={20}
              className={styles["edit-status"]}
              style={{ color: "var(--error-primary)" }}
              onClick={() => {
                setOpenUpdateStatusDialog(true);
                setNextStatus("Đang chuẩn bị");
                setOrderId(row.id);
              }}
            />
          </Tooltip>
        ) : row.status === "Đang chuẩn bị" ? (
          <Tooltip title="Chuyển trạng thái: Đã giao cho shipper">
            <Truck01
              width={20}
              height={20}
              className={styles["edit-status"]}
              style={{ color: "var(--warn-color)" }}
              onClick={() => {
                setOpenUpdateStatusDialog(true);
                setNextStatus("Đã giao cho shipper");
                setOrderId(row.id);
              }}
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
        id: "id",
        label: "ID đơn hàng",
      },
      {
        id: "booker",
        label: "Người đặt hàng",
      },
      {
        id: "phone",
        label: "Số điện thoại",
      },
      {
        id: "address",
        label: "Địa chỉ",
      },
      {
        id: "status",
        label: "Trạng thái",
        width: 170,
        align: "center",
        cell: (val) => renderStatus(val),
      },
      {
        id: "created_at",
        label: "Ngày đặt",
        cell: (val) => moment(val).format("YYYY-MM-DD"),
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
          <Button onClick={onSearchSubmit(handleSearch)}>Tìm kiếm</Button>
        </div>
      </div>

      <Table
        columns={tableColumns}
        data={orderList}
        maxHeight="calc(100dvh - 200px)"
      />

      <Dialog
        open={openUpdateStatusDialog}
        onClose={() => {
          setOpenUpdateStatusDialog(false);
          setNextStatus("");
          setOrderId("");
        }}
        onConfirm={changeOrderStatus}
      >
        <p>Bạn chắc chắn muốn đổi trạng thái đơn hàng?</p>
      </Dialog>
    </div>
  );
}
