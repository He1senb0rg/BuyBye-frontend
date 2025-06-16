import React from "react";

const AboutUs = () => {

    return (
        <main>
            <section className="container py-4">
                <h1>Sobre Nós</h1>
                <div className="row pt-2">

                    <div className="col-12 col-lg-6">
                        <p>Na BuyBye, acreditamos que todos merecem o seu próprio espaço personalizado para vender os seus produtos online, sejam pequenos negócios ou apenas alguém que queria dar uma nova vida a objetos em segunda mão. <br />
                            Sabemos que numa fase inicial nem toda a gente têm experiencia ou recursos para criar uma loja online, por isso desenvolvemos uma solução que elimina a complexidade por de trás da customização de sites e coloca o poder criativo nas mãos de qualquer pessoa!<br />
                            Se andas à procura de um local ideal para começar a tua loja, a BuyBye está aqui para te ajudar a dar este primeiro passo!
                        </p>
                    </div>
                    <div className="col-12 ps-3 col-lg-6">
                        <img
                            src="/assets/images/BuyByeLogo.png"
                            alt="About us image"
                            className="img-fluid w-100"

                        />

                    </div>
                </div>
                <div className="row pt-3 d-lg-flex flex-lg-row-reverse">
                    
                    <div className="col-12 ps-3 col-lg-6">
                        <p>O projeto BuyBye foi desenvolvido no âmbito da unidade curricular de Programação para Internet e Desenvolvimento de Software para a nuvem, lecionada no ISCTE Sintra.<br />
                            Este trabalho surge como um desafio prático proposto aos alunos, com o objetivo de aplicar conhecimentos teóricos em situações reais de desenvolvimento web. Ao longo do semestre, a equipa passou por todas as fases do ciclo de vida de um projeto digital — desde a conceção da ideia, definição de requisitos e desenvolvimento técnico, até à documentação e preparação para deploy.<br />
                            Mais do que um exercício académico, o BuyBye representa a nossa visão de como a tecnologia pode facilitar a vida de pequenos vendedores, criadores independentes e empreendedores. Foi também uma excelente oportunidade para reforçar competências de trabalho em equipa, metodologias ágeis, e boas práticas de desenvolvimento moderno com tecnologias como React.js, Node.js, Express.js e MongoDB.

                        </p>
                    </div>
                    <div className="col-12 col-lg-6">
                        <img
                            src="/assets/images/aboutUs_image1.jpg"
                            alt="About us image"
                            className="img-fluid w-100"

                        />
                    </div>
                </div>
            </section>
        </main>
    );

}

export default AboutUs