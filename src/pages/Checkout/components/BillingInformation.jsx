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
        <span className="font-medium text-[15px] sm:text-[24px]">{name}</span>
        <span className="flex flex-col space-y-3">{displayText}</span>
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-3 sm:p-10 gap-4 ">
      <form className="flex flex-col space-y-2 p-2">
        <div className="font-semibold text-[25px] sm:text-[36px]">
          Billing details
        </div>
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
            required
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
            required
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
          required
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
          required
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
          required
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
          required
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
          required
        />
      </form>
      <div className="p-2">
        <div className="block max-[500px]:hidden mb-2">
          <div className="grid grid-cols-4 gap-4 mb-2">
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
          <hr />
        </div>
        <div className="hidden max-[500px]:block space-y-4">
          {selectedItem.map(({ name, price, quantity }, i) => (
            <div key={i} className="border rounded-lg p-3 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-medium">Product</span>
                <span className="text-[#9F9F9F]">
                  {name} × {quantity}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Price</span>
                <span>Rs. {price}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Quantity</span>
                <span>{quantity}</span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span className="text-[#B88E2F]">Rs. {price * quantity}</span>
              </div>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-[#B88E2F]">Rs. {totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 p-2">
          <div className="font-bold">Direct Bank Transfer</div>
          <div className="text-[#9F9F9F]">
            Make your payment directly into our bank account.
          </div>

          <label className="flex items-center gap-2">
            <input type="radio" name="paymentMethod" />
            Direct Bank Transfer
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="paymentMethod" />
            Cash On Delivery
          </label>

          <button className="px-5 py-2 border rounded-lg mx-auto">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
