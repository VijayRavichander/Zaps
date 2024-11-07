import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { HeroHighlight, Highlight } from "@/components/global/hero-highlight";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import NavBar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/constant";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowBigLeft, ArrowRight, CheckIcon } from "lucide-react";
import { BackgroundBeams } from "@/components/global/background-beams";

export default function Home() {
  return (
    <main className="">
        <NavBar />
        <section className="h-screen w-full bg-neutral-950 rounded-md 
        !overflow-visible relative flex flex-col items-center antialiased">
          {/* Gradient  */}
          <div className="absolute inset-0 h-full w-full items-center px-5
           py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#225_100%)]"></div>
           <div className="flex flex-col mt-[-20px] md:mt-[-50px]">
           <ContainerScroll titleComponent = {
            <div className="flex items-center flex-col">
                <Button size = {'lg'} className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full
                border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center 
                 gap-4 hover:shadow-md hover:shadow-neutral-500 duration-500">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600
                  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                    Start Free Today
                  </span>
                </Button>
                <h1 className="text-5xl md:text-8xl bg-clip-text
                  text-transparent bg-gradient-to-b from-white to-600 font-sans font-bold">
                    Automate Your Work with Zaps
                </h1>
            </div>
           }/>
           </div>
        </section>
        <InfiniteMovingCards 
        className="md:mt-[18rem] mt-[1rem]"
        items = {clients}
        direction="right"
        speed = "slow" />
        <section>
          <HeroHighlight className="md:mt-[-200px] mt-[-350px] flex items-center flex-col font-semibold mb-[-100px]">
            <div className="text-3xl md:text-5xl bg-clip-text
                    text-transparent bg-gradient-to-b from-white to-slate-600 font-sans text-center">
            With Zaps, Every Connection is Possible, effortlessly linking {" "}
              <Highlight className="text-black dark:text-white">
                Anything, Anywhere, Anytime!
              </Highlight>
            </div>
          </HeroHighlight>
        </section>
        <section className="flex flex-col items-center mt-[-200px] md:mt-[-100px] z-10">
          <div className="text-center text-4xl md:text-6xl sm:mt-0 mb-10 z-10">
           Plans That Fits You
          </div>
          <div className="flex flex-wrap items-center  justify-center flex-col md:flex-row md:mx-10 gap-12">
          <Card className="z-10">
          <CardHeader>
            <CardDescription className="text-xl">Hobby</CardDescription>
            <CardTitle className="text-6xl">$0<span className="text-xl opacity-40">{"/"} month</span></CardTitle>
          </CardHeader>
          <CardContent className="w-[400px] md:!w-[350px]">
            <div className="text-zinc-300">
              Get a glimpse into the world of automation. 
              You might not leave us
            </div>
            <ul className="my-4 flex flex-col gap-2">
              <li className="flex itemes-center gap-2">
                <CheckIcon /> 3 Automations
              </li>
              <li className="flex itemes-center gap-2">
                <CheckIcon /> 100 Tasks per month
              </li>
              <li className="flex itemes-center gap-2">
                <CheckIcon /> 2 Step Actions
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button>
              Try Now <ArrowRight />
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-black dark:border-[#E2CBFF] ">
          <CardHeader>
            <CardDescription className="text-xl">Professional</CardDescription>
            <CardTitle className="text-6xl">$39<span className="text-xl opacity-40">{"/"} month</span></CardTitle>
          </CardHeader>
          <CardContent className="w-[400px] md:!w-[350px]">
            <div>
              Orchestra Your Work into Seamless and Efficient Zaps
            </div>
            <ul className="my-4 flex flex-col gap-2">
              <li className="flex itemes-center gap-2">
                <CheckIcon /> 100 Automations
              </li>
              <li className="flex itemes-center gap-2">
                <CheckIcon /> Unlimited Tasks per month
              </li>
              <li className="flex itemes-center gap-2">
                <CheckIcon /> 10+ Step Actions
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button>
              Try Now <ArrowRight />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="text-xl">Enterprise</CardDescription>
            <CardTitle className="text-6xl">$299<span className="text-xl opacity-40">{"/"} month</span></CardTitle>
          </CardHeader>
          <CardContent className="w-[400px] md:!w-[350px]">
            <div className="text-wrap">
              Transform your workforce into a storm of Zaps and Effortless Workflows using AI
            </div>
            <ul className="my-4 flex flex-col gap-2">
              <li className="flex itemes-center gap-2">
                <CheckIcon /> Unlimited Automations
              </li>
              <li className="flex itemes-center gap-2">
                <CheckIcon /> Unlimited per month
              </li>
              <li className="flex itemes-center gap-2">
                <CheckIcon /> Unlimited Step Actions
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button>
              Try Now <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
        {/* Need To Contain This Into A DIV  */}
        {/* <BackgroundBeams /> */}
          </div>
        </section>
    </main>
  );
}
