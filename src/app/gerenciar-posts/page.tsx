import { Layout } from "@/components/Layout/Layout";
import Link from "next/link";

export default function GerenciarPosts() {
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
                    Adicionar um pensamento
                </Link>
                </div>
            </div>

            </div>
        </Layout>
    )
}