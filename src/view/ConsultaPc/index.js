import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../services/apimongodb'
import Menu from '../Navbar';

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";


// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConsultaPc = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState('');
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        async function getAllPcs() {
            const response = await api.get("/cadastroPc")
            setData(response.data);
        }
        getAllPcs();
    }, [])

    const handleDelete = async (id) => {

        const deletedPc = await api.delete(`/cadastroPc/${id}`);

        if(deletedPc) {
            setData(data.filter(pc => pc.id != id));
        }        
        toast("registro excluído com sucesso!");
        // setTimeout(() => {
        //     navigate('/home', user);
        // }, 3000);
    }
    const handleUpdate = async (id) => {

        const updatePc = await api.put(`/cadastroPc/${id}`);

        if(updatePc) {
            setData(data.filter(pc => pc.id != id));
        }        
        toast("registro atualizado com sucesso!");
        // setTimeout(() => {
        //     navigate('/home', user);
        // }, 3000);
    }
    const logar = 0;

    return (
        <>
            <div className='bg-login'>
            <ToastContainer
                    className="toast-style"
                    closeOnClick
                    position="top-center" />
                <Menu />
                {data.map((item) => (
                    <>
                        <div className='py-2 container border-radius' key={item.id}>
                            <div className="row bg-dark px-3">
                                <div className="col pb-3">
                                    <label for="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                                    <input type="text" className="form-control" placeholder="Asset"
                                        value={item.asset} onChange={(e) => setAsset(e.target.value)} />
                                </div>
                                <div className="col pb-3">
                                    <label for="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
                                    <input type="text" className="form-control" placeholder="Service tag"
                                        value={item.serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
                                </div>
                                <div className="col pb-3">
                                    <label for="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                                    <select className="form-control" id="exampleFormControlSelect1"
                                        value={item.disp} onChange={(e) => setDisp(e.target.value)}>
                                        <option value={"selected"}>Selecionar</option>
                                        <option>Disponível</option>
                                        <option>Indisponível</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row bg-dark pb-3 px-3">
                                <div className="col pb-3">
                                    <label for="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                                    <input type="text" className="form-control" placeholder="Usuário"
                                        value={item.user} onChange={(e) => setUser(e.target.value)} />
                                </div>
                                <div className="col pb-3">
                                    <label for="inputEmail4" className='text-light px-1 py-2'>Estado</label>
                                    {/* <input className="form-control" id="exampleFormControlSelect1"
                                        value={item.status} onChange={(e) => setStatus(e.target.value)} /> */}
                                    <select className="form-control" id="exampleFormControlSelect1"
                                        value={item.status} onChange={(e) => setStatus(e.target.value)}>
                                        <option selected>Selecionar</option>
                                        <option>Pronto para retirar</option>
                                        <option>Em estoque</option>
                                        <option>Com o field</option>
                                        <option>Falta csv</option>
                                        <option>Atualizar drivers</option>
                                        <option>Instalar office</option>
                                        <option>Nenhum...</option>
                                    </select>

                                </div>
                                <div className="col pb-3">
                                    <label for="inputEmail4" className='text-light px-1 py-2'>Observação</label>
                                    <textarea type='text' rows={1} className='form-control' placeholder='Observação'
                                        value={item.msg} onChange={(e) => setMsg(e.target.value)} />
                                </div>
                                <div className="col bg-dark d-flex justify-content-around">
                                    <button type='submit' 
                                    className='btn btn-block btn-danger mt-5 btn-lg ml-1'
                                    onClick={()=> handleDelete(item._id)}
                                    >Excluir
                                        <AiTwotoneDelete className='h4 ml-2' />
                                    </button>
                                    <button type='submit' className='btn btn-block btn-info mt-5 btn-lg ml-1'
                                     onClick={()=> handleUpdate(item._id)}
                                    >Editar
                                        <AiTwotoneEdit className='h4 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default ConsultaPc;