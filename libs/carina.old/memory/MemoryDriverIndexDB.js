System.register(["./MemoryDriver", "./BasicMemoryUnity"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MemoryDriver_1, BasicMemoryUnity_1, MemoryDriverIndexDB;
    return {
        setters: [
            function (MemoryDriver_1_1) {
                MemoryDriver_1 = MemoryDriver_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            }
        ],
        execute: function () {
            MemoryDriverIndexDB = class MemoryDriverIndexDB extends MemoryDriver_1.MemoryDriver {
                constructor(config) {
                    super(config);
                }
                init() {
                    var _this = this;
                    return new Promise((resolve, reject) => {
                        var indexedDB = window.indexedDB;
                        var dbRequest = indexedDB.open(_this.config['db']);
                        dbRequest.onerror = function (event) {
                            reject(false);
                        };
                        dbRequest.onsuccess = function (e) {
                            var db = dbRequest.result;
                            if (!db.objectStoreNames.contains(_this.config['tableName'])) {
                                var version = db.version + 1;
                                db.close();
                                var dbRequest2 = indexedDB.open(_this.config['db'], version);
                                dbRequest2.onupgradeneeded = function (event) {
                                    db = dbRequest2.result;
                                    db.createObjectStore(_this.config['tableName'], { keyPath: 'cue' });
                                    db.close();
                                    resolve(true);
                                };
                            }
                            else {
                                dbRequest.result.close();
                                resolve(true);
                            }
                        };
                        dbRequest.onupgradeneeded = function (event) {
                            var db = dbRequest.result;
                            db.createObjectStore(_this.config['tableName'], { keyPath: 'cue' });
                            db.close();
                            resolve(true);
                        };
                    });
                }
                storeInformation(information) {
                    var _this = this;
                    return new Promise((resolve, reject) => {
                        var indexedDB = window.indexedDB;
                        var dbRequest = indexedDB.open(_this.config['db']);
                        dbRequest.onsuccess = function (e) {
                            var db = dbRequest.result;
                            var request = db.transaction([_this.config['tableName']], "readwrite")
                                .objectStore(_this.config['tableName'])
                                .put(information);
                            request.onerror = function (event) {
                                resolve(false);
                            };
                            request.onsuccess = function (event) {
                                resolve(true);
                            };
                        };
                    });
                }
                retrieveInformation(cue) {
                    var _this = this;
                    return new Promise((resolve, reject) => {
                        var indexedDB = window.indexedDB;
                        var dbRequest = indexedDB.open(_this.config['db']);
                        dbRequest.onsuccess = function (e) {
                            var db = dbRequest.result;
                            var request = db.transaction([_this.config['tableName']])
                                .objectStore(_this.config['tableName'])
                                .get(cue);
                            request.onerror = function (event) {
                                reject(null);
                            };
                            request.onsuccess = function (event) {
                                if (request.result) {
                                    resolve(new BasicMemoryUnity_1.BasicMemoryUnity(request.result.cue, request.result.information));
                                }
                                else {
                                    resolve(null);
                                }
                            };
                        };
                    });
                }
                forgetInformation(cue) {
                    var _this = this;
                    return new Promise((resolve, reject) => {
                        var indexedDB = window.indexedDB;
                        var dbRequest = indexedDB.open(_this.config['db']);
                        dbRequest.onsuccess = function (e) {
                            var db = dbRequest.result;
                            var request = db.transaction([_this.config['tableName']], "readwrite")
                                .objectStore(_this.config['tableName'])
                                .delete(cue);
                            request.onerror = function (event) {
                                resolve(false);
                            };
                            request.onsuccess = function (event) {
                                resolve(true);
                            };
                        };
                    });
                }
            };
            exports_1("MemoryDriverIndexDB", MemoryDriverIndexDB);
        }
    };
});
