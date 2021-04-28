import axios from 'axios'
import { authHeader } from '../_helpers'

const ApiServices = (route) => {

    const baseURL = 'https://learning-tool-api.herokuapp.com'
    const api  = axios.create({ baseURL })

    const getAllBuilder = (routeName) => function getAll() {
        // pegar rota
        return api(
        {
            method: 'get',
            url: `/${routeName.toLowerCase().replace(/_/g, '-')}`,
            headers: authHeader()
        })
        .then(handleResponse)
    }

    const getByIdBuilder = (routeName) => function getById(id){
        return api(
            {
            method: 'get',
            url: `/${routeName.toLowerCase().replace(/_/g, '-')}/${id}`,
            headers: authHeader()
            })
            .then(handleResponse)
    }

    const findBuilder = (routeName) => function find(data) {
    return api(
        {
        method: 'get',
        url: `/${routeName.toLowerCase().replace(/_/g, '-')}`,
        headers: authHeader(),
        query: data
        })
        .then(handleResponse)
    }

    const createBuilder = (routeName) => function create(data) {
        return api(
        {
            method: 'post',
            url: `/${routeName.toLowerCase().replace(/_/g, '-')}`,
            headers: authHeader(),
            data: data
        })
        .then(handleResponse)
    }

    const updateBuilder = (routeName) => function update(data){
        return api(
            {
            method: 'put',
            url: `/${routeName.toLowerCase().replace(/_/g, '-')}/${data.id}`,
            headers:  {
                ...authHeader(),
            'Content-Type': 'application/json'
            },
            data: data
            })
            .then(handleResponse)
    }

    const deleteBuilder = (routeName) => function _delete(id){
        return api(
            {
            method: 'delete',
            url: `/${routeName.toLowerCase().replace(/_/g, '-')}/${id}`,
            headers: authHeader()
            })
            .then(handleResponse)
    }

    function handleResponse(response) {
        if(response.status !== 200){
            if(response.status === 401){
                window.location.reload()
            }
            return Promise.reject(response.statusText)
        }

        return { 
            table: route.type,
            data: response.data
        }
    }

    return {
        getAll:  getAllBuilder(route.name),
        getById: getByIdBuilder(route.name),
        find:  findBuilder(route.name),
        create:  createBuilder(route.name),
        update:  updateBuilder(route.name),
        delete:  deleteBuilder(route.name)
    }

}

export { ApiServices }
