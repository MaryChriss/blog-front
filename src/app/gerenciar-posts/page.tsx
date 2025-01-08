import { Layout } from "@/components/Layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface User {
    name: string;
    email: string;
}

interface Post {
    id_post: number;
    modelo: string;
    marca: string;
    ano: number;
}


export default function GerenciarPosts() {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setposts] = useState<Post[]>([]);
    return(
        <Layout>

            <div>

            <div>
                <div>
                    <h1>Meu Mural:</h1>
                </div>

                <div>
                <Link href="/"
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 w-full"
                >
                    Adicionar pensamento
                </Link>
                </div>

                <div>

                </div>
            </div>

            </div>
        </Layout>
    )
}