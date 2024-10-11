import React, { useEffect, useState } from 'react';
import { getProductoras, crearProductora, actualizarProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require ('moment');

export const ProductoraView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [productoras, setProductoras] = useState({});
  const { nombre = '', estado = ''} = valoresForm;
  const [productoraSeleccionado, setProductorasSeleccionado] = useState(null);

  const listarProductoras = async () => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getProductoras();
      setProductoras(resp.data);
      Swal.close();
    }
    catch (error){
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarProductoras();
  },[]);

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

      if (productoraSeleccionado){
        await actualizarProductora(valoresForm, productoraSeleccionado);
        setProductorasSeleccionado(null);
      }
      else{
        await crearProductora(valoresForm);
      }

      setValoresForm({nombre: '', estado: ''});
      listarProductoras();
      Swal.close();
    }catch(error){
      console.log(error);
      Swal.close();
    }
  };

  const handleActualizarProductora = async (e,productora) =>{
    e.preventDefault();
    setValoresForm({nombre: productora.nombre, estado: productora.estado});
    setProductorasSeleccionado(productora._id);
  };

  return(
    <div className='container-fluid mt-4'>
    <form onSubmit={(e) => handleCrearProductora(e)} >
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
          productoras.length > 0 && productoras.map((productora, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarProductora(e, productora)}>Actualizar</button>
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