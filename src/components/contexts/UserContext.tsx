import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Produto } from "../interfaces/Product";
import { User } from "../interfaces/User";
import { Address } from "../interfaces/Address";

interface Pedido {
    id: number;
    id_user: number;
    data: string;
    valor_total: number;
    status: string;
}

interface UserContextType {
    user: User | null;
    endereco: Address | null;
    carrinho: Produto[];
    pedidos: Pedido[];
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
    gerenciarCarrinho: (id: number, opcao: number) => void;
    setAtualizarCarrinho: (prev: boolean) => void;
    checkout: () => void;
    update: () => void;
    atualizarCarrinho: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [endereco, setEndereco] = useState<Address | null>(null)
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [atualizarCarrinho, setAtualizarCarrinho] = useState(false);

    useEffect(() => {
        const prevLogin = (localStorage.getItem("user"))
        const userAddress = (localStorage.getItem("address"))
        if (prevLogin) {
            setUser(JSON.parse(prevLogin))
        }
        if (userAddress) {
            setEndereco(JSON.parse(userAddress))
        }
    },[])

    const login = async (email: string, senha: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, senha });
            const { token, user, addressRs } = response.data;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            if(addressRs){
                setEndereco(addressRs)
                localStorage.setItem("address", JSON.stringify(addressRs));
            }
            return true;
        } catch (err) {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setCarrinho([]);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("address");
        window.location.reload()
    };

    useEffect(() => {
        axios.get<Produto[]>(`http://localhost:5000/api/getCartContent/?idUser=${user?.id}`)
            .then(response => {
                setCarrinho(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, [atualizarCarrinho, user]);

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
            axios.post("http://localhost:5000/api/checkout", { carrinho, idUser: user.id })
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

    const update = async () => {
        if (!user) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/userInfo?idUser=${user.id}`);
            const { userRs, addressRs } = response.data
            setUser(userRs)
            localStorage.setItem("user", JSON.stringify(userRs));
            if(addressRs){
                setEndereco(addressRs)
                localStorage.setItem("address", JSON.stringify(addressRs));
            }
        } catch (error) {
            console.error("Erro ao atualizar dados do usuário:", error);
        }
    };


    return (
        <UserContext.Provider value={{ user, endereco, carrinho, pedidos, atualizarCarrinho, login, logout, update, gerenciarCarrinho, setAtualizarCarrinho, checkout }}>
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
