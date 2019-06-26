var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast",
 "sap/m/Dialog"
 ], function (BaseController, JSONModel, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.GS.migo01", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("migo01").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarClase(thes);
      this.cargarCentro(thes);
      //this.cargarAlmacen(thes);
      //this.cargarUnidad(thes);
      this.cargarMaterial(thes);
      var fecha = new Date();
      var year = fecha.getFullYear();

      sessionStorage.mjahr = year;

      thes.byId("year").setValue(year); 

      $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/entidades/mseg.json', 
                      type:  'post',
                      async: false,
                      success:  function (response) {
                          var oModel = new sap.ui.model.json.JSONModel(response); 
                          thes.byId("migo01").setModel(oModel);                               
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });  

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      data._tabla = "mseg"; 
 
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"migo01","mseg");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

      $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/entidades/mkpf.json', 
                      type:  'post',
                      async: false,
                      success:  function (response) {
                          var oModel = new sap.ui.model.json.JSONModel(response); 
                          thes.byId("migo01").setModel(oModel);                               
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });  
 
      data._tabla = "mkpf"; 
      
      $.ajax({
            data:  data,
            url:   '/erp/model/long_campo.php', 
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
                thes.propiedadesInput(thes,response,"migo01","mkpf");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

      var oModel = new sap.ui.model.json.JSONModel(); 
      thes.byId("tbMseg").setModel(oModel);


       $.ajax({
        data:  data,
        url:   '/erp/model/LOGISTICA/ListarMblnr.php',
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          var codigo = JSON.parse(response); 
          let mblnr = codigo.mblnr;
          sessionStorage.mblnr = mblnr;
          thes.byId("migo01").getModel().refresh();
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });
      
      
   },
    onBack: function(oEvent) {
     var thes = this;
     thes.byId("documentoMaterial").setEditable(true);
     thes.byId("fechaDoc").setEditable(true);
     thes.byId("fechaCon").setEditable(true);
     thes.byId("valeMaterial").setEditable(true);
     thes.byId("refProyecto").setEditable(true);
     thes.byId("Add").setVisible(true);
     thes.byId("Delete").setVisible(true);
     thes.getRouter().navTo("home");

   },
   onHome: function(oEvent) {
    var thes = this;
    thes.byId("documentoMaterial").setEditable(true);
    thes.byId("fechaDoc").setEditable(true);
    thes.byId("fechaCon").setEditable(true);
    thes.byId("valeMaterial").setEditable(true);
    thes.byId("refProyecto").setEditable(true);
    thes.byId("Add").setVisible(true);
    thes.byId("Delete").setVisible(true);
    thes.getRouter().navTo("home");      
   },

   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },

   onSave: function(oEvent){

    var thes = this;
    var datosTabla =  thes.byId("tbMseg").getModel().getData();
    var codigo = thes.byId("codigoDoc").getValue();
    var claseMovimiento = thes.byId("documentoMaterial").getValue();
    var centro = thes.byId("cbxCentro").getValue();
    var centroDestino = thes.byId("cbxCentroDestino").getValue();
    var almacen = thes.byId("cbxAlmacen").getValue();
    var almacenDestino = thes.byId("cbxAlmacenDestino").getValue();
    var cnx = JSON.parse(ConexionGlobal);
    var inf =thes.byId("migo01").getModel().getData();
    var data = {};
    data._Ip = cnx[0].ip;
    data._Usuario_servidor = cnx[0].usuario_servidor;
    data._Base_datos = cnx[0].base_datos;
    data._Pass_servidor = cnx[0].pass_servidor;
    data._mblnr = sessionStorage.mblnr;
    data._mjahr = sessionStorage.mjahr;
    data._Tabla = 'mseg';
    
    if (claseMovimiento == ""){

      MessageToast.show("Seleccione la clase de movimiento");

    } else if(centro == "") {

      MessageToast.show("Seleccione el centro");

    } else if(almacen == ""){

      MessageToast.show("Seleccione el almacén");

    } else if(thes.byId("cbxCentroDestino").mProperties.visible === true && centroDestino == ""){

      MessageToast.show("Seleccione el centro-destino");

    } else if(thes.byId("cbxAlmacenDestino").mProperties.visible === true && almacenDestino == ""){

      MessageToast.show("Seleccione el almacén-destino");

    } else {

        if (Object.keys(datosTabla).length !== 0) {
        

          var datos = { 
          "para":[],
          "data":[],
          "camp":[]
          };
          

          datos.para.push(data);
          datos.data.push(datosTabla);

          if(datosTabla.length != 0){
            datos.camp.push(Object.keys(datosTabla[0]));
          }

          var ultimo = datos['data'][0].length - 1;

          var result = []; 


          for (var i = 0 ; i <= ultimo; i++) {

             if (datos['data'][0][i]['matnr'] == ""){

              result[i] = 0;  
              MessageToast.show("Rellene el campo Nº de material");

            } else if (datos['data'][0][i]['menge'] == ""){

              result[i] = 0;  
              MessageToast.show("Rellene el campo cantidad");

            } else if(datos['data'][0][i]['bwart'] == "") {

              result[i] = 0;  
              MessageToast.show("Rellene el campo clase de movimiento");

            } else if(datos['data'][0][i]['lgort'] == "" &&
              datos['data'][0][i]['werks'] == "" &&
              datos['data'][0][i]['umwrk'] == "" &&
              datos['data'][0][i]['umlgo'] == ""){


              datos['data'][0][i]['mblnr'] = sessionStorage.mblnr;
              datos['data'][0][i]['mjahr'] = sessionStorage.mjahr;

              datos['data'][0][i]['lgort'] = almacen;
              datos['data'][0][i]['werks'] = centro;
              datos['data'][0][i]['umwrk'] = centroDestino;
              datos['data'][0][i]['umlgo'] = almacenDestino;

            }else {

              result[i] = 1;        

            }

          }


          function isBelowThreshold(currentValue) {
            return currentValue == 1;
          }

          if (result.every(isBelowThreshold)){ 

            if (codigo == "") {
                  $.ajax({
                    data:  data,
                    url:   '/erp/model/LOGISTICA/EliminarDinamicoMseg.php', 
                    type:  'post',
                    async: false,
                    beforeSend: function () {
                    },
                    success:  function (response) {  
                      //thes.cargarProveedor(thes);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                      alert(xhr.status);
                      alert(thrownError);
                    }
                  })

                  $.ajax({
                    data:  datos,
                    url:   '/erp/model/SPRO/InsertarDinamico.php', 
                    type:  'post',
                    async: false,
                    beforeSend: function () {
                    },
                    success:  function (response) { 
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                      alert(xhr.status);
                      alert(thrownError);
                    }
                  });


                  this.cargarMseg(thes);

                  var newTable = thes.byId("tbMseg").getModel().getData();

                      for (var i = 0; i <= newTable.length -1; i++) {
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[1].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[2].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[3].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[4].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[5].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[6].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[7].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[8].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[9].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[10].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[11].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[12].setEditable(false);
                        thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[13].setEditable(false);

                      }

                      var mkpf = {
                      "para":[],
                      "data":[]
                      };
              

                      mkpf.para.push(data);
                      mkpf.data.push(inf);


                      $.ajax({
                            data:  mkpf,
                            url:   '/erp/model/LOGISTICA/ActualizarMkpf.php', 
                            type:  'post',
                            async: false,
                            beforeSend: function () {
                            },
                            success:  function (response) {     
                              //response = JSON.parse(response);   
                              //response = response[0];
                              //var oModel = new sap.ui.model.json.JSONModel(response);  
                              //thes.byId("mmm").setModel(oModel);
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                              alert(xhr.status);
                              alert(thrownError);
                            }

                            });

                      thes.byId("Add").setVisible(false);
                      thes.byId("Delete").setVisible(false);
                      thes.byId("codigoDoc").setValue(sessionStorage.mblnr);
                      thes.byId("fechaDoc").setEditable(false);
                      thes.byId("fechaCon").setEditable(false);
                      thes.byId("valeMaterial").setEditable(false);
                      thes.byId("refProyecto").setEditable(false);
                      thes.byId("documentoMaterial").setEditable(false);
                      thes.byId("cbxCentro").setEditable(false);
                      thes.byId("cbxAlmacen").setEditable(false);
                      thes.byId("cbxCentroDestino").setEditable(false);
                      thes.byId("cbxAlmacenDestino").setEditable(false);


                      sap.m.MessageToast.show("Se grabo con exito");
            } else{

              sap.m.MessageToast.show("No se puede grabar");

            }
          }
        } else {
      sap.m.MessageToast.show("Inserte datos en la tabla");
    }

  }

  },
  onAdd: function(oEvent){

    var docMaterial = this.byId("documentoMaterial").getValue();

    sessionStorage.bwart = docMaterial;

    var thes = this;
    var cnx = JSON.parse(ConexionGlobal);
    var data = {};
    data._Ip = cnx[0].ip;
    data._Usuario_servidor = cnx[0].usuario_servidor;
    data._Base_datos = cnx[0].base_datos;
    data._Pass_servidor = cnx[0].pass_servidor;
    data._mblnr = sessionStorage.mblnr;
    data._mjahr = sessionStorage.mjahr;
    data._bwart = sessionStorage.bwart;

      if(docMaterial == "") {

        sap.m.MessageToast.show("Seleccione la clase de movimiento");
     
      } else if(docMaterial == "102") {

        $.ajax({
            data:  data,
            url:   '/erp/model/LOGISTICA/ListarZeile.php',
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var codigo = JSON.parse(response); 
              let zeile = codigo.zeile;
              sessionStorage.zeile = zeile;
              thes.byId("migo01").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
          });

        $.ajax({
                url:   '/erp/model/entidades/mseg.json', 
                type:  'GET',
                async: false,
                beforeSend: function () {
                },
                success:  function (response) {    
                  var data = thes.byId("tbMseg").getModel().getData();
                  response.zeile = sessionStorage.zeile;
                  response.bwart = sessionStorage.bwart;
                  if(!data.length){
                    var dataTabla = [];
                    dataTabla.push(response);
                    var oModel = new sap.ui.model.json.JSONModel(dataTabla);  
                    thes.byId("tbMseg").setModel(oModel);
                  }else{
                    data.push(response);
                  }
                  
                  thes.byId("tbMseg").getModel().refresh();
                  
                },
                error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
                }
              });

        
      } else {

        $.ajax({
            data:  data,
            url:   '/erp/model/LOGISTICA/ListarZeile.php',
            type:  'post',
            async: false,
            beforeSend: function () {
            },
            success:  function (response) {    
              var codigo = JSON.parse(response); 
              let zeile = codigo.zeile;
              sessionStorage.zeile = zeile;
              thes.byId("migo01").getModel().refresh();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.status);
              alert(thrownError);
            }
          });

        $.ajax({
                url:   '/erp/model/entidades/mseg.json', 
                type:  'GET',
                async: false,
                beforeSend: function () {
                },
                success:  function (response) {    
                  var data = thes.byId("tbMseg").getModel().getData();
                  response.zeile = sessionStorage.zeile;
                  response.bwart = sessionStorage.bwart;
                  if(!data.length){
                    var dataTabla = [];
                    dataTabla.push(response);
                    var oModel = new sap.ui.model.json.JSONModel(dataTabla);  
                    thes.byId("tbMseg").setModel(oModel);
                  }else{
                    data.push(response);
                  }
                  
                  thes.byId("tbMseg").getModel().refresh();
                  
                },
                error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(thrownError);
                }
              });
      }

        var cant = this.byId("tbMseg").getModel().getData().length - 1;

        //thes.byId("tbMseg").getItems()[cant].getCells()[0].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[1].setEditable(true);
        //thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[2].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[3].setEditable(true);
        //thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[4].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[5].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[6].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[7].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[8].setEditable(true);
        //thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[9].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[10].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[11].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[12].setEditable(true);
        thes.byId("tbMseg").mAggregations.rows[cant].mAggregations.cells[13].setEditable(true);
    

    },
    cargarMseg: function(thes){ 

      var thes = this;
      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._mblnr = sessionStorage.mblnr; 
      data._mjahr = sessionStorage.mjahr;

      $.ajax({
        data:  data,
        url:   '/erp/model/LOGISTICA/ListarMseg.php',
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("tbMseg").setModel(oModel);

        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    onDelete: function(oEvent){

       var thes = this;     
      var datosTabla = this.byId("tbMseg").getModel().getData();   
      var selectData = this.byId("tbMseg").getSelectedIndices()
      var index;

      for (var i = selectData.length - 1;i >= 0; i--) {

        index = selectData[i];
        datosTabla.splice(index, 1);

      }

      this.byId("tbMseg").getModel().refresh();   
      this.byId("tbMseg").removeRow();


    },
    cargarClase:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._bwart = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarClase.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbClase");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarCentro:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._bukrs = ""; 
      data._werks = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarCentro.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbCentro");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarAlmacen:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._werks = sessionStorage.werks; 


      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarAlmacenXcentro.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbAlmacen");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    cargarMaterial: function(thes){
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._matnr = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/ListarMaterialSolo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbMaterial");
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
    changing: function(oEvent){

      var thes = this;
      var unidadMedida;
      var valor = oEvent.oSource.getValue();
      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._matnr = valor; 

      $.ajax({
        data:  data,
        url:   '/erp/model/ListarMaterialSolo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response); 
          unidadMedida = response[0].meins;
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

      var id = oEvent.mParameters.id;
      var descrip = oEvent.mParameters.selectedItem.mProperties.additionalText;
      var dataTable = thes.byId("tbMseg").getModel().getData();
      var ultimo = dataTable.length - 1;

      for (var i = 0 ; i <= ultimo; i++) {

        if (dataTable[i]['matnr'] == valor){
   
          thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[2].setValue(descrip);
          thes.byId("tbMseg").mAggregations.rows[i].mAggregations.cells[4].setValue(unidadMedida);
              
        }
      }
    },
    print: function(oEvent){

      var thes = this;

      var codigo = thes.byId("codigoDoc").getValue();

      if (codigo != "") {

        var mblnr = sessionStorage.mblnr;
        var mjahr = sessionStorage.mjahr;
        var empresa = sessionStorage.empresa;

        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_mblnr" : sessionStorage.mblnr,
          "_mjahr" : sessionStorage.mjahr,
          "_empresa": sessionStorage.empresa                      
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/LOGISTICA/GenerarPdf.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) { 
            window.open('../erp/model/LOGISTICA/GenerarPdf.php?mblnr='+ mblnr +'&mjahr='+ mjahr + '&empresa='+empresa, "_blank", "width= 200, height=150");
          //window.open(response, "_blank", "width= 200, height=150");
          //window.open("../erp/model/LOGISTICA/GenerarPdf.php", "_blank", "width= 200, height=150");                          

            
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

      }

    },
    changingCentro: function(oEvent){

      var thes = this;

      var valor = oEvent.oSource.getValue();

      sessionStorage.werks = valor;

      this.cargarAlmacen(thes);

      thes.byId("migo01").getModel().refresh();

    },
    changingClase: function(oEvent){

      var thes = this;

      var valor = oEvent.oSource.getValue();

      var aditional = oEvent.mParameters.selectedItem.mProperties.additionalText;

      var newText = valor + " - " + aditional;

      this.byId("documentoMaterial").setValue(newText);

      if (valor == '102') {

        thes.byId("lblCentroDestino").setVisible(true);
        thes.byId("cbxCentroDestino").setVisible(true);
        thes.byId("lblAlmacenDestino").setVisible(true);
        thes.byId("cbxAlmacenDestino").setVisible(true);

      } else {

        thes.byId("lblCentroDestino").setVisible(false);
        thes.byId("cbxCentroDestino").setVisible(false);
        thes.byId("lblAlmacenDestino").setVisible(false);
        thes.byId("cbxAlmacenDestino").setVisible(false);
      }

    }
});
});
