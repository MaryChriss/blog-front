import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UserFormData {
    username: string;
    email_login: string;
}

interface LoginFormData {
    password: string;
    confirmPassword: string;
}

interface FormCadastroProps {
    toggleForm: () => void;
}

const schemaUser = Yup.object().shape({
    username: Yup.string().required("Nome é obrigatório"),
    email_login: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

const schemaLogin = Yup.object().shape({
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas não coincidem")
        .required("Confirme sua senha"),
});

const FormCadastro: React.FC<FormCadastroProps> = ({ toggleForm }) => {
    const [step, setStep] = useState(1); 
    const [userId, setUserId] = useState<string | null>(null);
    const [email_login, setEmail_login] = useState<string>(""); 


    const {
        register: registerUser,
        handleSubmit: handleSubmitUser,
        formState: { errors: errorsUser },
    } = useForm<UserFormData>({ resolver: yupResolver(schemaUser) });

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLoginForm,
    } = useForm<LoginFormData>({ resolver: yupResolver(schemaLogin), defaultValues: {password: "", confirmPassword: ""} });

    const onSubmitUser: SubmitHandler<UserFormData> = async (login) => {
        const { username, email_login,} = login;
        setEmail_login(email_login); 
    
        try {
            const response = await fetch(`${apiUrl}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/username" },
                body: JSON.stringify({
                    username: username,
                    email_login: email_login,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setUserId(result.id_user);
                setEmail_login(email_login);
                resetLoginForm();
                setStep(2);
            } else {
                console.log("erro",response.json);
                console.log("erro",response);
                alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            alert("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
        }
    };

    const onSubmitLogin: SubmitHandler<LoginFormData> = async (data) => {
        const { password } = data;
        try {
            await fetch(`${apiUrl}/webapi/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_login: email_login ,
                    senha_login: password,
                    id_user: userId ,
                }),
            });

            alert("Cadastro realizado com sucesso! Agora faça o login.");
            toggleForm();
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            alert("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-10 font-raleway font-bold text-xl">Cadastre-se:</h1>
            {step === 1 ? (
                <form className="flex flex-col" onSubmit={handleSubmitUser(onSubmitUser)}>
                    <input
                        className="w-80 pl-10 py-2 mb-4 border border-gray-300 rounded-full text-base bg-gray-100 focus:border-orange-500 focus:outline-none"
                        type="text"
                        placeholder="Nome Completo"
                        {...registerUser("username")}
                    />
                    {errorsUser.username && <p>{errorsUser.username.message}</p>}

                    <input
                        className="w-80 pl-10 py-2 mb-4 border border-gray-300 rounded-full text-base bg-gray-100 focus:border-orange-500 focus:outline-none"
                        type="email"
                        placeholder="Email"
                        {...registerUser("email_login")}
                    />
                    {errorsUser.email_login && <p>{errorsUser.email_login.message}</p>}

                    <div className="flex justify-center mt-5">
                        <button
                            className="w-1/2 p-1 bg-orange-700 hover:bg-orange-600 text-white border-none rounded-lg cursor-pointer mb-12"
                            type="submit"
                        >
                            Próximo
                        </button>
                    </div>
                </form>
            ) : (
                <form className="flex flex-col" onSubmit={handleSubmitLogin(onSubmitLogin)}>
                    <input
                        className="w-80 pl-10 py-2 mb-4 border border-gray-300 rounded-full text-base bg-gray-100 focus:border-orange-500 focus:outline-none"
                        type="password"
                        placeholder="Senha"
                        {...registerLogin("password")}
                    />
                    {errorsLogin.password && <p>{errorsLogin.password.message}</p>}

                    <input
                        className="w-80 pl-10 py-2 mb-4 border border-gray-300 rounded-full text-base bg-gray-100 focus:border-orange-500 focus:outline-none"
                        type="password"
                        placeholder="Confirme sua senha"
                        {...registerLogin("confirmPassword")}
                    />
                    {errorsLogin.confirmPassword && <p>{errorsLogin.confirmPassword.message}</p>}

                    <div className="flex justify-center mt-14">
                        <button
                            className="w-44 p-1 bg-orange-700 hover:bg-orange-600 text-white border-none rounded-lg cursor-pointer mb-12"
                            type="submit"
                        >
                            Cadastrar!
                        </button>
                    </div>
                </form>
            )}
            <a
                className="flex justify-center text-center mt-4 cursor-pointer text-orange-950 font-itim underline mb-7"
                onClick={toggleForm}
            >
                Já tem uma conta? Login
            </a>
        </div>
    );
};

export default FormCadastro;
