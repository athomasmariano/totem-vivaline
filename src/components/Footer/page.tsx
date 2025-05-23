import Image from 'next/image'

const Footer = () => {
    return(
        <footer className="bg-[#454444] text-white flex h-[3.25rem] items-center gap-4 pl-4  border-t border-black ">
            <h3 className="text-white text-sm lg:text-[1rem] md:text-[1rem]">2024 Grupo Spectrum</h3>

            <a href="https://www.instagram.com/spectrumfiap/" target="_blank">
                <Image className="w-[25] md:w-[30] lg:w-[35]  " src="assets/Insta-branco.svg" alt="insta-branco" width={35} height={20} />
            </a>


        </footer>
    )
} 
export default Footer