"use client";
import { useState } from "react";
import Image from "next/image";

const isPhoneNumberValid = (phoneNumber: string) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
};

export default function UserForm() {
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

        <form
            className=" w-10/12 mt-8 grid grid-cols-2 gap-4 mb-10"
            onSubmit={handleSubmit}
        >
            <div className="col-span-2">
                <label className="text-sm">{"Mail ID"}</label>
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
                <label className="text-sm">{"Name"}</label>
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
                <label className="text-sm">{"Phone Number"}</label>
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
                <label className="text-sm">{"Organization Name"}</label>
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
                <label className="text-sm">{"Designation"}</label>
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
                className={`w-full col-span-2 mt-4 bg-[#232331] hover:bg-[#3365fb] py-4 rounded-md ${buttonStatus ? "cursor-not-allowed" : ""
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
    )
}
