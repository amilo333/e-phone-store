import { Button, Dialog, Field, Table, TextField } from "@/components";
import type { TColumn } from "@/components/table/type";
import { usePageStore } from "@/stores";
import { Trash03 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { tableDatas } from "./constant";
import styles from "./style.module.scss";

export default function ProductManagement() {
  const { setPageName } = usePageStore();

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { control: searchFormControl } = useForm({});

  const { control: addFormControl } = useForm();

  const renderActionTableCell = () => {
    return (
      <>
        <Trash03
          width={20}
          height={20}
          className={styles["trash-bin"]}
          onClick={() => setOpenDeleteDialog(true)}
        />
      </>
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
        label: "Name",
      },
      {
        id: "inStock",
        label: "In Stock",
        width: 100,
      },
      {
        id: "brand",
        label: "Brand",
      },
      {
        id: "createdBy",
        label: "Created by",
      },
      {
        id: "createdAt",
        label: "Created at",
      },
      {
        id: "action",
        label: "Action",
        align: "center",
        cell: () => renderActionTableCell(),
      },
    ],
    []
  );

  useEffect(() => {
    setPageName("Quản lý sản phẩm");
  }, []);

  return (
    <div className={styles["product-management-container"]}>
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
        <Button
          variant="contained"
          onClick={() => setOpenAddProductDialog(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        columns={tableColumns}
        data={tableDatas}
        maxHeight="calc(100dvh - 200px)"
      />

      {/* [DIALOG] Add product */}
      <Dialog
        open={openAddProductDialog}
        title="Thêm sản phẩm"
        onClose={() => setOpenAddProductDialog(false)}
        width="700px"
        minWidth="800px"
      >
        <div className={styles["add-product-dialog"]}>
          <div className={styles["form-grid"]}>
            <Field control={addFormControl} name="name" label="Tên sản phẩm">
              <TextField />
            </Field>
            <Field control={addFormControl} name="description" label="Mô tả">
              <TextField />
            </Field>
            <Field control={addFormControl} name="size" label="Kích thước">
              <TextField />
            </Field>
            <Field
              control={addFormControl}
              name="screenTech"
              label="Loại màn hình"
            >
              <TextField />
            </Field>
            <Field control={addFormControl} name="camera" label="Camera">
              <TextField />
            </Field>
            <Field control={addFormControl} name="chip" label="Chip">
              <TextField />
            </Field>
            <Field control={addFormControl} name="ram" label="RAM">
              <TextField />
            </Field>
            <Field control={addFormControl} name="rom" label="ROM">
              <TextField />
            </Field>
            <Field control={addFormControl} name="battery" label="Pin">
              <TextField />
            </Field>
            <Field control={addFormControl} name="sim" label="SIM">
              <TextField />
            </Field>
            <Field control={addFormControl} name="os" label="Hệ điều hành">
              <TextField />
            </Field>
            <Field
              control={addFormControl}
              name="resolution"
              label="Độ phân giải"
            >
              <TextField />
            </Field>
            <Field control={addFormControl} name="cpu" label="CPU">
              <TextField />
            </Field>
            <Field
              control={addFormControl}
              name="compatibility"
              label="Độ tương thích"
            >
              <TextField />
            </Field>
          </div>
        </div>
      </Dialog>

      {/* [DIALOG] Delete product */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <div className={styles["delete-dialog"]}>
          <p>Bạn đồng ý xoá sản phẩm này?</p>
        </div>
      </Dialog>
    </div>
  );
}
