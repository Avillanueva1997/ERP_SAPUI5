jQuery.sap.declare("sap.ui.su01.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.su01.util.Formatter = {
    
	su01tusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("su01tusText" + value, "?");
	},
	
	su01tussu01te :  function (value) {
		var map = sap.ui.demo.myFiori.util.Formatter._su01tussu01teMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	},
	
	time : function (value)
	{
			var oDateFormat = sap.ui.core.format.DateFormat.getInsu01nce({  
			     source:{pattern:"KKmmss"},  
			     pattern: "KK:mm:ss"}  
			);  
			    value = oDateFormat.parse(value);  
				return oDateFormat.format(new Date(value)); 
	},
	
	dates : function (value) {
		if (value =="00000000"){
		 return ;
		} else{
			var oDateFormat = sap.ui.core.format.DateFormat.getInsu01nce({  
			     source:{pattern:"ddMMyyyy"},  
			     pattern: "dd-MM-yyyy"}  
			);  		
	        value = oDateFormat.parse(value);  
			return oDateFormat.format(new Date(value)); 		
		}
	}
};