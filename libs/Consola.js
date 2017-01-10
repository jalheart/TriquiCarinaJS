System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Consola;
    return {
        setters: [],
        execute: function () {
            Consola = class Consola {
                constructor() { }
                init(selector) {
                    this._elemento = document.getElementById(selector);
                    this._elemento.innerHTML = '';
                }
                log(dato) {
                    dato = dato.split(' ').join('&nbsp;');
                    this._elemento.innerHTML += '<span class="time">' + new Date().toLocaleTimeString() + '</span>&nbsp;>&nbsp;' + dato + '<br/>';
                    this._elemento.scrollTop = this._elemento.scrollHeight;
                }
                clear() {
                    this._elemento.innerHTML = '';
                }
                static getConsola(nombre) {
                    if (this._instances[nombre] == null) {
                        this._instances[nombre] = new Consola();
                    }
                    return this._instances[nombre];
                }
            };
            Consola._instances = [];
            exports_1("Consola", Consola);
        }
    };
});
