"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout/Layout";
import { LuFlower } from "react-icons/lu";

export default function CriarPost() {
  const [titulo, setTitulo] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id_user: 22, titulo, body }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar post");
      }

      const newPost = await response.json();
      // Salvar o novo post no Local Storage
      const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      localStorage.setItem("posts", JSON.stringify([...storedPosts, newPost]));

      
      router.push("/gerenciar-posts");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    }
  };

  return (
    <Layout>

    <div
      className=" flex-col gap-14 bg-white min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ff5500" fill-opacity="0.7" d="M0,32L17.1,58.7C34.3,85,69,139,103,154.7C137.1,171,171,149,206,138.7C240,128,274,128,309,133.3C342.9,139,377,149,411,170.7C445.7,192,480,224,514,245.3C548.6,267,583,277,617,245.3C651.4,213,686,139,720,138.7C754.3,139,789,213,823,213.3C857.1,213,891,139,926,133.3C960,128,994,192,1029,229.3C1062.9,267,1097,277,1131,240C1165.7,203,1200,117,1234,101.3C1268.6,85,1303,139,1337,186.7C1371.4,235,1406,277,1423,298.7L1440,320L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg>')`,

      }}
      
    >
      <div className="mt-10">

        <h1 className="text-black text-xl
        xs:text-xs xs:p-5
        xmd:text-xs xmd:p-5
        xlg:text-xs xlg:p-5
        sm:text-sm
        md:text-sm
        lg:text-lg
        xl:text-lg
        2xl:text-xl
        ">
          Bem vindo! Estamos felizes em ter você aqui! <br/> 
          <br/>O <span className="text-orange-800">Bloom</span> é o seu novo espaço para explorar e
          compartilhar ideias através de posts.<br/> 
          Aqui, você pode criar, visualizar e interagir com conteúdos de<br/> 
          maneira simples e prática! <br/>

          <br/> Pronto para começar a compartilhar suas ideias e conectar-se com o mundo?<br/>  Vamos criar algo incrível juntos! <br/>
        </h1>

      </div>

      <div className="bg-opacity-70 bg-white/60 border border-orange-500 mb-28 rounded-2xl p-20 shadow-lg backdrop-blur-md w-full max-w-md">
        
        <div className="flex justify-center gap-4">
          <LuFlower className="text-orange-900 w-6 h-6" />
          <h1 className="text-2xl font-bold mb-4 text-center text-orange-900">Criar Novo Post</h1>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-orange-900">
              Título
            </label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do post"
              required
              className="w-full border border-gray-300 p-2 rounded-3xl focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-orange-900">
              Conteudo
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Digite o conteúdo do post"
              required
              className="w-full border text-black border-gray-300 p-2 rounded-3xl focus:ring-2 focus:ring-orange-400"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 w-full"
          >
            Criar Post
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
}
