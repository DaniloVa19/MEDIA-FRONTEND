
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const MediaCard = (props) => {

    const { media } = props

    return (
        <div className="col">
            <div className="card">
                <img src={`${media.imagenPortada}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Datos:</h5>
                    <p className="card-text">
                        {`Titulo: ${media.titulo}`}</p>
                    <p className="card-text">
                        {`Genero: ${media.genero.nombre}`}</p>
                    <p className="card-text">
                        {`Director: ${media.director.nombre}`}</p>
                    <p className="card-text">
                        {`Productora: ${media.productora.nombre}`}</p>
                    <p className="card-text">
                        {`Tipo: ${media.tipo.nombre}`}</p>
                    <p className="card-text">
                        {`Año estreno: ${media.yearEstreno}`}</p>
                    <p className="card-text">
                        <Link to ={`media/edit/${media._id}`}>Ver más...</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}



export { MediaCard }
