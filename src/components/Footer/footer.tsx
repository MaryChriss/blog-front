import Image from "next/image"
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5"

export const Footer = () => {
    return(
        <div className="flex w-full h-13 bg-black items-center pr-10 gap-96 justify-center">

            <div  className="flex justify-end items-center pr-10 mr-56">
                <Image src="/Logo.png" alt={""} width={100} height={100}/> 
                <h1 className="text-white text-lg">Bloom</h1>     
            </div>  

            <div className="flex justify-start gap-3 ml-52">
                <a
                    href="https://github.com/MaryChriss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                    <IoLogoGithub className="w-6 h-6" />
                </a>
                <a
                    href="https://www.linkedin.com/in/mariana-fernandes-92690425a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                    <IoLogoLinkedin className="w-6 h-6" />
                </a>
            </div>


        </div>
    )
}