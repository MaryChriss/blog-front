"use client";

import { Layout } from "@/components/Layout/Layout";
import React from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function PostDetail({ params }) {
    const { id } = params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter(); // Certifique-se de que está dentro de um Client Component

    const [post, setPost] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${apiUrl}/posts/${id}`);
                if (!res.ok) {
                    setError("Post não encontrado ou erro na API.");
                    console.error("Erro na API:", await res.text());
                    return;
                }

                const data = await res.json();
                setPost(data);
            } catch (err) {
                console.error("Erro ao buscar dados do post:", err);
                setError("Erro ao carregar os dados do post.");
            }
        };

        fetchPost();
    }, [id, apiUrl]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>Carregando...</p>;
    }

    return (
        <Layout>

            <div className="bg-login-fundo flex justify-center items-center">

                <div>

                <div className="flex justify-start items-start -ml-10"> 
                    <FaCircleArrowLeft
                        className=" -ml-96 cursor-pointer text-orange-800 hover:text-orange-700"
                        size={35}
                        onClick={() => router.push("/gerenciar-posts")}
                />
                </div>
                

                <div className="mt-72 mb-72 ">

                    <div className="p-10 pr-10  max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl">
                        <h1 className="text-3xl text-center font-bold mb-4">{post.titulo}</h1>
                        <p className="text-gray-700">{post.body}</p>
                    </div>
                </div>
                </div>
            </div>
        </Layout>
    );
}
