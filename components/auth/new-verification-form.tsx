"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/action/login";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/action/new-verification";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  console.log(token);
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Token is required!");
      return;
    }
    newVerification(token)
      .then((res) => {
        setError(res.error);
        setSuccess(res.success);
      })
      .catch((err) => {
        setError("Something went wrong! Please try again later.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
