import React, { useState, useEffect } from 'react'

import { actualizarProductora, crearProductora, getProductoras, eliminarProductoraPorId } from '../../services/productoraServices'
import Swal from 'sweetalert2'

const ProductoraView = () => {
    const [valoresForm, setValoresForm] = useState([])
    const [productoras, setProductoras] = useState([])
    const { nombre = '', descripcion = '',slogan='', estado = '' } = valoresForm;
    const [productoraSeleccionado, setProductoraSeleccionado] = useState(null);
    const moment = require('moment');

    const listarProductoras = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const resp = await getProductoras();
            console.log(resp);
            setProductoras(resp.data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }
    useEffect(() => {
        listarProductoras()
    }, [])

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }

    const handleCrearProductora = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();

            if (productoraSeleccionado) {
                console.log(valoresForm)
                await actualizarProductora(productoraSeleccionado, valoresForm);
                setProductoraSeleccionado(null);
            } else {
                await crearProductora(valoresForm);
            }

            setValoresForm({ nombre : '', descripcion : '',slogan:'', estado : '' });
            listarProductoras();
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    const handleActualizarProductora = async (e, productora) => {
        e.preventDefault();
        setValoresForm({ nombre: productora.nombre, descripcion: productora.descripcion, slogan: productora.slogan, estado: productora.estado });
        setProductoraSeleccionado(productora._id);
        console.log(productora._id)
        
    };

    const eliminarProductoraSeleccionado = async (e) => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();


            await eliminarProductoraSeleccionado(e);




            listarProductoras();
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }



    }

    const handleElimnarProductora = async (e, productora) => {
        e.preventDefault();

        eliminarProductoraPorId(productora._id);
    };



    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={(e) => handleCrearProductora(e)} >
                <div className="row">
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input required name='nombre' value={nombre} type="text" className="form-control"
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Slogan</label>
                            <input required name='slogan' value={slogan} type="text" className="form-control"
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input required name='descripcion' value={slogan} type="text" className="form-control"
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select required name='estado' value={estado} className="form-select"
                                onChange={(e) => handleOnChange(e)} >
                                <option selected>--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mb-3">Guardar</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th scope='row'>#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Slogan</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Estado</th>
                        <th scope='col'>Fecha Creación</th>
                        <th scope='col'>Fecha Actualización</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productoras.length > 0 && productoras.map((productora, index) => {
                            return <tr>
                                <th scope='row'> {index + 1}</th>
                                <td>{productora.nombre}</td>
                                <td>{productora.descripcion}</td>
                                <td>{productora.estado}</td>
                                <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{moment(productora.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarProductora(e, productora)}>Actualizar</button>
                                    <button className='btn btn-danger btn-sm' onClick={(e)=>handleElimnarProductora(e,productora)}>Eliminar</button>
                                </td>

                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}


export {
    ProductoraView
} 