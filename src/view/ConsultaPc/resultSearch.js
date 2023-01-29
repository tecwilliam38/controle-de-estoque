import React from 'react'

export default function ResultSearch({ id, wp, asset, disp, msg, st, status, user, }) {
    return (
        <>
            <table class="table mt-5">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">WP</th>
                        <th scope="col">Service tag</th>
                        <th scope="col">Disponível</th>
                        <th scope="col">Usuário</th>
                        <th scope="col">Status</th>
                        <th scope="col"
                        // onClick={receber}
                        >
                            Expandir

                        </th>
                    </tr>
                </thead>
                <tbody className='text-light'>
                    <tr key={id}>
                        <th scope="row">{wp}</th>
                        <td>{st}</td>
                        <td>{disp}</td>
                        <td>{user}</td>
                        <td>{status}</td>
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
                                // onClick={handleDelete}
                                >Excluir
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
