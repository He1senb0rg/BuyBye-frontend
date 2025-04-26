import React from 'react';

const Register = () => {
	return (
		<main>
			<section className="container py-5">
				<div className="row">
					<div className="col-12 col-lg-7 mb-3">
						<div className="card bg-body-tertiary">
							<div className="card-body p-4">
								<p className="h2">Criar Conta</p>
								<form>
									<div className="row">
										<div className="col">
											<div className="form-floating mb-3">
												<input
													type="text"
													className="form-control"
													placeholder=""
													id="inputFirstName"
												/>
												<label htmlFor="inputFirstName">Nome Proprio</label>
											</div>
										</div>
										<div className="col">
											<div className="form-floating mb-3">
												<input
													type="text"
													className="form-control"
													placeholder=""
													id="inputLastName"
												/>
												<label htmlFor="inputLastName">Apelido</label>
											</div>
										</div>
									</div>
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
										<div className="col">
											<div className="form-floating mb-3">
												<input
													type="password"
													className="form-control"
													placeholder=""
													id="inputPasswordConf"
												/>
												<label htmlFor="inputPasswordConf">
													Confirmar Password
												</label>
											</div>
										</div>
									</div>
									<div className="mb-3 form-check">
										<input
											type="checkbox"
											className="form-check-input "
											name="terms"
											id="terms"
											defaultValue={1}
										/>
										<label className="form-check-label fw-semibold" htmlFor="terms">
											Li e aceito os{" "}
											<a href="#" className="text-decoration-none text-primary">
												Termos e Condições
											</a>{" "}
											e a{" "}
											<a href="#" className="text-decoration-none text-primary">
												Política de Privacidade
											</a>
										</label>
									</div>
									<button className="btn btn-primary" type="button">
										Criar Conta
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-5 mb-3">
						<div className="card bg-body-tertiary h-100">
							<div className="card-body p-4">
								<div className="row">
									<div className="col">
										<img
											className="w-25 mb-2"
											style={{ maxWidth: "100%", height: "auto" }}
											height={60}
											alt="BuyByeLogo"
											src="assets/images/BuyByeLogo.png"
										/>
										<p className="pt-2 fw-bold">
											Crie a sua conta e começe a criar o seu espaço virtual{" "}
											<span className="text-primary">personalizado</span>!
										</p>
										<ul className="fw-semibold fs-6">
											<li className="list-group-item mb-2">
												<i className="bi bi-check2 text-primary fs-5 me-3" />
												Simples
											</li>
											<li className="list-group-item mb-2">
												<i className="bi bi-check2 text-primary fs-5 me-3" />
												Rápido
											</li>
										</ul>
										<hr />
										<p className="h3">
											Já tem conta na <span className="text-primary">BuyBye</span>?
										</p>
										<p className="h5 pt-2 pb-1">
											Então clica abaixo para iniciar sessão!
										</p>
										<a className="btn btn-primary" type="button" href="login.html">
											Iniciar Sessão
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

export default Register;