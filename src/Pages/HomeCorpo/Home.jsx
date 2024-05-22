import React from "react";
import styles from './Home.module.css';
import NavBar from "../../Componentes/NavBar/NavBar";
import Footer from '../../Componentes/Footer/Footer'
import ods08 from '../../Assets/ODS8.png';
import ods16 from '../../Assets/ODS16.jpg';
import Facilidade from '../../Assets/facilidade.png'
import Inovacao from '../../Assets/inovacao.png'
import Tecnologia from '../../Assets/tecnologia.png'
import Crescimento from '../../Assets/crescimento2.png'



function Home() {

    const scrollSmooth = () => {
        const aboutUsSection = document.getElementsByClassName('metas-section')
        const service = document.getElementsByClassName('sessao-2')

        if (aboutUsSection) {
            aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (service) {
            service.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <NavBar scrollSmooth={scrollSmooth}/>

            <section className={styles["hero"]}>
                <div className={styles["container"]}>
                    <h1>Software de gerenciamento de estoque.</h1>
                    <p>Seja bem-vindo à EstoqueToc. Acompanhe seu estoque com nosso poderoso software de gerenciamento e controle de estoque.</p>
                    <a href="/" className="btnSaibaMais">Saiba Mais</a>
                </div>
            </section>
            <section className={styles["metas-section"]}>
                <div className={styles["card-grid-metas"]}>
                    <a className={styles["card-metas"]} href="/">
                        <div className={styles["card__background"]}
                            style={{ backgroundImage: `url(${Inovacao})` }}>
                        </div>
                        <div className={styles["card__content"]}>
                            <p className={styles["card__category"]}><i className="fas fa-lightbulb"></i>Inovação</p>
                            <h3 className={styles["card__heading"]}>Análises detalhadas do desempenho do estoque, identificando áreas de melhoria e
                                oportunidades de crescimento.</h3>
                        </div>
                    </a>
                    <a className={styles["card-metas"]} href="/">
                        <div className={styles["card__background"]}
                            style={{ backgroundImage: `url(${Facilidade})` }}>
                        </div>
                        <div className={styles["card__content"]}>
                            <p className={styles["card__category"]}><i className="fas fa-chart-bar"></i>Facilidade</p>
                            <h3 className={styles["card__heading"]}>Visão precisa dos níveis de estoque,visando otimizar a gestão de inventário e
                                garantir a disponibilidade dos produtos. </h3>
                        </div>
                    </a>
                    <a className={styles["card-metas"]} href="/">
                        <div className={styles["card__background"]}
                            style={{ backgroundImage: `url(${Tecnologia})` }}>
                        </div>
                        <div className={styles["card__content"]}>
                            <p className={styles["card__category"]}><i className="fas fa-laptop"></i> Tecnologia</p>
                            <h3 className={styles["card__heading"]}>Monitoramento em tempo real do estoque com insights detalhados sobre movimentações,
                                sazonalidade e tendências.</h3>
                        </div>
                    </a>
                    <a className={styles["card-metas"]} href="/">
                        <div className={styles["card__background"]}
                            style={{ backgroundImage: `url(${Crescimento})` }}>
                        </div>
                        <div className={styles["card__content"]}>
                            <p className={styles["card__category"]}><i className="fas fa-handshake"></i> Crescimento</p>
                            <h3 className={styles["card__heading"]}>Parceria e progresso mútuo, destacando a importância de evoluir juntos no mundo
                                dos negócios.</h3>
                        </div>
                    </a>

                </div>
            </section>


            <section className={styles["sessao-2"]}>
                <div className={styles["containerOds"]}>
                    <div className={styles["content"]}>
                        <div className={styles["card-s2"]}>
                            <img src={ods08} alt="" />
                            <p>Promover paz, justiça e instituições eficazes significa combater violência e corrupção, garantir acesso à justiça e informação, e promover participação inclusiva na política.</p>
                        </div>
                        <div className={styles["card-s2"]}>
                            <img src={ods16} alt="" />
                            <p>Promover crescimento econômico sustentável, empregos dignos para todos, inovação e eficiência no uso de recursos, com foco na igualdade de oportunidades e acesso a serviços financeiros e tecnológicos.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles["informaçõesCapital"]}>
                <div className={styles["capital"]}>
                    <p className={styles["destaque"]}>30%
                        <br />
                        Perda de Capital
                    </p>
                    <p className={styles["subdestaque"]}>
                        Segundo dados da Associação Brasileira de Logística (ABRALOG),
                        o custo médio do estoque no Brasil é de 12,6% do faturamento bruto das empresas,
                        sendo que cerca de 30% desse valor corresponde a perdas por problemas de gestão.
                        É um dos principais desafios enfrentados pelas empresas no cenário atual.
                    </p>
                </div>

            </section>
            <section className={styles["informaçõesInvestimento"]}>
                <div className={styles["investimento"]}>
                    <p className={styles["destaque"]}>1/3
                        <br />
                        Investem em gestão de estoque
                    </p>
                    <p className={styles["subdestaque01"]}>
                        Segundo pesquisa realizado pela H2R Pesquisas Avançadas,
                        denominado Índice de Produtividade Tecnológica (IPT) de logística,
                        apesar de 92% dos varejistas afirmarem possuir um setor voltado para gestão de estoques,
                        somente cerca de 1/3 deles investem em sistemas de gestão.
                    </p>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Home;