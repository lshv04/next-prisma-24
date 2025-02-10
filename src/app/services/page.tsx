"use client"
import FormUser from "@/components/ui/formUser";
import UserInput from "@/components/ui/UserInput";
import type { NextPage } from "next";


const Services: NextPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <p>Get to know our services!</p>
        <FormUser/>
        <br />
        <UserInput/>
        
    </main>
  );
};

export default Services;
