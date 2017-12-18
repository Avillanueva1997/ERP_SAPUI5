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
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.MmC", {

       onInit: function(oEvent) {

       	var thes = this; 

              $.ajax({
                      //data:  parametros,
                      url:   '/erp/model/entidades/material.json', 
                      type:  'post',
                      async: false,
                      success:  function (response) {
                          var oModel = new sap.ui.model.json.JSONModel(response); 
                          thes.byId("mmc").setModel(oModel);                               
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
				data._tabla = "mara";	
           
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"mmc","mara");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
           
                data._tabla = "marc";	
                
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"mmc","marc");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
                
                data._tabla = "mlan";	
                
                $.ajax({
                      data:  data,
                      url:   '/erp/model/long_campo.php', 
                      type:  'post',
                      async: false,
                      beforeSend: function () {
                      },
                      success:  function (response) {    
                          thes.propiedadesInput(thes,response,"mmc","mlan");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });

       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("mm01");
           this.clearModel("mmc");
       },

       onSave: function(oEvent){

        var Material = this.byId("iptMaterial").getValue();

        if (Material == "") {
        var thes = this;
				var cnx = JSON.parse(ConexionGlobal);
				var data = this.byId("mmc").getModel().getData();
				data._Ip = cnx[0].ip;
				data._Usuario_servidor = cnx[0].usuario_servidor;
				data._Base_datos = cnx[0].base_datos;
				data._Pass_servidor = cnx[0].pass_servidor;	

				$.ajax({
					data:  data,
					url:   '/erp/model/InsertarMaterial.php', 
					type:  'post',
					async: false,
					beforeSend: function () {
					},
					success:  function (response) {     
            data.matnr = response;
            thes.byId("mmc").getModel().refresh();
						sap.m.MessageToast.show("Se creó el material: " +  response );
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
        sap.m.MessageToast.show("El material ya está creado");
      }
		}
       
   });
});