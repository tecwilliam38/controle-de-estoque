import React, { useState, useEffect } from 'react'
import db, { firestoreDb } from '../../firebaseConfig/index';
import './cadastro.css';
import { uid } from 'uid';
import {
    set,
    ref,
} from 'firebase/database';


import {
    setDoc,
    doc,
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
    getDocs,
} from "firebase/firestore";

import { useNavigate } from 'react-router-dom';
import Menu from '../Navbar';


export default function CadastroPc() {
    const navigate = useNavigate();
    const [docmento, setDocumento] = useState([]);

    const handleLerdados = async () => {
        const db = firestoreDb;
        const refDb = collection(db, 'pcs');
        onSnapshot(refDb, (snapshot) => {
            setData(
                snapshot.docs.map((doc) => ({
                    data: doc.data(),
                }))
            );
            // setId(
            //     snapshot.docs.map((doc) => ({
            //         data: doc.data(id),
            //     }))
            // );
          
        });
    }
    useEffect(() => {
        handleLerdados();       
    }, []);
    const [asset, setAsset] = useState('');
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);



    const addPost = (e) => {    
      } 


    const cadastroFirestore = async () => {
        const db = firestoreDb;
        const uuid = uid();
        // const docRef = collection(db, "pcs");
        try {
            const docRef = await addDoc(collection(db, "pcs"), {
                name: "William",
                asset: asset,
                disp: disp,
                msg: msg,
                serviceTag: serviceTag,
                user: user,
                status: status,
                id: id,
                uuid
            });
            setId((id) + 1)
            // let id1 = parseFloat(id) + (1);
            // let id2 = id1.toString();                                            
            // var id = id2;
            // alert("Este é o id string:\n\t\t" +id + "\t\t"+ typeof id);
            // console.log("Este é o id string:\t\t" +id + "\t\t"+ typeof id);
            // const docRef = await setDoc(doc(db, "vasco"),          
            navigate('/home');
        } catch (e) {
            console.error("Error adding document: ", e);
            console.log(e);
        }

    }

    return (
        <>
            <div className='bg-login'>
                <Menu />
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Asset</th>
                            <th scope="col">Service tag</th>
                            <th scope="col">Disponibilidade</th>
                            <th scope="col">Usuário</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Observação</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">                               
                                <input type='text' placeholder='WP, AC, WPA, MAC, GSAT...'
                                    className='form-control' value={asset} onChange={(e) => setAsset(e.target.value)} />
                            </th>
                            <td>
                                <input type='text' placeholder='S/T' className='form-control' value={serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
                            </td>
                            <td>
                                <select className="form-control" id="exampleFormControlSelect1" value={disp} onChange={(e) => setDisp(e.target.value)}>
                                    <option selected>Selecionar</option>
                                    <option>Disponível</option>
                                    <option>Indisponível</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' placeholder='Nome de usuário...'
                                    className='form-control' value={user} onChange={(e) => setUser(e.target.value)} />
                            </td>
                            <td>
                                <select className="form-control" id="exampleFormControlSelect1" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option selected>Selecionar</option>
                                    <option>Pronto para retirar</option>
                                    <option>Em estoque</option>
                                    <option>Com o field</option>
                                    <option>Falta csv</option>
                                    <option>Atualizar drivers</option>
                                    <option>Instalar office</option>
                                    <option>Nenhum...</option>
                                </select>
                            </td>
                            <td>
                                <textarea type='text' rows={1} className='form-control' value={msg} onChange={(e) => setMsg(e.target.value)} />
                            </td>
                            <td>
                                <button className='btn btn-primary btn-block ml-1' onClick={cadastroFirestore}>Enviar</button>
                                {/* <button className='btn btn-primary btn-block ml-1' onClick={insertPc}>Enviar</button> */}
                            </td>
                        </tr>                       
                    </tbody>
                </table>
            </div>
        </>
    )
}

