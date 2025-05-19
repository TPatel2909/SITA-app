import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CordysSoapWService } from '../services/cordys-soap-ws.service';
import { CommonModule } from '@angular/common';

// Declare the global jQuery variable
declare global {
  interface Window {
    jQuery: any;
  }
}

export interface UserDetails {
  UserId: string;
  FullName: string;
  JobPurpose: string;
  Position: string;
  Department: string;
  RepresentedByPosition: string;
}

@Component({
  selector: 'app-cordys-test',
  standalone: true,
  imports: [CommonModule],
  providers: [CordysSoapWService],
  templateUrl: './cordys-test.component.html',
  styleUrls: ['./cordys-test.component.scss']
})
export class CordysTestComponent implements AfterViewInit, OnDestroy {
  userDetails: UserDetails | null = null;
  jqueryLoaded = false;
  appWorksLoaded = false;
  jqueryScript: HTMLScriptElement | null = null;
  appWorksScript: HTMLScriptElement | null = null;

  constructor(
    private cordysService: CordysSoapWService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // dynamically load jQuery only in browser
      const jqueryModule = await import('jquery');
      const $: JQueryStatic = jqueryModule.default;

      console.log('jQuery loaded successfully.');

      // now $ is callable
      this.loadJQuery();

      $('#my-element').text('Updated by jQuery!');
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.jqueryScript?.parentNode) {
        this.jqueryScript.parentNode.removeChild(this.jqueryScript);
      }
      if (this.appWorksScript?.parentNode) {
        this.appWorksScript.parentNode.removeChild(this.appWorksScript);
      }
    }
  }

  waitForAppWorks(): void {
    if (window.jQuery && window.jQuery.cordys) {
      console.log('jQuery.cordys is now available.');
      this.callAppWorksService();
    } else {
      console.warn('Waiting for jQuery.cordys...');
      setTimeout(() => this.waitForAppWorks(), 500); // Check again after a delay
    }
  }

  loadJQuery(): void {
    if (!this.jqueryLoaded) {
      this.jqueryScript = document.createElement('script');
      this.jqueryScript.src = 'assets/js/jquery-1.12.4.min.js';
      this.jqueryScript.onload = () => {
        this.jqueryLoaded = true;
        console.log('jQuery loaded successfully. here');
  
        // Load AppWorks
        this.appWorksScript = document.createElement('script');
        this.appWorksScript.src = 'assets/js/cordys.html5sdk.debug.js'; // <-- real path needed
        this.appWorksScript.onload = () => {
          this.appWorksLoaded = true;
          console.log('AppWorks script loaded.');
          this.waitForAppWorks(); // Now jQuery.cordys should eventually exist
        };
        this.appWorksScript.onerror = () => {
          console.error('Failed to load AppWorks script.');
        };
        document.head.appendChild(this.appWorksScript); // 👈 this was already present and correct
      };
  
      this.jqueryScript.onerror = () => {
        console.error('Failed to load jQuery script.');
      };
  
      document.head.appendChild(this.jqueryScript); // 👈 ADD THIS — was missing
    }
  }
  


  callAppWorksService() {
    if (this.jqueryLoaded && this.appWorksLoaded && window.jQuery && window.jQuery.cordys) {
      const methodName = 'GetUserDetails';
      const namespace = 'http://schemas.cordys.com/UserManagement/1.0';
      const parameters = {
        UserId: '16386'
      };

      this.cordysService.setGateWayURLWithSAML();

      const isAsync = true;
      const extraParams = null;

      this.cordysService.callCordysSoapServiceNew(
        methodName,
        namespace,
        parameters,
        (data: any) => {
          console.log('✅ Success:', data);
          this.userDetails = this.parseUserDetails(data);
        },
        (error: any) => {
          console.error('❌ Error:', error);
        },
        isAsync,
        extraParams
      );
    } else {
      console.warn('jQuery or AppWorks integration not fully loaded, delaying service call.');
      setTimeout(() => this.callAppWorksService(), 200);
    }
  }

  parseUserDetails(data: any): UserDetails | null {
    const user = data?.Envelope?.Body?.GetUserDetailsResponse?.User;
    if (!user) return null;

    return {
      UserId: user['app:UserId'],
      FullName: user['app:FullName'],
      JobPurpose: user['app:JobPurpose'],
      Position: user['app:Position'],
      Department: user['app:Department'],
      RepresentedByPosition: user['app:RepresentedByPosition']
    };
  }
}