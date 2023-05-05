import React, { useState } from 'react';
import './cadastro.css';
import axios from 'axios';

import api from "../../services/apimongodb";

import { Navigate, useNavigate } from 'react-router-dom';
import Menu from '../Navbar/index';

// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadastroPc = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState('');
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [garantia, setGarantia] = useState("");
    const [reservado, setReservado] = useState("");
    const [msg, setMsg] = useState("");

    const handleCadastro = () => {
        const response = api.post("/cadastroPc", {
            asset,
            disp,
            msg,
            serviceTag,
            user,
            status,
            garantia,
            reservado,
        })
        toast("Cadastro efetuado com sucesso!");
        setTimeout(() => {
            navigate('/home', user);
        }, 3000);
    }

    return (
        <>
            <div className='bg-login'>
                <ToastContainer
                    className="toast-style"
                    closeOnClick
                    position="top-center" />
                <Menu />
                <div className='py-2 mt-2 rounded-top bg-table-cadastro container'>
                    <div className="row px-3">
                        <div className="col col-lg-3 col-6 pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                            <input type="text" className="form-control" placeholder="Asset"
                                maxLength={13}
                                value={asset} onChange={(e) => setAsset(e.target.value)} />
                        </div>
                        <div className="col col-6 pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
                            <input type="text" className="form-control"
                                placeholder="Service tag" maxLength={15}
                                value={serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
                        </div>
                        <div className="col pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                            <select className="form-control" id="exampleFormControlSelect1" value={disp} onChange={(e) => setDisp(e.target.value)}>
                                <option value={"selected"}>Selecionar</option>
                                <option>Estoque</option>
                                <option>Manutenção</option>
                                <option>Ativo</option>
                            </select>
                        </div>
                    </div>
                    <div className="row pb-3 px-3 d-flex justify-content-center">
                        <div className="col col-6 pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                            <input type="text" className="form-control" placeholder="Usuário"
                                value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div className="col col-6 pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Estado</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option selected>Selecionar</option>
                                <option>Em preparação</option>
                                <option>Garantia</option>
                                <option>Reservado</option>
                                <option>Em uso</option>
                                <option>Inativo</option>
                                <option>Nenhum...</option>
                            </select>
                            {status === "Garantia" ?
                                <>
                                    <select className="form-control" id="exampleFormControlSelect1"
                                        value={garantia} onChange={(e) => setGarantia(e.target.value)}>
                                        <option selected>Selecionar</option>
                                        <option>Sim</option>
                                        <option>Não</option>
                                    </select>
                                </>
                                : ""
                            }
                            {
                                status === "Reservado" ?
                                    <>
                                        <select className="form-control" id="exampleFormControlSelect1"
                                            value={reservado} onChange={(e) => setReservado(e.target.value)}>
                                            <option selected>Selecionar</option>
                                            <option>Sim</option>
                                            <option>Não</option>
                                        </select>
                                    </>
                                    : ""
                            }
                        </div>
                        <div className="col pb-3">
                            <label for="inputEmail4" className='text-light col-12 px-1 py-2'>Observação:</label>
                            <textarea type='text'
                                rows={2} className='form-control' placeholder='Observação...'
                                value={msg} onChange={(e) => setMsg(e.target.value)}
                                maxLength={500}
                            />
                        </div>
                        <div className="col col-12">
                            <button onClick={handleCadastro} className='btn-block btn btn-primary mt-5 btn-lg ml-1'>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CadastroPc;