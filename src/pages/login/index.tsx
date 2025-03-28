import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { API_METHOD, API_URL, PRIVATE_ROUTER, PUBLIC_ROUTER } from "@/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { APICall } from "@/utils";
import Typography from "@/components/common/Typography";
import TextField from "@/components/common/TextField";

const LoginPage = () => {
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await APICall({
          url: API_URL.LOGIN,
          method: API_METHOD.POST,
          body: {
            email: values.email,
            password: values.password,
          },
        });

        if (response.success) {
          toast.success("Login successfully");
          router.push(PRIVATE_ROUTER.DASHBOARD);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="max-w-md my-10 border h-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <Typography
            label={"Email"}
            color="#1F2937"
            fontWeight={500}
            size={16}
            className="leading-5 "
          />
          <TextField
            id="email"
            type="email"
            placeholder={"Enter email"}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-[40px]"
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <Typography
            label={"Password"}
            color="#1F2937"
            fontWeight={500}
            size={16}
            className="leading-5 "
          />
          <TextField
            id="password"
            type="password"
            placeholder={"Enter password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-[40px]"
          />
          {errors.password && touched.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href={PUBLIC_ROUTER.REGISTER}
            className="text-blue-600 hover:underline"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
