import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Produto } from "../products/Product";
import axios from "axios";

interface CarrinhoContextType {
    carrinho: Produto[];
    gerenciarCarrinho: (id: number, opcao: number) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [atualizarCarrinho, setAtualizarCarrinho] = useState(false);

    useEffect(() => {
        axios.get<Produto[]>('http://localhost:5000/api/getCartContent/?idUser=54')
            .then(response => {
                setCarrinho(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, [atualizarCarrinho]);

    const gerenciarCarrinho = (id: number, opcao: number) => {
        const url = `http://localhost:5000/api/updateCart?idUser=54&idProd=${id}&option=${opcao}`;
        
        axios.post(url)
            .then(response => {
                console.log('Carrinho atualizado com sucesso:', response.data);
                setAtualizarCarrinho(prev => !prev);
            })
            .catch(error => {
                console.error('Erro ao atualizar carrinho:', error);
            });
    };
    

    return (
        <CarrinhoContext.Provider value={{ carrinho, gerenciarCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error("useCart deve ser usado dentro de um CarrinhoProvider");
    }
    return context;
};
