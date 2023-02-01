import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../store/index';
import Login from '../view/user/login';
import Home from '../view/Home';
import ConsultaPc from '../view/ConsultaPc';
import CadastroPc from '../view/CadastrarPc/index';
import NewPc from '../view/CadastrarPc/newPc';
import Cadastro from '../view/user/cadastro';
import UpdatePc from '../view/ConsultaPc/updatePc';

import {
    setDoc,
    doc,
    addDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";
import db, { firestoreDb } from '../firebaseConfig/index';


export default function Rotas({user}) {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path='/cadastroUser' element={<Cadastro />} />
                    <Route exact path='/home' element={<Home user={user} />} />
                    <Route exact path='/cadastroPc' element={<CadastroPc />} />
                    <Route exact path='/newPc' element={<NewPc />} />
                    <Route exact path='/updatePc/:id' element={<UpdatePc />} />
                    <Route exact path='/consultaPc' element={<ConsultaPc />} />
                </Routes>
            </Router>
        </>
    )
}
