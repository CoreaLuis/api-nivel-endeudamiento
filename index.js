//@ development luisCorea
//@ date  2025-01 
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});


// Ruta para calcular los gastos y margen disponible
app.post('/api/calcular-endeudamiento', (req, res) => {
    const {
        ingresosMensuales,
        gastosBasicos,
        gastoPrestamo,
        gastoCombustible,
        gastoSeguro,
        gastoMantenimiento
    } = req.body;

    // Validar que todos los valores sean números y no nulos
    if (
        ingresosMensuales == null ||
        gastosBasicos == null ||
        gastoPrestamo == null ||
        gastoCombustible == null ||
        gastoSeguro == null ||
        gastoMantenimiento == null
    ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben ser números.' });
    }

    // Asegurar que todos los valores sean números
    const ingresos = parseFloat(ingresosMensuales);
    const basicos = parseFloat(gastosBasicos);
    const prestamo = parseFloat(gastoPrestamo);
    const combustible = parseFloat(gastoCombustible);
    const seguro = parseFloat(gastoSeguro);
    const mantenimiento = parseFloat(gastoMantenimiento);

    if (isNaN(ingresos) || isNaN(basicos) || isNaN(prestamo) || isNaN(combustible) || isNaN(seguro) || isNaN(mantenimiento)) {
        return res.status(400).json({ error: 'Todos los valores deben ser números válidos.' });
    }

    const totalGastos = basicos + prestamo + combustible + seguro + mantenimiento;
    const porcentajeGastos = (totalGastos / ingresos) * 100;
    // Verificar si está entre el 20% y el 30%
    const entreVeinteYTreintaPorCiento = porcentajeGastos >= 20 && porcentajeGastos <= 30;
    const thirthyPercent = (ingresos - totalGastos) * 0.3
    const nivelEndudamiento = (totalGastos / ingresos) * 100
        // Response
    return res.json({
        ingresosMensuales: ingresos,
        totalGastos,
        porcentajeGastos: porcentajeGastos.toFixed(2), // Redondear a 2 decimales
        entreVeinteYTreintaPorCiento,
        thirthyPercent,
        nivelEndudamiento,
        mensaje: entreVeinteYTreintaPorCiento ?
            `Los gastos representan el ${porcentajeGastos.toFixed(2)}% de los ingresos, lo cual está entre el 20% y el 30%.` : `Los gastos representan el ${porcentajeGastos.toFixed(2)}% de los ingresos, lo cual está fuera del rango del 20% al 30%.`
    });
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});