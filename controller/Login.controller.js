/*var urlGlobal = 'http://cstisrvides.csticorp.biz:8800/sap/bc/zsw_su01?sap-client=800';
sessionStorage.urlGlobal = urlGlobal;*/

jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.define([
   "sap/ui/su01/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.Login", {

       onInit: function(oEvent) {       

              var thes = this; 

              $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/entidades/login.json', 
                      type:  'post',
                      async: false,
                      success:  function (response) {
                          var oModel = new sap.ui.model.json.JSONModel(response); 
                          thes.byId("sfLogin").setModel(oModel);                               
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });             
              
              $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/ListarEmpresas.php', 
                      type:  'post',
                      async: false,
                      success:  function (response) {                        
                          response = JSON.parse(response);
                          var oModel = new sap.ui.model.json.JSONModel(response);   
                          thes.byId("cmbEmpresas").setModel(oModel,"cbEmpresas");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });                     
       },               
              
       onPressAcceder: function(oEvent){       

           var data = this.byId("sfLogin").getModel().getData();
           var flg = 0;

           var parametros = {
               "_Empresa" : data.empresa,
               "_Usuario" : data.usuario,
               "_Password" : data.contrasenia
           };

           $.ajax({
                      data:  parametros,
                      url:   '/erp/model/Login.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {
                        flg = response;
                        //alert(response);
                          /*response = JSON.parse(response);
                          var oModel = new sap.ui.model.json.JSONModel(response);   
                          thes.byId("cmbEmpresas").setModel(oModel);*/
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

           if (flg == 0) {            
            sap.m.MessageToast.show("Login incorrecto");
           }else{

            var parametros = {
               "_Empresa" : data.empresa            
            };

            $.ajax({
                      data:  parametros,
                      url:   '/erp/model/GetCadenaConexion.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {                          
                          sessionStorage.ConexionGlobal = response;
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

            data.empresa = "";
            data.usuario = "";
            data.contrasenia = "";

            this.byId("sfLogin").getModel().refresh();
            this.getRouter().navTo("home");
           }                        
           
       },
       
       onPressLimpiar: function(oEvent) {

          var data = this.byId("sfLogin").getModel().getData();
                     
          data.empresa = "";
          data.usuario = "";
          data.contrasenia = "";

          this.byId("sfLogin").getModel().refresh();

          sap.m.MessageToast.show("Se limpió");
           
       },      

   });
});
