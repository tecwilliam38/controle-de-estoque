import React, { useState, useEffect } from 'react'
import Menu from '../Navbar'
import db, { firestoreDb } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
    child,
    get,
} from "firebase/database";
import {
    query,
    where,
    onSnapshot,
    collection,
    getDocs,
    setDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { uid } from 'uid';
import { async } from '@firebase/util';

export default function ConsultaPc() {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [wp, setWp] = useState("");
    const [asset, setAsset] = useState("");
    const [st, setSt] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [selecTed, setSelecTed] = useState("");
    const [option, setOption] = useState("");
    const [search, setSearch] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        handleLerdados();
        handleSearch();
        // handleDelete();
        receber();
    }, []);

    const receber = async (e) => {
        e.preventDefault();
        const citiesRef = collection(db, "pcs");
        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"]
        });
        await setDoc(doc(citiesRef, "LA"), {
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"]
        });
        await setDoc(doc(citiesRef, "DC"), {
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000,
            regions: ["east_coast"]
        });
        await setDoc(doc(citiesRef, "TOK"), {
            name: "Tokyo", state: null, country: "Japan",
            capital: true, population: 9000000,
            regions: ["kanto", "honshu"]
        });
        await setDoc(doc(citiesRef, "BJ"), {
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000,
            regions: ["jingjinji", "hebei"]
        });
    }

    const handleLerdados = async () => {
        const db = firestoreDb;
        const refDb = collection(db, 'pcs');
        onSnapshot(refDb, (snapshot) => {
            setData(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }
    const handleDelete = (e) => {
        e.preventDefault();
        const db = firestoreDb;
        deleteDoc(doc(db, "pcs"));
        alert("Babou");
        navigate('/home');
    }

    const searchBar = document.getElementById("SearchBar");
    const searchCategory = document.getElementById("SearchCategory");
    const searchButton = document.getElementById("SearchButton");

    function SearchTable() {
        const filter = searchBar.value.toUpperCase();
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const db = firestoreDb;
        const q = query(collection(db, "pcs"), where("ac", "==", "AC"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setSearch(doc.data());
        });
        //  setSearch(q.data);
        // console.log(q.data);
    }

    return (
        <>
        <div className='bg-login position-relative'>
        <Menu />
            <section style={{ borderRadius: "18px" }} className='container bg-light'>
                <div className='container mx-md-auto'>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Escolha um campo de pesquisa:</th>
                                <th scope="col">Digite ou cole o que deseja pesquisar:</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <select className="form-control" id="SearchCategory"
                                        placeholder='Escolha um campo de pesquisa:' value={selecTed} onChange={(e) => setSelecTed(e.target.value)}>
                                        <option selected>Selecionar...</option>
                                        <option>WP</option>
                                        <option>Asset</option>
                                        <option>Service Tag</option>
                                        <option>Disponível</option>
                                        <option>Usuário</option>
                                        <option>Status</option>
                                        <option>Nenhum...</option>
                                    </select>
                                </th>
                                <td>
                                    <input 
                                    type='text' className='form-control'
                                    value={option}
                                    onChange={(e) => setOption(e.target.value)}
                                    id="SearchBar"
                                    />
                                </td>
                                <td>
                                    {/* <button className='btn btn-primary btn-block ml-1' onClick={lerDados}>Consultar</button> */}
                                    <button id="SearchButton" className='btn btn-primary btn-block ml-1' onClick={handleSearch}>Consultar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table mt-5">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">WP</th>
                                <th scope="col">Service tag</th>
                                <th scope="col">Disponível</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Status</th>
                                {/* <th scope="col expand-button" */}
                                <th scope="col" onClick={receber}
                                // data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"
                                >
                                    Expandir

                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-light'>
                            {/* {data?.map(({ id, data }) => { */}
                            {search?.map(({ id, search }) => {
                                return (
                                    <>
                                        {/* <tr class="collapse" id="collapseExample" key={id}> */}
                                        <tr key={id}>
                                            <th scope="row">{search.wp}</th>
                                            <td>{search.st}</td>
                                            <td>{search.disp}</td>
                                            <td>{search.user}</td>
                                            <td>{search.status}</td>
                                            <td>
                                                <div className='d-flex justify-content-around'>
                                                    <button
                                                        type='button'
                                                        className='btn btnShadow btn-lg  btn-danger mt-2 mb-1'
                                                    //    onClick={(e)=>editItem(id)}
                                                    >Editar
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btnShadow btn-lg  btn-info mt-2 mb-1'
                                                        onClick={handleDelete}
                                                    >Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                    <hr className="text-light bg-ligth" />
                    <div className='h1 text-center text-light'>Busca</div>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">WP</th>
                                <th scope="col">Service tag</th>
                                <th scope="col">Disponível</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Status</th>
                                {/* <th scope="col expand-button" */}
                                <th scope="col"
                                // data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"
                                >
                                    Expandir

                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-light'>
                            {/* {data?.map(({ id, data }) => { */}
                            {data?.map(({ id, data }) => {
                                return (
                                    <>
                                        {/* <tr class="collapse" id="collapseExample" key={id}> */}
                                        <tr key={id}>
                                            <th scope="row">{data.wp}</th>
                                            <td>{data.st}</td>
                                            <td>{data.disp}</td>
                                            <td>{data.user}</td>
                                            <td>{data.status}</td>
                                            <td>
                                                <div className='d-flex justify-content-around'>
                                                    <button
                                                        type='button'
                                                        className='btn btnShadow btn-lg  btn-danger mt-2 mb-1'
                                                    //    onClick={(e)=>editItem(id)}
                                                    >Editar
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btnShadow btn-lg  btn-info mt-2 mb-1'
                                                        onClick={handleDelete}
                                                    >Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section >
        </div>
        </>
    )
} 
