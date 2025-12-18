import { Button, Dialog, Field, RadioGroup, TextField } from "@/components";
import { useToast } from "@/hooks";
import { apiService } from "@/services";
import { usePageStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle,
  CreditCard02,
  MarkerPin04,
  Phone01,
  Trash03,
  User01,
} from "@untitledui/icons";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import styles from "./style.module.scss";

const bookingSchema = (cartItems: any[]) =>
  z
    .object({
      name: z.string().min(1, "Trường bắt buộc"),
      phone: z
        .string()
        .min(1, "Trường bắt buộc")
        .regex(
          /^0\d{9}$/,
          "Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số"
        ),
      address: z.string().min(1, "Trường bắt buộc"),
      payment: z.enum(["cod", "banking"]),
    })
    .superRefine((_, ctx) => {
      if (cartItems.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["roots"],
          message: "Giỏ hàng không được để trống",
        });
      }
    });

type TBookingForm = z.infer<ReturnType<typeof bookingSchema>>;

export default function Cart() {
  const { setPageName, setCartItems: zSetcartItems } = usePageStore();
  const toast = useToast();

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [orderPayload, setOrderPayload] = useState<any>(null);
  const [openConfirmBookingDialog, setOpenConfirmBookingDialog] =
    useState(false);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TBookingForm>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      payment: "cod",
    },
    resolver: zodResolver(bookingSchema(cartItems)),
  });

  const createOrderMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiService.post("/create-order", payload);
      return response.data;
    },
    onSuccess: () => {
      setOpenConfirmBookingDialog(false);
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      toast.success("Đặt hàng thành công");
      reset();
    },
  });

  const removeCartItem = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    zSetcartItems(JSON.parse(localStorage.getItem("cart") ?? "[]"));
  };

  const handleBooking = (data: TBookingForm) => {
    setOpenConfirmBookingDialog(true);
    const payload = {
      booker: data.name,
      phone: data.phone,
      address: data.address,
      payment: data.payment,
      items: cartItems,
      price: totalMoney,
      created_at: new Date().toISOString(),
    };
    setOrderPayload(payload);
  };

  const createOrder = () => {
    createOrderMutation.mutate(orderPayload);
  };

  const totalMoney = useMemo(() => {
    return cartItems.reduce((acc: number, item: any) => {
      return acc + Number(item.model.price);
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    setPageName("Quản lý giỏ hàng");
  }, []);

  return (
    <div className={styles["cart-container"]}>
      <div className={clsx(styles["cart-list-card"], styles["card"])}>
        <div className={styles["cart-count"]}>
          Đã chọn: {cartItems.length} sản phẩm
        </div>
        {cartItems.map((item: any, index: number) => (
          <div className={styles["single-cart-item"]} key={item}>
            <div className={styles["left-side"]}>
              <img
                src={item.image}
                alt="produc-img"
                width={100}
                height={100}
              />
              <div className={styles["device-info"]}>
                <p>{item.productName}</p>
                <div className={styles["badge-list"]}>
                  <span className={styles["badge"]}>{item.model.name}</span>
                </div>
                <strong className={styles["device-cost"]}>
                  {Number(item.model.price).toLocaleString()}đ
                </strong>
              </div>
            </div>
            <div className={styles["right-side"]}>
              <Trash03
                width={20}
                height={20}
                onClick={() => removeCartItem(index)}
              />
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <p className={styles["empty-cart"]}>Giỏ hàng của bạn đang trống</p>
        )}

        <div className={styles["cart-sum"]}>
          <div className={styles["sum"]}>
            Tổng cộng{" "}
            <span className={styles["cost"]}>
              {totalMoney.toLocaleString()}đ
            </span>
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
              <User01 width={18} height={18} />
              <span>Họ và tên</span>
            </p>
            <Field control={control} name="name">
              <TextField error={errors.name?.message} />
            </Field>

            <p className={styles["title"]}>
              <Phone01 width={18} height={18} />
              <span>Số điện thoại</span>
            </p>
            <Field control={control} name="phone">
              <TextField error={errors.phone?.message} />
            </Field>

            <p className={styles["title"]}>
              <MarkerPin04 width={18} height={18} />
              <span>Địa chỉ giao hàng</span>
            </p>
            <Field control={control} name="address">
              <TextField multiline rows={2} error={errors.address?.message} />
            </Field>
          </div>
          <div className={styles["payment-method"]}>
            <p className={styles["title"]}>
              <CreditCard02 width={18} height={18} />
              <span>Phương thức thanh toán</span>
            </p>
            <Field control={control} name="payment">
              <RadioGroup
                options={[
                  {
                    label: "Thanh toán khi nhận hàng (COD)",
                    value: "cod",
                  },
                  {
                    label: "Chuyển khoản ngân hàng",
                    value: "banking",
                  },
                ]}
              />
            </Field>
          </div>
          <p className="error-text">
            {(errors as { roots?: { message: string } })?.roots?.message}
          </p>
          <Button variant="contained" onClick={handleSubmit(handleBooking)}>
            Đặt hàng
          </Button>
        </div>
      </div>

      <Dialog
        open={openConfirmBookingDialog}
        onClose={() => setOpenConfirmBookingDialog(false)}
        onConfirm={createOrder}
      >
        Bạn có đồng ý đặt hàng?
      </Dialog>
    </div>
  );
}
