import Image from "next/image";
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';

export const Logo = () => {

    return (
        <div className="flex items-center justify-center">
        <Link href="/">
            <Image
            className="w-15 h-auto rounded-md
            xs:w-14
            xmd:w-14
            xlg:w-16
            sm:w-16
            md:w-16
            lg:w-16
            xl:w-16
            2xl:w-16
            "
            src="/Logo.png"
            alt="bloco de notas alaranjado"
            width={100}
            height={100}
            />
        </Link>
        <h1 className="text-orange-800 text-lg font-semibold
        xs:text-xs 
        xmd:text-xs 
        xlg:text-xs 
        sm:text-base 
        md:text-base 
        lg:text-base
        xl:text-lg 
        2xl:text-lg
        "> 
            <Typewriter
                words={["Deixe sua criatividade florescer !"]}
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
