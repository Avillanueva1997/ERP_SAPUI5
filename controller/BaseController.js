sap.ui.define([
	"sap/ui/core/mvc/Controller",
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
            widthCamp[result[i].campo] = result[i].longitud + 'em';
            i++;
          }
          var oModel  = new sap.ui.model.json.JSONModel(longCamp); 
          var oModel2 = new sap.ui.model.json.JSONModel(widthCamp); 
          thes.byId(nameModel).setModel(oModel,long);   
          thes.byId(nameModel).setModel(oModel2,width);  
            
            
        }

//		onNavBack: function (oEvent) {
//			var oHistory, sPreviousHash;
//
//			oHistory = History.getInsu01nce();
//			sPreviousHash = oHistory.getPreviousHash();
//
//			if (sPreviousHash !== undefined) {
//				window.history.go(-1);
//			} else {
//				this.getRouter().navTo("login", {}, true /*no history*/);
//			}
//		}

	});

});
