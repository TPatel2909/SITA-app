import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import SignaturePad from 'signature_pad';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  standalone: true,
  selector: 'app-signature-pad',
  imports: [CommonModule],
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  signaturePad!: SignaturePad;
  mode: 'draw' | 'upload' = 'draw';
  signatureImage: string | null = null;   
  showModal = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          this.handleCanvasResize(entry.contentRect.width, entry.contentRect.height);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.canvasRef?.nativeElement?.parentElement && this.resizeObserver) {
        this.resizeObserver.observe(this.canvasRef.nativeElement.parentElement);
      }
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver?.disconnect();
    }
  }

  handleCanvasResize(width: number, height: number): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.showModal && this.canvasRef && this.signaturePad) {
        const canvasElement = this.canvasRef.nativeElement;
        const rect = canvasElement.getBoundingClientRect();
        
        // Set canvas dimensions to match its display size
        canvasElement.width = width;
        canvasElement.height = height / 2;
        
        this.signaturePad.clear();
        this.configureSignaturePad();
      }
    }
  }

  configureSignaturePad(): void {
    if (!this.signaturePad) return;
    
    // Configure the signature pad for better accuracy
    this.signaturePad.minWidth = 0.5;
    this.signaturePad.maxWidth = 2.5;
    this.signaturePad.throttle = 16; // Smoother drawing with 60fps (1000ms/60)
    
    // Fix coordinate mapping
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Adjust the signature pad to use the correct coordinates
    this.signaturePad.fromData(this.signaturePad.toData());
  }

  openSignaturePopup(): void {
    this.showModal = true;

    setTimeout(() => {
      if (this.mode === 'draw' && this.canvasRef) {
        const canvasElement = this.canvasRef.nativeElement;
        const parentElement = canvasElement.parentElement;
        let width = 400;
        let height = 200;

        if (parentElement) {
          width = parentElement.clientWidth;
          height = width / 2;
        }

        // Set the CSS display size
        canvasElement.style.width = `${width}px`;
        canvasElement.style.height = `${height}px`;
        
        // Set the actual pixel dimensions
        const dpr = window.devicePixelRatio || 1;
        canvasElement.width = width * dpr;
        canvasElement.height = height * dpr;
        
        // Scale the drawing context
        const ctx = canvasElement.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        
        // Initialize the signature pad
        this.signaturePad = new SignaturePad(canvasElement, {
          throttle: 16,  // ms, for better performance
          minWidth: 0.5, // Thinner lines for better precision
          maxWidth: 2.5  // Maximum thickness of the line
        });
      }
    });
  }

  closePopup(): void {
    this.showModal = false;
  }

  setMode(mode: 'draw' | 'upload'): void {
    this.mode = mode;
    if (mode === 'draw') {
      setTimeout(() => {
        if (this.canvasRef) {
          const canvasElement = this.canvasRef.nativeElement;
          const parentElement = canvasElement.parentElement;
          let width = 400;
          let height = 200;

          if (parentElement) {
            width = parentElement.clientWidth;
            height = width / 2;
          }

          // Set the CSS display size
          canvasElement.style.width = `${width}px`;
          canvasElement.style.height = `${height}px`;
          
          // Set the actual pixel dimensions
          const dpr = window.devicePixelRatio || 1;
          canvasElement.width = width * dpr;
          canvasElement.height = height * dpr;
          
          // Scale the drawing context
          const ctx = canvasElement.getContext('2d');
          if (ctx) {
            ctx.scale(dpr, dpr);
          }
          
          // Initialize the signature pad
          this.signaturePad = new SignaturePad(canvasElement, {
            throttle: 16,  // ms, for better performance
            minWidth: 0.5, // Thinner lines for better precision
            maxWidth: 2.5  // Maximum thickness of the line
          });
        }
      });
    }
  }

  clearSignature(): void {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }

  saveDrawnSignature(): void {
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      this.signatureImage = this.signaturePad.toDataURL();
      this.closePopup();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.signatureImage = reader.result as string;
        this.closePopup();
      };
      reader.readAsDataURL(file);
    }
  }
}