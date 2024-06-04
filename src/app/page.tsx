"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import SitePreviewImage from "../../public/SitePreview.png";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const notoSans = Noto_Sans({ subsets: ["latin"] });

interface Props {
    width: string
    label: string
    placeholder: string
    containerClasses: string
}


export default function Home() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phoneNumber: "",
        organizationName: "",
        designation: ""
    });

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

        console.log(formData)
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const emailResponse = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (emailResponse.ok) {
            alert("Email sent successfully!");
        } else {
            alert("Failed to send email.");
        }

        try {
            const docRef = await addDoc(collection(db, "signups"), formData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div id="top-bar" className="flex justify-between w-full bg-[#141414] p-2">
                <div className="logo-section flex items-center">
                    <Image src="/Logo.png" alt="logo" height={120} width={120} />
                </div>
                <div className="linked-in-section flex items-center">
                    <p className="text-[#999999] mr-2">Get Connected</p>
                    <Image src="/LinkedIn.png" alt="logo" height={20} width={20} />
                </div>

            </div>
            <div id="form" className="p-3 ">
                <p className={`text-5xl bg-gradient-to-b from-[#ffffff] to-[#2e2e2e] inline-block
                text-transparent bg-clip-text leading-[4rem] font-bold ${notoSans.className}`}>Introducing Elecbits Flux</p>
                <div className="w-full flex justify-center">
                    <p className={`${notoSans.className} text-[#bfbfbf] font-bold tracking-widest`}>Source Components Like A Pro</p>
                </div>
                <div className="w-full flex flex-col items-center ">
                    <form className="w-10/12 mt-8 grid grid-cols-2 gap-4 mb-10" onSubmit={handleSubmit}>

                        <div className="col-span-2">
                            <label>{"Mail ID"}</label>
                            <div className="mt-2"></div>
                            <input className="w-full" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="col-span-1">
                            <label>{"Name"}</label>
                            <div className="mt-2"></div>
                            <input className="w-full" name="name" type="text" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="col-span-1">
                            <label>{"Phone Number"}</label>
                            <div className="mt-2"></div>
                            <input className="w-full" name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} required />
                        </div>
                        <div className="col-span-1">
                            <label>{"Organization Name"}</label>
                            <div className="mt-2"></div>
                            <input className="w-full" name="organizationName" type="text" value={formData.organizationName} onChange={handleChange} required />
                        </div>
                        <div className="col-span-1">
                            <label>{"Designation"}</label>
                            <div className="mt-2"></div>
                            <input className="w-full" name="designation" type="text" value={formData.designation} onChange={handleChange} required />
                        </div>

                        <button className="w-full col-span-2 mt-4 bg-[#232331] hover:bg-[#3365fb] py-4 rounded-md">Join the Waitlist for Priority Access <Image className="inline-block" src={"/RightArrow.png"} alt="" width={20} height={20} /></button>
                    </form>
                    <p className="text-3xl font-bold">Be the First to Experience</p>
                    <p className="text-3xl bg-gradient-to-r from-[#33E7FF] to-[#0702FC] inline-block
                text-transparent bg-clip-text font-bold">Something Amazing</p>
                    <Image src="/LED.png" alt={""} height={1000} width={1500} className="absolute left-1/2 translate-x-[-50%] translate-y-[30%] z-[-10]" />
                </div>
            </div>
            <div className="relative w-full h-[120vh] mt-[16rem] mx-3 flex justify-center">
                <Image src={SitePreviewImage} alt="" className="w-full h-50% absolute z-[-9] " />
                <div className="flex p-3 z-20 w-[95%] absolute bottom-0 bg-gradient-to-r from-[#0500FF] to-[#00FFFF] justify-between bg-opacity-10">
                    <div className="flex flex-col items-center py-4 px-5">
                        <p className="text-xl font-bold mb-2">Real-Time Sourcing</p>
                        <p className="text-xs text-center">Get instant quotes from 4000+ vendors & slash procurement time </p>
                    </div>
                    <div className="flex flex-col items-center py-4 px-5 ">
                        <p className="text-xl font-bold mb-2">One Stop Shop</p>
                        <p className="text-xs text-center w-2/3">Simplify Everything. Manage Components, quotes & delivery from a single platform</p>
                    </div>
                    <div className="flex flex-col items-center py-4 px-5">
                        <p className="text-xl font-bold mb-2">Quality Assurance</p>
                        <p className="text-xs text-center w-3/4">Streamline Bill of Materials with tiered solutions & data driven insights</p>
                    </div>
                    <div className="flex flex-col items-center py-4 px-5">
                        <p className="text-xl font-bold mb-2">Effortless Delivery </p>
                        <p className="text-xs text-center">Focus on your business, EB Flux handles the rest</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
