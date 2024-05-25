import React from "react";
import styles from './CadastroFunc.module.css';
import SideBar from '../../Componentes/NavBarLateral/NavBarLateral'

function CadastroFunc() {
    const limpa_formulário_cep = () => {
        // Limpa valores do formulário de cep.
        document.getElementById('rua').value = "";
        document.getElementById('bairro').value = "";
        document.getElementById('cidade').value = "";
        document.getElementById('uf').value = "";
        document.getElementById('ibge').value = "";
    }

    const meu_callback = (conteudo) => {
        if (!("erro" in conteudo)) {
            // Atualiza os campos com os valores.
            document.getElementById('rua').value = (conteudo.logradouro);
            document.getElementById('bairro').value = (conteudo.bairro);
            document.getElementById('cidade').value = (conteudo.localidade);
            document.getElementById('uf').value = (conteudo.uf);
        } else {
            // CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    const pesquisacep = (valor) => {
        // Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        // Verifica se campo cep possui valor informado.
        if (cep !== "") {
            // Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            // Valida o formato do CEP.
            if (validacep.test(cep)) {
                // Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                // Cria um elemento javascript.
                var script = document.createElement('script');

                // Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

                // Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);
            } else {
                // CEP é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } else {
            // CEP sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };

    return (
        <>

            <SideBar />

            <div className={styles.container}>

                <div className={styles.conteudo}>

                    <h1>Cadastro de Funcionário</h1>

                    <form className={styles.form} id="product-form">

                        <div className={styles.conteudos}>
                            
                            <div className={styles.left}>
                                <label htmlFor="nomeFunc">Nome:</label>
                                <input className={styles.input} type="text" id="nomeFunc" name="Nome Funcionário" size="60" /><br />

                                <label htmlFor="função">Função:</label>
                                <input className={styles.input} type="text" id="função" name="função" size="60" /><br />

                                <label htmlFor="admissão">Admissão:</label>
                                <input className={styles.input} type="text" id="admissão" name="admissão" size="40" /><br />

                                <label htmlFor="demissão">Demissão:</label>
                                <input className={styles.input} type="text" id="demissão" name="demissão" size="40" /><br />

                                <label htmlFor="contato">Contato:</label>
                                <input className={styles.input} type="text" id="contato" name="contato" size="40" /><br />
                            </div>

                            <div className={styles.right}>
                                <form method="get" action=".">
                                    <label>Cep:</label>
                                    <input className={styles.input} name="cep" type="text" id="cep" value="" size="10" maxLength="9"
                                        onBlur={(e) => pesquisacep(e.target.value)} /><br />

                                    <label>Rua:</label>
                                    <input className={styles.input} name="rua" type="text" id="rua" size="60" /><br />

                                    <label>Bairro:</label>
                                    <input className={styles.input} name="bairro" type="text" id="bairro" size="40" /><br />

                                    <label>Cidade:</label>
                                    <input className={styles.input} name="cidade" type="text" id="cidade" size="40" /><br />

                                    <label>Estado:</label>
                                    <input className={styles.input} name="uf" type="text" id="uf" size="2" /><br />
                                </form>
                            </div>
                        </div>

                        <div className={styles.bnts}>
                            <button className={styles.btnCadFunc} type="button" onClick={() => window.history.back()}>Cancelar</button>
                            <input className={styles.btnCadFunc} type="submit" value="Cadastrar" />
                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}

export default CadastroFunc;
