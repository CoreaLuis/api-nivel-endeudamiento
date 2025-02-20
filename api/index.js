//@ development luisCorea
//@ date  2025-01 
const express = require('express');
const app = express();
const PORT = 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de cálculo de endeudamiento!');
});

// Middleware para manejar JSON
app.use(express.json());

// Ruta para calcular los gastos y margen disponible
app.post('/api/calcular-endeudamiento', (req, res) => {
    const {
        ingresosMensuales,
        gastosBasicos,
        gastoPrestamo = 0,
        gastoCombustible,
        gastoSeguro = 0, // Asigna 0 si no viene en la solicitud
        gastoMantenimiento = 0 // Asigna 0 si no viene en la solicitud
    } = req.body;

    // Asegurar que todos los valores sean números válidos o asignar 0 si están vacíos
    const ingresos = parseFloat(ingresosMensuales) || 0;
    const basicos = parseFloat(gastosBasicos) || 0;
    const prestamo = parseFloat(gastoPrestamo) || 0;
    const combustible = parseFloat(gastoCombustible) || 0;
    const seguro = parseFloat(gastoSeguro) || 0;
    const mantenimiento = parseFloat(gastoMantenimiento) || 0;

    // Validar que ingresos sean mayor que 0
    if (ingresos <= 0) {
        return res.status(400).json({ error: 'Los ingresos mensuales deben ser un número mayor que 0.' });
    }

    const basicosSinprestamo = basicos + prestamo + combustible + seguro + mantenimiento;
    const totalGastosFix = (basicos + prestamo + combustible + seguro + mantenimiento).toFixed(2);
    const totalGastos = basicos + prestamo + combustible + seguro + mantenimiento;
    const porcentajeGastos = (totalGastos / ingresos) * 100;
    const margenDisponible = (ingresos - totalGastos).toFixed(2);
    const percentMargenDisponible = ((margenDisponible / ingresos) * 100).toFixed(2);
    const entreVeinteYTreintaPorCiento = porcentajeGastos >= 20 && porcentajeGastos <= 30;
    const treintaPorCientoIngresos = ingresos * 0.3;
    const nivelEndeudamiento = porcentajeGastos.toFixed(2);

    //NIVEL DE ENDEUDAMIENTO CON PRÉSTAMO
    const totalGastosNew = basicos + prestamo + combustible + seguro + mantenimiento;
    const porcentajeGastosNew = (totalGastosNew / ingresos) * 100;
    const margenDisponibleNew = (ingresos - totalGastosNew).toFixed(2);
    const percentMargenDisponibleNew = ((margenDisponibleNew / ingresos) * 100).toFixed(2);
    const entreVeinteYTreintaPorCientoNew = porcentajeGastosNew >= 20 && porcentajeGastosNew <= 30;
    const treintaPorCientoIngresosNew = ingresos * 0.3;
    const nivelEndeudamientoNew = porcentajeGastosNew.toFixed(2);

    let estadoEndeudamiento = '';

    if (porcentajeGastos < 20) {
        estadoEndeudamiento = "Bajo";
    } else if (porcentajeGastos >= 20 && porcentajeGastos <= 30) {
        estadoEndeudamiento = "Moderado";
    } else {
        estadoEndeudamiento = "Alto";
    }
    console.log(estadoEndeudamiento);

    return res.json({
        ingresosMensuales: ingresos,
        totalGastosFix,
        totalGastos,
        margenDisponible,
        percentMargenDisponible,
        porcentajeGastos: nivelEndeudamiento,
        entreVeinteYTreintaPorCiento,
        treintaPorCientoIngresos,
        nivelEndeudamiento,
        estadoEndeudamiento,
        mensaje: entreVeinteYTreintaPorCiento ?
            `Los gastos representan el ${nivelEndeudamiento}% de los ingresos, lo cual está dentro del 20% al 30%.` : `Los gastos representan el ${nivelEndeudamiento}% de los ingresos, lo cual está fuera del rango del 20% al 30%.`,
        mensajeNew: 'NIVEL DE ENDEUDAMIENTO CON PRÉSTAMO VEHÍCULO'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

module.exports = app;