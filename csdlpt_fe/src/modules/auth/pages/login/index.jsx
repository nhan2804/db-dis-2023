import React from "react";
import useLoginSSO from "@modules/auth/hooks/useLoginSSO";
import Input from "@components/Input";
import useLogin from "@modules/auth/hooks/useLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const Login = () => {
  const { mutate: login, isLoading } = useLogin();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      })
    ),
  });
  const onFinish = (values) => {
    console.log(values);
    login(values);
  };
  const { openLogin, isLoadingSSO } = useLoginSSO();
  return (
    <div className="flex items-center justify-center h-full">
      <div class=" bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <form
          onSubmit={handleSubmit(onFinish)}
          class="p-6 space-y-4 md:space-y-6 sm:p-8"
        >
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng nhập
          </h1>
          <div className="space-y-6">
            <Input
              {...register("username")}
              type="text"
              placeholder={"Tên tài khoản"}
              // className="w-full px-6 py-4 font-medium transition-colors border-[0.5px] rounded border-neutral-gray placeholder:text-neutral-medium-gray dark:bg-gray-800 dark:text-gray-50"
            />
            <Input
              {...register("password")}
              type="password"
              placeholder={"Mật khẩu"}
              // className="w-full px-6 py-4 font-medium transition-colors border-[0.5px] rounded border-neutral-gray placeholder:text-neutral-medium-gray dark:bg-gray-800 dark:text-gray-50"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
