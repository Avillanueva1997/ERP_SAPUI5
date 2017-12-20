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
		return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME12", {

			onInit: function(oEvent) {
			},

			onBack: function(oEvent) {
				this.getRouter().navTo("home");
			},

			onEdit: function(oEvent){

				var Infnr = this.byId("iptReginfo").getValue();
				
				if (Infnr != "") {

					var thes = this;
					var cnx = JSON.parse(ConexionGlobal);

					var parametros = {
						"_Ip" : cnx[0].ip,
						"_Usuario_servidor" : cnx[0].usuario_servidor,
						"_Pass_servidor" : cnx[0].pass_servidor,
						"_Base_datos" : cnx[0].base_datos,
						"_Infnr" : Infnr           
					};

					$.ajax({
						data:  parametros,
						url:   '/erp/model/ValidarRegistroinfo.php', 
						type:  'post',
						async: false,
						beforeSend: function () {
						},
						success:  function (response) {                           
							if (response=="") {
								sap.m.MessageToast.show("El registro info ingresado no existe");
							}else{
								sessionStorage.Infnr = Infnr;       
								thes.getRouter().navTo("me12m");
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
			},

			onDelete: function(oEvent){

				var Infnr = this.byId("iptReginfo").getValue();
				
				if (Infnr != "") {

					var thes = this;
					var cnx = JSON.parse(ConexionGlobal);

					var parametros = {
						"_Ip" : cnx[0].ip,
						"_Usuario_servidor" : cnx[0].usuario_servidor,
						"_Pass_servidor" : cnx[0].pass_servidor,
						"_Base_datos" : cnx[0].base_datos,
						"_Infnr" : Infnr           
					};

					$.ajax({
						data:  parametros,
						url:   '/erp/model/ValidarRegistroinfo.php', 
						type:  'post',
						async: false,
						beforeSend: function () {
						},
						success:  function (response) {                           
							if (response=="") {
								sap.m.MessageToast.show("El registro info ingresado no existe");
							}else{
								var dialog = new Dialog({
									title: 'Confirmación',
									type: 'Message',
									content: new Text({ text: 'Desea eliminar el registro info?' }),
									beginButton: new Button({
										text: 'Confirmar',
										press: function () {
											dialog.close();

											$.ajax({
												data:  parametros,
												url:   '/erp/model/EliminarRegistroinfo.php', 
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
			}
		});
	});