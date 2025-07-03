import { useMediaQuery } from "@/hooks/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const schema = z.object({
    name: z.string({ message: "Por favor, informe seu nome" }).min(3, "Informe um nome válido"),
    email: z.string({ message: "Por favor, informe seu email" }).email("Informe um email válido"),
    acceptTerms: z.literal(true, { errorMap: () => ({ message: "Você precisa aceitar os termos." }) }),

})

type FormData = z.infer<typeof schema>;

export function NewsLetterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log("Enviado:", data);
    };

    const { email, name, acceptTerms } = errors

    const mobile = useMediaQuery("(max-width: 640px)")
    const TermsInput = memo(() => (
        <div>
            <label htmlFor="terms" className="flex gap-2 text-white text-sm sm:mt-2 font-light">
                <input type="checkbox" id="terms" {...register("acceptTerms")} />
                Aceito os termos e condições
            </label>
            <span className="text-red-400 text-xs">{acceptTerms && acceptTerms.message}</span>
        </div>
    ))

    return (
        <form className="newslatter-form w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:gap-2 [&_label]:w-full sm:flex sm:items-stretch sm:[&_label]:max-w-[230px]">
                <label htmlFor="name">
                    <input type="text" id="name" placeholder="Digite seu nome" {...register("name")} />
                    <span className="text-red-400 text-xs">{name && name.message}</span>
                </label>
                <label htmlFor="email">
                    <input type="email" id="email" placeholder="Digite seu email" {...register("email")} />
                    <span className="text-red-400 text-xs">{email && email.message}</span>
                </label>
                {mobile && <TermsInput />}
                <Button variant={"primary"} className="sm:max-w-[158px] w-full h-[42px] sm:text-md">Inscrever-se</Button>
            </div>
            {!mobile && <TermsInput />}
        </form>
    )
}