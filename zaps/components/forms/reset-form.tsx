"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Socials } from "@/components/global/socials";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { resetSchema } from "@/schemas/resetSchema";
import { reset } from "@/actions/reset";
export function ResetForm() {
  const searchParams = useSearchParams();
  
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    try {
      startTransition(async () => {
        // Reset the Values
        setError("");
        setSuccess("");

        // Server Action
        const status = await reset(values);

        console.log(status);

        setError(status?.error);
        setSuccess(status?.success);
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">Reset Password</CardTitle>
          <CardDescription>All Good!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <FormSuccess message={success} />
          <FormError message={error} />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            className="px-5 w-full bg-white text-black"
            variant="outline"
          >
            Send reset email
          </Button>
        </CardFooter>
        <CardFooter className="opacity-30 text-sm flex items-center justify-around">
          <Separator className="bg-white" />
        </CardFooter>
      </Card>
    </div>
  );
}
