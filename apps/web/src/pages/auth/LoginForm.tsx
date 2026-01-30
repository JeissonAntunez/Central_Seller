import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login.schema";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4">
      <input {...register("email")} placeholder="Email" />
      <input type="password" {...register("password")} />
      <button type="submit">Iniciar sesión</button>
    </form>
    
  );
};


export default LoginForm;
