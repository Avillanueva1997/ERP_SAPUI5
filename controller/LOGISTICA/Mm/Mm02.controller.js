var ConexionGlobal = sessionStorage.ConexionGlobal;

sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast",
 "sap/m/Dialog",
 "sap/m/Button",
 "sap/m/Text",
 "sap/m/Label",
 "sap/m/Input"
 ], function (BaseController, JSONModel,MessageToast,Dialog,Button,Text,Label,Input) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.Mm02", {

     onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mm02").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarMaterial(thes);
      this.cargarCentro(thes);
      this.cargarAlmacen(thes);

     },

     onBack: function(oEvent){
       this.getRouter().navTo("home");
     },
     onHome: function(oEvent) {
     this.getRouter().navTo("home");
     },

     onEdit: function(oEvent){

      var matnr = this.byId("inpMatnr").getValue();
      var werks = this.byId("inpWerks").getValue();
      var lgort = this.byId("idAlmacen").getValue();

    if (matnr == "") {

      sap.m.MessageToast.show("Seleccione Material");


    }else if(matnr != "" && werks == "" && lgort == ""){

      var thes = this;
      var cnx = JSON.parse(ConexionGlobal);

      var parametros = {
        "_Ip" : cnx[0].ip,
        "_Usuario_servidor" : cnx[0].usuario_servidor,
        "_Pass_servidor" : cnx[0].pass_servidor,
        "_Base_datos" : cnx[0].base_datos,
        "_Matnr" : matnr
      };

      $.ajax({
        data:  parametros,
        url:   '/erp/model/ValidarMaterialSolo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {                           
          if (response != "") {      
            sessionStorage.matnr = matnr;
            sessionStorage.werks = werks;      
            sessionStorage.lgort = lgort; 
            thes.getRouter().navTo("mmM");
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });    


    }else if(matnr != "" && werks != "" && lgort == ""){

      var thes = this;
      var cnx = JSON.parse(ConexionGlobal);

      var parametros = {
        "_Ip" : cnx[0].ip,
        "_Usuario_servidor" : cnx[0].usuario_servidor,
        "_Pass_servidor" : cnx[0].pass_servidor,
        "_Base_datos" : cnx[0].base_datos,
        "_Matnr" : matnr,
        "_Werks" : werks
      };

      $.ajax({
        data:  parametros,
        url:   '/erp/model/ValidarMaterial.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {                           
          if (response == 1) {      
            sap.m.MessageToast.show("Se creo un nuevo registro");
            sessionStorage.matnr = matnr;
            sessionStorage.werks = werks;      
            sessionStorage.lgort = lgort; 
            thes.getRouter().navTo("mmM");
          } else{

            sessionStorage.matnr = matnr;
            sessionStorage.werks = werks;      
            sessionStorage.lgort = lgort; 
            thes.getRouter().navTo("mmM");

          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });          
      

    } else if(matnr != "" && werks != "" && lgort != ""){

      var thes = this;
      var cnx = JSON.parse(ConexionGlobal);

      var parametros = {
        "_Ip" : cnx[0].ip,
        "_Usuario_servidor" : cnx[0].usuario_servidor,
        "_Pass_servidor" : cnx[0].pass_servidor,
        "_Base_datos" : cnx[0].base_datos,
        "_Matnr" : matnr,
        "_Werks" : werks,
        "_Lgort" : lgort
      };

      $.ajax({
        data:  parametros,
        url:   '/erp/model/ValidarMaterialCompleto.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {                           
          if (response == 1) {
            sap.m.MessageToast.show("Se creo un nuevo registro");
            sessionStorage.matnr = matnr;
            sessionStorage.werks = werks;      
            sessionStorage.lgort = lgort; 
            thes.getRouter().navTo("mmM");
          } else {

            sessionStorage.matnr = matnr;
            sessionStorage.werks = werks;      
            sessionStorage.lgort = lgort; 
            thes.getRouter().navTo("mmM");
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });        


    }



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
  cargarCentro: function(thes){
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
    cargarAlmacen: function(thes){
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._bukrs = ""; 
      data._werks = ""; 
      data._lgort = "";

      $.ajax({
        data:  data,
        url:   '/erp/model/SPRO/ListarAlmacen.php', 
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

onDelete: function(oEvent){

  var Matnr = this.byId("inpMatnr").getSelectedKey();
  var Werks = this.byId("inpWerks").getSelectedKey();
//        var Werks = "";

if (Matnr != "") {

  var thes = this;
  var cnx = JSON.parse(ConexionGlobal);

  var parametros = {
    "_Ip" : cnx[0].ip,
    "_Usuario_servidor" : cnx[0].usuario_servidor,
    "_Pass_servidor" : cnx[0].pass_servidor,
    "_Base_datos" : cnx[0].base_datos,
    "_Matnr" : Matnr,
    "_Werks" : Werks            
  };

  $.ajax({
    data:  parametros,
    url:   '/erp/model/ValidarMaterial.php', 
    type:  'post',
    async: false,
    beforeSend: function () {
    },
    success:  function (response) {                           
      if (response=="") {
        sap.m.MessageToast.show("El material ingresado no existe");
      }else{          
        var dialog = new Dialog({
          title: 'Confirmación',
          type: 'Message',
          content: new Text({ text: '¿Desea eliminar el material?' }),
          beginButton: new Button({
            text: 'Confirmar',
            press: function () {
              dialog.close();
              $.ajax({
                        data:  parametros,
                        url:   '/erp/model/EliminarMaterial.php', 
                        type:  'post',
                        async: false,
                        beforeSend: function () {
                        },
                        success:  function (response) {
                          if (response == "1") {
                            sap.m.MessageToast.show("Se elimino con exito!"); 
                          }else{
                            sap.m.MessageToast.show("No se elimino: " + response); 
                          }
                          
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                        }
                      }); 
            }
          }),
          endButton: new Button({
            text: 'Cancelar',
            press: function () {
              dialog.close();
            }
          }),
          afterClose: function() {
            dialog.destroy();
          }
        });

        dialog.open();
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });              
}else{
  sap.m.MessageToast.show("Ingrese todos los campos");
}        

}

});
 });