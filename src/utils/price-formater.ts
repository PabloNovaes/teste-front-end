export const formatPrice = (value: number) => Intl.NumberFormat('pt-BR', {
    style: "currency", currency: "BRL"
}).format(value)