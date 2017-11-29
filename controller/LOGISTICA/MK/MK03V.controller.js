var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK03V", {

       onInit: function(oEvent) {

           var thes = this;

           var cnx = JSON.parse(ConexionGlobal);

           var parametros = {
              "_Ip" : cnx[0].ip,
              "_Usuario_servidor" : cnx[0].usuario_servidor,
              "_Pass_servidor" : cnx[0].pass_servidor,
              "_Base_datos" : cnx[0].base_datos,
              "_lifnr" : "1000000001",
              "_ekorg" : "aaaa"            
           };

           $.ajax({
                      data:  parametros,
                      url:   '/erp/model/ListarLfa1.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {        
                          /*response = JSON.parse(response);                        
                          var oModel = new sap.ui.model.json.JSONModel(response);  
                          thes.getView().setModel(oModel);*/
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

             $.ajax({
                      data:  parametros,
                      url:   '/erp/model/ListarLfbk.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {
                          /*response = JSON.parse(response);                        
                          var oModel = new sap.ui.model.json.JSONModel(response);  
                          thes.getView().setModel(oModel);*/
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

               $.ajax({
                      data:  parametros,
                      url:   '/erp/model/ListarLfm1.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {
                          /*response = JSON.parse(response);                        
                          var oModel = new sap.ui.model.json.JSONModel(response);  
                          thes.getView().setModel(oModel);*/
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
       
       onPressEnter: function(oEvent) {
           MessageToast.show("Button pressed");
       },
   });
});