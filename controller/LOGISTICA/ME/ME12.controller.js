var ConexionGlobal = sessionStorage.ConexionGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
	"sap/ui/su01/controller/BaseController",
	"sap/m/MessageToast"
	], function (BaseController, MessageToast) {
		"use strict";
		return BaseController.extend("sap.ui.su01.controller.LOGISTICA.ME.ME12", {

			onInit: function(oEvent) {
			},

			onBack: function(oEvent) {
				this.getRouter().navTo("home");
			},

			onEdit: function(oEvent){

				var Infnr = this.byId("iptReginfo").getValue();
				var Ekorg = this.byId("iptOrgcomp").getValue();
				var Werks = this.byId("iptCentro").getValue();
				var Norm = this.byId("chkNormal").getSelected();
				var Subc = this.byId("chksubcont").getSelected();
				var Pip = this.byId("chkPipe").getSelected();
				var Cons = this.byId("chkCons").getSelected();
				var Esokz = "";

				switch(true){
					case Norm:
					Esokz = '0';
					break;
					case Subc:
					Esokz = '3';
					break;
					case Pip:
					Esokz = 'P';
					break;
					case Cons:
					Esokz = '2';
					break;
				}

				if (Infnr != "" && 
					Ekorg != "" && 
					Werks != "" && 
					Esokz != "") {

				var thes = this;
				var cnx = JSON.parse(ConexionGlobal);

				var parametros = {
					"_Ip" : cnx[0].ip,
					"_Usuario_servidor" : cnx[0].usuario_servidor,
					"_Pass_servidor" : cnx[0].pass_servidor,
					"_Base_datos" : cnx[0].base_datos,
					"_Werks" : Werks,            
					"_Ekorg" : Ekorg,
					"_Infnr" : Infnr,
					"_Esokz" : Esokz            
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
							sessionStorage.Ekorg = Ekorg;
							sessionStorage.Werks = Werks;
							sessionStorage.Esokz = Esokz;        
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
			var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: 'Desea eliminar el registro info?' }),
				beginButton: new Button({
					text: 'Confirmar',
					press: function () {
						dialog.close();
                        sap.m.MessageToast.show("Se elimino con exito!"); 
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
	});
	});