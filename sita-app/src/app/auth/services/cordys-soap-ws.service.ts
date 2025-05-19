import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtil } from './apputil/app.util';
import { isPlatformBrowser } from '@angular/common';

declare var jQuery: any;
import { environment } from '../../../environments/environment';

@Injectable()
export class CordysSoapWService {
  callAppWorksService() {
    throw new Error('Method not implemented.');
  }
  
  // Use relative URL to work with proxy
  public static GATEWAY_URL: string = '/api/home/SITA/com.eibus.web.soap.Gateway.wcp';
  public static ERROR = false;
  public static MODE = 'APP';

  constructor(
    private _router: Router,
    private appUtil: AppUtil,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Log constructed service for debugging
    console.log('CordysSoapWService constructed, GATEWAY_URL:', CordysSoapWService.GATEWAY_URL);
  }

  public static setMode(mode: any) {
    CordysSoapWService.MODE = mode;
    if (typeof jQuery !== 'undefined' && jQuery.cordys) {
      jQuery.cordys.setMode(mode);
    } else {
      console.warn('jQuery.cordys not available when setting mode');
    }
  }

  public static getMode() {
    return CordysSoapWService.MODE;
  }

  public static setGateWayURL(url: any) {
    console.log('Setting Gateway URL to:', url);
    CordysSoapWService.GATEWAY_URL = url;
  }

  // Make this an instance method
  public setGateWayURLWithSAML() {
    if (isPlatformBrowser(this.platformId)) {
      const saml = this.appUtil.getCookieByName('defaultinst_SAMLart');
      console.log('SAML (client-side):', saml);
      if (saml) {
        const newUrl = CordysSoapWService.getGateWayURL() + '?SAMLart=' + saml;
        CordysSoapWService.setGateWayURL(newUrl);
        console.log('Gateway URL with SAML:', newUrl);
      } else {
        console.warn('SAML art cookie not found!');
      }
    } else {
      console.warn('Attempted to access cookie on the server side');
    }
  }

  public static clearSAMLFromGateWayURL() {
    const url = CordysSoapWService.getGateWayURL().split('?SAMLart=')[0];
    CordysSoapWService.setGateWayURL(url);
  }

  public static getGateWayURL() {
    return CordysSoapWService.GATEWAY_URL;
  }

  public callCordysSoapService(
    methodname: string,
    namespace: string,
    parameters: any,
    successHandler: any,
    errorHandler: any,
    isAsync: any,
    extraParams: any
  ) {
    if (typeof jQuery === 'undefined' || !jQuery.cordys) {
      console.error('jQuery.cordys is not available!');
      if (errorHandler) {
        errorHandler({ message: 'jQuery.cordys is not available' }, 500, 'jQuery.cordys not loaded', extraParams);
      }
      return null;
    }

    jQuery.cordys.json.defaults.removeNamespacePrefix = true;
    const compRef = this;
    
    if (CordysSoapWService.getGateWayURL() != null && CordysSoapWService.getGateWayURL() != '') {
      console.log('Calling fireCordysSoapService with method:', methodname);
      return this.fireCordysSoapService(
        methodname,
        namespace,
        parameters,
        successHandler,
        errorHandler,
        isAsync,
        extraParams,
        compRef
      );
    }
    return null;
  }

