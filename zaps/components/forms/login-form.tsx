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
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "@/components/ui/card";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { login } from "@/actions/login";
import { loginSchema } from "@/schemas/loginSchema";
import { useSearchParams } from "next/navigation";



export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? 
  "Email is already used by different provider!" : "";
  const [error, setError] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
        startTransition(async () => {
            // Reset the Values
            setError("")
            
            // Server Action
            const status = await login(values);
            if(status){
              setError(status.error)
            }
        })
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription>Welcome Back!</CardDescription>

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
                    <Input placeholder="Enter your email" {...field} disabled = {isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      disabled = {isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <FormError message = {error || urlError} />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled = {isPending}
            className="px-5 w-full bg-white text-black"
            variant="outline"
          >
            Login
          </Button>
        </CardFooter>
        <CardFooter className="opacity-30 text-sm flex items-center justify-around">
          <Separator className="bg-white" />
        </CardFooter>
        <CardFooter>
          <Socials />
        </CardFooter>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/auth/signup">Don't have an account already?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
