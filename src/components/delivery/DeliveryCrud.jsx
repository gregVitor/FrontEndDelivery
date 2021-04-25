import React from 'react'
import Main from '../template/Main'
import Deliveryform from './Deliveryform'
import DeliveryTable from './DeliveryTable'
import axios from 'axios'

import { NotificationContainer, NotificationManager } from 'react-notifications'

const headerProps = {
    icon: 'users',
    title: 'Cadastro de Entregas',
    subtitle: ''
}

const baseUrl = 'http://localhost:3001/delivery'

const initialState = {
    delivery: {
        name: '',
        date: '',
        partida: '',
        destino: ''
    },
    list: []
}

export default class  DeliveryCrud extends React.Component {

    constructor() {
        super()

        this.state = { ...initialState }

        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        this.getUpdatedList = this.getUpdatedList.bind(this)
        this.updateField = this.updateField.bind(this)
        this.load = this.load.bind(this)
        this.remove = this.remove.bind(this)
        this.handleEnterPress = this.handleEnterPress.bind(this)
    }

    componentWillMount() {
        axios.get(baseUrl).then(response => {
            this.setState({ list: response.data })
        })
    }

    handleEnterPress(event) {
        if (event.key === 'Enter') {
            this.save()
        }
    }

    clear() {
        this.setState({ delivery: initialState.delivery })
    }

    save() {
        const delivery = this.state.delivery
        const method = delivery.id ? 'put' : 'post'
        const url = delivery.id ? `${baseUrl}/${delivery.id}` : baseUrl

        if (delivery.name === '' || delivery.date === '' || delivery.partida === '' || delivery.destino === '') {
            NotificationManager.warning('Informações obrigatórios', 'Preencha os campos')
        } else {
            axios[method](url, delivery)
                .then(response => {
                    const list = this.getUpdatedList(response.data)
                    this.setState({ delivery: initialState.delivery, list })
                    if (method === 'post')
                        NotificationManager.success('Entrega cadastrada com sucesso', 'Criar Entrega')
                    else
                        NotificationManager.success('Entrega alterada com sucesso', 'Editar Entrega')
                })
        }

    }

    getUpdatedList(delivery, add = true) {
        const list = this.state.list.filter(u => u.id !== delivery.id)
        if (add)
            list.unshift(delivery)
        return list
    }

    updateField(event) {
        const delivery = { ...this.state.delivery }
        delivery[event.target.name] = event.target.value
        this.setState({ delivery })
    }

    load(delivery) {
        this.setState({ delivery })
    }

    remove(delivery) {
        axios.delete(`${baseUrl}/${delivery.id}`)
            .then(response => {
                const list = this.getUpdatedList(delivery, false)
                this.setState({ list })
                NotificationManager.success('Entrega excluído com sucesso', 'Excluir Entrega')
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                <Deliveryform name={this.state.delivery.name}
                    date={this.state.delivery.date}
                    partida={this.state.delivery.partida}
                    destino={this.state.delivery.destino}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                />
                <DeliveryTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                />
            </Main>
        )
    }
}
