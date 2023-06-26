"use client";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import React from "react";
import Divider from "@/components/Divider";
import SocialMediaLogger from "@/components/ui/SocialMediaLogger";
import LogInForm from "@/components/LogInForm/LogInForm";
import FormFooter from "@/components/ui/FormFooter";

const LogIn = () => {
  return (
    <div className="bg-main w-full h-screen flex flex-col">
      <Navbar />
      <div className="max-w-[900px] w-full bg-sidebar mx-auto h-full">
        <div className="mx-auto w-1/3 mt-20">
          <h1 className="text-3xl mb-6 font-bold">Log In</h1>
          <SocialMediaLogger />
          <div className="flex w-full items-center gap-2 mt-2 mb-4">
            <Divider /> <p>Or</p> <Divider />
          </div>
          <LogInForm />
          <FormFooter />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
