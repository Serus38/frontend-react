import React, { useState, useEffect } from 'react';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import { getGeneros } from '../../services/generoService';
import { crearMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';


 export const MediaNew = ({ handleOpenModal, listarMedias }) => {

     const [directores, setDirectores ] = useState([]);
     const [productoras, setProductoras ] = useState([]);
     const [tipos, setTipos ] = useState([]);
     const [generos, setGeneros ] = useState([]);
     const [ valoresForm, setValoresForm ] = useState([]);
     const { serial = '', titulo = '', descripcion = '', foto = '', añoEstreno = '', director, productora, genero, tipo } = valoresForm
    
 const listarDirectores = async () => {
     try{
         const { data } = await getDirectores();
         setDirectores(data);

     } catch(error) {
         console.log(error);
     }
 }
 useEffect(() => {
     listarDirectores();
 }, []);


const listarGeneros = async () => {
    try{
        const { data } = await getGeneros();
        setGeneros(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarGeneros();
}, []);


const listarTipos = async () => {
    try{
        const { data } = await getTipos();
        setTipos(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarTipos();
}, []);


const listarProductoras = async () => {
    try{
        const { data } = await getProductoras();
        setProductoras(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarProductoras();
}, []);

    
     const handleOnChange = ({ target }) => {
         const { name, value } = target;
         setValoresForm({ ...valoresForm, [name]: value });
     }

     const handleOnSubmit = async (e) => {
         e.preventDefault();
         const media = {
             serial, titulo, descripcion, foto,
             añoEstreno, 
             director: {
                  _id: director
              },
              genero: {
                  _id: genero
             },
              tipo:{
                 _id: tipo
            },
             productora: {
                 _id: productora
             }
         }
         console.log(media);
         try {
             Swal.fire({
                 allowOutsideClick: false,
                 text: 'Cargando...'
             });
             Swal.showLoading();
             const { data } = await crearMedia(media);
             handleOpenModal();
             listarMedias();
             Swal.close();

         } catch(error) {
             console.log(error);
             Swal.close();
         }
        
     }

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nueva Pelicula</h3>
                        <i className="fa-solid fa-xmark" onClick={ handleOpenModal }> </i>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <hr  />
                    </div>
                </div>

                <form onSubmit={(e) => handleOnSubmit(e) }>
                    <div className='row'>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' 
                                value={serial}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Titulo</label>
                                <input type="text" name='titulo' 
                                value={titulo}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripcion</label>
                                <input type="text" name='descripcion' 
                                value={descripcion}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estreno</label>
                                <input type="date" name='añoEstreno' 
                                value={añoEstreno}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control'/>
                            </div>
                        </div>

                        

                    </div>

                    <div className='row'>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Director</label>
                                <select className="form-select"
                                    required
                                    name= 'director'
                                    value={director}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">-SELECCIONE-</option>
                                    {
                                        directores.map(({_id, nombre}) => {
                                            return <option key={_id}>{nombre}</option>
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
                                    name= 'productora'
                                    value={productora}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">-SELECCIONE-</option>
                                    {
                                        productoras.map(({_id, nombre}) => {
                                            return <option key={_id}>{nombre}</option>
                                        })
                                    }

                                </select>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="text" name='foto' 
                                value={foto}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control'/>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Genero</label>
                                <select className="form-select"
                                    required
                                    name= 'genero'
                                    value={genero}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">-SELECCIONE-</option>
                                    {
                                        generos.map(({_id, nombre}) => {
                                            return <option key={_id}>{nombre}</option>
                                        })
                                    }

                                </select>
                            </div>
                        </div>

                    </div>

                    {/* <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                            <label className="form-label">Tipo</label>
                            <select className="form-select"
                                    required
                                    name= 'tipo'
                                    value={tipo}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">-SELECCIONE-</option>
                                    {
                                        tipos.map(({_id, nombre}) => {
                                            return <option key={_id}>{nombre}</option>
                                        })
                                    }

                                </select>

                            </div>

                        </div>

                    </div> */}
                             


                    <div className='row'>
                        <div className='col'>
                            <button className="btn btn-primary">Guardar</button>
                        </div>
                        
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
} 