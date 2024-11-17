"use client"

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { userVerification } from "@/actions/new-verification";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { useState } from "react";
import { useRouter } from "next/router";

export function VerificationForm () {
    
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [sucess, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const onSubmit = async (token: string) => {
        setSuccess("")
        setError("")
        console.log(token)

        if(!token){
            setError("Something went wrong")
        }
        else{
            const verification = await userVerification(token);
            setSuccess(verification.success)
            setError(verification.error)
        }

    }

    if(!token){
        return <div>
            <Card>
                <CardContent className="flex items-center justify-center">
                    Something went wrong
                </CardContent>
            </Card>
        </div>
    }




    return <div className="flex items-center justify-center">
        <Card className = "w-[450px] mt-20">
            <CardHeader className="text-center text-3xl">
                <CardTitle >
                    One Step Away from Zaps!
                </CardTitle>
                <CardDescription>
                    Please click the button to verify
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Button onClick = {() => {onSubmit(token)}}>
                    Verify!
                </Button>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <FormSuccess message={sucess}/>
                <FormError message={error}/>
            </CardFooter>
        </Card>
    </div>
}