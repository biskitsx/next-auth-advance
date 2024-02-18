"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import OuterLayoutRouter from "next/dist/client/components/layout-router";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-6 h-6" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-6 h-6" />
      </Button>
    </div>
  );
}
