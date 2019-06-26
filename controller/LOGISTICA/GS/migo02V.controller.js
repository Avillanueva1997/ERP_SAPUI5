var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast"
 ], function (BaseController, JSONModel, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.GS.migo02V", {

    onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("migo02V").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;


    $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/entidades/mseg.json', 
                      type:  'post',
                      async: false,
                      success:  function (response) {
                          var oModel = new sap.ui.model.json.JSONModel(response); 
                          thes.byId("migo02v").setModel(oModel);                               
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
                thes.propiedadesInput(thes,response,"migo02v","mseg");
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
                          thes.byId("migo02v").setModel(oModel);                               
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
                thes.propiedadesInput(thes,response,"migo02v","mkpf");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

      //var oModel = new sap.ui.model.json.JSONModel(); 
      //thes.byId("tbMseg").setModel(oModel);

      var mblnr = sessionStorage.mblnr;

      var cnx = JSON.parse(ConexionGlobal);

      var parametros = {
        "_Ip" : cnx[0].ip,
        "_Usuario_servidor" : cnx[0].usuario_servidor,
        "_Pass_servidor" : cnx[0].pass_servidor,
        "_Base_datos" : cnx[0].base_datos,
        "_mblnr" : mblnr           
      };


       $.ajax({
        data:  parametros,
        url:   '/erp/model/LOGISTICA/ListarMkpf.php',
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
          response = JSON.parse(response);   
          response = response[0];
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.byId("migo02v").setModel(oModel);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

       var year = thes.byId('year').getValue();

       sessionStorage.mjahr = year;

       parametros._mjahr = sessionStorage.mjahr;

       

       $.ajax({
        data:  parametros,
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

      var datosTabla =  thes.byId("tbMseg").getModel().getData();

      var claseMov = datosTabla[0]['bwart'];

      sessionStorage.bwart = claseMov;

      var centro = datosTabla[0]['werks'];

      var almacen = datosTabla[0]['lgort'];

      var centroDestino = datosTabla[0]['umwrk'];
      var almacenDestino = datosTabla[0]['umlgo'];

      thes.byId("documentoMaterial").setValue(claseMov);
      thes.byId("cbxCentro").setValue(centro);
      thes.byId("cbxAlmacen").setValue(almacen);

      if (claseMov == '101' || claseMov == '102' ) {

        thes.byId("lblCentroDestino").setVisible(true);
        thes.byId("cbxCentroDestino").setVisible(true);
        thes.byId("lblAlmacenDestino").setVisible(true);
        thes.byId("cbxAlmacenDestino").setVisible(true);

        thes.byId("cbxCentroDestino").setValue(centroDestino);
        thes.byId("cbxAlmacenDestino").setValue(almacenDestino);
    
      }    

      
   },
    onBack: function(oEvent) {
     this.getRouter().navTo("migo02");
     this.clearModel("migo02v");
   },
    onHome: function(oEvent) {
     this.getRouter().navTo("home");
   },
   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },

   onSave: function(oEvent){

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
    anular: function(oEvent){

    var thes = this;

    var cnx = JSON.parse(ConexionGlobal);
    var data = {};
    data._Ip = cnx[0].ip;
    data._Usuario_servidor = cnx[0].usuario_servidor;
    data._Base_datos = cnx[0].base_datos;
    data._Pass_servidor = cnx[0].pass_servidor; 
    data._bwart = sessionStorage.bwart; 

    $.ajax({
      data:  data,
      url:   '/erp/model/SPRO/ListarClase.php', 
      type:  'post',
      async: false,
      beforeSend: function () {
      },
      success:  function (response) {
        response = JSON.parse(response); 
        sessionStorage.movRef = response[0].movRef;   
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });

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
          sessionStorage.mblnrN = mblnr;
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });


    var datosTabla = thes.byId("tbMseg").getModel().getData();
    var inf = thes.byId("migo02v").getModel().getData();
    data._Tabla = 'mseg';

    var ultimo = datosTabla.length - 1;

    for (var i = 0; i <= ultimo; i++) {

      datosTabla[i]['mblnr'] = sessionStorage.mblnrN;

      datosTabla[i]['bwart'] = sessionStorage.movRef;
   
    }
    

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

           var mkpf = {
                      "para":[],
                      "data":[]
                      };

          inf["mblnr"] = sessionStorage.mblnrN;
          inf["xblnr"] = sessionStorage.mblnr;
              

                      mkpf.para.push(data);
                      mkpf.data.push(inf);


                      $.ajax({
                            data:  mkpf,
                            url:   '/erp/model/LOGISTICA/InsertarMkpf.php', 
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

                      sap.m.MessageToast.show("Se anulo correctamente.");

  
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

    }
});
 });