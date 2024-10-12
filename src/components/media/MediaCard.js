
import React from 'react'
import { Link } from 'react-router-dom';


export const MediaCard = (props) => {

    const { media } = props

  return (
    <div className="col">
        <div className="card">
            <img src={media.foto} className="card-img-top" alt="Img"/>
            <div className="card">

                <h5 className="card-title">Caracteristicas</h5>
                <hr />
                <p className="card-text">{`Serial: ${media.serial}`}</p>
                <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                <p className="card-text">{`Descripcion: ${media.descripcion}`}</p>                   
                <p className="card-text">{`Director: ${media.directorPrincipal}`}</p>
                <p className="card-text">{`Año estreno: ${media.añoEstreno}`}</p>
                <p className="card-text">{`Tipo: ${media.tipo}`}</p>

                <p className="card-text">
                  <Link to = {`medias/edit/${media._id}`}>Ver mas...</Link>
                </p>
            </div>
        </div>
    </div>
  )
}