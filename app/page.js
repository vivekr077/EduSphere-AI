import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
      <div>
        <h3>HI BHAI</h3>
        <Button>Vivek</Button>
        <UserButton />
      </div>
  );
}
