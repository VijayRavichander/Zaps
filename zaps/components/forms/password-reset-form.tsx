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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "@/components/ui/card";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { resetPasswordForm } from "@/actions/reset";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { useSearchParams } from "next/navigation";


export function PasswordResetForm() {

  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")
  const searchParams = useSearchParams();
  const token = searchParams.get("token")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetPasswordSchema
>>({
    resolver: zodResolver(resetPasswordSchema
),
    defaultValues: {
      token: token || "",
      password1: "",
      password2: ""
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema
>) {
    try {
        startTransition(async () => {
            // Reset the Values
            setSuccess("")
            setError("")
            
            if(values.password1 == values.password2){
                const status = await resetPasswordForm(values)
                setSuccess(status.success)
                setError(status.error)
            }else{
                setError("Passwords didn't match")
            }
            
        })
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  if(!token){
    return <div>
        Something went wrong
    </div>
  }

  return (
    <div>
      <Card className="w-[450px] mt-20">
        <CardHeader>
          <CardTitle className="text-3xl">Reset your password</CardTitle>
          <CardDescription>A long password is always better</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-center gap-4"
          >
            <FormField
              control={form.control}
              name="password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} disabled = {isPending} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re Enter your password"
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
        <FormError message = {error} />
        <FormSuccess message = {success} />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled = {isPending}
            className="px-5 w-full bg-white text-black"
            variant="outline"
          >
            Reset your password
          </Button>
        </CardFooter>
        <CardFooter className="opacity-30 text-sm flex items-center justify-around">
          <Separator className="bg-white" />
        </CardFooter>
      </Card>
    </div>
  );
}
