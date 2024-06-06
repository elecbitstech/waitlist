"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import SitePreviewImage from "../../public/SitePreview.png";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import ledImg from "../../public/svg gradient.svg";
import formBg from "../../public/Slice1.png";

const notoSans = Noto_Sans({ subsets: ["latin"] });

interface Props {
  width: string;
  label: string;
  placeholder: string;
  containerClasses: string;
}

const isPhoneNumberValid = (phoneNumber: string) => {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
};

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    organizationName: "",
    designation: "",
  });
  const [buttonStatus, setButtonStatus] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "phoneNumber") {
      if (!isPhoneNumberValid(e.target.value)) {
        setPhoneError("Enter a valid phone number.");
      } else {
        setPhoneError("");
      }
    }
    console.log(formData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (phoneError) {
      alert("Please fix the phone number error before submitting.");
      return;
    }

    setButtonStatus(true);

    const res = await fetch("/api/storeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message);


    if (data.message !== "Email already exists") {
      const emailResponse = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (emailResponse.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    }

    setButtonStatus(false);
  };

  return (
    <main className="flex flex-col  items-center">
      
      <div className="w-full flex flex-col  items-center  " style={{ backgroundImage: `url(${formBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div
        id="top-bar"
        className="flex justify-between w-full bg-[#141414] p-2"
      >
        <div className="logo-section flex items-center">
          <Image src="/Logo.png" alt="logo" height={120} width={120} />
        </div>
        <div className="linked-in-section flex items-center">
          <p className="text-[#999999] mr-2">Get Connected</p>
          <Image src="/LinkedIn.png" alt="logo" height={20} width={20} />
        </div>
      </div>
      <div id="form" className="p-6  ">
        <p
          className={`text-5xl bg-gradient-to-b from-[#ffffff] to-[#2e2e2e] inline-block text-transparent bg-clip-text leading-[4rem] font-bold ${notoSans.className}`}
        >
          Introducing Elecbits Flux
        </p>
        <div className="w-full flex justify-center">
          <p
            className={`${notoSans.className} text-[#bfbfbf] font-bold tracking-widest`}
          >
            Source Components Like A Pro
          </p>
        </div>
        <div className="w-full flex flex-col items-center ">
          <form
            className=" w-10/12 mt-8 grid grid-cols-2 gap-4 mb-10"
            onSubmit={handleSubmit}
          >
            <div className="col-span-2">
              <label>{"Mail ID"}</label>
              <div className="mt-2"></div>
              <input
                placeholder="Enter Your Mail Id"
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border-b-2 border-gray-700 rounded focus:outline-none focus:border-gray-500"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {message && (
                <p className="text-red-500 text-xs mt-1">{message}</p>
              )}
            </div>
            <div className="col-span-1">
              <label>{"Name"}</label>
              <div className="mt-2"></div>
              <input
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border-b-2 border-gray-700 rounded focus:outline-none focus:border-gray-500"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label>{"Phone Number"}</label>
              <div className="mt-2"></div>
              <input
                placeholder="Enter Your Phone Number"
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border-b-2 border-gray-700 rounded focus:outline-none focus:border-gray-500"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>
            <div className="col-span-1">
              <label>{"Organization Name"}</label>
              <div className="mt-2"></div>
              <input
                placeholder="Enter Organization Name"
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border-b-2 border-gray-700 rounded focus:outline-none focus:border-gray-500"
                name="organizationName"
                type="text"
                value={formData.organizationName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label>{"Designation"}</label>
              <div className="mt-2"></div>
              <input
                placeholder="Enter Designation"
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border-b-2 border-gray-700 rounded focus:outline-none focus:border-gray-500"
                name="designation"
                type="text"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full col-span-2 mt-4 bg-[#232331] hover:bg-[#3365fb] py-4 rounded-md ${
                buttonStatus ? "cursor-not-allowed" : ""
              }`}
              disabled={buttonStatus}
            >
              {buttonStatus ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                <>
                  Join the Waitlist for Priority Access{" "}
                  <Image
                    className="inline-block"
                    src={"/RightArrow.png"}
                    alt=""
                    width={20}
                    height={20}
                  />
                </>
              )}
            </button>
          </form>
          <p className="text-3xl font-bold">Be the First to Experience</p>
          <p className="text-3xl  bg-gradient-to-r from-[#33E7FF] to-[#0702FC] inline-block text-transparent bg-clip-text font-bold">
            Something Amazing
          </p>
          {/* <Image
            src={""}
            alt={""}
            height={1000}
            width={1500}
            className="absolute bg-black left-1/2 translate-x-[-50%] translate-y-[30%] z-[-10]"
          /> */}
        </div>
        <Image
            src={ledImg}
            alt={""}
            height={1000}
            width={1500}
            className="absolute bo bg-black left-1/2 translate-x-[-50%] translate-y-[10%] z-[-10]"
          />
      </div>
      </div>
      <div className=" relative w-full h-[138vh] mt-[12rem] mx-3 flex justify-center">
        <Image
          src={SitePreviewImage}
          alt=""
          className="w-full h-50% absolute z-[-9] "
        />
        <Image
          src="/footerCoverIMG.png"
          alt={""}
          height={1000}
          width={1500}
          className="absolute bottom-0 w-full left-1/2 translate-x-[-50%] "
        />
        <div className="flex p-3 mb-16 z-20 w-[95%] absolute bottom-0 bg-gradient-to-r from-[rgba(7,2,252,0.3)] to-[rgba(0,255,255,0.3)] justify-between">
          <div className="flex flex-col items-center py-4 px-5">
            <p className="text-xl font-bold mb-2 text-white">
              Real-Time Sourcing
            </p>
            <p className="text-xs text-center text-white">
              Get instant quotes from 4000+ vendors & slash procurement time{" "}
            </p>
          </div>
          <div className="flex flex-col items-center py-4 px-5 ">
            <p className="text-xl font-bold mb-2 text-white">One Stop Shop</p>
            <p className="text-xs text-center w-2/3 text-white">
              Simplify Everything. Manage Components, quotes & delivery from a
              single platform
            </p>
          </div>
          <div className="flex flex-col items-center py-4 px-5">
            <p className="text-xl font-bold mb-2 text-white">
              Quality Assurance
            </p>
            <p className="text-xs text-center w-3/4 text-white">
              Streamline Bill of Materials with tiered solutions & data driven
              insights
            </p>
          </div>
          <div className="flex flex-col items-center py-4 px-5">
            <p className="text-xl font-bold mb-2 text-white">
              Effortless Delivery{" "}
            </p>
            <p className="text-xs text-center text-white">
              Focus on your business, EB Flux handles the rest
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
