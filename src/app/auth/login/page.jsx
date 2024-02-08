"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    

    console.log(res)
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
      router.refresh()
    }
  });

  return (
    
      <div className="h-[calc(120vh-7rem)] flex justify-center items-center flex flex-col">
        <form onSubmit={onSubmit} className="w-1/3">
          {error && <p className="bg-red-500 text-lg text-white">{error}</p>}
          <h1 className="font-bold text-slate-200 text-4xl mb-4">Login </h1>

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
          <label
            htmlFor="password"
            className="text-slate-500 mb-2 block text-sm"
          >
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

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-red 700 text-white font-bold p-3 mt- rounded-lg"
          >
            Login
          </button>
        </form>

        
        <div className="mt-4 text-white text-center">
          <p>No tenes cuenta? creala aca:</p>
          <button
            className="w-full bg-blue-500 hover:bg-red 700 text-white font-bold p-3 mt- rounded-lg"
          >
            <Link href="/auth/register">Crear cuenta</Link> 
          </button>
        </div>
      </div>
    
  );
}

export default LoginPage;