  public fireCordysSoapService(
    methodname: string,
    namespace: string,
    parameters: any,
    successHandler: any,
    errorHandler: any,
    isAsync: any,
    extraParams: any,
    compRef: any
  ) {
    // Get SAML from cookie
    const saml = this.appUtil.getCookieByName('defaultinst_SAMLart');
    
    // Construct the URL with SAML parameter
    const url = '/api/home/SITA/com.eibus.web.soap.Gateway.wcp' + (saml ? '?SAMLart=' + saml : '');
    
    console.log('Making SOAP request to URL:', url);
    console.log('Method:', methodname, 'Namespace:', namespace);
    
    // Configure jQuery AJAX with verbose settings
    jQuery.ajaxSetup({
      contentType: 'text/xml; charset=utf-8',
      dataType: 'xml'
    });
    
    return jQuery.cordys.ajax({
      method: methodname,
      namespace: namespace,
      url: url,
      async: isAsync,
      parameters: parameters,
      beforeSend: function(xhr: { setRequestHeader: (arg0: string, arg1: string) => void; }) {
        xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xhr.setRequestHeader('Accept', 'application/xml, text/xml, */*');
      },
      success: function (data: any) {
        console.log('✅ SUCCESS - SOAP Response:', data);
        if (successHandler) successHandler(data, extraParams);
      },
      error: function (response: any, status: any, errorText: any) {
        console.error('❌ ERROR - SOAP Response:', response, status, errorText);
        if (errorHandler) errorHandler(response, status, errorText, extraParams);
      }
    }).fail(function (error: any) {
      console.error('❌ FAIL - AJAX Error:', error);
      console.log('Response Text:', error.responseText);
      
      // More detailed error handling
      try {
        const errorText = error.responseText.indexOf('<SOAP:Envelope') >= 0
          ? error.responseText
          : error.responseText.substr(error.responseText.indexOf('<SOAP:Envelope'));
          
        const messCode = jQuery(errorText).find('cordys\\:messagecode').text();
        console.log('Message Code:', messCode);
        
        if (messCode.search(/Cordys.*(AccessDenied|Artifact_Unbound)/) >= 0 || error.statusText === 'Forbidden') {
          // login to Cordys with cookie reset is true
          console.log('Access denied or authentication issue. Redirecting to login.');
          CordysSoapWService.ERROR = true;
          compRef._router.navigate(['/login']);
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
        console.log('Raw responseText:', error.responseText);
      }
    });
  }

  public responseResolver(data: any, businessObject: string) {
    return jQuery.map(jQuery.makeArray(data.tuple), function (tuple: any, index: any) {
      return tuple.old[businessObject];
    });
  }

  public getCookieByName(cname: any) {
    return this.appUtil.getCookieByName(cname);
  }

  /**New code */
  public callCordysSoapServiceNew(
    methodname: string,
    namespace: string,
    parameters: any,
    successHandler: any,
    errorHandler: any,
    isAsync: any,
    extraParams: any
  ) {
    return new Promise((resolve, reject) => {
      if (typeof jQuery === 'undefined' || !jQuery.cordys) {
        console.error('jQuery.cordys is not available!');
        const error = { message: 'jQuery.cordys is not available' };
        if (errorHandler) errorHandler(error, 500, 'jQuery.cordys not loaded', extraParams);
        reject(error);
        return;
      }
      
      jQuery.cordys.json.defaults.removeNamespacePrefix = true;
      const compRef = this;

      if (CordysSoapWService.getGateWayURL() != null && CordysSoapWService.getGateWayURL() != '') {
        console.log('Calling fireCordysSoapServiceNew with method:', methodname);
        this.fireCordysSoapServiceNew(methodname, namespace, parameters, isAsync, extraParams, compRef)
          .then((data: any) => {
            if (successHandler) successHandler(data, extraParams);
            resolve(data);
          })
          .catch((error: any) => {
            if (errorHandler) errorHandler(error.response, error.status, error.errorText, extraParams);
            reject(error);
          });
      } else {
        const error = { message: 'Gateway URL not set' };
        if (errorHandler) errorHandler(error, 500, 'Gateway URL not set', extraParams);
        reject(error);
      }
    });
  }

  public fireCordysSoapServiceNew(
    methodname: string,
    namespace: string,
    parameters: any,
    isAsync: any,
    extraParams: any,
    compRef: any
  ) {
    return new Promise((resolve, reject) => {
      // Get SAML from cookie
      const saml = this.appUtil.getCookieByName('defaultinst_SAMLart');
      
      // Construct the URL with SAML parameter
      const url = '/api/home/SITA/com.eibus.web.soap.Gateway.wcp' + (saml ? '?SAMLart=' + saml : '');
      
      console.log('Making SOAP request to URL:', url);
      console.log('Method:', methodname, 'Namespace:', namespace);
      
      // Configure jQuery AJAX with verbose settings
      jQuery.ajaxSetup({
        contentType: 'text/xml; charset=utf-8',
        dataType: 'xml'
      });
      
      return jQuery.cordys.ajax({
        method: methodname,
        namespace: namespace,
        url: url,
        async: isAsync,
        parameters: parameters,
        beforeSend: function(xhr: { setRequestHeader: (arg0: string, arg1: string) => void; }) {
          xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
          xhr.setRequestHeader('Accept', 'application/xml, text/xml, */*');
        },
        success: function (data: any) {
          console.log('✅ SUCCESS - SOAP Response:', data);
          resolve(data);
        },
        error: function (response: any, status: any, errorText: any) {
          console.error('❌ ERROR - SOAP Response:', response, status, errorText);
          reject({ response, status, errorText });
        }
      }).fail(function (error: any) {
        console.error('❌ FAIL - AJAX Error:', error);
        console.log('Response Text:', error.responseText);
        
        // More detailed error handling
        try {
          if (error.responseText && error.responseText.indexOf('<SOAP:Envelope') >= 0) {
            const errorText = error.responseText.indexOf('<SOAP:Envelope') == 0
              ? error.responseText
              : error.responseText.substr(error.responseText.indexOf('<SOAP:Envelope'));
              
            const messCode = jQuery(errorText).find('cordys\\:messagecode').text();
            console.log('Message Code:', messCode);
            
            if (messCode.search(/Cordys.*(AccessDenied|Artifact_Unbound)/) >= 0 || error.statusText === 'Forbidden') {
              console.log('Access denied or authentication issue. Redirecting to login.');
              CordysSoapWService.ERROR = true;
              compRef._router.navigate(['/login']);
            }
          } else {
            console.warn('Response does not contain SOAP Envelope:', error.responseText);
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          console.log('Raw responseText:', error.responseText);
        }
        
        reject(error);
      });
    });
  }
}