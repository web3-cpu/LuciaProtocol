import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link, Card, CardFooter } from "@nextui-org/react";

import { Header } from "~/layouts/header";
import { Footer } from "~/components/footer";

import useStore from "../store";

import "twin.macro";

const registerSchema = object({
  firstName: string().min(1, "First name is required").max(100),
  lastName: string().min(1, "Last name is required").max(100),
  email: string().min(1, "Email address is required").email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

export const Component = () => {
  const navigate = useNavigate();
  const store = useStore();

  const registerUser = async (data: RegisterInput) => {
    try {
      store.setRequestLoading(true);
      const VITE_SERVER_ENDPOINT: string = import.meta.env.VITE_SERVER_ENDPOINT;
      const response = await fetch(`${VITE_SERVER_ENDPOINT}/api/oauth/signup`, {
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

      toast.success("Account created successfully", {
        position: "top-right",
      });
      store.setRequestLoading(false);
      navigate("/login");
      // eslint-disable-next-line
    } catch (error: any) {
      store.setRequestLoading(false);
      if (error.error) {
        error.error.forEach((err: { message: string }) => {
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

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
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
        {/* Form Column */}
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
          <form className="flex flex-col w-full max-w-md px-4 md:w-96" onSubmit={handleSubmit(onSubmitHandler)}>
            <span className="h4 text-center">Create your account</span>
            <span className="body text-center mb-8">100% free to join!</span>
            <div
              className="flex w-full items-center justify-center gap-2 mb-8 rounded-2xl p-1"
              style={{ background: "#5A5A5A" }}
            >
              <div className="dark-bg text-center w-full px-10 py-3 rounded-xl">Sign Up</div>
              <div
                className="w-full text-center px-10 py-3 rounded-xl text-secondary hover:cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </div>
            </div>
            <div className="mb-5">
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    color="primary"
                    isRequired
                    variant="bordered"
                    placeholder="First name"
                    description={errors.firstName?.message}
                    startContent={<img src="/icons/ui-icons/face.svg" />}
                  />
                )}
              />
            </div>

            <div className="mb-6">
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    color="primary"
                    isRequired
                    variant="bordered"
                    placeholder="Last name"
                    description={errors.lastName?.message}
                    startContent={<img src="/icons/ui-icons/face.svg" />}
                  />
                )}
              />
            </div>

            <div className="mb-6">
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
                    type="email"
                    placeholder="Email"
                    description={errors.email?.message}
                    startContent={<img src="/icons/ui-icons/mail.svg" />}
                  />
                )}
              />
            </div>

            <div className="mb-5">
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
            <div className="mb-5">
              <Controller
                control={control}
                name="passwordConfirm"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    color="primary"
                    isRequired
                    variant="bordered"
                    type="password"
                    placeholder="Confirm Password"
                    description={errors.passwordConfirm?.message}
                    startContent={<img src="/icons/ui-icons/lock.svg" />}
                  />
                )}
              />
            </div>
            <div className="text-center">
              <Button size="lg" type="submit" className="w-full">
                Continue
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-8 text-center">
              <span>Already have an account?</span>
              <Link
                onClick={() => {
                  navigate("/login");
                }}
                underline="always"
              >
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Image Column (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <Card isFooterBlurred radius="none" className="border-none">
            <img src="../images/img_roi.svg" alt="" className="bg-section" />
            <CardFooter className="flex flex-col gap-y-2 justify-center before:bg-white/10 overflow-hidden py-10 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <span className="text-4xl font-medium text-white">Drive your ROI over 200%</span>
              <p className="text-lg font-light text-white text-center max-w-80">
                With our AI modeled Attribution models, we can guarantee over 200%
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};
