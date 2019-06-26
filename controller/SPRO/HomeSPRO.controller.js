var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.SPRO.HomeSPRO", {

       onInit: function(oEvent) {

           var thes = this;

           var cnx = JSON.parse(ConexionGlobal);

           var parametros = {
              "_Ip" : cnx[0].ip,
              "_Usuario_servidor" : cnx[0].usuario_servidor,
              "_Pass_servidor" : cnx[0].pass_servidor,
              "_Base_datos" : cnx[0].base_datos            
           };

           $.ajax({
                      data:  parametros,
                      url:   '/erp/model/GetArbolSPRO.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {   
                          response = JSON.parse(response);                        
                          var oModel = new sap.ui.model.json.JSONModel(response);  
                          thes.getView().setModel(oModel);
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
       
       onPress: function(oEvent) {
           this.getRouter().navTo("login");
       },
       
       handleButtonPress: function(evt) {
            var oList = evt.getSource(),
				    oItem = evt.getParameter("listItem");
            var sPath = oItem.getBindingContext().getObject().vista;

            var tabla = oItem.getBindingContext().getObject().tabla;

            var tablaSesion = sessionStorage.setItem('tabla', tabla);

            if (sPath != null && sPath != '') {
              this.getRouter().navTo(sPath);
            }            				    
		},
       
   });
});