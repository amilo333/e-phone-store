import { Breadscrumbs, Button, Gallery } from "@/components";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { usePageStore } from "@/stores";

export default function ProductDetail() {
    const { setPageName } = usePageStore();
  
  const breadscrumbsList = [
    { label: "Iphone", href: "/?product=iphone" },
    { label: "Iphone 15 Pro MAX", href: "#" },
  ];

  const models = [
    {
      name: "Dung lượng",
      list: ["256GB", "512GB", "1TB"],
    },
    {
      name: "Màu sắc",
      list: ["Trắng", "Đen", "Cam"],
    },
  ];

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  useEffect(() => {
    setPageName('Chi tiết sản phẩm')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["produc-detail-container"]}>
      <Breadscrumbs items={breadscrumbsList} />
      <div className={styles["product-detail"]}>
        <div className={styles["image-section"]}>
          <Gallery items={images} />
        </div>
        <div className={styles["product-info"]}>
          <p className={styles["product-name"]}>Iphone 15 Pro MAX</p>
          <p className={styles["cost"]}>
            18.000.000đ <span>(Đã bao gồm phí VAT)</span>
          </p>
          <div className={styles["model-list"]}>
            {models.map((model) => (
              <div className={styles["model-item"]}>
                <p className={styles["model-name"]}>{model.name}</p>
                <div className={styles["model-badge-list"]}>
                  {model.list.map((item) => (
                    <span className={styles['model-badge-item']}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles["group-button"]}>
            <Button variant="outlined" color="info">
              Thêm vào giỏ hàng
            </Button>
            <Button variant="contained">Mua ngay</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
