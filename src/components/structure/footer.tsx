import { cn } from "@/utils/cn";
import { facebook, instagram, linkedin, Logo } from "@/utils/custom-icons";
import { NewsLetterForm } from "../features/newslatter-form";

export function Footer() {
    return (
        <footer aria-label="footer" className="mt-[90px]">
            <div className="bg-violet py-12 w-full flex items-center justify-center">
                <div className="max-w-7xl min-[1700px]:max-w-[1550px] w-full grid place-items-center gap-8 max-sm:px-8 sm:gap-32 sm:grid-cols-2">
                    <div className="text-white grid gap-2">
                        <h2 className="text-3xl font-semibold">Inscreva-se na nossa newsletter</h2>
                        <p className="text-md font-light">Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
                    </div>
                    <NewsLetterForm />
                </div>
            </div>
            <div className="w-full bg-light-gray">
                <div className="max-w-7xl min-[1700px]:max-w-[1550px] mx-auto max-sm:px-8 sm:grid grid-cols-4 py-14">
                    <article className="grid gap-6 max-w-[354px] w-full">
                        <div className="grid gap-[18px]">
                            <img src={Logo} alt="logo" className="h-14" />
                            <p className="font-light">Compra segura e com qualidade <br /> em um só lugar</p>
                        </div>
                        <ul className="flex items-center gap-6">
                            <li><img src={instagram} alt="instagram-icon" /></li>
                            <li><img src={facebook} alt="facebook-icon" /></li>
                            <li><img src={linkedin} alt="linkedin-icon" /></li>
                        </ul>
                    </article>
                    <article className="col-span-3 sm:border-l border-gray/40 sm:px-[90px] flex items-center">
                        <nav className={cn(
                            "grid grid-cols-3 gap-24 w-full",
                            "max-sm:flex max-sm:flex-wrap max-sm:gap-8 py-8",
                            "[&_div_h3]:font-semibold [&_div_h3]:text-lg [&_div_h3]:text-[#222222B5] [&_div_h3]:mb-2",
                            "[&_div_ul]:grid sm:[&_div_ul]:gap-1 [&_div_ul]:font-light  [&_div_ul]:text-[#222222B5]",
                            "[&_div_ul_li_a]:cursor-pointer [&_div_ul_li_a]:hover:text-blue [&_div_ul_li_a]:transition-all [&_div_ul_li_a]:duration-200"
                        )}>
                            <div>
                                <h3>Institucional</h3>
                                <ul>
                                    <li><a href="#">Sobre nós</a></li>
                                    <li><a href="#">Movimento</a></li>
                                    <li><a href="#">Trabalhe conosco</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3>Ajuda</h3>
                                <ul>
                                    <li><a href="#">Suporte</a></li>
                                    <li><a href="#">Fale conosco</a></li>
                                    <li><a href="#">Perguntas frequentes</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3>Termos</h3>
                                <ul>
                                    <li><a href="#">Termos e condições</a></li>
                                    <li><a href="#">Política de privacidade</a></li>
                                    <li><a href="#">Troca e devolução</a></li>
                                </ul>
                            </div>
                        </nav>
                    </article>
                </div>
            </div>
            <span className="bg-white flex w-full justify-center py-2 font-light px-8 text-center max-sm:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
        </footer>
    )
}