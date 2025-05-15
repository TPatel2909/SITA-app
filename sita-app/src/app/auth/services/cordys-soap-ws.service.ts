import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router';
// import {Http,RequestOptions,Headers} from '@angular/http';

import { AppUtil } from './apputil/app.util';
declare var jQuery:any;
import { environment } from '../../../environments/environment';


@Injectable()
export class CordysSoapWService {
	public static GATEWAY_URL:string = "http://192.168.0.179:81/home/nbk/com.eibus.web.soap.Gateway.wcp";
    public static ERROR=false;
    public static MODE="APP";
	
    constructor(private _router: Router){}
	
	public static setMode(mode:any){
		CordysSoapWService.MODE = mode;		
		jQuery.cordys.setMode(mode);
	}
	
	public static getMode(){
		return CordysSoapWService.MODE;
	}
	
	public static setGateWayURL(url:any){
		CordysSoapWService.GATEWAY_URL = url;
	}
	
	public static setGateWayURLWithSAML(){
		CordysSoapWService.setGateWayURL(CordysSoapWService.getGateWayURL()+"&SAMLart="+AppUtil.getCookieByName("defaultinst_SAMLart"));
	}
	
	public static clearSAMLFromGateWayURL(){
		let url = CordysSoapWService.getGateWayURL().split("&SAMLart=")[0];
		CordysSoapWService.setGateWayURL(url);
	}
	
	public static getGateWayURL(){
		return CordysSoapWService.GATEWAY_URL;
	}
  
    public callCordysSoapService(methodname:string,namespace:string,parameters:any,successHandler:any,errorHandler:any,isAsync:any,extraParams:any){
        let response = null;
		jQuery.cordys.json.defaults.removeNamespacePrefix=true;
        var compRef = this;
		if(CordysSoapWService.getGateWayURL() != null && CordysSoapWService.getGateWayURL() != "")
			response = this.fireCordysSoapService(methodname,namespace,parameters,successHandler,errorHandler,isAsync,extraParams,compRef);
		return 	response;
    }
	
	public fireCordysSoapService(methodname:string,namespace:string,parameters:any,successHandler:any,errorHandler:any,isAsync:any,extraParams:any,compRef:any){
		        // let saml = "";
                // if(environment.samlart){
                // saml=environment.samlart;
                // }
                // else{
                // saml = this.getCookieByName(environment.SAMLart);
                // }
        return jQuery.cordys.ajax({
            method: methodname,
            namespace: namespace,
            //url: CordysSoapWService.getGateWayURL(),
            url : environment.gatewayurl+"?SAMLart="+AppUtil.getCookieByName("defaultinst_SAMLart"),
            async:isAsync,
            parameters: parameters,
            success: function(data:any) {
                //console.log('Success Response received for the webservice call')
                if(successHandler)successHandler(data,extraParams);
                },
            error:function(response:any,status:any,errorText:any) {
                console.log('Error Response received for the webservice call');
                if(errorHandler)errorHandler(response,status,errorText,extraParams);
            }
        }).fail(function(error:any) { 
            var errorText = (error.responseText.indexOf("<SOAP:Envelope")==0)? error.responseText : error.responseText.substr(error.responseText.indexOf("<SOAP:Envelope"));
            var messCode = jQuery(errorText).find("cordys\\:messagecode").text();
            if (messCode.search(/Cordys.*(AccessDenied|Artifact_Unbound)/)>=0 || error.statusText === "Forbidden") {
                // login to Cordys with cookie reset is true
                let curRoute:any = compRef._router;
                let lastNavigationAttempt = curRoute.currentRouterState.snapshot.url;
                if((lastNavigationAttempt==null && lastNavigationAttempt.indexOf("#/login") == -1) || window.location.hash.indexOf("#/login") == -1)
                {
                    CordysSoapWService.ERROR=true;
                    if(window.location.href.indexOf("login") == -1){
                        compRef._router.navigate(["/login"]); 
                    }
                }
            }
        });
	}

    public responseResolver(data:any, businessObject:string) {
        return jQuery.map(jQuery.makeArray(data.tuple),function(tuple:any, index:any) {
            return tuple.old[businessObject];
        });
    }
    
    // public httpget(url: string) {
    //     return this._http.get(url).map(res => res.json());
    // }
	
	// public httppost(url:string,request,contentType:string){ 
	// 	let headers = new Headers({ 'Content-Type': contentType });
    //     let options = new RequestOptions({ headers: headers });
	// 	return this._http.post(url, request, options).map(res => res.json());
      
	// }
    public getCookieByName(cname:any) {
		let name = cname + "=";
		let allCookie = document.cookie.split(';');
		for (let eachCookie of allCookie) {
			while (eachCookie.charAt(0) == ' ') {
				eachCookie = eachCookie.substring(1);
			}
			if (eachCookie.indexOf(name) == 0) {
				return eachCookie.substring(name.length, eachCookie.length);
			}
		}
		return "";
  }


  /**New code */


  public callCordysSoapServiceNew(methodname: string, namespace: string, parameters: any, successHandler: any, errorHandler: any, isAsync: any, extraParams: any) {
    return new Promise((resolve, reject) => {
        jQuery.cordys.json.defaults.removeNamespacePrefix = true;
        var compRef = this;

        if (CordysSoapWService.getGateWayURL() != null && CordysSoapWService.getGateWayURL() != "") {
            this.fireCordysSoapServiceNew(methodname, namespace, parameters, isAsync, extraParams, compRef)
                .then((data: any) => {
                    if (successHandler) successHandler(data, extraParams);
                    resolve(data);
                })
                .catch((error: any) => {
                    if (errorHandler) errorHandler(error.response, error.status, error.errorText, extraParams);
                    reject(error);
                });
        }
    });
}

public fireCordysSoapServiceNew(methodname: string, namespace: string, parameters: any, isAsync: any, extraParams: any, compRef: any) {
    return new Promise((resolve, reject) => {
        return jQuery.cordys.ajax({
            method: methodname,
            namespace: namespace,
            url: environment.gatewayurl + "?SAMLart=" + AppUtil.getCookieByName("defaultinst_SAMLart"),
            async: isAsync,
            parameters: parameters,
            success: function (data: any) {
                if (data) {
                    resolve(data);
                }
            },
            error: function (response: any, status: any, errorText: any) {
                reject({ response, status, errorText });
            }
        }).fail(function (error: any) {
            // Handle other errors if needed
            var errorText = (error.responseText.indexOf("<SOAP:Envelope") == 0) ? error.responseText : error.responseText.substr(error.responseText.indexOf("<SOAP:Envelope"));
            var messCode = jQuery(errorText).find("cordys\\:messagecode").text();
            if (messCode.search(/Cordys.*(AccessDenied|Artifact_Unbound)/) >= 0 || error.statusText === "Forbidden") {
                // login to Cordys with cookie reset is true
                let curRoute: any = compRef._router;
                let lastNavigationAttempt = curRoute.currentRouterState.snapshot.url;
                if ((lastNavigationAttempt == null && lastNavigationAttempt.indexOf("#/login") == -1) || window.location.hash.indexOf("#/login") == -1) {
                    CordysSoapWService.ERROR = true;
                    if (window.location.href.indexOf("login") == -1) {
                        compRef._router.navigate(["/login"]);
                    }
                }
            }
        });
    });
}

}