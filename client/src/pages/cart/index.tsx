import { Button, Field, RadioGroup, TextField } from "@/components";
import { CheckCircle, CreditCard02, MarkerPin04 } from "@untitledui/icons";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";

export default function Cart() {
  const { control } = useForm({
    defaultValues: {
      address: "",
      payment: 'cod'
    },
  });

  return (
    <div className={styles["cart-container"]}>
      <div className={clsx(styles["cart-list-card"], styles["card"])}>
        <div className={styles["cart-count"]}>Đã chọn: 3 sản phẩm</div>
        {[1, 2, 3].map((item) => (
          <div className={styles["single-cart-item"]} key={item}>
            <div className={styles["left-side"]}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBe3aCKZdDJfdiCwyZCfUUXyuyC2nAd44ouw&s"
                alt="produc-img"
                width={100}
                height={100}
              />
              <div className={styles["device-info"]}>
                <p>HP Victus 16</p>
                <div className={styles["badge-list"]}>
                  <span className={styles["badge"]}>Màu bạc</span>
                  <span className={styles["badge"]}>RAM 8GB</span>
                </div>
                <strong className={styles["device-cost"]}>17.500.000đ</strong>
              </div>
            </div>
            <div className={styles["right-side"]}></div>
          </div>
        ))}

        <div className={styles["cart-sum"]}>
          <div className={styles["sum"]}>
            Tổng cộng <span className={styles["cost"]}>300.000đ</span>
          </div>
          <div className={styles["cost-note"]}>
            <p>Đã bao gồm VAT</p>
            <p>Miễn phí vận chuyển</p>
          </div>
        </div>
      </div>

      <div className={clsx(styles["conmfirm-card"], styles["card"])}>
        <div className={styles["card-header"]}>
          <p className={styles["confirm-text"]}>
            <CheckCircle
              width={20}
              height={20}
              style={{ color: "var(--success-color)" }}
            />
            Xác nhận đơn hàng
          </p>
          <p>Vui lòng kiểm tra thông tin trước khi đặt hàng</p>
        </div>
        <div className={styles["book-info"]}>
          <div className={styles["delivery-address"]}>
            <p className={styles["title"]}>
              <MarkerPin04 width={18} height={18} />
              <span>Địa chỉ giao hàng</span>
            </p>
            <p>
              Tầng hầm B1, tòa nhà Golden West, 2 P. Lê Văn Thiêm, Nhân Chính,
              Thanh Xuân, Hà Nội
            </p>
            <span className={styles["title"]}>hoặc nhập</span>
            <Field control={control} name="address">
              <TextField />
            </Field>
          </div>
          <div className={styles["payment-method"]}>
            <p className={styles["title"]}>
              <CreditCard02 width={18} height={18} />
              <span>Phương thức thanh toán</span>
            </p>
            <Field control={control} name="payment">
              <RadioGroup options={[
                {
                  label: 'Thanh toán khi nhận hàng (COD)',
                  value: 'cod'
                },
                {
                  label: 'Chuyển khoản ngân hàng',
                  value: 'banking'
                },
              ]} />
            </Field>
          </div>
          <Button variant="contained">Đặt hàng</Button>
        </div>
      </div>
    </div>
  );
}
