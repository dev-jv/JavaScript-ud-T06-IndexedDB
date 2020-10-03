
// document.addEventListener('DOMContentLoaded', () => {
//     crmDB(); // Cargar
// })

// function crmDB(){

//     let crmDB = window.indexedDB.open('crm', 1); // Crear base de datos version 1.0

//     crmDB.oneerror = function(){ // Si hay un error
//         console.log('There was an error when creating the DB');
//     }

//     crmDB.onsuccess = function(){ // Si se creó bien
//         console.log('Data Base created!');
//     }

//     crmDB.onupgradeneeded = function(){ // Configuración de la DB
//         console.log('This method will only run once...')
//     }
// }

/*
>   window.indexedDB.open('crm', 1); 
    Crea una DB, le da un nombre y una version

>   .oneerror
    Un método que existe en indexedDB y que actua cuando hay un error en la creación de la DB

>   .onsuccess 
    Un método que existe en indexedDB y que actua cuando la creación de la DB no tuvo inconvenientes

>   .onupgradeneeded
    Un método que existe en indexedDB y que se encarga de realizar aquellas tareas que se efectuarán una única vez: id, columnas, nombres, etc
*/

//-----------------------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//     crmDB();
// })

// function crmDB(){

//     let crmDB = window.indexedDB.open('crm', 1);

//     crmDB.oneerror = function(){
//         console.log('There was an error when creating the DB');
//     }

//     crmDB.onsuccess = function(){ 
//         console.log('Data Base created!');
//     }

//     crmDB.onupgradeneeded = function(e){
//         // console.log(e.target.result);
//         const db = e.target.result; 

//         const objectStore = db.createObjectStore('crm', {
//             keyPath: 'crm',
//             autoIncrement: true,
//         });
//         //Definir las columnas
//         objectStore.createIndex('nombre', 'nombre', {unique: false});
//         objectStore.createIndex('email', 'email', {unique: true});
//         objectStore.createIndex('telefono', 'telefono', {unique: false});

//         console.log('Columns created');
//     }
// }

/*
>   crmDB.onupgradeneeded = function(e)
    Se le pasa un evento

>   const db = e.target.result; 
    Declara una variable que representa a la DB, es una referencia temporal 

>   const objectStore = db.createObjectStore()
    Creamos un espacio para objetos en la DB y declaramos donde se utilizará y que propiedades y más tendrá. Objetos de configuración.

>   objectStore.createIndex('nombre', 'nombre', {unique: false});
    Creamos las columnas que tendrá la tabla, y le asignamos los campos que deseamos. 
    Tambien declaramos si la tabla admitirá valores duplicados
*/

//----------------------------------------------------------------
let DB;

document.addEventListener('DOMContentLoaded', () => {
    crmDB();

    setTimeout (()=>{
        crearCliente(); 
    }, 3456);
});

function crmDB(){

    let crmDB = window.indexedDB.open('crm', 1);

    crmDB.oneerror = function(){
        console.log('Hubo un error a la hora de crear la BD');
    }

    crmDB.onsuccess = function(){
        console.log('Base de datos creada!');
        DB = crmDB.result; // const db = e.target.result; son lo mismo
        // console.log(DB);
    }

    crmDB.onupgradeneeded = function(e){
        // console.log(e.target.result);
        const db = e.target.result;

        const objectStore = db.createObjectStore('crm', {
            keyPath: 'crm',
            autoIncrement: true
        });
     
        objectStore.createIndex('nombre', 'nombre', {unique: false});
        objectStore.createIndex('email', 'email', {unique: true});
        objectStore.createIndex('telefono', 'telefono', {unique: false});

        console.log('Columns created');
    }
}

function crearCliente() {
    let transaction = DB.transaction(['crm'], 'readwrite'); // readonly

    transaction.oncomplete = function() {
        console.log('Transaccion Completada'); 
    }

    transaction.onerror = function() {
        console.log('Hubo un error en la transacción');
    }

    const objectStore = transaction.objectStore('crm');

    const nuevoCliente = {
        telefono: 943765148,
        nombre: 'Juan',
        email: 'correo@correo.com',
    }

    const peticion = objectStore.add(nuevoCliente); // Agregar
    // const peticion = objectStore.put(nuevoCliente); // Actualizar
    // const peticion = objectStore.delete(nuevoCliente); // Borrar

    console.log(peticion);
}

/*

Transacciones: permite trabajar con las diferentes operaciones de una BD

let DB; 
DB = crmDB.result
El resultado(la DB) es asignada a la variable global

let transaction = DB.transaction(['crm'], 'readwrite'); // readonly
Creamos una referencia para la transaccion y le decimos donde y el modo

.oncomplete
Un método que actúa sobre el termino de la transaccion 

.onerror 
Un método que  actúa cuando surge un error

const objectStore = transaction.objectStore('crm');
Define la transacción en y para crm

const peticion = objectStore.add(nuevoCliente);
Agregamos el objeto

*/


