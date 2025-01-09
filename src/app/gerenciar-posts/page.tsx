"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GerenciarPosts() {
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>([]);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editedPost, setEditedPost] = useState({ titulo: "", body: "" });

    // Fetch inicial dos posts
    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/posts`);
            if (!response.ok) throw new Error("Erro ao buscar posts.");
            const data = await response.json();

            localStorage.setItem("posts", JSON.stringify(data));
            setPosts(data);
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        }
        };

        fetchPosts();
    }, []);

    // Excluir post
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

    // Editar post
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
                post.id_post === editingPostId ? { ...post, ...editedPost } : post
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
            <div className="flex justify-center items-center text-center gap-5">
            <div className="gap-10 mt-10 mb-10">
                <div>
                <h1 className="text-3xl font-semibold text-orange-900 mb-10">
                    Meu Mural:
                </h1>
                </div>

                <div>
                <Link
                    href="/"
                    className="bg-orange-500 text-white px-4 py-4 rounded-full hover:bg-orange-600 w-full"
                >
                    Adicionar um pensamento
                </Link>
                </div>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => (
                <div
                key={post.id_post}
                className="p-4 bg-white shadow-glass rounded-lg border-l-4 border-blue-500"
                >
                <h2
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => router.push(`/posts/${post.id_post}`)} // Navegar para página do post
                >
                    {post.titulo}
                </h2>
                <p className="text-gray-600">{post.body.slice(0, 100)}...</p>{" "}
                {/* Preview */}
                <div className="flex justify-end space-x-4 mt-2">
                    <button
                    onClick={() => {
                        setEditingPostId(post.id_post);
                        setEditedPost({ titulo: post.titulo, body: post.body });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                    Editar
                    </button>
                    <button
                    onClick={() => handleDelete(post.id_post)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                    Excluir
                    </button>
                </div>
                </div>
            ))}
            </div>

            {/* Modal para edição (opcional) */}
            {editingPostId && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-bold mb-4">Editar Post</h3>
                <input
                    type="text"
                    value={editedPost.titulo}
                    onChange={(e) =>
                    setEditedPost({ ...editedPost, titulo: e.target.value })
                    }
                    className="w-full border p-2 mb-2"
                    placeholder="Título"
                />
                <textarea
                    value={editedPost.body}
                    onChange={(e) =>
                    setEditedPost({ ...editedPost, body: e.target.value })
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
