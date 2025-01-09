import Image from "next/image"
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5"

 // xs: xmd: xlg: sm: md: lg: xl: 2xl:

export const Footer = () => {
    return(
        <div className="flex w-full h-13 bg-black items-center pr-10 gap-96 justify-center
            xs:pr-0 xs:gap-0
            xmd:pr-0 xmd:gap-0
            xlg:pr-0 xlg:gap-0
            sm:pr-0 sm:gap-0
            md:pr-0 md:gap-24
            lg:mr-0
            xl:pr-10
            2xl:pr-10
        ">

            <div  className="flex justify-end items-center pr-10 mr-56
            xs:-mr-36 xs:pr-0
            xmd:-mr-16 xmd:pr-0
            xlg:mr-0 xlg:pr-0
            sm:mr-0 sm:pr-0
            md:mr-0 md:pr-0
            lg:mr-0
            xl:pr-10
            2xl:pr-10
            ">
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