import React from 'react'
import Menu from '../Navbar'
import './style.css';

import { useSelector } from 'react-redux';


export default function Home({ user }) {
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    // if(!user){
    return (
        <>
            <div className='bg-login'>
                <Menu />
                <section className='container mt-3'>
                    <div className="jumbotron">
                        <h1 className="display-4">Bem vindo(a): <div className='h3'>{usuarioEmail}.</div></h1>
                        <p className="lead">Este sistema está  em fase de desnvolvimento e testes.</p>
                        <hr className="my-4" />
                        <p>Algumas funcionalidades podem ainda não estar acessíveis. </p>
                        <footer className='mt-3'>
                            <a target='_blank' rel='noreferrer' href="https://www.facebook.com/profile.php?id=100008045468603" className="text-white shadow-text text-center">Feito por<strong> William Ferreira da Silva </strong></a>
                        </footer>
                    </div>
                </section>
            </div>
        </>
    )
}
