import { Breadscrumbs, Field, TextField } from "@/components";
import { Heart, Star01 } from "@untitledui/icons";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { usePageStore } from "@/stores";
import { useEffect } from "react";

export default function ProducList() {
  const {setPageName} = usePageStore()

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    setPageName('Danh sách sản phẩm')
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className={styles["product-card"]}>
            <img
              className={styles["product-img"]}
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-cam_3.jpg"
              alt="product"
            />
            <div className={styles["product-info"]}>
              <p className={styles["product-name"]}>
                Bàn phím AKKO ACR Pro Alice Plus Spray Paint White AKKO CS
                switch
              </p>
              <div className={styles["info-badge"]}>
                <span className={styles["badge"]}>6.9 inches</span>
                <span className={styles["badge"]}>256GB</span>
              </div>
              <div className={styles["product-cost"]}>
                <p className={styles["product-cost-base"]}>30.000.000đ</p>
                <p className={styles["product-cost-sale-off"]}>27.999.000đ</p>
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
