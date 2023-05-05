import './style.css';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../services/apimongodb'
import Menu from '../Navbar';

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';


export default function Home() {
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const navigate = useNavigate();
    const [asset, setAsset] = useState('');
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    const [itemUpdate, setItemUpdate] = useState([])
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
        localStorage.setItem(msg)
        localStorage.setItem(serviceTag)
        localStorage.setItem(user)
        localStorage.setItem(status)
        console.log(item);
    };


    return (
        <>
            <div className='bg-login'>
                <Menu />
                <div className="row bg-table-cadastro m-2 d-flex justify-content-center">

                    <table class="table text-light">
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">Asset</th>
                                <th scope="col">Service tag</th>
                                <th scope="col">Disponibilidade</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Status</th>
                                <th scope="col">Observação</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        {data.map((pc) => {
                            return (
                                <>
                                    <tbody key={pc.asset}>
                                        <tr>
                                            <th scope="row">{pc.asset}</th>
                                            <td>{pc.serviceTag}</td>
                                            <td>{pc.disp}</td>
                                            <td>{pc.user}</td>
                                            <td>{pc.status}</td>
                                            <td>{pc.msg}</td>
                                            <td className='row justify-content-center'>
                                                <Link to={{ pathname: `/updatePc/${pc._id}` }} className='btn-class'>
                                                    <button type='submit'
                                                        className='btn btn-height btn-block btn-danger btn-sm mr-2'
                                                        onClick={() => handleDelete(pc._id)}
                                                    >Excluir
                                                        <AiTwotoneDelete className='h4 ml-2' />
                                                    </button>
                                                </Link>
                                                <Link to={{ pathname: `/updatePc/${pc._id}` }} className='btn-class'>
                                                    <button type='submit'
                                                        className='btn btn-height btn-block btn-info btn-sm ml-1'
                                                        onClick={() => updatePcSelected(pc)}
                                                    >Editar
                                                        <AiTwotoneEdit className='h4 ml-2' />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        </>
    )
}
