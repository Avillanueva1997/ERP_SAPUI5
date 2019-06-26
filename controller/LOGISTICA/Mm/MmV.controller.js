var ConexionGlobal = sessionStorage.ConexionGlobal;

sap.ui.define([
	"sap/ui/su01/controller/BaseController"
	], function (BaseController) {
		"use strict";
		return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.MmV", {

			onInit: function(oEvent){

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("mmV").attachPatternMatched(this._onObjectMatched, this);
      
    },

    _onObjectMatched: function(oEvent) {
				var thes = this;

				var matnr = sessionStorage.Matnr;
       			var werks = sessionStorage.Werks;	

				var cnx = JSON.parse(ConexionGlobal);

				var parametros = {
					"_Ip" : cnx[0].ip,
					"_Usuario_servidor" : cnx[0].usuario_servidor,
					"_Pass_servidor" : cnx[0].pass_servidor,
					"_Base_datos" : cnx[0].base_datos,
					"_matnr" : matnr,
					"_werks" : werks
				};

				$.ajax({
					data:  parametros,
					url:   '/erp/model/ListarMaterial.php', 
					type:  'post',
					async: false,
					beforeSend: function () {
					},
					success:  function (response) {     
						response = JSON.parse(response);   
						response = response[0];
						var oModel = new sap.ui.model.json.JSONModel(response);  
						thes.byId("mmv").setModel(oModel);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});

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
                          thes.propiedadesInput(thes,response,"mmv","mara");
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
                          thes.propiedadesInput(thes,response,"mmv","marc");
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
                          thes.propiedadesInput(thes,response,"mmv","mlan");
                      },
                      error: function (xhr, ajaxOptions, thrownError) {
                          alert(xhr.status);
                          alert(thrownError);
                      }
                  });
			},

			onBack: function(oEvent){
				this.getRouter().navTo("mm03");
                this.clearModel("mmv");
			},
      onHome: function(oEvent) {
        this.getRouter().navTo("home");
      }

		});
	});