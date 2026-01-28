import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import CommonInput from "../../../components/common/CommonInput";

const BillingInformation = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const selectedItem = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [country, setCountry] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("https://ipapi.co/json").then((res) =>
        res.json(),
      );
      setCountry(res.country_name);
    })();
  }, []);

  const ItemDisplay = ({ name, displayText, label }) => {
    return (
      <div className="flex flex-col space-y-3">
        <span className="font-medium text-[24px]">{name}</span>
        <span className="flex flex-col space-y-3">{displayText}</span>
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 p-10 gap-4 ">
      <form className="flex flex-col space-y-2 p-2">
        <div className="font-semibold text-[36px]">Billing details</div>
        <div className="grid grid-cols-2 gap-4">
          <CommonInput
            label="First Name"
            placeholder="First Name"
            name="firstName"
            {...register("firstName", {
              required: "First Name is required",
              minLength: {
                value: 2,
                message: "Min length should be 2",
              },
              maxLength: {
                value: 50,
                message: "Max length should be 50",
              },
            })}
            error={errors.firstName?.message}
          />
          <CommonInput
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            {...register("lastName", {
              required: "Last Name is required",
              minLength: {
                value: 2,
                message: "Min length should be 2",
              },
              maxLength: {
                value: 50,
                message: "Max length should be 50",
              },
            })}
            error={errors.lastName?.message}
          />
        </div>
        <CommonInput
          label="Company Name"
          placeholder="Company Name"
          name="companyName"
          {...register("companyName")}
        />
        <CommonInput
          label="Country/Region"
          placeholder="Country/Region"
          value={country}
          name="country"
          {...register("country", {
            required: "Country is required",
          })}
          error={errors.country?.message}
        />
        <CommonInput
          label="Street Address"
          placeholder="Street Address"
          name="adress"
          {...register("adress", {
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Length should be 5",
            },
          })}
          error={errors.adress?.message}
        />
        <CommonInput
          label="Zip Code"
          placeholder="Zip Code"
          name="zipCode"
          {...register("zipCode", {
            required: "Zip Code is required",
            minLength: {
              value: 6,
              message: "Zip Code must be 6 digits",
            },
            maxLength: {
              value: 6,
              message: "Zip Code must be 6 digits",
            },
            pattern: {
              value: /^[0-9]{6}$/,
              message: "ZIPCode Invalid",
            },
          })}
          error={errors.zipCode?.message}
        />
        <CommonInput
          label="Phone"
          placeholder="Phone"
          name="phone"
          {...register("phone", {
            required: "Phone is required",
            minLength: {
              value: 10,
              message: "Phone length must be 10",
            },
            maxLength: {
              value: 15,
              message: "Maximum phone length is 15",
            },
          })}
          error={errors.phone?.message}
        />
        <CommonInput
          label="Email Adrress"
          placeholder="Email Adrress"
          name="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
          error={errors.email?.message}
        />
      </form>
      <div className="p-2">
        <div className="grid grid-cols-4 place-items-center-safe mb-1">
          <ItemDisplay
            name="Product"
            displayText={selectedItem.map(({ name, quantity }) => (
              <span>
                <span className="text-[#9F9F9F]">{name}</span> X {quantity}
              </span>
            ))}
            label="Total"
          />

          <ItemDisplay
            name="Price/product"
            displayText={selectedItem.map(({ price }) => (
              <span>Rs. {price}</span>
            ))}
            label={`Rs. ${selectedItem.reduce((acc, curr) => acc + +curr.price, 0)}`}
          />

          <ItemDisplay
            name="Quantity"
            displayText={selectedItem.map(({ quantity }) => (
              <span> {quantity}</span>
            ))}
            label={selectedItem.reduce((acc, curr) => acc + curr.quantity, 0)}
          />

          <ItemDisplay
            name="SubTotal"
            displayText={selectedItem.map(({ quantity, price }) => (
              <span>Rs. {quantity * price}</span>
            ))}
            label={
              <span className="text-[#B88E2F] font-bold text-[24px]">
                Rs.{totalAmount}
              </span>
            }
          />
        </div>
        <hr className="text-[#D9D9D9]" />
        <div className="flex flex-col space-y-4 ps-13  p-2">
          <div className="font-bold"> Direct Bank Transfer</div>
          <div className="text-[#9F9F9F] text-[16px]">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </div>

          <div>
            <input
              type="radio"
              className="mr-1"
              id="bank"
              name="paymentMethod"
              value="bank"
            />
            <label className="text-[#9F9F9F]" htmlFor="bank">
              Direct Bank Transfer
            </label>
          </div>

          <div>
            <input
              type="radio"
              className="mr-1"
              id="cash"
              name="paymentMethod"
              value="cash"
            />
            <label className="text-[#9F9F9F]" htmlFor="cash">
              Cash On Delivery
            </label>
          </div>

          <div className="text-[16px]">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="font-bold">privacy policy</span>.
          </div>

          <button className="px-5 py-2 border rounded-lg mx-auto">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
