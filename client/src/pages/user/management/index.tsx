import { Button, Field, Table, TextField } from "@/components";
import type { TColumn } from "@/components/table/type";
import { usePageStore } from "@/stores";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { tableDatas } from "./constant";
import styles from "./style.module.scss";

export default function UserManagement() {
  const { setPageName } = usePageStore();

  const { control: searchFormControl } = useForm({});

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
        id: "name",
        label: "Họ & Tên",
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "dob",
        label: "Ngày sinh",
      },
      {
        id: "phone",
        label: "Số điện thoại",
      },
      {
        id: "role",
        label: "Vai trò",
      },
    ],
    []
  );

  useEffect(() => {
    setPageName("Quản lý người dùng");
  }, []);

  return (
    <div className={styles["user-management-container"]}>
      <div className={styles["action-section"]}>
        <div className={styles["search-field-group"]}>
          <Field control={searchFormControl} name="search">
            <TextField
              className={styles["search-field"]}
              placeholder="Tìm kiếm người dùng"
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
    </div>
  );
}
