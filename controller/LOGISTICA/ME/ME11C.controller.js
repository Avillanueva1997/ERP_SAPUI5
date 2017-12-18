var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
 "sap/ui/su01/controller/BaseController",
 "sap/ui/model/json/JSONModel",
 "sap/m/MessageToast"
 ], function (BaseController, JSONModel, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME11C", {

     onInit: function(oEvent) {

      var thes = this; 

      $.ajax({
          //data:  parametros,
          url:   '/erp/model/entidades/registroinfo.json', 
          type:  'post',
          async: false,
          success:  function (response) {
            var oModel = new sap.ui.model.json.JSONModel(response); 
            thes.byId("me11c").setModel(oModel);                               
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }
        });

    },
    
    onBack: function(oEvent) {
     this.getRouter().navTo("me11");
     this.clearModel("me11c");
   },
   
   onPressEnter: function(oEvent) {
     MessageToast.show("Button pressed");
   },

   onSave: function(oEvent){   
    

    var registroinfo = this.byId("iptReginfo").getValue();

    if (registroinfo == "") {

      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = this.byId("me11c").getModel().getData();
      data._Ip = cnx[0].ip;
      data._Usuario_servidor = cnx[0].usuario_servidor;
      data._Base_datos = cnx[0].base_datos;
      data._Pass_servidor = cnx[0].pass_servidor; 

      $.ajax({
        data:  data,
        url: '/erp/model/InsertarRegistroinfo.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {     
          data.infnr = response;
          thes.byId("me11c").getModel().refresh();
          sap.m.MessageToast.show("Se creó el registro info: " +  response );
            /*response = JSON.parse(response);   
            response = response[0];
            var oModel = new sap.ui.model.json.JSONModel(response);  
            thes.byId("mmm").setModel(oModel);*/
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          }

        });
    }else{
      sap.m.MessageToast.show("El registro info ya está creado");
    }

  }

});
 });