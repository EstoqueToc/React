import React, { useEffect, useState } from "react";
import './LoginCadastro.css';
import NavBar from "../../Componentes/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";

const LoginCadastro = () => {
    useEffect(() => {
        const cadastrarBtn = document.getElementById('cadastrar-se');
        const entrarBtn = document.getElementById('entrar');

        const handleCadastrarClick = () => {
            const container = document.getElementById('container');
            container.classList.add("active");
        }

        const handleEntrarClick = () => {
            const container = document.getElementById('container');
            container.classList.remove("active");
        }

        cadastrarBtn.addEventListener('click', handleCadastrarClick);
        entrarBtn.addEventListener('click', handleEntrarClick);

        return () => {
            cadastrarBtn.removeEventListener('click', handleCadastrarClick);
            entrarBtn.removeEventListener('click', handleEntrarClick);
        }
    }, []);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeRepresentante, setNomeRepresentante] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [emailCorporativo, setEmailCorporativo] = useState("");
    const [senhaEmpresa, setSenhaEmpresa] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");


    const handleEnter = () => {
        api.get(`/usuarios/login/${email}/${senha}`).then((response) => {
            const { data } = response;
            console.log("Você chegou no console log", data);
            if (data === true) {
                toast.success("Login realizado com sucesso!");
                navigate("/pagina-geral");
            }
        }).catch(() => {
            toast.error("Ocorreu um erro ao verificar os dados, por favor, tente novamente.");
        });
    }

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    const handleSave = () => {

        const objetoAdicionado = {
            nomeRepresentante: nomeRepresentante,
            razaoSocial: razaoSocial,
            cnpj: CNPJ,
            emailCorporativo: emailCorporativo,
            senhaEmpresa: senhaEmpresa,
            cep: cep,
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            ativo: true,
        };

        api.post(`/empresas/cadastro`, objetoAdicionado)
            .then(() => {
                // handleSaveUser();
                toast.success("Nova Empresa cadastrada com sucesso!");
                sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado));

            }).catch(() => {
                toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
            });
    };

    return (
        <>
            <NavBar />

            <div className="container" id="container">

                <div className="form-container cadastrar-se">

                    <form>

                        <div className="formulario">

                            <input
                                required
                                type="text"
                                value={razaoSocial}
                                placeholder="Nome Fantasia"
                                onChange={(e) => handleInputChange(e, setRazaoSocial)}
                            />

                            <input
                                required
                                type="text"
                                value={CNPJ}
                                placeholder="CNPJ"
                                onChange={(e) => handleInputChange(e, setCNPJ)}

                            />

                            <input
                                required
                                type="email"
                                value={emailCorporativo}
                                placeholder="E-mail Corporativo"
                                onChange={(e) => handleInputChange(e, setEmailCorporativo)}
                            />

                            <input
                                required
                                type="text"
                                value={nomeRepresentante}
                                placeholder="Nome Representante"
                                onChange={(e) => handleInputChange(e, setNomeRepresentante)}
                            />

                            <input
                                required
                                type="text"
                                value={cep}
                                placeholder="CEP"
                                onChange={(e) => handleInputChange(e, setCep)}
                            />

                            <input
                                required
                                type="text"
                                value={rua}
                                placeholder="Rua"
                                onChange={(e) => handleInputChange(e, setRua)}
                            />

                            <input
                                required
                                type="text"
                                value={bairro}
                                placeholder="Bairro"
                                onChange={(e) => handleInputChange(e, setBairro)}
                            />

                            <input
                                required
                                type="text"
                                value={cidade}
                                placeholder="Cidade"
                                onChange={(e) => handleInputChange(e, setCidade)} />

                            <input
                                required
                                type="text"
                                value={estado}
                                placeholder="Estado"
                                onChange={(e) => handleInputChange(e, setEstado)}
                            />

                            <input
                                required
                                type="password"
                                value={senhaEmpresa}
                                placeholder="Senha"
                                onChange={(e) => handleInputChange(e, setSenhaEmpresa)}
                            />


                        </div>

                        <button id="entrar" type="button" onClick={handleSave}>Cadastrar</button>
                    </form>
                </div>
                <div className="form-container entrar">
                    <form>
                        <h1>Entrar</h1>


                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => handleInputChange(e, setEmail)}

                        />
                        <input
                            type="password"
                            value={senha}
                            placeholder="Senha"
                            onChange={(e) => handleInputChange(e, setSenha)}
                        />

                        <a href="./">Esqueci minha senha!</a>

                        <button onClick={handleEnter} type="button">Entrar</button>
                    </form>
                </div>
                <div className="alternar-container">
                    <div className="alternar">
                        <div className="alternar-painel alternar-esquerda">
                            <h1>Bem Vindo!</h1>
                            <p>Entre com seus dados pessoais para utilizar o site por completo</p>
                            <button className="esconder" id="entrar">Entrar</button>
                        </div>
                        <div className="alternar-painel alternar-direita">
                            <h1>Olá, Amigo!</h1>
                            <p>Cadastre-se com seus dados pessoais para utilizar o site por completo</p>
                            <button className="esconder" id="cadastrar-se">cadastrar-se</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container2">
                <div className="signup-section">
                    <header>Signup</header>

                    <div className="social-buttons">
                        <button><i className='bx bxl-google'></i> Use Google</button>
                        <button><i className='bx bxl-apple'></i> Use Apple</button>
                    </div>

                    <div className="separator">
                        <div className="line"></div>
                        <p>Or</p>
                        <div className="line"></div>
                    </div>

                    <form>

                        <input
                            value={email}
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => handleInputChange(e, setEmail)}
                            required />

                        <input
                            value={senha}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => handleInputChange(e, setSenha)}
                            required />

                        <a href="./">Forget Password?</a>
                        <button type="button" className="btn">Signup</button>
                    </form>

                </div>

                <div className="login-section">
                    <header>Login</header>

                    <div className="social-buttons">
                        <button><i className='bx bxl-google'></i> Use Google</button>
                        <button><i className='bx bxl-apple'></i> Use Apple</button>
                    </div>

                    <div className="separator">
                        <div className="line"></div>
                        <p>Or</p>
                        <div className="line"></div>
                    </div>

                    <form>
                        <input type="email" placeholder="Email address" required />
                        <input type="password" placeholder="Password" required />
                        <a href="./">Forget Password?</a>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginCadastro;