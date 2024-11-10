"use client"
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";

export const Socials = () => {
  return (
    <div className="flex justify-around w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGoogle />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub />
      </Button>
    </div>
  );
};
