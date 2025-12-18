import { Button, Dialog, Field, Select, Table, TextField } from "@/components";
import type { TColumn } from "@/components/table/type";
import { useToast } from "@/hooks";
import { apiService } from "@/services";
import { usePageStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit05, Minus, Plus, Trash03 } from "@untitledui/icons";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { ProductManagementSchema } from "./schema";
import styles from "./style.module.scss";

type TAddProductForm = z.infer<ReturnType<typeof ProductManagementSchema>>;

export default function ProductManagement() {
  const { setPageName } = usePageStore();
  const toast = useToast();

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [images, setImages] = useState<number[]>([]);
  const [models, setModels] = useState<number[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [editMode, setEditMode] = useState(null);

  const { control: searchFormControl, getValues: getSearchValues } = useForm();
  const {
    control: addFormControl,
    handleSubmit: handleSubmitProduct,
    formState: { errors },
    reset: resetAddProductForm,
    setValue,
  } = useForm<TAddProductForm>({
    resolver: zodResolver(ProductManagementSchema()),
  });

  const { data: productListData, refetch: refetchGetProductList } = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => {
      const queryParams = {
        search: getSearchValues("search"),
      };
      const response = await apiService.get("/get-products", {
        params: queryParams,
      });
      return response?.data?.data;
    },
    select: (data) => {
      return data.map((item: any) => ({
        ...item,
        in_stock: item.models?.reduce(
          (total: number, model: { in_stock: number }) =>
            total + (model.in_stock ?? 0),
          0
        ),
      }));
    },
  });

  const { data: categoryListData } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const response = await apiService.get("/get-categories");
      return response?.data?.data;
    },
    select: (data) =>
      data.map((item: any) => ({
        label: item.name,
        value: item.id,
      })),
  });

  const { data: brandListData } = useQuery({
    queryKey: ["get-brands"],
    queryFn: async () => {
      const response = await apiService.get("/get-brands");
      return response?.data?.data;
    },
    select: (data) =>
      data.map((item: any) => ({
        label: item.name,
        value: item.id,
      })),
  });

  const productMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        category_id: data.category?.value,
        brand_id: data.brand?.value,
        images: images.map((item) => data?.[`image${item}`] ?? ""),
        models: models.map((item) => {
          return {
            name: data?.[`model-name${item}`],
            price: data?.[`model-price${item}`],
            in_stock: data?.[`model-in-stock${item}`],
          };
        }),
      };
      const response = await apiService.post("/create-product", payload);
      return response?.data?.data;
    },
    onSuccess: () => {
      resetAddProductForm();
      setOpenAddProductDialog(false);
      refetchGetProductList();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        category_id: data.category?.value,
        brand_id: data.brand?.value,
        images: images.map((item) => data?.[`image${item}`] ?? ""),
        models: models.map((item) => {
          return {
            name: data?.[`model-name${item}`],
            price: data?.[`model-price${item}`],
            in_stock: data?.[`model-in-stock${item}`],
          };
        }),
      };
      const response = await apiService.put(`/update-product/${editMode}`, payload);
      return response?.data?.data;
    },
    onSuccess: () => {
      resetAddProductForm();
      setOpenAddProductDialog(false);
      refetchGetProductList();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const removeProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.delete(`/delete-product/${id}`);
      return response?.data?.data;
    },
    onSuccess: () => {
      refetchGetProductList();
      setOpenDeleteDialog(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
    resetAddProductForm();
    setImages([]);
    setModels([]);
    setEditMode(null);
  };

  const handleCreateProduct = (data: any) => {
    if (editMode) {
      updateProductMutation.mutate(data);
    } else {
      productMutation.mutate(data);
    }
  };

  const handleClickEdit = (row: any) => {
    setEditMode(row.id);
    const category = categoryListData?.find(
      (item: any) => item.value === row.category_id
    );
    const brand = brandListData?.find(
      (item: any) => item.value === row.brand_id
    );
    setImages(row.images.map((_: any, index: number) => index + 1));
    setModels(row.models.map((_: any, index: number) => index + 1));
    resetAddProductForm(row);
    setValue("category", category);
    setValue("brand", brand);
    setOpenAddProductDialog(true);
  };

  const renderActionTableCell = (row: any) => {
    return (
      <div className={styles["action-group"]}>
        <Edit05
          width={20}
          height={20}
          className={styles["edit-pen"]}
          onClick={() => handleClickEdit(row)}
        />
        <Trash03
          width={20}
          height={20}
          className={styles["trash-bin"]}
          onClick={() => {
            setOpenDeleteDialog(true);
            setSelectedProductId(row.id);
          }}
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
        id: "name",
        label: "Name",
      },
      {
        id: "in_stock",
        label: "In Stock",
        align: "center",
        width: 100,
      },
      {
        id: "brand",
        label: "Brand",
      },
      {
        id: "created_at",
        label: "Created at",
        cell: (val) => moment(val).format("YYYY-MM-DD"),
      },
      {
        id: "action",
        label: "Action",
        align: "center",
        cell: (_, __, row) => renderActionTableCell(row),
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
          <Button onClick={() => refetchGetProductList()}>Tìm kiếm</Button>
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
        data={productListData}
        maxHeight="calc(100dvh - 200px)"
      />

      {/* [DIALOG] Add product */}
      <Dialog
        open={openAddProductDialog}
        title={editMode ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        width="700px"
        minWidth="800px"
        onClose={handleCloseAddProductDialog}
        onConfirm={handleSubmitProduct(handleCreateProduct)}
      >
        <div className={styles["add-product-dialog"]}>
          <div className={styles["form-grid"]}>
            <Field control={addFormControl} name="name" label="Tên sản phẩm">
              <TextField error={errors.name?.message} />
            </Field>
            <Field control={addFormControl} name="description" label="Mô tả">
              <TextField error={errors.description?.message} />
            </Field>
            <Field control={addFormControl} name="size" label="Kích thước">
              <TextField error={errors.size?.message} />
            </Field>
            <Field
              control={addFormControl}
              name="screen_tech"
              label="Công nghệ màn hình"
            >
              <TextField error={errors.screen_tech?.message} />
            </Field>
            <Field control={addFormControl} name="camera" label="Camera">
              <TextField error={errors.camera?.message} />
            </Field>
            <Field control={addFormControl} name="chip" label="Chip">
              <TextField error={errors.chip?.message} />
            </Field>
            <Field control={addFormControl} name="ram" label="RAM">
              <TextField error={errors.ram?.message} />
            </Field>
            <Field control={addFormControl} name="rom" label="ROM">
              <TextField error={errors.rom?.message} />
            </Field>
            <Field control={addFormControl} name="battery" label="Pin">
              <TextField error={errors.battery?.message} />
            </Field>
            <Field control={addFormControl} name="sim" label="SIM">
              <TextField error={errors.sim?.message} />
            </Field>
            <Field control={addFormControl} name="os" label="Hệ điều hành">
              <TextField error={errors.os?.message} />
            </Field>
            <Field
              control={addFormControl}
              name="resolution"
              label="Độ phân giải"
            >
              <TextField error={errors.resolution?.message} />
            </Field>
            <Field control={addFormControl} name="cpu" label="CPU">
              <TextField error={errors.cpu?.message} />
            </Field>
            <Field
              control={addFormControl}
              name="compatibility"
              label="Độ tương thích"
            >
              <TextField error={errors.compatibility?.message} />
            </Field>
            <Field control={addFormControl} name="category" label="Danh mục">
              <Select
                options={categoryListData}
                error={errors.category?.message}
              />
            </Field>
            <Field control={addFormControl} name="brand" label="Hãng">
              <Select options={brandListData} error={errors.brand?.message} />
            </Field>
          </div>
          <div className={styles["dynamic-form"]}>
            <p className={styles["title"]}>
              Link hình ảnh
              <Plus
                width={20}
                height={20}
                className={styles["icon"]}
                onClick={() => setImages([...images, images.length + 1])}
              />
              <Minus
                width={20}
                height={20}
                className={styles["icon"]}
                onClick={() => {
                  const newArray = images.slice(0, -1);
                  setImages(newArray);
                }}
              />
            </p>
            <div className={styles["image-list"]}>
              {images.map((item) => (
                <Field
                  key={item}
                  control={addFormControl}
                  name={`image${item}`}
                >
                  <TextField error={errors[`image${item}`]?.message} />
                </Field>
              ))}
            </div>
          </div>
          <div className={styles["dynamic-form"]}>
            <p className={styles["title"]}>
              Model
              <Plus
                width={20}
                height={20}
                className={styles["icon"]}
                onClick={() => setModels([...models, models.length + 1])}
              />
              <Minus
                width={20}
                height={20}
                className={styles["icon"]}
                onClick={() => {
                  const newArray = models.slice(0, -1);
                  setModels(newArray);
                }}
              />
            </p>
            <div className={styles["image-list"]}>
              {models.map((item) => (
                <React.Fragment key={item}>
                  <Field
                    key={item}
                    control={addFormControl}
                    name={`model-name${item}`}
                  >
                    <TextField
                      placeholder={`Tên Model ${item}`}
                      error={errors[`model-name${item}`]?.message}
                    />
                  </Field>
                  <Field
                    key={item}
                    control={addFormControl}
                    name={`model-price${item}`}
                  >
                    <TextField
                      placeholder={`Giá Model ${item}`}
                      error={errors[`model-price${item}`]?.message}
                    />
                  </Field>
                  <Field
                    key={item}
                    control={addFormControl}
                    name={`model-in-stock${item}`}
                  >
                    <TextField
                      placeholder={`Số lượng ${item}`}
                      error={errors[`model-in-stock${item}`]?.message}
                    />
                  </Field>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Dialog>

      {/* [DIALOG] Delete product */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedProductId(null);
        }}
        onConfirm={() => {
          if (selectedProductId) {
            removeProductMutation.mutate(selectedProductId);
          }
        }}
      >
        <div className={styles["delete-dialog"]}>
          <p>Bạn đồng ý xoá sản phẩm này?</p>
        </div>
      </Dialog>
    </div>
  );
}
