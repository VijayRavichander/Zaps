
import { RegisterForm } from "@/components/forms/register-form";
import { VerificationForm } from "@/components/forms/verification-form";
import { useSearchParams } from "next/navigation";
const VerificationPage = () => {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        className="absolute inset-0 h-full w-full items-center px-5
           py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#225_100%)]"
      ></div>
      <div className="z-10">
        <VerificationForm />
      </div>
    </div>
  );
};

export default VerificationPage;
