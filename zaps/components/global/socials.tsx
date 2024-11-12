"use client"
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const Socials = () => {
  const onClick = (provider: "github" | "google") => {
      signIn(provider, {
        redirectTo: DEFAULT_LOGIN_REDIRECT
      })
  }

  return (
    <div className="flex justify-around w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGoogle />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {onClick("github")}}>
        <FaGithub />
      </Button>
    </div>
  );
};
