/* const baseDeDatos = [
    {
        id: '1TortaChocolate',
        nombre: 'Chocolate',
        precio: 1000,
        imagen: './img/torta6.png',
        sabor: 'Biscocho de Chocolate',
        topping: 'Topping de Trufas de Chocolate y Fresas' ,
        relleno: 'Ganache de Chocolate',
        categoria: 'Pastel',

    },
    {
        id: "2TortadeFresa",
        nombre: 'Fresa',
        precio: 1500,
        imagen: './img/torta10.png',
        sabor: 'Biscocho de Vainilla',
        topping: 'Topping de Fresas' ,
        relleno: 'Crema de Vainilla',
        categoria: 'Pastel',
    },
    {
        id: "3TortadeDurazno",
        nombre: 'Durazno',
        precio: 1500,
        imagen: './img/durazno.png',
        sabor: 'Biscocho de Vainilla',
        topping: 'Topping de Duraznos' ,
        relleno: 'Crema de Vainilla ',
        categoria: 'Pastel',
    },
    {
        id: "4MousedeChocolate",
        nombre: 'Mouse de Chocolate',
        precio: 1000,
        imagen: './img/torta12.png',
        sabor: 'Mouse de Chocolate ',
        topping: 'Topping de Chocolate' ,
        relleno: 'Ganache de Chocolate',
        categoria: 'Pastel',
    },

    {
        id: "5MousedeMaracuya",
        nombre: 'Mouse de Maracuya',
        precio: 1500,
        imagen: './img/maracuya.png',
        sabor: 'Mouse de Maracuya',
        topping: 'Topping de Maracuya' ,
        relleno: 'Crema de Vainilla ',
        categoria: 'Pastel',
    },
    {
        id:"6TortadeTiramisu",
        nombre: 'Tiramisú',
        precio: 1500,
        imagen: './img/tiramisu.png',
        sabor: 'Biscocho de café ',
        topping: 'Topping de Café y Cacao ' ,
        relleno: 'Frosting de Queso Crema ',
        categoria: 'Pastel',
    },
    {
        id: "7CupcakeVainilla",
        nombre: 'Vainilla',
        precio: 300,
        imagen: './img/cup_vainilla.png',
        sabor: 'Biscocho de Vainilla',
        topping: 'Toping de Rocklets' ,
        relleno: 'Crema de Vainilla',
        categoria: 'Cupcake',

    },
    {
        id: "8CupcakeChocolate",
        nombre: 'Chocolate',
        precio: 400,
        imagen: './img/cup_choco.png',
        sabor: 'Biscocho de Chocolate',
        topping: 'Topping de Chocolate' ,
        relleno: 'Crema de Chocolate',
        categoria: 'Cupcake',
    },
    {
        id:"9CupcakeGalleta",
        nombre: 'Galleta',
        precio: 400,
        imagen: './img/cup_galleta.png',
        sabor: 'Biscocho de Vainilla y Oreo',
        topping: 'Toping de Galleta ChocoChips' ,
        relleno: 'Crema de Vainilla ',
        categoria: 'Cupcake',
    },
    {
        id: "10CupcakeFresa",
        nombre: 'Fresa',
        precio: 400,
        imagen: './img/cup_fresa.png',
        sabor: 'Biscocho de Vainilla y Fresas',
        topping: 'Toping de Fresas' ,
        relleno: 'Crema de Vainilla',
        categoria: 'Cupcake',
    },

    {
        id: "11CupcakeAlmerndra",
        nombre: 'Almendras',
        precio: 500,
        imagen: './img/cup_almendra.png',
        sabor: 'Biscocho de Chocolate y Almendras',
        topping: 'Toping de Sirope de Chocolate y Almendras' ,
        relleno: 'Crema de Vainilla y Almendras',
        categoria: 'Cupcake',
    },
    {
        id: "12CupcakeZanahoria",
        nombre: 'Zanahoria',
        precio: 500,
        imagen: './img/cup_zanahoria.png',
        sabor: 'Biscocho de Vainilla y Zanahoria ',
        topping: 'Toping de Fondant en Froma de Zanahoria' ,
        relleno: 'Frosting de Queso Crema',
        categoria: 'Cupcake',
    },
    {
        id: "13GalletaChocochip",
        nombre: 'ChocoChips',
        precio: 300,
        imagen: './img/galletas4.png',
        sabor: 'Galleta de Vainilla',
        topping: 'Cubierta de Chips de Chocolate' ,
        relleno: '',
        categoria: 'Galleta',
    },
    {
        id: "14GalletaVainillaRedonda",
        nombre: 'Vainilla Redonda',
        precio: 300,
        imagen: './img/pikachu.png',
        sabor: '',
        topping: 'Pikachu' ,
        relleno: 'Hello Kitty',
        categoria: 'Galleta',
    },
    {
        id: "15GalletaVainillaCuadrada",
        nombre: 'Vainilla Cuadrada',
        precio: 300,
        imagen: './img/galleta1.png',
        sabor: 'Esqueleto',
        topping: 'TNT' ,
        relleno: 'Creeper',
        categoria: 'Galleta',
    },
    {
        id: "16GalletaRocklets",
        nombre: 'Rocklets',
        precio: 300,
        imagen: './img/galletarocklets.png',
        sabor: 'Galleta de Vainilla',
        topping: 'Cubierta de Rocklest' ,
        relleno: '',
        categoria: 'Galleta',
    },
    {
        id: "17GalletaMembrillo",
        nombre: 'Membrillo',
        precio: 300,
        imagen: './img/galletamembrillo.png',
        sabor: 'Galleta de Vainilla',
        topping: 'Relleno de Membrillo' ,
        relleno: '',
        categoria: 'Galleta',
    },
    {
        id: "18GalletaHersheys",
        nombre: 'Hersheys',
        precio: 300,
        imagen: './img/GalletasHersheys.png',
        sabor: 'Galleta de Chocolate',
        topping: 'Cubierta de Hersheys' ,
        relleno: '',
        categoria: 'Galleta',
    },
    {
        id:"19TortadeSelvaNegra",
        nombre: 'Selva Negra',
        precio: 2500,
        imagen: './img/selva-negra.png',
        sabor: 'Biscocho de Vainilla ',
        topping: 'Topping de Chcolate y Cerezas ' ,
        relleno: 'Crema de Chocolate',
        categoria: 'Pastel',
    },

];



 */