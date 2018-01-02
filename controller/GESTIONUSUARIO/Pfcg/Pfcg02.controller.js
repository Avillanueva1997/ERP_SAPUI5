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
   return BaseController.extend("sap.ui.su01.controller.GESTIONUSUARIO.Pfcg.Pfcg02", {

       onInit: function(oEvent) {
       },
       
       onBack: function(oEvent){
          this.byId("ipRol").setValue("");
          this.getRouter().navTo("home");
       },
       
       onEdit: function(oEvent){

          if(this.byId("ipRol").getValue() === ""){
            MessageToast.show("Ingresar Rol");
            return;
          }

          this.getRouter().navTo("pfcgM");
       },
       
       onDelete: function(oEvent){
        var that = this;
        
        if(this.byId("ipRol").getValue() === ""){
          MessageToast.show("Ingresar Rol");
          return;
        }

        var dialog = new Dialog({
				title: 'Confirmación',
				type: 'Message',
				content: new Text({ text: 'Desea eliminar el Rol?' }),
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