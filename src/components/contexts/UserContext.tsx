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

interface Pedido {
    id: number;
    id_user: number;
    data: string;
    valor_total: number;
    status: string;
}

interface UserContextType {
    user: User | null;
    carrinho: Produto[];
    pedidos: Pedido[];
    login: (email: string, senha: string) => void;
    logout: () => void;
    gerenciarCarrinho: (id: number, opcao: number) => void;
    setAtualizarCarrinho: (prev: boolean) => void;
    checkout: () => void;
    atualizarCarrinho: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [atualizarCarrinho, setAtualizarCarrinho] = useState(false);

    useEffect(() => {
        const prevLogin = (localStorage.getItem("user"))
        if (prevLogin) {
            setUser(JSON.parse(prevLogin))
        }
    }, [])

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

    useEffect(() => {
        if (user?.id) {
            axios.get<Pedido[]>(`http://localhost:5000/api/orders/?idUser=${user.id}`)
                .then(response => {
                    setPedidos(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar pedidos:', error);
                });
        }
    }, [user, atualizarCarrinho]);

    const gerenciarCarrinho = (id: number, opcao: number) => {
        const url = `http://localhost:5000/api/updateCart?idUser=${user?.id}&idProd=${id}&option=${opcao}`;

        axios.post(url)
            .then(() => {
                setAtualizarCarrinho(prev => !prev);
            })
            .catch(error => {
                console.error('Erro ao atualizar carrinho:', error);
            });
    };

    const checkout = () => {
        if (user && carrinho.length > 0) {
            axios.post("http://localhost:5000/api/checkout", { carrinho, userId: user.id })
                .then((response) => {
                    alert(response.data);
                    setAtualizarCarrinho(prev => !prev);
                })
                .catch((err) => {
                    console.error("Erro ao realizar pedido:", err);
                    alert("Erro ao realizar o pedido. Tente novamente.");
                });
        }
    };

    return (
        <UserContext.Provider value={{ user, carrinho, pedidos, atualizarCarrinho, login, logout, gerenciarCarrinho, setAtualizarCarrinho, checkout }}>
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
