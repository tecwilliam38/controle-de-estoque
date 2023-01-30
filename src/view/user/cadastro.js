import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import  {firestoreDb, auth} from '../../firebaseConfig/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import api from "../../services/apimongodb";

import './style.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// import { set, ref, doc, child, update, push } from 'firebase/database';
import {
    collection,
    addDoc,
} from 'firebase/firestore';


export default function Cadastro() {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState('');
    const [skill, setSkill] = useState("");
    const [email, setEmail] = useState();
    const [user, setUser] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [ceo, setCeo] = useState("");
    const [passWord, setPassWord] = useState('');

    const handleCadastroUser = (e) => {      
        if (!user || !ceo || !email || !passWord) {
            setMsgTipo("erro");
            setMsg('Verifique os campos em branco...');
            return;
        }
       const response = api.post("/cadastrousuario", {
                user,
                company,
                phone,
                ceo,
                skill,
                mail: email,
                passWord,
            })
            toast("Cadastro efetuado com sucesso!"+email);
            setTimeout(() => {
                navigate('/home', user);
            }, 3000)        
    }

    return (
        <>
            <div className='card-content box'>
                <ToastContainer
                    position='top-center'
                    className="toast-style"
                    closeOnClick />
                <div className=" text-center text-light">
                    <main className="form-signin form-cadastroUser shadow px-5 pt-2 rounded bd-radius">
                        <form>
                            <h1 className="h3 mb-4 mt-2 fw-normal shadow-text">Por favor faça seu Cadastro</h1>
                            <input
                                type="text"
                                className="form-control my-2 text-dark"
                                // id="floatingInput"
                                placeholder="Digite seu nome completo"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control my-2 text-dark"
                                // id="floatingInput"
                                placeholder="Empresa em que trabalha"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control my-2 text-dark"
                                // id="floatingInput"
                                placeholder="Telefone com DDD"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control my-2 text-dark"
                                // id="floatingInput"
                                placeholder="Gestor responsável"
                                value={ceo}
                                onChange={(e) => setCeo(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control my-2 text-dark"
                                // id="floatingInput"
                                placeholder="Função exercida"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                            />
                            <input
                                type="email"
                                className="form-control my-2 text-dark"
                                placeholder="Digite seu email corporativo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="form-control my-2"
                                id="floatingPassword"
                                placeholder="Password"
                                value={passWord}
                                onChange={(e) => setPassWord(e.target.value)}
                            />
                            {
                                carregando ? <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span></div>
                                    :
                                    <button className="btn-block btn text-light btn-lg btn-secondary btn-login my-md-2" type="button"
                                        onClick={handleCadastroUser}
                                    >Cadastrar</button>
                            }
                            <p className="text-muted" style={{ fontSize: 20, fontWeight: 'bold' }}><Link className='text-light' to="/">Voltar</Link></p>
                            {/* <p className="text-muted" style={{ fontSize: 20, fontWeight: 'bold' }}><a className='text-light' href="/">Voltar</a></p> */}
                            <p className="mt-3 mb-3 text-muted" style={{ fontSize: 20, fontWeight: 'bold' }}>&copy; 2022</p>
                        </form>
                        <div className="msg-login text-black text-center my-5">
                            {msgTipo === 'sucesso' && <span><strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526; </span>}
                            {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546; </span>}
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}
