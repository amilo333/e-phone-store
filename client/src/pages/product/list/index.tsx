import { Breadscrumbs, Field, TextField } from "@/components";
import { useRoute } from "@/hooks";
import { apiService } from "@/services";
import { usePageStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { Heart, Star01 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "./style.module.scss";

export default function ProducList() {
  const { setPageName } = usePageStore();
  const navigate = useNavigate();
  const route = useRoute();

  const [currentBreadcrumb, setCurrentBreadcrumb] = useState([]);

  const { control, getValues } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { data: categoryData } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const response = await apiService.get("/get-categories");
      return response?.data?.data;
    },
  });

  const { data: productData, refetch: refetchGetProductList } = useQuery({
    queryKey: ["get-products", route?.query?.category],
    queryFn: async () => {
      const queryParams = {
        filter: route?.query?.category,
        search: getValues("search"),
      };
      const response = await apiService.get("/get-products", {
        params: queryParams,
      });
      return response?.data?.data;
    },
  });

  const handleClickCategory = (category: any) => {
    navigate(`/?category=${category.id}`);
    setCurrentBreadcrumb([{ label: category.name, href: "#" }] as any);
  };

  const redirectToDetail = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleSearchProduct = (e: any) => {
    if (e.key === "Enter") {
      refetchGetProductList();
    }
  };

  useEffect(() => {
    if (!route.query?.category) {
      setCurrentBreadcrumb([]);
    }
  }, [route.query?.category]);

  useEffect(() => {
    setPageName("Danh sách sản phẩm");
  }, []);

  return (
    <div className={styles["product-list-container"]}>
      <div className={styles["navigate-header"]}>
        <ul>
          {categoryData?.map((item: any) => (
            <li key={item.id} onClick={() => handleClickCategory(item)}>
              {item.name}
            </li>
          ))}
        </ul>
        <Field control={control} name="search">
          <TextField
            className={styles["search-input"]}
            placeholder="Tìm kiếm sản phẩm"
            onKeyDown={handleSearchProduct}
          />
        </Field>
      </div>

      <Breadscrumbs items={currentBreadcrumb} />

      <div className={styles["product-grid"]}>
        {productData?.map((item: any) => (
          <div key={item.id} className={styles["product-card"]}>
            <img
              className={styles["product-img"]}
              src={item.images[0]}
              alt="product"
              onClick={() => redirectToDetail(item.id)}
            />
            <div className={styles["product-info"]}>
              <p
                className={styles["product-name"]}
                onClick={() => redirectToDetail(item.id)}
              >
                {item.name}
              </p>
              <div className={styles["info-badge"]}>
                <span className={styles["badge"]}>{item.size}</span>
                <span className={styles["badge"]}>{item.ram}</span>
              </div>
              <div className={styles["product-cost"]}>
                {item?.rawCost && (
                  <p className={styles["product-cost-base"]}>
                    {item.rawCost.toLocaleString()}đ
                  </p>
                )}
                <p className={styles["product-cost-sale-off"]}>
                  {item.models[0].price}đ
                </p>
              </div>
              <div className={styles["card-footer"]}>
                <div className={styles["rating"]}>
                  <span className={styles["rating-count"]}>5.0</span>
                  <Star01
                    className={styles["rating-icon"]}
                    width={18}
                    height={18}
                  />
                </div>
                <div className={styles["favourite"]}>
                  Yêu thích
                  <Heart width={18} height={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
