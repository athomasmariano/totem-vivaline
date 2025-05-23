import Image from "next/image"
import Link from "next/link"

const QuemSomos = () => {
  return (
    <main className="h-full flex justify-center">
        <ul className="flex justify-center items-center gap-6 md:gap-[10vw] lg:gap-[20vw]  ">
          <li className="text-center flex flex-col gap-3.5 ">
            <Image className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-full w-[100px] md:w-[200px] lg:w-[200px] " src="./assets/Arthur.svg" width={200} height={200} alt="Arthur_image"/>
            <p className="font-medium text-1xl md:text-2xl lg:text-2xl">Arthur Thomas</p>
            <p>RM: 561061</p>
            <p className="text-[0.75rem] md:text-base lg:text-base" >TURMA: 1TDSPA</p>

            <Link className="flex items-center justify-center" href="https://github.com/athomasmariano" target="_blank">
            <Image className="flex items-center justify-center" src="./assets/Github.svg"  width={50} height={50} alt="Github"/>
            </Link>

            <Link className="flex items-center justify-center" href="https://www.linkedin.com/in/arthur-thomas-mariano-941a97234/" target="_blank">
            <Image src="./assets/Linkedin.svg"  width={50} height={50} alt="Linkedin"/>
            </Link>
          </li>

          <li className="text-center flex flex-col gap-3.5 ">
            <Image className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-full w-[100px] md:w-[200px] lg:w-[200px] " src="./assets/Luann.svg" width={200} height={200} alt="Luann_image"/>
            <p className="font-medium text-1xl md:text-2xl lg:text-2xl">Luann Noqueli</p>
            <p>RM: 560313</p>
            <p className="text-[0.75rem] md:text-base lg:text-base">TURMA: 1TDSPA</p>

            <Link className="flex items-center justify-center" href="https://github.com/luannoq" target="_blank">
            <Image src="./assets/Github.svg"  width={50} height={50} alt="Github"/>
            </Link>

            <Link className="flex items-center justify-center" href="https://www.linkedin.com/in/luann-noqueli-60628a2b0/" target="_blank">
            <Image src="./assets/Linkedin.svg"  width={50} height={50} alt="Linkedin"/>
            </Link>
            
          </li>
           
          <li className="text-center flex flex-col gap-3.5 ">
            <Image className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-full w-[100px] md:w-[200px] lg:w-[200px] " src="./assets/Jhonatta.svg" width={200} height={200} alt="Jhonatta_image"/>
            <p className="font-medium text-1xl md:text-2xl lg:text-2xl">Jhonatta Lima</p>
            <p>RM: 560277</p>
            <p className="text-[0.75rem] md:text-base lg:text-base">TURMA: 1TDSPA</p>

            <Link className="flex items-center justify-center" href="https://github.com/JhonattaLimaSandesdeOLiveira" target="_blank">
            <Image src="./assets/Github.svg"  width={50} height={50} alt="Github"/>
            </Link>

            <Link className="flex items-center justify-center" href="" target="_blank">
            <Image src="./assets/Linkedin.svg"  width={50} height={50} alt="Linkedin"/>
            </Link>
          </li>






        </ul>
    </main>
  )
}
export default QuemSomos