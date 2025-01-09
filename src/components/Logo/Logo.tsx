import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_API_URL;
interface User {
    name: string;
    email: string;
}

export const Logo = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("loginData");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser({ name: parsedUser.cliente?.nome_cliente, email: parsedUser.email_login });
        } 
    }, [router]);
    
    return (
        <div className="flex items-center justify-center">
        <Link href="/">
            <Image
            className="w-15 h-auto rounded-md"
            src="/Logo.png"
            alt="pequena árvore verde"
            width={100}
            height={100}
            />
        </Link>
        <div className="flex justify-center items-center mt-20">
            <p
                className="font-crimson text-3xl font-semibold text-gray-800
                sm:text-2xl
                md:text-2xl md:mb-20
                lg:text-3xl
                xl:text-3xl
                2xl:text-xl
                min-[320px]:text-xl"
                >
                Bem vindo(a), {user?.name || "Nome do Usuário"}
            </p>
        </div>
        </div>
    );
};
