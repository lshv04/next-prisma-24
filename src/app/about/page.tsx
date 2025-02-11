// pages/about.tsx
import FormUser from '@/components/ui/formUser';
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>See more about us!</p>
      <FormUser/>
    </main>
  );
};

export default About;
