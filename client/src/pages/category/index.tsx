import { Button, Dialog, Field, Table, TextField } from "@/components";
import type { TColumn } from "@/components/table/type";
import { usePageStore } from "@/stores";
import { Edit05, Trash03 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { tableDatas } from "./constant";
import styles from "./style.module.scss";
import type { TTableData } from "./type";

export default function CategoryManament() {
  const { setPageName } = usePageStore();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { control: searchFormControl } = useForm({});
  const { control: addFormControl } = useForm({});

  const handleOpenAddCategoryDialog = (id?: string) => {
    setOpenAddDialog(true);
    if (id) {
      setCategoryId(id);
    }
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddDialog(false);
    setTimeout(() => setCategoryId(null), 500);
  };

  const renderActionTableCell = (row: TTableData) => {
    return (
      <div className={styles["action-group"]}>
        <Edit05
          width={20}
          height={20}
          className={styles["edit-pen"]}
          onClick={() => handleOpenAddCategoryDialog(row.id)}
        />
        <Trash03
          width={20}
          height={20}
          className={styles["trash-bin"]}
          onClick={() => setOpenDeleteDialog(true)}
        />
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
        id: "category",
        label: "Name",
      },
      {
        id: "createdAt",
        label: "Created at",
      },
      {
        id: "action",
        label: "Action",
        align: "center",
        cell: (_, __, row) => renderActionTableCell(row as TTableData),
      },
    ],
    []
  );

  useEffect(() => {
    setPageName("Quản lý danh mục");
  }, []);

  return (
    <div className={styles["category-management-container"]}>
      <div className={styles["action-section"]}>
        <div className={styles["search-field-group"]}>
          <Field control={searchFormControl} name="search">
            <TextField
              className={styles["search-field"]}
              placeholder="Tìm kiếm danh mục"
            />
          </Field>
          <Button>Tìm kiếm</Button>
        </div>
        <Button
          variant="contained"
          onClick={() => handleOpenAddCategoryDialog()}
        >
          Thêm danh mục
        </Button>
      </div>

      <Table
        columns={tableColumns}
        data={tableDatas}
        maxHeight="calc(100dvh - 200px)"
      />

      <Dialog
        open={openAddDialog}
        title={categoryId ? "Sửa danh mục" : "Thêm danh mục"}
        onClose={handleCloseAddCategoryDialog}
      >
        <div className={styles["add-category-dialog"]}>
          <Field control={addFormControl} name="category" label="Category name">
            <TextField />
          </Field>
        </div>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <p>Bạn đồng ý xoá danh mục này?</p>
      </Dialog>
    </div>
  );
}
