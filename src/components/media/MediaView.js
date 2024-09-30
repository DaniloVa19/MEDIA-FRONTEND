import React, { useState, useEffect } from 'react';

import { getMedias } from '../../services/mediaServices';

import { MediaCard } from './MediaCard'
import { MediaNew } from './MediaNew'
import Swal from 'sweetalert2';

const MediaView = () => {

    const [medias, setMedias] = useState([])
    const [openModal, setOpenModal] = useState(false)

    const listarMedias = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getMedias();
            console.log(data);
            setMedias(data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarMedias()
    }, [])

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <div className='container'>
            <div className="mt mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    medias.map((media) => {
                        return <MediaCard key={media._id} media={media} />

                    })
                }


            </div>

            {
                openModal ? <MediaNew
                    handleOpenModal={handleOpenModal}
                    listarMedias={listarMedias} /> :

                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
            }

        </div>

    )
}


export {
    MediaView
} 