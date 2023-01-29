import React, { useState } from 'react';
import {
    Link,
    useNavigate,
    //  Redirect, 
    //  Navigate
} from 'react-router-dom';
import './style.css';

import db, { firestoreDb, auth } from "../../firebaseConfig/index"
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [user, setUser] = useState('');
    const dispatch = useDispatch();

    const handleLogar = ({ user }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(resultado => {
                setMsgTipo("sucesso");
                toast("Bem vindo!\n" + email);
                setUser({ id: '1', usuarioEmail: email })
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
                dispatch({ type: 'LOG_IN', usuarioEmail: email });
            })
            .catch(erro => {
                setMsgTipo("erro");
            });
    }
    // alert(useSelector(state=> state.usuarioEmail))
    return (
        <>
            <div className='card-content box'>
                <ToastContainer
                className='toast-style'
                    closeOnClick
                    position="top-center" />
                <div className=" text-center text-light">
                    <main className="form-signin form-cadastroUser shadow px-5 pt-2 rounded bd-radius">
                        <form className="form-signin mx-auto text-light">
                            <div className="text-center mb-4">                                
                                <h1 className="h3 my-3 font-weight-bold">Login</h1>
                            </div>
                            <input
                                type="email"
                                id="inputEmail"
                                className="form-control my-3"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                id="inputPassword"
                                className="form-control my-3"
                                placeholder="Senha"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className="btn-block btn text-light btn-lg btn-secondary btn-login my-md-2" 
                            type="button" onClick={handleLogar}>Sign in</button>
                            <div className="opcoes-login mt-5 text-center">
                                {/* <p className="h5 mt-md-1 mb-1 text-light text-center navbar-link">Esqueceu a <a className="cad-user navbar-link" href='#'>senha</a> para se cadastrar</p>
                            <p className="h5 mt-md-1 mb-1 text-light text-center navbar-link">Ou clique <a className="cad-user navbar-link" href='/cadastroUser'>aqui</a> para se cadastrar</p> */}
                                {/* <p className="h5 mt-md-1 mb-1 text-light text-center navbar-link">Esqueceu a <Link className="cad-user navbar-link" to="/cadastroUser">senha</Link> para se cadastrar</p>
                    <p className="h5 mt-md-1 mb-1 text-light text-center navbar-link">Ou clique <Link className="cad-user navbar-link" to="/cadastroUser">aqui</Link> para se cadastrar</p> */}
                            </div>
                            <div className='text-center text-light h3'>
                                {
                                        msgTipo === 'sucesso'
                                        ? <span className='h5 shadow-text text-light py-3 mb-1 mb-md-2'><strong>Aguarde você será direcionado...</strong></span>
                                        :
                                        <span className='h5 shadow-text text-light py-3 mb-1 mb-md-2'><strong>Ops!</strong> Verifique a senha.</span>
                                }
                            </div>
                            <div className="opcoes-login text-center">
                                {/* <Link to="/usuariorecuperarsenha" className="mx-2"  >Recuperar Senha</Link> */}
                                <a href='#' className="mx-2 link-color">Recuperar Senha</a>
                                <span className="text-white">&#9733;</span>
                                <Link to='cadastroUser' className="mx-2 my-3 link-color"  >Quero Cadastrar</Link>
                                {/* <a href='#' className="mx-2 link-color">Quero Cadastrar</a> */}
                            </div>
                            <p className="mt-1 pb-3 text-light text-center">&copy; 2017-2023</p>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
}