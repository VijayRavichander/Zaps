import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (
    email: string, 
    token: string
) => {

    const verificationURL = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev", 
        to: email, 
        subject: "Confirm your email", 
        html: `<p>Hi, Welcome to Zaps! Click <a href=${verificationURL}>here</a> to verify your email address</p>`
    })

}

export const sendResetEmail = async (
    email: string, 
    token: string
) => {

    const resetURL = `http://localhost:3000/auth/reset-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev", 
        to: email, 
        subject: "Confirm your email", 
        html: `<p>Hi, Welcome to Zaps! Click <a href=${resetURL}>here</a> to verify your email address</p>`
    })
}