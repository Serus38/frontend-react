import React, { useEffect, useState} from "react";
import { getMedias } from "../../services/mediaService";
import { MediaCard } from "./MediaCard";
import { MediaNew } from "./MediaNew";
import Swal from "sweetalert2";

export const MediaView = () => {

  const [media, setMedias] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);


    const listarMedias = async () => {
        try{
          Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
          });
          Swal.showLoading();
            const{ data } = await getMedias();
            console.log(data);
            Swal.close();
            setMedias(data);

        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarMedias();
    }, []);

    const handleOpenModal = () => {
      setOpenModal(!openModal);
    }


   return(
      <div className="container">
        <div className="mt-2 mb-4 row row-cols-1 row-cols-md-4 g-4">
          {
            media.map((media) => {
              return <MediaCard key = {media._id} media = {media} />
            })
          }
        </div>
        {
          openModal ? <MediaNew
          handleOpenModal={ handleOpenModal }
          listarMedias={ listarMedias } /> :
          <button className="btn btn-primary agr" onClick={ handleOpenModal}>
          <i class="fa-solid fa-plus"></i>
        </button>

        }
       
      </div>

    
    )
}