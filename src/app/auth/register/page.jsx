"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password != data.confirmPassword) {
      return alert("passwords doesn't match");
    }
    
    const res = await fetch('/api/auth/register', {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
   
    if (res.ok) {
      router.push("/auth/login");
    }
    
  });
    


  return (
    <div className="h-[calc(120vh)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/3">
        <h1 className="font-bold text-slate-200 text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username
        </label>
        <input
          type="text"
          placeholder="Username123"
          {...register("username", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email
        </label>
        <input
          type="email"
          placeholder="something123@gmail.com"
          {...register("email", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password
        </label>
        <input
          type="password"
          placeholder="*******"
          {...register("password", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password
        </label>
        <input
          type="Password"
          placeholder="*******"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-red 700 text-white font-bold p-3 mt- rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}
