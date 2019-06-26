sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("sap.ui.su01.controller.BaseController", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
        
        clearModel : function(nameModel){
            var data = this.byId(nameModel).getModel().getData();
            var propiedades = Object.keys(this.byId(nameModel).getModel().getData());
            var i = 0;
            while (i < propiedades.length) {

                data[propiedades[i]] = "";

                i++;
            }
            this.byId(nameModel).getModel().refresh();
        },
        
        propiedadesInput: function(thes,response,nameModel,tabla){
            
          var long  = tabla + "Length";
          var width = tabla + "Width";
            
          var result = JSON.parse(response);
          var i = 0;
          var longCamp = {};
          var widthCamp = {};
          while(i < result.length){
            longCamp[result[i].campo] = Number(result[i].longitud);
            widthCamp[result[i].campo] = result[i].maxLongitud + 'em';
            i++;
          }
          var oModel  = new sap.ui.model.json.JSONModel(longCamp); 
          var oModel2 = new sap.ui.model.json.JSONModel(widthCamp); 
          thes.byId(nameModel).setModel(oModel,long);   
          thes.byId(nameModel).setModel(oModel2,width);  
            
            
        },
       eliminarStorage: function(thes){

           var thes = this;
           thes.location.reload();
           sessionStorage.clear();

        },
        onPress: function(oEvent) {

           var thes = this;

           thes.getRouter().navTo("login");

           if (thes.getRouter().navTo("login")) {

            thes.eliminarStorage(thes);

           } 
        },
        validacionN: function(oEvent){

          var valor = oEvent.oSource.getValue();

          var n = valor.length - 1;

          var ultimo = valor.substr(n)

          var regex = new RegExp("[0-9]");

              if (!regex.test(ultimo)){

              sap.m.MessageToast.show ("Solo se permite números", {
              my: sap.ui.core.Popup.Dock.CenterCenter,
              at: sap.ui.core.Popup.Dock.CenterCenter});

              var erase = valor.slice(0,-1);

              oEvent.oSource.setValue(erase);
              }
        },
        validacionF: function(oEvent){

          var valor = oEvent.oSource.getValue();

          var n = valor.length - 1;

          var ultimo = valor.substr(n)

          var regex = new RegExp("^([0-9])*[.]?[0-9]*$");

              if (!regex.test(valor)){

              sap.m.MessageToast.show ("Solo se permite números", {
              my: sap.ui.core.Popup.Dock.CenterCenter,
              at: sap.ui.core.Popup.Dock.CenterCenter});

              var erase = valor.slice(0,-1);

              oEvent.oSource.setValue(erase);
              }
        },
        validarCbx: function(oEvent){

          var valor = oEvent.oSource.mProperties.selectedKey; 

          var long = oEvent.oSource._oList.mAggregations.items.length - 1;

          var result = [];

          var erase  = "";

          for (var i = 0; i <= long; i++) {
            if (oEvent.oSource._oList.mAggregations.items[i].mProperties.key == valor ) {


              result[i] = 0;  
              
              
            } else {

             result[i] = 1;

            }


          }

          function isBelowThreshold(currentValue) {
                return currentValue == 1;
              }

              if (result.every(isBelowThreshold)){ 

                sap.m.MessageToast.show("Ingrese un dato válido!");

                oEvent.oSource.setValue(erase);

        }

      }
	});

});
