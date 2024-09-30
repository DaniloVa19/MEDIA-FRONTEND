
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGeneros } from '../../services/generoServices';
import { getDirectores } from '../../services/directorServices';
import { getProductoras } from '../../services/productoraServices';
import { getTipos } from '../../services/tipoServices';

import Swal from 'sweetalert2';
import { crearMedia } from '../../services/mediaServices';

const MediaNew = ({ handleOpenModal ,listarMedias}) => {

    const [generos, setGeneros] = useState([])
    const [directores, setDirectores] = useState([])
    const [productoras, setProductoras] = useState([])
    const [tipos, setTipos] = useState([])
    const [valoresForm, setValoresForm] = useState([])
    const { serial = '', titulo = '', sinopsis = '', url = '', imagenPortada = '',
         yearEstreno = '', genero = ''
        , director = '', productora = '', tipo = '' } = valoresForm;

    const listarGeneros = async () => {
        try {
            const { data } = await getGeneros();

            setGeneros(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarGeneros();
    }, [])


    const listarDirectores = async () => {
        try {
            const { data } = await getDirectores();

            setDirectores(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarDirectores();
    }, [])

    const listarProductoras = async () => {
        try {
            const { data } = await getProductoras();

            setProductoras(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarProductoras();
    }, [])

    const listarTipos = async () => {
        try {
            const { data } = await getTipos();

            setTipos(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarTipos();
    }, [])


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial,
            titulo,
            sinopsis,
            url,
            imagenPortada,
            yearEstreno,
            genero: { _id: genero },
            director: { _id: director },
            productora: { _id: productora },
            tipo: { _id: tipo },
        }
        console.log(media)
        try {
            Swal.fire({
                allowOutsideClick: false,
                text:'Cargando...'
            });
            Swal.showLoading();
            const {data} = await crearMedia(media)
            handleOpenModal();
            listarMedias();
            Swal.close()
        } catch (error) {
            console.log(error)
            Swal.close()
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje =error.response.data
            }else{
                mensaje="Ocurrio un error, por favor intente de nuevo"
            }
            Swal.fire('Error',mensaje,'error')
        }
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nueva media</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <hr />
                        </div>
                    </div>

                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Serial</label>
                                    <input type="text" name='serial'
                                        value={serial}
                                        onChange={e => handleOnChange(e)}
                                        required className='form-control'
                                    />

                                </div>

                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">titulo</label>
                                    <input type="text" name='titulo'
                                        value={titulo}
                                        onChange={e => handleOnChange(e)}
                                        required className='form-control'

                                    />

                                </div>

                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">sinopsis</label>
                                    <input type="text" name='sinopsis'
                                        value={sinopsis}
                                        onChange={e => handleOnChange(e)}
                                        required className='form-control'
                                    />

                                </div>

                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">url</label>
                                    <input type="text" name='url'
                                        value={url}
                                        onChange={e => handleOnChange(e)}
                                        required className='form-control'
                                    />

                                </div>

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">imagen de Portada</label>
                                    <input type="text" name='imagenPortada'
                                        value={imagenPortada}
                                        onChange={e => handleOnChange(e)}
                                        required className='form-control'
                                    />

                                </div>

                            </div>

                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">año de estreno</label>
                                    <input type="number" name='yearEstreno'
                                        value={yearEstreno}
                                        onChange={e => handleOnChange(e)}
                                        required
                                        className='form-control'
                                    />

                                </div>

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Genero</label>
                                    <select className="form-select" 
                                        required
                                        value={genero}
                                        name='genero'
                                        onChange={e => handleOnChange(e)}>
                                        <option value="">-- SELECCIONE--</option>
                                        {
                                            generos.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>

                                </div>

                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Director</label>
                                    <select className="form-select" 
                                        required
                                        value={director}
                                        name='director'
                                        onChange={e => handleOnChange(e)}
                                    >
                                        <option value="">-- SELECCIONE--</option>
                                        {
                                            directores.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>

                                </div>

                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Productora</label>
                                    <select className="form-select"
                                       
                                        required
                                        value={productora}
                                        name='productora'
                                        onChange={e => handleOnChange(e)}
                                    >

                                        <option value="">-- SELECCIONE--</option>
                                        {
                                            productoras.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>

                                </div>

                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Tipo</label>
                                    <select 
                                        required
                                        className='form-control'
                                        name='tipo'
                                        value={tipo}
                                        onChange={e => handleOnChange(e)}>

                                        <option value="">-- SELECCIONE--</option>
                                        {
                                            tipos.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>

                                </div>

                            </div>

                        </div>
                        <div className='row'>
                            <div className='col'>
                                <button  className="btn btn-primary" >Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}



export { MediaNew }