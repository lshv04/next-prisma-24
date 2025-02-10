// pages/services.tsx
import Form from "@/components/ui/form";
import type { NextPage } from "next";


const Services: NextPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <p>Get to know our services!</p>
        <Form/>
    </main>
  );
};

export default Services;
