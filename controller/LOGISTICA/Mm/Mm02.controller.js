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
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.Mm.Mm02", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("home");
       },
       
       onEdit: function(oEvent){

        var Matnr = this.byId("inpMatnr").getValue();

        if (Matnr != "") {
          sessionStorage.Matnr = Matnr;
          this.getRouter().navTo("mmm");
        }else{
          sap.m.MessageToast.show("Ingrese el nombre de usuario que desea modificar");
        }

       },
       
       onDelete: function(oEvent){
        var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: '¿Desea eliminar el material?' }),
				beginButton: new Button({
					text: 'Confirmar',
					press: function () {
						dialog.close();
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