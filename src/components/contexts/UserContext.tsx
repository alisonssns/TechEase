import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Produto } from "../interfaces/Product";

interface User {
    id: number;
    cpf: string;
    nome: string;
    email: string;
    nomeCompleto: string;
    apelido: string;
    telefone: string;
    token: string;
}

interface UserContextType {
    user: User | null;
    carrinho: Produto[];
    login: (email: string, senha: string) => void;
    logout: () => void;
    gerenciarCarrinho: (id: number, opcao: number) => void;
    setAtualizarCarrinho: (prev: boolean) => void;
    atualizarCarrinho: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [atualizarCarrinho, setAtualizarCarrinho] = useState(false);

    const login = async (email: string, senha: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, senha });
            const { token, user } = response.data;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    const logout = () => {
        setUser(null);
        setCarrinho([]);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        axios.get<Produto[]>(`http://localhost:5000/api/getCartContent/?idUser=${user?.id}`)
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
            .then(() => {
                setAtualizarCarrinho(prev => !prev);
            })
            .catch(error => {
                console.error('Erro ao atualizar carrinho:', error);
            });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, carrinho, gerenciarCarrinho, setAtualizarCarrinho, atualizarCarrinho }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser deve ser usado dentro de um UserProvider");
    }
    return context;
};
