import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import  {firestoreDb, auth} from '../../firebaseConfig/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [id, setId] = useState(0);
    const [email, setEmail] = useState();
    const [user, setUser] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [phone, setPhone] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [password, setPassword] = useState();

    const handleCadastroUser = (e) => {
        e.preventDefault();
        const uuid = uid();
        setMsgTipo(null);
        // setCarregando(1);
        if (!user || !responsavel || !email || !password) {
            setMsgTipo("erro");
            setMsg('Verifique os campos em branco...');
            return;
        }
         createUserWithEmailAndPassword(auth, email, password)
        // O trecho abaixo comentado é para cadastrar o usuário no realtime database 
         // set(ref(db, 'users/' + `/${uuid}`), {
            const postRef = collection(firestoreDb, 'user');      
            addDoc(postRef,{                   
            user: user,
            company: empresa,
            phone: phone,
            ceo: responsavel,
            id,
            uuid
        }).then(resultado => {
            toast("Bem vindo!\n\t" + email );
            setCarregando(0);
            setMsgTipo("sucesso");
            setId(id + 1);
            navigate('/');
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo("erro");
            toast("Erro!\n" + email);
            switch (erro.message) {
                case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                    setMsg("A senha deve ter pelo menos 6 caracteres");
                    break;
                case 'Firebase: Error (auth/email-already-in-use).':
                    setMsg('O email informado está em uso');
                    break;
                case 'Firebase: Error (auth/invalid-email).':
                    setMsg('O formato de email é inválido');
                    break;
                default:
                    setMsg('Não foi possível realizar o cadastro, tente novamente mais tarde');
                    break;

            }
        });
    }

    return (
        <>
            <div className='card-content box'>
                <ToastContainer
                    position='top-center'
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
                                value={empresa}
                                onChange={(e) => setEmpresa(e.target.value)}
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
                                value={responsavel}
                                onChange={(e) => setResponsavel(e.target.value)}
                            />
                            <input
                                type="email"
                                className="form-control my-2 text-dark"
                                // id="floatingInput"
                                placeholder="Digite seu email corporativo"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="form-control my-2"
                                id="floatingPassword"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
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
