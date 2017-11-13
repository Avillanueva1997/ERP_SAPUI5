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
   return BaseController.extend("sap.ui.su01.controller.GESTIONUSUARIO.Pfcg.Pfcg01", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent){
           this.getRouter().navTo("home");
       },
       
       onNew: function(oEvent){
           this.getRouter().navTo("pfcgC");
       },
       
       onCopy: function(oEvent){           
           var that = this;
           var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: 'Desea copiar el usuario?' }),
				beginButton: new Button({
					text: 'Confirmar',
					press: function () {
						that.getRouter().navTo("pfcgC");
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