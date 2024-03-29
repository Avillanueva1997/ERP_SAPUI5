var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.Home", {

       onInit: function(oEvent) {

           var thes = this;
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.getRoute("home").attachPatternMatched(this._onObjectMatched, this);

           this.obtenerRol(thes);
           
       },      

       _onObjectMatched: function (oEvent) {

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
                      url:   '/erp/model/GetArbolTx.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {   
                          response = JSON.parse(response); 

                          if(sessionStorage.rol.toUpperCase() === "USUARIO"){
                            response[0].nodes.splice(0,2);
                          }

                          var oModel = new sap.ui.model.json.JSONModel(response);  
                          thes.getView().setModel(oModel);
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });


       },
       obtenerRol: function(thes){

      var thes = this;

      var cnx = JSON.parse(ConexionGlobal);
      var data = {};
      data._Empresa = sessionStorage.empresa; 
      data._Usuario = sessionStorage.usuario;
      data._Password = sessionStorage.contrasena;


      $.ajax({
        data:  data,
        url:   '/erp/model/ObtenerRol.php', 
        type:  'post',
        async: false,
        beforeSend: function () {
        },
        success:  function (response) {    
           sessionStorage.rol = response;  
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });      

       },

       onEnter: function(oEvent){
        this.onPressEnter();
        
       },

       onPressEnter: function(evt){

           var thes = this;

           var cnx = JSON.parse(ConexionGlobal);
           var _Trans = sap.ui.getCore().byId("__component0---viewHome--prueba--inpTx").getValue();
           var parametros = {
              "_Ip" : cnx[0].ip,
              "_Usuario_servidor" : cnx[0].usuario_servidor,
              "_Pass_servidor" : cnx[0].pass_servidor,
              "_Base_datos" : cnx[0].base_datos,
              "_Trans" : _Trans            
           };

        $.ajax({
                      data:  parametros,
                      url:   '/erp/model/GoTx.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {  
                          
                          if (response != "") {
                            thes.getRouter().navTo(response);
                          }else{
                            sap.m.MessageToast.show("Ingrese una transacción válida");
                          }
                          
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

       },
       
       handleButtonPress: function(evt) {
            var oList = evt.getSource(),
				    oItem = evt.getParameter("listItem");
            var sPath = oItem.getBindingContext().getObject().vista;

            if (sPath != null && sPath != '') {
              this.getRouter().navTo(sPath);
            }            				    
		},
    onBack: function(oEvent) {
      this.getRouter().navTo("home");      
    },
    onHome: function(oEvent) {
      this.getRouter().navTo("home");      
    }
       
   });
});