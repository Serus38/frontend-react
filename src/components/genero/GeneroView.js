import React, { useEffect, useState } from 'react';
import { getGeneros, crearGenero, actualizarGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require ('moment');

export const GeneroView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [generos, setGeneros] = useState({});
  const { nombre = '', estado = ''} = valoresForm;
  const [generoSeleccionado, setGenerosSeleccionado] = useState(null);

  const listarGeneros = async () => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getGeneros();
      setGeneros(resp.data);
      Swal.close();
    }
    catch (error){
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarGeneros();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      if (generoSeleccionado){
        await actualizarGenero(valoresForm, generoSeleccionado);
        setGenerosSeleccionado(null);
      }
      else{
        await crearGenero(valoresForm);
      }

      setValoresForm({nombre: '', estado: ''});
      listarGeneros();
      Swal.close();
    }catch(error){
      console.log(error);
      Swal.close();
    }
  };

  const handleActualizarGenero = async (e,genero) =>{
    e.preventDefault();
    setValoresForm({nombre: genero.nombre, estado: genero.estado});
    setGenerosSeleccionado(genero._id);
  };

  return(
    <div className='container-fluid mt-4'>
    <form onSubmit={(e) => handleCrearGenero(e)} >
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombre' value={nombre} type="text" className="form-control"
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
          <th scope="col">Estado</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Acciones</th>
        
        </tr>
      </thead>
      <tbody>
        {
          generos.length > 0 && generos.map((genero, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(genero.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarGenero(e, genero)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm'>Eliminar</button>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  )
}
