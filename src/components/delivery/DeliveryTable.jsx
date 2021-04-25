import React from 'react'

export default props => {

    //const lista = props.list


    const deliveryMock = [
        {
            id: 1,
            name: 'Vitor',
            date: '23/04/2021',
            partida: 'Rua Eulalia Silva',
            destino: 'Rua Dom Pedro I'
        },
        {
            id: 2,
            name: 'Eduardo',
            date: '23/04/2021',
            partida: 'Rua Eulalia Silva',
            destino: 'Rua Dom Pedro I'
        },
        {
            id: 3,
            name: 'Evelyn',
            date: '23/04/2021',
            partida: 'Rua Eulalia Silva',
            destino: 'Rua Dom Pedro I'
        }

    ];

    const lista = deliveryMock


    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Partida</th>
                    <th>Destino</th>
                </tr>
            </thead>
            <tbody>
                {
                lista.map(delivery => {
                    return (
                        <tr key={delivery.id}>
                            <td>{delivery.id}</td>
                            <td>{delivery.name}</td>
                            <td>{delivery.date}</td>
                            <td>{delivery.partida}</td>
                            <td>{delivery.destino}</td>

                            <td>
                                <button className="btn btn-warning" title='Editar' onClick={() => props.load(delivery)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(delivery)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
