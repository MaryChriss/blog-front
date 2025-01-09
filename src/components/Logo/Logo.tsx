import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';


const apiUrl = process.env.NEXT_API_URL;
interface User {
    name: string;
    email: string;
}

export const Logo = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    
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
        <h1 className="text-orange-800 text-lg font-semibold"> 
            <Typewriter
                words={["Deixe sua criatividade florescer 🏵️!"]}
                loop={true} 
                typeSpeed={190}
                deleteSpeed={180}
                delaySpeed={1000}
                cursor
                cursorStyle="|"
                />
            </h1>
        </div>
    );
};
