"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

//xs: xmd: xlg: sm: md: lg: xl: 2xl:

export default function GerenciarPosts() {
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>([]);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editedPost, setEditedPost] = useState({ titulo: "", body: "" });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/posts`);
                if (!response.ok) throw new Error("Erro ao buscar posts.");
                const data = await response.json();
    
                const sortedPosts = data.sort(
                    (a: any, b: any) =>
                        new Date(b.data_publicacao).getTime() -
                        new Date(a.data_publicacao).getTime()
                );
    
                localStorage.setItem("posts", JSON.stringify(sortedPosts));
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Erro ao carregar posts:", error);
            }
        };
    
        fetchPosts();
    }, []);
    

    const handleDelete = async (id: number) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (confirm("Tem certeza de que deseja excluir este post?")) {
            try {
                const response = await fetch(`${apiUrl}/posts/${id}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error("Erro ao excluir post.");
                setPosts(posts.filter((post) => post.id_post !== id));
            } catch (error) {
                console.error("Erro ao excluir post:", error);
            }
        }
    };

    const handleEdit = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (editingPostId) {
            try {
                const response = await fetch(`${apiUrl}/posts/${editingPostId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedPost),
                });
                if (!response.ok) throw new Error("Erro ao editar post.");
                setPosts(
                    posts.map((post) =>
                        post.id_post === editingPostId
                            ? { ...post, ...editedPost }
                            : post
                    )
                );
                setEditingPostId(null);
                setEditedPost({ titulo: "", body: "" });
            } catch (error) {
                console.error("Erro ao editar post:", error);
            }
        }
    };

    return (
        <Layout>
            <div className="bg-login-fundo p-4">
                {posts.length === 0 ? (
                    <div className="mt-80 mb-80 flex justify-center items-center text-center gap-10">
                        <div>
                            <h1 className="text-3xl font-semibold text-orange-900 mb-10
                            xs:text-xl
                            xmd:text-2xl 
                            xlg:text-2xl 
                            sm:text-3xl  
                            md:text-3xl 
                            lg:text-3xl 
                            xl:text-3xl 
                            2xl:text-3xl
                            ">
                                Nenhum post ainda. Que tal adicionar um?
                            </h1>
                            <Link
                                href="/"
                                className="bg-orange-500 text-white px-4 py-4 rounded-full hover:bg-orange-600 w-full
                                xs:text-sm 
                                xmd:text-sm 
                                xlg:text-sm 
                                sm:text-base 
                                md:text-base 
                                lg:text-base 
                                xl:text-base 
                                2xl:text-base
                                "
                            >
                                Adicionar um pensamento
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-48 mt-56">
                            <h1 className="text-3xl font-semibold text-orange-900">
                                Meu Mural:
                            </h1>
                            <Link
                                href="/"
                                className="bg-orange-500 text-white px-4 py-4 rounded-full hover:bg-orange-600 mt-5 inline-block"
                            >
                                Adicionar um pensamento
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mb-20
                        xs:flex xs:flex-col 
                        xmd:flex xmd:flex-col  
                        xlg:flex xlg:flex-col 
                        sm:flex sm:flex-col 
                        md:mb-20 
                        lg:mb-20 
                        xl:mb-20 
                        2xl:mb-20
                        ">
                            {posts.map((post) => (
                                <div
                                    key={post.id_post}
                                    className="p-4 bg-white shadow-xl rounded-lg border-l-4 border-yellow-300"
                                >
                                    <h2
                                        className="text-xl font-bold cursor-pointer text-black hover:text-blue-900"
                                        onClick={() =>
                                            router.push(`/posts/${post.id_post}`)
                                        }
                                    >
                                        {post.titulo}
                                    </h2>
                                    <p className="text-gray-600">
                                        {post.body.slice(0, 100)}...
                                    </p>
                                    <div className="flex justify-end space-x-4 mt-2">
                                        <button
                                            onClick={() => {
                                                setEditingPostId(post.id_post);
                                                setEditedPost({
                                                    titulo: post.titulo,
                                                    body: post.body,
                                                });
                                            }}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(post.id_post)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {editingPostId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-3xl shadow-lg
                        xs:mr-9 ml-9 
                        xmd:mr-8 xmd:ml-8 
                        xlg:p-6 xlg:mr-7 xlg:ml-7
                        sm:p-6 
                        md:p-6 
                        lg:p-6 
                        xl:p-6 
                        2xl:p-6
                        ">
                            <h3 className="text-xl font-bold mb-4">Editar Post</h3>
                            <input
                                type="text"
                                value={editedPost.titulo}
                                onChange={(e) =>
                                    setEditedPost({
                                        ...editedPost,
                                        titulo: e.target.value,
                                    })
                                }
                                className="w-full border p-2 mb-2"
                                placeholder="Título"
                            />
                            <textarea
                                value={editedPost.body}
                                onChange={(e) =>
                                    setEditedPost({
                                        ...editedPost,
                                        body: e.target.value,
                                    })
                                }
                                className="w-full border p-2 mb-4"
                                rows={4}
                                placeholder="Corpo do post"
                            ></textarea>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={handleEdit}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={() => setEditingPostId(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
