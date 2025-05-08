import React from 'react';
import { useState } from 'react';
import { login } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: ""
	})

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await login(credentials);
			
			// Atualiza o token
			localStorage.setItem("token", response.token);

			toast.success("Login realizado com sucesso!");
			setTimeout(() => navigate("/"), 100);
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			toast.error("Erro ao fazer login.");
		}
	};

	return (
		<main>
			<section className="container py-5">
				<div className="row">
					<div className="col-12 col-lg-5 mb-3">
						<div className="card bg-body-tertiary h-100">
							<div className="card-body p-4">
								<p className="h2">Iniciar Sessão</p>
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col">
											<div className="form-floating mb-3">
												<input
													type="email"
													className="form-control"
													placeholder=""
													id="inputEmail"
													name="email"
													onChange={handleChange}
													required
												/>
												<label htmlFor="inputEmail">Email</label>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col">
											<div className="form-floating mb-3">
												<input
													type="password"
													className="form-control"
													placeholder=""
													id="inputPassword"
													name="password"
													onChange={handleChange}
													required
												/>
												<label htmlFor="inputPassword">Password</label>
											</div>
										</div>
									</div>
									<button className="btn btn-primary" type="submit">
										Iniciar Sessão
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-7 mb-3">
						<div className="card bg-body-tertiary h-100">
							<div className="card-body p-4">
								<div className="row">
									<div className="col">
										<p className="h3 pt-2 mb-3">
											Ainda não tem conta na{" "}
											<span className="text-primary">BuyBye</span>?
										</p>
										<ul className="fw-semibold fs-6">
											<li className="list-group-item  mb-2">
												<i className="bi bi-shop fs-5 me-3" />
												Crie a sua{" "}
												<span className="fw-bold text-primary">
													loja digital customizada
												</span>
											</li>
											<li className="list-group-item  mb-2">
												<i className="bi bi-search fs-5 me-3" />
												Procure todo o tipo de{" "}
												<span className="fw-bold text-primary">produtos</span>
											</li>
											<li className="list-group-item mb-2">
												<i className="bi bi-person-heart fs-5 me-3" />
												Suporte{" "}
												<span className="fw-bold text-primary">
													pequenos negocios
												</span>
											</li>
										</ul>
										<p className="h5 pb-1">
											Então clica abaixo para criar uma conta!
										</p>
										<a
											className="btn btn-primary"
											type="button"
											href="register.html"
										>
											Criar Conta
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Login;