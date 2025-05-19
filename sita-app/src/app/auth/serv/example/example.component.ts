import { Component, OnInit } from '@angular/core';
import { AppworksService } from '../appworks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UserDetails {
  UserId: string;
  FullName: string;
  JobPurpose: string | null;
  Position: string;
  Department: string;
  RepresentedByPosition: string | null;
}

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  data: any;
  userDetailsList: UserDetails[] = [];
  showForm: boolean = false;

  // ✅ This is where you define your form model
  userDetails: UserDetails = {
    UserId: '',
    FullName: '',
    JobPurpose: null,
    Position: '',
    Department: '',
    RepresentedByPosition: null
  };

  constructor(private appworksService: AppworksService) {}

  ENTITY_ID = "7e1116a15ce336eca73a9285dfc2b8ac.020025AD005FA1F0881140647627AB0B" ;

  ngOnInit() {
    this.appworksService.getAppWorksData(this.ENTITY_ID).subscribe({
      next: (response) => {
        this.data = response;
        this.userDetailsList = this.data.result.items.map((item: any) => ({
          UserId: item.Identity?.Id ?? 'N/A',
          FullName: item.Properties?.FullName ?? 'N/A',
          JobPurpose: item.Properties?.JobPurpose ?? null,
          Position: item.Properties?.Position ?? 'N/A',
          Department: item.Properties?.Department ?? 'N/A',
          RepresentedByPosition: item.Properties?.RepresentedByPosition ?? null
        }));
      },
      error: (err) => {
        console.error('Error fetching AppWorks data', err);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addNewRecord() {
    const payload = {
      Properties: {
        FullName: this.userDetails.FullName,
        Position: this.userDetails.Position,
        Department: this.userDetails.Department
      }
    };
  
    /*/ Only add optional properties if they are not null
    if (this.userDetails.JobPurpose !== null) {
      payload.Properties['JobPurpose'] = this.userDetails.JobPurpose;
    }
  
    if (this.userDetails.RepresentedByPosition !== null) {
      payload.Properties['RepresentedByPosition'] = this.userDetails.RepresentedByPosition;
    }   */
  
    this.appworksService.postAppWorksData(this.ENTITY_ID, payload).subscribe({
      next: (response) => {
        console.log('User added:', response);
        this.userDetailsList.push({
          UserId: response.Identity?.Id ?? 'New',
          FullName: this.userDetails.FullName,
          Position: this.userDetails.Position,
          Department: this.userDetails.Department,
          JobPurpose: this.userDetails.JobPurpose,
          RepresentedByPosition: this.userDetails.RepresentedByPosition
        });
        this.resetForm();
        this.toggleForm();
      },
      error: (error) => {
        console.error('Error adding user:', error);
      }
    });
  }
  
  

  resetForm() {
    this.userDetails = {
      UserId: '',
      FullName: '',
      JobPurpose: null,
      Position: '',
      Department: '',
      RepresentedByPosition: null
    };
  }
}
