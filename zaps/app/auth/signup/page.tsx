import { RegisterForm } from "@/components/forms/register-form";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        className="absolute inset-0 h-full w-full items-center px-5
           py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#225_100%)]"
      ></div>
      <div className="z-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginPage;
