import { Breadscrumbs, Field, TextField } from "@/components";
import { usePageStore } from "@/stores";
import { Heart, Star01 } from "@untitledui/icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "./style.module.scss";
import { productDatas } from "./constant";

export default function ProducList() {
  const { setPageName } = usePageStore();
  const navigate = useNavigate();

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const redirectToDetail = (id: string) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    setPageName("Danh sách sản phẩm");
  }, []);

  return (
    <div className={styles["product-list-container"]}>
      <div className={styles["navigate-header"]}>
        <ul>
          <li>Iphone</li>
          <li>Ipad</li>
          <li>Macbook</li>
          <li>Watch</li>
          <li>Phụ kiện</li>
        </ul>
        <Field control={control} name="search">
          <TextField
            className={styles["search-input"]}
            placeholder="Tìm kiếm sản phẩm"
          />
        </Field>
      </div>

      <Breadscrumbs items={[{ label: "Iphone", href: "/?product=iphone" }]} />

      <div className={styles["product-grid"]}>
        {productDatas.map((item) => (
          <div key={item.id} className={styles["product-card"]}>
            <img
              className={styles["product-img"]}
              src={item.image}
              alt="product"
              onClick={() => redirectToDetail(item.id)}
            />
            <div className={styles["product-info"]}>
              <p
                className={styles["product-name"]}
                onClick={() => redirectToDetail(item.id)}
              >
               {item.productName}
              </p>
              <div className={styles["info-badge"]}>
                <span className={styles["badge"]}>{item.size}</span>
                <span className={styles["badge"]}>{item.ram}</span>
              </div>
              <div className={styles["product-cost"]}>
                <p className={styles["product-cost-base"]}>{item.rawCost.toLocaleString()}đ</p>
                <p className={styles["product-cost-sale-off"]}>{item.cost.toLocaleString()}đ</p>
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
