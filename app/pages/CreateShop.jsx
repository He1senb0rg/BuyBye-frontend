import React from 'react';
import { createShop } from '../services/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

const CreateShop = () => {
    const navigate = useNavigate()
    const { user } = useAuth();

    const [shopData, setShopData] = useState({
        name: "",
        ownerName: "",
        userId: "",
        description: "",
        phone: "",
        logo: "/assets/images/BuyByeLogo.png",
    });


    const handleChange = (e) => {
        setShopData({ ...shopData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            shopData.userId = user.id;
            const response = await createShop(shopData);
            toast.success("Loja criada com sucesso!");
            console.log(response)
            setTimeout(() => navigate("/admin/dashboard"), 100);
        } catch (error) {
            console.error("Erro:", error.message);
            toast.error("Erro ao criar a loja.");
        }
    };
    return (
        <main>
            <div className="container-xl px-4 mt-4">
                <div className="row mb-2">
                    <div className="col">
                        <h1 className="mt-4">Criar Loja</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <div className="card mb-2 h-100">
                            <div className="card-header">Detalhes de Loja</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name='name'
                                                    placeholder="Nome da Loja"
                                                    onChange={handleChange}

                                                />
                                                <label htmlFor="inputUser">Nome da Loja</label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name='ownerName'
                                                            placeholder="Nome do Dono"
                                                            onChange={handleChange}

                                                        />
                                                        <label htmlFor="inputFirstName">Nome do Dono</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <div className="form-floating">
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            name='phone'
                                                            placeholder="Número de telefone"
                                                            onChange={handleChange}

                                                        />
                                                        <label htmlFor="inputPhone">Número de Telefone</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <textarea
                                                    className="form-control"
                                                    name='description'
                                                    maxLength={100}
                                                    placeholder="Descrição da loja"
                                                    onChange={handleChange}
                                                ></textarea>
                                                <label htmlFor="description">Descrição da Loja</label>
                                                <div className="form-text text-end">{shopData.description.length} / 100</div>

                                            </div>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <div className="card mb-3 h-100">
                                                <div className="card-header">Logo da Loja</div>
                                                <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                                                    <img
                                                        className="img-account-profile mb-3"
                                                        src="/assets/images/logo-placeholder.jpg"
                                                        alt="logo"
                                                        width="70%"
                                                    />
                                                    <div className="small font-italic text-muted mb-3">
                                                        JPG ou PNG menor que 5 MB
                                                    </div>
                                                    <label htmlFor="fileUpload" className="btn btn-primary">
                                                        Upload da imagem
                                                    </label>
                                                    <input hidden type="file" id="fileUpload" name="fileUpload" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary" type="submit">
                                            Criar Loja
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateShop;
