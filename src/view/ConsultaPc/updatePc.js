import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/apimongodb'
import Menu from '../Navbar';

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";


// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePc = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState('');
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [garantia, setGarantia] = useState("");
    const [reservado, setReservado] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [itemUpdate, setItemUpdate] = useState([])

    useEffect(() => {
        async function getAllPcs() {
            const response = await api.get(`/cadastroPc/${id}`)
            setAsset(response.data.asset);
            setMsg(response.data.msg);
            setUser(response.data.user);
            setServiceTag(response.data.serviceTag);
            setDisp(response.data.disp);
            setStatus(response.data.status);
            setReservado(response.data.reservado);
            setGarantia(response.data.garantia);
        }
        getAllPcs();
    }, [])


    const updatePcSelected = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/cadastroPc/${id}`, {
                asset,
                disp,
                msg,
                serviceTag,
                user,
                status,
                reservado,
                garantia
            });
            toast("registro atualizado com sucesso!");
            setTimeout(() => {
                navigate('/home', user);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>


            <div className='bg-login'>
                <ToastContainer
                    className="toast-style"
                    closeOnClick
                    position="top-center" />
                <Menu />
                <div className="row bg-table-cadastro m-2 d-flex justify-content-around">
                    <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className='py-2 container rounded mb-2 border-bottom' key={id}>
                                <div className="row px-3">
                                    <div className="col pb-3">
                                        <label for="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                                        <input type="text" className="form-control" placeholder="Asset"
                                            value={asset} onChange={(e) => setAsset(e.target.value)} />
                                    </div>
                                    <div className="col pb-3">
                                        <label for="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
                                        <input type="text" className="form-control" placeholder="Service tag"
                                            value={serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
                                    </div>
                                    <div className="col pb-3">
                                        <label for="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                                        <select className="form-control" id="exampleFormControlSelect1"
                                            value={disp} onChange={(e) => setDisp(e.target.value)}>
                                            <option value={"selected"}>Selecionar</option>
                                            <option>Estoque</option>
                                            <option>Manutenção</option>
                                            <option>Ativo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row pb-3 px-3">
                                    <div className="col pb-3">
                                        <label for="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                                        <input type="text" className="form-control" placeholder="Usuário"
                                            value={user} onChange={(e) => setUser(e.target.value)} />
                                    </div>
                                    <div className="col pb-3">
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
                                        <label for="inputEmail4" className='text-light px-1 py-2'>Observação</label>
                                        <textarea type='text' rows={1} className='form-control' placeholder='Observação'
                                            value={msg} onChange={(e) => setMsg(e.target.value)} />
                                    </div>
                                    <div className="col d-flex justify-content-around">
                                        <button type='submit' className='btn btn-block btn-info mt-5 btn-lg ml-1'
                                            onClick={updatePcSelected}
                                        >Salvar
                                            <AiTwotoneEdit className='h4 ml-2' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePc;

