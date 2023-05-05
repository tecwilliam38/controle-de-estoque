import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../services/apimongodb'
import Menu from '../Navbar';

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

import { Link } from 'react-router-dom';

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
    const [garantia, setGarantia] = useState("");
    const [reservado, setReservado] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    // const [itemUpdate, setItemUpdate] = useState([])
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState("");
    const [filter, setFilter] = useState("")
    useEffect(() => {
        async function getAllPcs() {
            const response = await api.get("/cadastroPc")
            setData(response.data);
        }
        getAllPcs();
    }, [])

    const handleDelete = async (id) => {

        const deletedPc = await api.delete(`/cadastroPc/${id}`);

        if (deletedPc) {
            setData(data.filter(pc => pc.id !== id));
        }
        toast("registro excluído com sucesso!");
        setTimeout(() => {
            navigate('/home', user);
        }, 3000);
    }
    const updatePcSelected = (item) => {
        const { asset, disp, msg, serviceTag, user, status } = data;
        localStorage.setItem(id);
        localStorage.setItem(asset);
        localStorage.setItem(disp);
        localStorage.setItem(msg);
        localStorage.setItem(serviceTag);
        localStorage.setItem(user);
        localStorage.setItem(status);
        localStorage.setItem(reservado);
        localStorage.setItem(garantia);
        console.log(item);
    };

    const searchToLower = search.toLowerCase();
    const result = data.find(pc => pc.asset.toLowerCase().includes(searchToLower));
    return (
        <>
            <div className='bg-login'>
                <ToastContainer
                    className="toast-style"
                    closeOnClick
                    position="top-center" />
                <Menu />
                <div className="row bg-table-cadastro m-2 d-flex justify-content-center">
                    <div className="col-12 col-lg-3 border-right border-dark">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div className="col-12 pb-3">
                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Pesquisar equipamento:</label>
                                <input type="text" className='form-control' placeholder='Digite sua busca' onChange={(e) => setSearch(e.target.value)} value={search} />
                                <div className="row d-flex justify-content-around mt-2">
                                    <button className='btn btn-info btn-lg'
                                        onClick={() => { setSearchResult(result) }}
                                    >Pesquisar
                                        <AiTwotoneEdit className='h4 ml-2' />
                                    </button>
                                    <button className='btn btn-info btn-lg ml-1'
                                        onClick={() => { setSearchResult(""); setSearch("") }}
                                    >Limpar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className='py-2 container rounded mb-2 border-bottom' >
                            {
                                searchResult == ""
                                    ?
                                    <>
                                        <div className="row px-3">
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                                                <input type="text" className="form-control" placeholder="Asset"
                                                    value={"Asset"} onChange={(e) => setAsset(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
                                                <input type="text" className="form-control" placeholder="Service tag"
                                                    value={"ServiceTag"} onChange={(e) => setServiceTag(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                                                <select className="form-control" id="exampleFormControlSelect1"
                                                    value={"Selecionar"} onChange={(e) => setDisp(e.target.value)}>
                                                    <option value={"selected"}>Selecionar</option>
                                                    <option>Estoque</option>
                                                    <option>Manutenção</option>
                                                    <option>Ativo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row pb-3 px-3">
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                                                <input type="text" className="form-control" placeholder="Usuário"
                                                    value={"Usuário"} onChange={(e) => setUser(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Estado</label>
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
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Observação</label>
                                                <textarea type='text' rows={1} className='form-control' placeholder='Observação'
                                                    value={"Observação"} onChange={(e) => setMsg(e.target.value)} />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="row px-3">
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                                                <input type="text" className="form-control" placeholder="Asset"
                                                    value={result.asset} onChange={(e) => setAsset(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
                                                <input type="text" className="form-control" placeholder="Service tag"
                                                    value={result.serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                                                <select className="form-control" id="exampleFormControlSelect1"
                                                    value={result.disp} onChange={(e) => setDisp(e.target.value)}>
                                                    <option value={"selected"}>Selecionar</option>
                                                    <option>Estoque</option>
                                                    <option>Manutenção</option>
                                                    <option>Ativo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row pb-3 px-3">
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                                                <input type="text" className="form-control" placeholder="Usuário"
                                                    value={result.user} onChange={(e) => setUser(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Estado</label>
                                                <select className="form-control" id="exampleFormControlSelect1"
                                                    value={result.status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option selected>Selecionar</option>
                                                    <option>Em preparação</option>
                                                    <option>Garantia</option>
                                                    <option>Reservado</option>
                                                    <option>Em uso</option>
                                                    <option>Inativo</option>
                                                    <option>Nenhum...</option>
                                                </select>
                                                {result.status === "Garantia" ?
                                                    <>
                                                        <select className="form-control" id="exampleFormControlSelect1"
                                                            value={result.garantia} onChange={(e) => setGarantia(e.target.value)}>
                                                            <option selected>Selecionar</option>
                                                            <option>Sim</option>
                                                            <option>Não</option>
                                                        </select>
                                                    </>
                                                    : ""
                                                }
                                                {
                                                    result.status === "Reservado" ?
                                                        <>
                                                            <select className="form-control" id="exampleFormControlSelect1"
                                                                value={result.reservado} onChange={(e) => setReservado(e.target.value)}>
                                                                <option selected>Selecionar</option>
                                                                <option>Sim</option>
                                                                <option>Não</option>
                                                            </select>
                                                        </>
                                                        : ""
                                                }
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Observação</label>
                                                <textarea type='text' rows={1} className='form-control' placeholder='Observação'
                                                    value={result.msg} onChange={(e) => setMsg(e.target.value)} />
                                            </div>
                                            <div className="col d-flex justify-content-around">
                                                <button type='submit'
                                                    className='btn btn-block btn-danger mt-5 btn-lg ml-1'
                                                    onClick={() => handleDelete(result._id)}
                                                >Excluir
                                                    <AiTwotoneDelete className='h4 ml-2' />
                                                </button>
                                                <Link to={{ pathname: `/updatePc/${result._id}` }}>
                                                    <button type='submit' className='btn btn-block btn-info mt-5 btn-lg ml-1'
                                                        onClick={() => updatePcSelected(result)}
                                                    >Editar
                                                        <AiTwotoneEdit className='h4 ml-2' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultaPc;

