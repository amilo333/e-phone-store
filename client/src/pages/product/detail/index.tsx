import { Breadscrumbs, Button, Gallery } from "@/components";
import { useRoute, useToast } from "@/hooks";
import { apiService } from "@/services";
import { usePageStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./style.module.scss";

export default function ProductDetail() {
  const { setPageName, setCartItems } = usePageStore();
  const navigate = useNavigate();
  const route = useRoute();
  const toast = useToast();

  const [models, setModels] = useState([]);
  const [modelPrice, setModelPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);

  const { data: productDetailData, isSuccess } = useQuery({
    queryKey: ["product-detail"],
    queryFn: async () => {
      const response = await apiService(`/get-product/${route.params.id}`);
      return response.data.data;
    },
  });

  const handleClickModel = (model: any) => {
    setModels(
      productDetailData?.models.map((item: any) => {
        return {
          ...item,
          isActive: item.name === model.name,
        };
      })
    );
    setModelPrice(Number(model.price));
  };

  const setLocalstorageCart = () => {
    const cartLocal = JSON.parse(localStorage.getItem("cart") || "[]") || [];
    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...cartLocal,
        {
          productId: productDetailData.id,
          productName: productDetailData.name,
          image: productDetailData.images[0],
          model: models.find((item: any) => item.isActive),
        },
      ])
    );
  };

  const addToCart = () => {
    setLocalstorageCart();
    setCartItems(JSON.parse(localStorage.getItem("cart") ?? "[]"));
    toast.success("Thêm vào giỏ hàng thành công");
  };

  const handleBuyNow = () => {
    setLocalstorageCart();
    setCartItems(JSON.parse(localStorage.getItem("cart") ?? "[]"));
    navigate("/cart?buy=instant");
  };

  useEffect(() => {
    if (isSuccess && productDetailData) {
      setModelPrice(
        productDetailData?.models?.[0]?.price
          ? Number(productDetailData?.models?.[0]?.price)
          : 0
      );
      setModels(
        productDetailData?.models?.map((item: any, index: number) => {
          return {
            ...item,
            isActive: index === 0 ? true : false,
          };
        }) || []
      );
      setImages(
        productDetailData?.images.map((url: string) => ({
          original: url,
          thumbnail: url,
        })) || []
      );
      setBreadcrumbs([{ label: productDetailData?.name, href: "#" }]);
    }
  }, [productDetailData, isSuccess]);

  useEffect(() => {
    setPageName("Chi tiết sản phẩm");
  }, []);

  return (
    <div className={styles["produc-detail-container"]}>
      <Breadscrumbs items={breadcrumbs} />
      <div className={styles["product-detail"]}>
        <div className={styles["image-section"]}>
          <Gallery items={images} />
        </div>
        <div className={styles["product-info"]}>
          <p className={styles["product-name"]}>{productDetailData?.name}</p>
          <p className={styles["cost"]}>
            {modelPrice.toLocaleString()}đ <span>(Đã bao gồm phí VAT)</span>
          </p>
          <div className={styles["model-list"]}>
            <div className={styles["model-item"]}>
              <p className={styles["model-name"]}>Màu sắc</p>
              <div className={styles["model-badge-list"]}>
                {models?.map((item: any) => (
                  <span
                    className={clsx(styles["model-badge-item"], {
                      [styles["badge-active"]]: item.isActive,
                    })}
                    onClick={() => handleClickModel(item)}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles["group-button"]}>
            <Button variant="outlined" color="info" onClick={addToCart}>
              Thêm vào giỏ hàng
            </Button>
            <Button variant="contained" onClick={handleBuyNow}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
