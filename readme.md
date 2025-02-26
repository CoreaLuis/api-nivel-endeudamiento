## API Calcular Valor Óptimo para adquirir Crédito
##### development by Luis Corea
##### date  2025-01-10 
#

[![N|Solid](https://cdn.lafise.com/resources/images/Email/Images/IMG_Logo_Banco_LAFISE_E_%402x.png)](https://apidocs.lafise.com)

Esta API fue desarrollada con el fin de hacer cálculos para que el cliente vea si es capaz sanamente de costear un crédito y calcular salario neto.

- Lenguaje JS
- Express JS
- Método POST

## Features

- Ingresar Datos Relacionados con el crédito
- Ingresar Datos Aproximados de sus ingresos

#### Endpoint
- http://localhost:3000/api/calcular-endeudamiento (POST)
- http://localhost:3000/api/calcularsalario?salario=18000&moneda=NIO  (GET)

Estos datos solo se haran uso en formulario no se alojan en ninguna parte.
El cálculo basándonos en el salario verifica si es dólares o córdobas

> Desarrollo e Innovación LAFISE

## Technologies ⚙️

API uses to work properly:

- Express JS - Development
- Vercel - Deployment
- JSON - Payload

Todo este desarollo queda alojado en un repositorio [GitHub](https://github.com/).

## Installation 💻

Calculo de Valor Optimo requiere instalar [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd api-valor-optimo
npm init -y
npm install express
node app.js
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Development

Este desarrollo fue creado con el fin de aportar un poco al customer service 🤵‍♂️ y generar en el cliente un valor agregado al adquirir su crédito ✅. 

### JSON - Payload Entrada Nivel Endeudamiento
Todos estos campos tienen que ser númericos ya que si no lanza error
{
    "ingresosMensuales": 25000,
    "gastosBasicos": 8000,
    "gastoPrestamo": 7932,
    "gastoCombustible": 3000,
    "gastoSeguro": 0,
    "gastoMantenimiento": 2000
}

### Response 200 OK ✅
{
    "ingresosMensuales": 25000,
    "totalGastos": 20932,
    "porcentajeGastos": "83.73",
    "entreVeinteYTreintaPorCiento": false,
    "thirthyPercent": 1220.3999999999999,
    "nivelEndudamiento": 83.72800000000001,
    "mensaje": "Los gastos representan el 83.73% de los ingresos, lo cual está fuera del rango del 20% al 30%."
}

### Response 400 ERROR 🚩
Si contiene sting o valores que no sean numéricos
{
    "error": "Todos los valores deben ser números válidos."
}
Si hacen falta campos
{
    "error": "Todos los campos son obligatorios y deben ser números."
}



### JSON - Payload Response Cálculo Salario Neto 
### Response 200 OK NIO ✅
/api/calcularsalario?salario=18000&moneda=NIO
{
  "salarioBruto": "18000.00",
  "inssLaboral": "1260.00",
  "salarioNetoGravable": "16740.00",
  "irMensual": "1264.67",
  "salarioNeto": "15475.33",
  "moneda": "NIO"
}
### Response 200 OK USD ✅
/api/calcularsalario?salario=500&moneda=USD
{
    "salarioBruto": "18000.00",
    "inssLaboral": "1260.00",
    "salarioNetoGravable": "16740.00",
    "irMensual": "1264.67",
    "salarioNeto": "15475.33",
    "moneda": "USD"
}

### Response 400 ERROR 🚩
{
    "error": "Debe proporcionar una moneda válida (USD o NIO), ejemplo: ?salario=18000&moneda=USD"
}

## License 📚

[Banco LAFISE Bancentro](https://www.lafise.com/)

**Desarrollo e Innovación LAFISE**
