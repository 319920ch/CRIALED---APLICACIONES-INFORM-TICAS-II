const Proyecto = require('../models/proyectom');

// Iniciar un proyecto
exports.initProyecto = async (req, res) => {
    try {
      const { id_contrato, fecha_inicio, fecha_fin, nombre_proyecto } = req.body;
      const proyecto = await Proyecto.create({
        id_contrato,
        fecha_inicio,
        fecha_fin,
        id_estado: 1, // Estado inicial del proyecto
        nombre_proyecto,
      });
  
      const estado = await proyecto.getEstado();
      const estadoNombre = estado? estado.estado : null;
  
      res.status(201).json({
        message: 'Proyecto iniciado',
        id_proyecto: proyecto.id_proyecto,
        id_contrato: proyecto.id_contrato,
        nombre_proyecto: proyecto.nombre_proyecto,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        estado: estadoNombre,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.updateEstadoProyecto = async (req, res) => {
    try {
      const { id_proyecto, id_estado } = req.body;
      const proyecto = await Proyecto.findByPk(id_proyecto);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      await proyecto.update({ id_estado });
      const estado = await proyecto.getEstado();
      const estadoNombre = estado? estado.estado : null;
  
      res.status(200).json({
        message: 'Estado del proyecto actualizado',
        id_proyecto: proyecto.id_proyecto,
        id_contrato: proyecto.id_contrato,
        nombre_proyecto: proyecto.nombre_proyecto,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        estado: estadoNombre,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateFechaFinProyecto = async (req, res) => {
    try {
      const { id_proyecto, fecha_fin } = req.body;
      const proyecto = await Proyecto.findByPk(id_proyecto);
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      await proyecto.update({ fecha_fin });
      res.status(200).json({
        message: 'Fecha de fin del proyecto actualizada',
        id_proyecto: proyecto.id_proyecto,
        id_contrato: proyecto.id_contrato,
        nombre_proyecto: proyecto.nombre_proyecto,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
