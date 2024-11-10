"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Socials } from "../global/socials";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "../ui/card";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      // Add your login logic here
      alert("Logging Innn")
      console.log(values);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
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
                    <Input placeholder="Enter your email" {...field} />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
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
