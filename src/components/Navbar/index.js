import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.css';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { auth } from '../firebaseConfig/index.js';
import { useNavigate } from 'react-router-dom';



// import Cadastro from '../CadastrarPc'
export default function Menu() {
    const [activeTab, setActiveTab] = useState();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab('Login');
        }
        else if (location.pathname === '/home') {
            setActiveTab('Home');
        }
        else if (location.pathname === '/consultaPc') {
            setActiveTab('ConsultaPc');
        }
        else if (location.pathname === '/cadastroPc') {
            setActiveTab('CadastroPc');
        }
    }, [location])
    const navigate = useNavigate();
    const logado = useSelector(state => state.usuarioEmail);

    const logout = () => {
        // const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            alert(error);
        });
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-light bg-light">
                <Link className="navbar-brand my-0" to='/home'>
                    <img className='imagem-logo' src={require('../Assets/logo3.png')} width="60" height="50" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item link-css">
                            <Link className='nav-link new-css' to="/home">
                                <p
                                    className={`${activeTab === "Home" ? "active" : "border-css"}`}
                                    onClick={() => { setActiveTab("Home") }} >Home</p></Link>
                            {/* <Link className="nav-link" to='/home'>Home</Link> */}
                        </li>
                        <li className="nav-item link-css">
                            <Link className="nav-link new-css" to='/consultaPc'>
                                <p
                                    className={`${activeTab === "ConsultaPc" ? "active" : "border-css"}`}
                                    onClick={() => { setActiveTab("ConsultaPc") }}>
                                    Consultas
                                </p>
                            </Link>
                            {/* <Link className="nav-link" to='/consultaPc'>Consultas</Link> */}
                        </li>
                        <li className="nav-item link-css">
                            <Link className="nav-link new-css" to='/cadastroPc'>
                                <p
                                    className={`${activeTab === "CadastroPc" ? "active" : "border-css"}`}
                                    onClick={() => { setActiveTab("CadastroPc") }}>
                                    Cadastrar
                                </p>
                            </Link>
                            {/* <Link className="nav-link" to='/cadastroPc'>Cadastrar pc</Link> */}
                        </li>
                        <li className="nav-item link-css">
                            <Link className="nav-link new-css" to='/' onClick={logout}>Sair</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <div className="nav-item css-user" to="/home">Bem vindo(a):<strong> {logado} </strong></div>
                    </form>
                </div>
            </nav>
        </>
    )
}