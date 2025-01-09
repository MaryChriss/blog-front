import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa6";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface FormLoginProps {
    toggleForm: () => void;
}

interface LoginFormData {
    email_login: string;
    senha_login: string;
}


const schema = Yup.object().shape({
    email_login: Yup.string().email("Email inválido").required("Email é obrigatório"),
    senha_login: Yup.string().required("Senha é obrigatória"),
});

const FormLogin: React.FC<FormLoginProps> = ({ toggleForm }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const response = await fetch(`${apiUrl}/login/autenticar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_login: data.email_login,
                    senha_login: data.senha_login,
                }),
            });

            if (response.status === 202) {
                const loginData = await response.json();
                localStorage.setItem("loginData", JSON.stringify(loginData));
                alert("Login bem-sucedido!");
                router.push("/");
            } else if (response.status === 403) {
                alert("E-mail ou senha incorretos.");
            } else {
                alert("Erro ao autenticar. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            alert("Erro ao autenticar. Por favor, tente novamente mais tarde.");
        }
    };
    // sm: md: lg: xl: 2xl:
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-10 font-raleway font-bold text-xl">Login:</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" relative w-full mb-4">
                        <span className="absolute top-1/2 left-3 transform -translate-y-5 text-2xl text-orange-500">
                            <BiUser size="1.5rem" color="#f25c1d" />
                        </span>
                        <input className="w-80 pl-10 py-2 mb-4 border border-gray-300 rounded-full text-base bg-gray-100 focus:border-orange-500 focus:outline-none min-[320px]:w-60 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80"
                            type="text"
                            placeholder="E-mail"
                            {...register("email_login")}
                        />
                    </div>
                    {errors.email_login && <p>{errors.email_login.message}</p>}

                    <div className=" relative w-full mb-4">
                        <span  className="absolute top-1/2 left-3 transform -translate-y-5 text-2xl text-orange-500">
                            <FaLock size="1.5rem" color="#f25c1d" />
                        </span>
                        <input
                            className="w-80 pl-10 py-2 mb-4 border border-gray-300 rounded-full text-base bg-gray-100 focus:border-orange-500 focus:outline-none min-[320px]:w-60 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80"
                            type="senha_login"
                            placeholder="Senha"
                            {...register("senha_login")}
                        />
                    </div>
                    {errors.senha_login && <p>{errors.senha_login.message}</p>}

                    <div className="flex justify-center">
                        <button className="w-1/2 p-1 bg-orange-700 hover:bg-orange-600 text-white border-none rounded-lg cursor-pointer mb-12" type="submit">Entrar</button>
                    </div>
                </form>
                <a className="flex justify-center text-center mt-4 cursor-pointer text-orange-950 font-itim underline mb-7" onClick={toggleForm}>É novo aqui? Cadastre-se</a>
            </div>
        </>
    );
};

export default FormLogin;
