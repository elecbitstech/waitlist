import React from "react";
import Image from "next/image";
// import { Noto_Sans } from "next/font/google";
import SitePreviewImage from "../../public/SitePreview.png";
import formBg from "../../public/Slice1.png";
import UserForm from "./form.component";

// const notoSans = Noto_Sans({ subsets: ["latin"] });

const FooterItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center py-4 px-5 text-center">
      <p className="text-lg  md:text-xl font-bold mb-2 text-white">{title}</p>
      <p className="text-xs text-center text-white">{description}</p>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col  items-center">
      <div
        className="w-full flex flex-col  items-center  "
        style={{
          backgroundImage: `url(${formBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          id="top-bar"
          className="flex justify-between w-full bg-[#141414] p-2"
        >
          <a
            className="logo-section flex items-center cursor-pointer"
            target="_blank"
            href="https://elecbits.in"
          >
            <Image src="/Logo.png" alt="logo" height={120} width={120} />
          </a>
          <a
            className="linked-in-section flex items-center cursor-pointer"
            target="_blank"
            href="https://www.linkedin.com/company/elecbits/mycompany/"
          >
            <p className="text-[#999999] mr-2">Get Connected</p>
            <Image src="/LinkedIn.png" alt="logo" height={20} width={20} />
          </a>
        </div>
        <div id="form" className="p-0  md:p-6 ">
          <div className="w-full flex flex-col items-center justify-center">
            <p
              className={`text-2xl md:text-5xl bg-gradient-to-b from-[#ffffff] to-[#2e2e2e] inline-block text-transparent bg-clip-text leading-[4rem] font-bold ${notoSans.className} mx-auto`}
            >
              Introducing Elecbits Flux
            </p>
            <p
              className={`${notoSans.className} text-md md:text-lg text-[#bfbfbf] font-bold tracking-widest`}
            >
              Source Components Like A Pro
            </p>
          </div>
          <div className="w-full flex flex-col items-center ">
            <UserForm />
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
            src={"./svg gradient.svg"}
            alt={""}
            height={1000}
            width={1500}
            className="absolute left-1/2 translate-x-[-50%]  z-[-10]"
          />
        </div>
      </div>
      <div className="relative w-full h-[70vh] md:h-[138vh] mt-[4rem] md:mt-[12rem] mx-3 flex justify-center">
        <Image
          src={SitePreviewImage}
          alt=""
          className="w-full h-full absolute z-[-9] object-cover"
        />
        <Image
          src="/footerCoverIMG.png"
          alt={""}
          height={1000}
          width={1500}
          className="absolute bottom-0 w-full left-1/2 translate-x-[-50%] h-"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 p-3 mb-16 z-20 w-[95%] absolute bottom-0 bg-gradient-to-r from-[rgba(7,2,252,0.5)] md:from-[rgba(7,2,252,0.3)] to-[rgba(0,255,255,0.5)] md:to-[rgba(0,255,255,0.3)] ">
          <FooterItem
            title="Real-Time Sourcing"
            description="Get instant quotes from 4000+ vendors & slash procurement time"
          />
          <FooterItem
            title="One Stop Shop"
            description="Simplify Everything. Manage Components, quotes & delivery from a
              single platform"
          />
          <FooterItem
            title="Quality Assurance"
            description="Streamline Bill of Materials with tiered solutions & data driven
              insights"
          />
          <FooterItem
            title="Effortless Delivery"
            description="Focus on your business, EB Flux handles the rest"
          />
        </div>
      </div>
    </main>
  );
}
