var urlGlobal = sessionStorage.urlGlobal;

jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([
   "sap/ui/su01/controller/BaseController",
   "sap/m/MessageToast"
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("sap.ui.su01.controller.LOGISTICA.MK.MK02", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent) {
           this.getRouter().navTo("home");
       },
       
       onEdit: function(oEvent){
           this.getRouter().navTo("mk02m");
       },
       
       onDelete: function(oEvent){
            var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: 'Desea eliminar el proveedor?' }),
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