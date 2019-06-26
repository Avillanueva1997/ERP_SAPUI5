var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
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
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.GS.migo02", {

     onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("migo02").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {

      var thes = this;
      this.cargarCodigo(thes);


     },
    cargarCodigo:function(thes){   
      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 
      data._mblnr = ""; 

      $.ajax({
        data:  data,
        url:   '/erp/model/LOGISTICA/ListarMkpf.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {
          response = JSON.parse(response); 
          var oModel = new sap.ui.model.json.JSONModel(response);  
          thes.getView().setModel(oModel,"cbMigo");    
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

    },
     onBack: function(oEvent) {
       this.getRouter().navTo("home");
    },
     onHome: function(oEvent) {
      this.getRouter().navTo("home");      
    },

     onDisplay: function(oEvent){

      var mblnr = this.byId("iptCodigo").getSelectedKey();

      if (mblnr != "") {

        var thes = this;
        var cnx = JSON.parse(ConexionGlobal);

        var parametros = {
          "_Ip" : cnx[0].ip,
          "_Usuario_servidor" : cnx[0].usuario_servidor,
          "_Pass_servidor" : cnx[0].pass_servidor,
          "_Base_datos" : cnx[0].base_datos,
          "_mblnr" : mblnr,                      
        };

        $.ajax({
          data:  parametros,
          url:   '/erp/model/LOGISTICA/ValidarCodigo.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {                           
            if (response=="") {
              sap.m.MessageToast.show("El código ingresado no existe");
            }else{
              sessionStorage.mblnr = mblnr;      
              thes.getRouter().navTo("migo02V");
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });              
      }else{
        MessageToast.show("Complete todos los campos");
      } 
    }
    /*,

    onDelete: function(oEvent){

      var mblnr = this.byId("iptCodigo").getSelectedKey();


      if (mblnr != "") {

        var thes = this;
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
          url:   '/erp/model/LOGISTICA/ValidarCodigo.php', 
          type:  'post',
          async: false,
          beforeSend: function () {
          },
          success:  function (response) {                           
            if (response=="") {
              sap.m.MessageToast.show("El código ingresado no existe");
            }else{

              var dialog = new Dialog({
                title: 'Confirmación',
                type: 'Message',
                content: new Text({ text: '¿Desea eliminar el código?' }),
                beginButton: new Button({
                  text: 'Confirmar',
                  press: function () {
                    dialog.close();

                    $.ajax({
                      data:  parametros,
                      url:   '/erp/model/LOGISTICA/EliminarMkpf.php', 
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
        MessageToast.show("Complete todos los campos");
      } 
    }*/
  });
});