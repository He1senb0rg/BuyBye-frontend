import React from 'react';

const Login = () => {
	return (
		<main>
			<section className="container py-5">
				<div className="row">
					<div className="col-12 col-lg-5 mb-3">
						<div className="card bg-body-tertiary h-100">
							<div className="card-body p-4">
								<p className="h2">Iniciar Sessão</p>
								<form>
									<div className="row">
										<div className="col">
											<div className="form-floating mb-3">
												<input
													type="email"
													className="form-control"
													placeholder=""
													id="inputEmail"
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
												/>
												<label htmlFor="inputPassword">Password</label>
											</div>
										</div>
									</div>
									<button className="btn btn-primary" type="button">
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