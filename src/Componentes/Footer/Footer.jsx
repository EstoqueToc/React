import styles from './Footer.module.css';
import React from 'react';
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";


function Footer() {
    return (
        <>
            <footer className={styles["footer"]}>
                <div className={styles["containerFooter"]}>
                    <div className={styles["form-container"]}>
                        <h2>Entre em contato</h2>
                        <form className={styles["form"]}>
                            <div className={styles["form-group"]}>
                                <label>Nome：</label>
                            </div>
                            <div>
                                <input type="text" id="subject" className={styles["form-control"]} placeholder="Seu nome" required />
                            </div>
                            <div className="form-group">
                                <label>E-mail：</label>
                            </div>
                            <div>
                                <input type="text" id="event" className={styles["form-control"]} placeholder="email@email.com" required />
                            </div>
                            <div className="form-group">
                                <label>Mensagem：</label>
                            </div>
                            <div>
                                <textarea type="text" id="event2" className={styles["form-control"]} placeholder="Sua mensagem" required></textarea>
                            </div>
                            <input type="submit" value="Enviar" className={styles["btnEnviarForm"]} />
                        </form>
                    </div>
                    <div className={styles["acompanhe"]}>
                        <h2>Acompanhe nossa redes sociais:</h2>
                        <div className="social-icons">
                            <a href="#"><BsFacebook></BsFacebook></a>
                            <a href="#"><BsTwitterX></BsTwitterX></a>
                            <a href="#"><BsInstagram></BsInstagram></a>
                            <a href="#"><BsGithub></BsGithub></a>
                        </div>
                    </div>
                </div>
                <p className={styles["final"]}> &copy; 2024 | Desenvolvido por EstoqueToc | Todos os direitos reservados.</p>
            </footer>
        </>
    )
}
export default Footer;