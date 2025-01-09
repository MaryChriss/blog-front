"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormLogin from "../FormLogin/FormLogin";
import FormCadastro from "../FormCadastro/FormCadastro";

export const SwitchPanel: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState<{ email: string; password: string } | null>(null);
    const router = useRouter();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <div>
                {isLogin ? (
                    <FormLogin toggleForm={toggleForm} />
                ) : (
                    <FormCadastro toggleForm={toggleForm} />
                )}
            </div>
        </div>
    );
};
