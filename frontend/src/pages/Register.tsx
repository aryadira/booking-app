import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        {/* firstname */}
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            type='text'
            className='border rounded w-full py-2 px-3 font-normal my-2'
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
        </label>
        {/* lastname */}
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            type='text'
            className='border rounded w-full py-2 px-3 font-normal my-2'
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
        </label>
      </div>
      {/* email */}
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-2 px-3 font-normal my-2'
          autoComplete='off'
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
      </label>
      {/* password */}
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-2 px-3 font-normal my-2'
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
      </label>
      {/* confirm password */}
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          type='password'
          className='border rounded w-full py-2 px-3 font-normal my-2'
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This filed is required";
              } else if (watch("password") != value) {
                return "Your password do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Have an account?{" "}
          <Link to='/sign-in' className='underline hover:underline hover:text-blue-700'>
            Sign in here!
          </Link>
        </span>
        <button type='submit' className='bg-blue-600 text-white py-2 px-4 rounded-sm font-bold hover:bg-blue-500 focus:bg-blue-700 text-xl'>
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
