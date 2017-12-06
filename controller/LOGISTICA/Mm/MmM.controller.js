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
		return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.MmM", {

			onInit: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("mmM").attachPatternMatched(this._onObjectMatched, this);

			},

			_onObjectMatched: function (oEvent) {

				var Matnr = sessionStorage.Matnr;
				var Werks = sessionStorage.Werks;

				var thes = this;

				var cnx = JSON.parse(ConexionGlobal);

				var parametros = {
					"_Ip" : cnx[0].ip,
					"_Usuario_servidor" : cnx[0].usuario_servidor,
					"_Pass_servidor" : cnx[0].pass_servidor,
					"_Base_datos" : cnx[0].base_datos,
					"_matnr" : Matnr,
					"_werks" : Werks
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
						thes.byId("mmm").setModel(oModel);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});
			},

			onBack: function(oEvent){
				sessionStorage.removeItem('Matnr');
				this.getRouter().navTo("mm02");
			},

			onSave: function(oEvent){
				var cnx = JSON.parse(ConexionGlobal);
				var data = this.byId("mmm").getModel().getData();
				data._IP = cnx[0].ip;
				data._Usuario_servidor = cnx[0].usuario_servidor;
				data._Base_datos = cnx[0].base_datos;
				data._Pass_servidor = cnx[0].pass_servidor;
				var cnx = JSON.parse(ConexionGlobal);				

				$.ajax({
					data:  data,
					url:   '/erp/model/ActualizarMaterial.php', 
					type:  'post',
					async: false,
					beforeSend: function () {
					},
					success:  function (response) {     
						sap.m.MessageToast.show("Se guardaron los cambios");
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
			}
		});
	});