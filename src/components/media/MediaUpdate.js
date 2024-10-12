import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getMediaPorId, actualizarMedia } from '../../services/mediaService';
import { getDirectores } from "../../services/directorService";
import { getProductoras } from "../../services/productoraService";
import { getGeneros } from "../../services/generoService";
import { getTipos } from "../../services/tipoService";
import Swal from "sweetalert2";

export const MediaUpdate = () => {

    const { mediaId = '' } = useParams();
    const [ media, setMedia ] = useState();
    const [ directores, setDirectores ] = useState([]);
    const [ productoras, setProductoras ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ generos, setGeneros ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState([]);
    const {  serial = '', titulo = '', descripcion = '', foto = '', añoEstreno = '', director, productora, genero, tipo } = valoresForm


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
        


    const getMedia = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getMediaPorId(mediaId);
            console.log(data);
            setMedia(data);
            Swal.close();
        } catch(error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getMedia();
    }, [mediaId]);


    useEffect(() => {
        if(media) {
            setValoresForm({
                serial: media.serial,
                descripcion: media.descripcion,
                titulo: media.titulo,
                añoEstreno: media.añoEstreno,
                director: media.director,
                productora: media.productora,
                genero: media.genero,
                tipo: media.tipo,
            });
        }
    }, [ media ])


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const media = {
            serial, titulo, descripcion, añoEstreno, foto,
            usuario: {
                _id: director
            },
            marca: {
                _id: productora
            },
            tipo:{
                _id: tipo
            },
            genero: {
                _id: genero
            }
        }
        console.log(media);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await actualizarMedia(mediaId, media);
            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if ( error && error.response && error.response.data) {
                mensaje = error.response.data
            } else {
                mensaje = "Ocurrió un error, por favor intente de nuevo"
            }
            Swal.fire('Error', mensaje, 'error');
        }
        
    }


  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
            <h5 className='card-title'>Detalle Activo</h5>
        </div>  
        <div className='card-body'>
            <div className='row'>
                <div className='col-md-4'>
                    <img src={media?.foto} />
                </div>
                <div className='col-md-8'>
                <form onSubmit={(e) => handleOnSubmit(e) }>
                    <div className='row'>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' 
                                value= {serial}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Titulo </label>
                                <input type="text" name='titulo' 
                                value={titulo}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Descripción </label>
                                <input type="text" name='descripcion' 
                                value={descripcion}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Año Estreno </label>
                                <input type="text" name='color' 
                                value={añoEstreno}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Foto </label>
                                <input type="text" name='foto'
                                value={foto} 
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Director </label>
                                <select className='form-select'
                                required
                                name= 'director'
                                value={director}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        directores.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Productora </label>
                                <select className='form-select'
                                required
                                name= 'productora'
                                value={productora}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
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
                                <label  className="form-label">Tipo</label>
                                <select className='form-select'
                                required
                                name= 'tipo'
                                value={tipo}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        tipos.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Genero</label>
                                <select className='form-select'
                                required
                                name= 'genero'
                                value={genero}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        generos.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className="btn btn-primary">Guardar</button>
                        </div>
                        
                    </div>
                </form>
                </div>
            </div>
        </div>    
      </div>
    </div>
  )
}