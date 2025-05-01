import { useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Input, Button, Link, Card, CardFooter } from "@nextui-org/react";

import { Header } from "~/layouts/header";
import { Footer } from "~/components/footer";

import useStore from "../store";

import "twin.macro";

const loginSchema = object({
  email: string().min(1, "Email address is required").email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export const Component = () => {
  const navigate = useNavigate();
  const store = useStore();

  const loginUser = async (data: LoginInput) => {
    try {
      store.setRequestLoading(true);
      const VITE_SERVER_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
      const response = await fetch(`${VITE_SERVER_ENDPOINT}/api/oauth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 400 && errorResponse.error) {
          throw new Error(errorResponse.error);
        } else {
          throw errorResponse;
        }
      }

      store.setRequestLoading(false);
      // store token in local storage
      const { result } = await response.json();
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
      // eslint-disable-next-line
    } catch (error: any) {
      store.setRequestLoading(false);
      if (error.error) {
        // eslint-disable-next-line
        error.error.forEach((err: any) => {
          toast.error(err.message, {
            position: "top-right",
          });
        });
        return;
      }
      const resMessage =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    if (section === "features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Add more sections if needed
  };

  return (
    <div className="dark-bg">
      <Header scrollToSection={scrollToSection} />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Container for form */}
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
          <form tw="flex flex-col w-full max-w-md px-4 md:w-96" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col justify-center text-center">
              <span className="h4 text-center">Welcome back</span>
              <span className="body text-center mb-8">Please enter your details below.</span>
            </div>
            <div
              className="flex w-full items-center justify-center gap-2 mb-8 rounded-2xl p-1"
              style={{ background: "#5A5A5A" }}
            >
              <div
                tw="w-full text-center px-10 py-3 rounded-xl text-secondary hover:cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </div>
              <div className="dark-bg text-center w-full px-10 py-3 rounded-xl">Login</div>
            </div>
            <div className="mb-5">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    color="primary"
                    isRequired
                    variant="bordered"
                    type="Email"
                    placeholder="Email"
                    description={errors.email?.message}
                    startContent={<img src="/icons/ui-icons/mail.svg" />}
                  />
                )}
              />
            </div>
            <div className="mb-6">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    color="primary"
                    isRequired
                    variant="bordered"
                    type="password"
                    placeholder="Password"
                    description={errors.password?.message}
                    startContent={<img src="/icons/ui-icons/lock.svg" />}
                  />
                )}
              />
            </div>

            <div tw="text-center">
              <Button type="submit" size="lg" className="w-full">
                Login
              </Button>
            </div>

            <div tw="flex items-center justify-center gap-2 mt-8 text-center">
              <span>Don't have an account?</span>
              <Link
                onClick={() => {
                  navigate("/register");
                }}
                underline="always"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
        {/* Container for image */}
        <div className="w-full md:w-1/2 hidden md:flex">
          <Card isFooterBlurred radius="none" className="border-none">
            <img src="../images/img_ai.svg" alt="" className="bg-section" />
            <CardFooter className="flex flex-col gap-y-2 justify-center before:bg-white/10 overflow-hidden py-10 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <span className="text-6xl font-medium text-white">AI Driven</span>
              <p className="text-lg font-light text-white text-center max-w-80">
                We are revolutionizing the way ad attribution is tailored to your business.
              </p>
            </CardFooter>
          </Card>
        </div>
        {/* Footer */}
      </div>
      <Footer scrollToSection={scrollToSection} />
    </div>

    // <div className="dark-bg">
    //   <div className="flex columns-3xl">
    //     {/* Container for form */}
    //     <div className="w-full h-screen flex items-center justify-center">
    //       <form tw="md:w-96" onSubmit={handleSubmit(onSubmitHandler)}>
    //         <div className="flex flex-col justify-center text-center">
    //           <span className="h4 text-center">Welcome back</span>
    //           <span className="body text-center mb-8">Please enter your details below.</span>
    //         </div>
    //         <div
    //           className="flex w-full items-center justify-center gap-2 mb-8 rounded-2xl p-1"
    //           style={{ background: "#5A5A5A" }}
    //         >
    //           <div
    //             tw="w-full text-center px-10 py-3 rounded-xl text-secondary hover:cursor-pointer"
    //             onClick={() => {
    //               navigate("/register");
    //             }}
    //           >
    //             Sign Up
    //           </div>
    //           <div className="dark-bg text-center w-full px-10 py-3 rounded-xl">Login</div>
    //         </div>
    //         <div className="mb-5">
    //           <Controller
    //             control={control}
    //             name="email"
    //             render={({ field }) => (
    //               <Input
    //                 {...field}
    //                 size="lg"
    //                 color="primary"
    //                 isRequired
    //                 variant="bordered"
    //                 type="Email"
    //                 placeholder="Email"
    //                 description={errors.email?.message}
    //                 startContent={<img src="/icons/ui-icons/mail.svg" />}
    //               />
    //             )}
    //           />
    //         </div>
    //         <div className="mb-6">
    //           <Controller
    //             control={control}
    //             name="password"
    //             render={({ field }) => (
    //               <Input
    //                 {...field}
    //                 size="lg"
    //                 color="primary"
    //                 isRequired
    //                 variant="bordered"
    //                 type="password"
    //                 placeholder="Password"
    //                 description={errors.password?.message}
    //                 startContent={<img src="/icons/ui-icons/lock.svg" />}
    //               />
    //             )}
    //           />
    //         </div>

    //         <div tw="text-center">
    //           <Button type="submit" size="lg" className="w-full">
    //             Login
    //           </Button>
    //         </div>

    //         <div tw="flex items-center justify-center gap-2 mt-8 text-center">
    //           <span>Don't have an account?</span>
    //           <Link onClick={() => {
    //               navigate("/register");
    //             }}
    //             underline="always">Sign up</Link>
    //         </div>
    //       </form>
    //     </div>
    //     {/* Container for image */}
    //     <div className="w-full">
    //       <img src="../images/login_img.svg" alt="" className="bg-section" />
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
  );
};
