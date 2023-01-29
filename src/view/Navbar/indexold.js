import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import { getAuth, signOut } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { auth } from '../firebaseConfig/index.js';
import { useNavigate } from 'react-router-dom';


// import Cadastro from '../CadastrarPc'
export default function Menu() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    
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
        {/* <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-light">william</nav> */}
            <nav className="navbar bg-nav navbar-expand-lg navbar-light bg-light text-dark">
                <Link className="navbar-brand" to="/consulta">Controle Stefanini</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home </a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/consultaPc'>Consultas</Link>
                            {/* <a className="nav-link" href="#">Consulta</a> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/cadastroPc'>Cadastrar pc</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={logout}>Sair</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <Link className="nav-link" to="/home">Bem vindo(a):<strong> {logado} </strong></Link>
                        <button type="button" className="btn btn-secondary btn-sm my-2 px-4 shadow  my-sm-2" onClick={logout} >Sair do site</button>
                    </form>
                    <p className='text-rigth'>William</p>
                </div>
            </nav>
        </>
    )
}