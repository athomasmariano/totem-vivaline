import Aside from "@/components/Aside/page"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
    return(
        <div className="flex bg-gradient-to-b from-white to-[#C7CDCF] flex-1   ">
            
            <Aside/>
            <main className="h-full sm:w-full sm:flex sm:flex-col md:w-full lg:w-[65%]">
                <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                    <li className="flex justify-center">
                        <Link href="/mapainterativo">
                            <Image
                                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                                src="/assets/mapa-interativo-semfundo.png"
                                alt="Mapa interativo"
                                width={260}
                                height={250}
                            />
                        </Link>
                    </li>

                    <li className="flex justify-center">
                        <Link href="/StatusLinhas">
                            <Image
                                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                                src="/assets/status-linhas-semfundo.png"
                                width={260}
                                height={250}
                                alt="Status das linhas"
                            />
                        </Link>
                    </li>

                    <li className="flex justify-center">
                        <Link href="/Comercios">
                            <Image
                                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                                src="/assets/comercios-locais-semfundo.png"
                                width={260}
                                height={250}
                                alt="Comércios locais"
                            />
                        </Link>
                    </li>

                    <li className="flex justify-center">
                        <Link href="/Chatbot">
                            <Image
                                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                                src="/assets/assistente-virtual-semfundo.png"
                                width={260}
                                height={250}
                                alt="Assistente virtual"
                            />
                        </Link>
                    </li>
                </ul>
            </main>
        

        </div>
    )
}
export default Home