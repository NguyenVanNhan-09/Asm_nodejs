import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../Api";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z.object({
   email: z.string().nonempty("Email là bắt buộc").email(),
   password: z.string().nonempty("password là bắt buộc").min(6),
});

function Login() {
   const navi = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(userSchema) });
   const onSubmit = (user) => {
      (async () => {
         try {
            const { data } = await instance.post("login", user);
            if (data.user) {
               console.log(data.user);
               if (confirm("Login successfully")) {
                  navi("/");
               }
            }
         } catch (error) {
            console.log(error.message);
         }
      })();
   };
   return (
      <>
         <section class="bg-gray-50 dark:bg-gray-900 w-full">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               <a
                  href="#"
                  class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
               >
                  <img
                     class="w-8 h-8 mr-2"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                     alt="logo"
                  />
                  Login
               </a>
               <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                     <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                        Login
                     </h1>
                     <form
                        class="space-y-4 md:space-y-6"
                        action="#"
                        onSubmit={handleSubmit(onSubmit)}
                     >
                        <div>
                           <label
                              htmlFor="email"
                              class="block mb-2 text-sm font-medium text-white dark:text-white"
                           >
                              Your email
                           </label>
                           <input
                              type="email"
                              id="email"
                              class="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="name@company.com"
                              {...register("email", {
                                 required: true,
                              })}
                           />
                           {errors.email?.message && (
                              <p>{errors.email?.message}</p>
                           )}
                        </div>
                        <div>
                           <label
                              htmlFor="password"
                              class="block mb-2 text-sm font-medium text-white dark:text-white"
                           >
                              Password
                           </label>
                           <input
                              type="password"
                              id="password"
                              placeholder="••••••••"
                              class="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              {...register("password", {
                                 required: true,
                              })}
                           />
                           {errors.password?.message && (
                              <p>{errors.password?.message}</p>
                           )}
                        </div>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                           Already have an account?
                           <a
                              href="/register"
                              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                           >
                              Register now
                           </a>
                        </p>
                        <button
                           type="submit"
                           class="w-full bg-white text-slate-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                           Login
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Login;
