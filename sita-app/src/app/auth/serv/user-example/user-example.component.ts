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
  selector: 'app-user-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-example.component.html',
  styleUrls: ['./user-example.component.scss']
})
export class UserExampleComponent implements OnInit {
  userDetails: UserDetails = {
    UserId: '',
    FullName: '',
    JobPurpose: null,
    Position: '',
    Department: '',
    RepresentedByPosition: null
  };

  ITEM_ID = "020025AD005FA1F08810E252B2A66B0B.16386";
  ENTITY_ID = "020025AD005FA1F088114064762A2B0B";
loading: any;

  constructor(private appworksService: AppworksService) {}

  ngOnInit() {
    this.appworksService.getAppWorksData(this.ENTITY_ID, this.ITEM_ID).subscribe({
      next: (response) => {
        const item = response.item;
        if (!item) {
          console.error('No item found in response');
          return;
        }
        const props = item.Properties || {};
        const identity = item.Identity || {};
    
        this.userDetails = {
          UserId: identity.Id || '',
          FullName: props.FullName || '',
          JobPurpose: props.JobPurpose || null,
          Position: props.Position || '',
          Department: props.Department || '',
          RepresentedByPosition: props.RepresentedByPosition || null
        };
    
        console.log('Mapped here userDetails:', this.userDetails);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
    
}
}
