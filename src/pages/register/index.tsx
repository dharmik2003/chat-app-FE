import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { API_METHOD, API_URL, PUBLIC_ROUTER } from "@/constant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { APICall } from "@/utils";
import Typography from "@/components/common/Typography";
import TextField from "@/components/common/TextField";

const RegisterPage = () => {
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
      fullName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      fullName: Yup.string().required("Full Name is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await APICall({
          url: API_URL.REGISTER,
          method: API_METHOD.POST,
          body: {
            email: values.email,
            password: values.password,
            username: values.fullName,
          },
        });

        if (response.success) {
          toast.success("Email verification link sent to your email.");
          router.push(PUBLIC_ROUTER.LOGIN);
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
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Account
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <Typography
            label={"Full Name"}
            color="#1F2937"
            fontWeight={500}
            size={16}
            className="leading-5 "
          />
          <TextField
            id="fullName"
            type="text"
            placeholder={"Enter Full Name"}
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-[40px]"
          />
          {errors.fullName && touched.fullName && (
            <span className="text-red-500 text-xs">{errors.fullName}</span>
          )}
        </div>

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
            isPassword
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
          {isSubmitting ? "Submitting..." : "Register"}
        </Button>
      </form>
      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href={PUBLIC_ROUTER.LOGIN}
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
