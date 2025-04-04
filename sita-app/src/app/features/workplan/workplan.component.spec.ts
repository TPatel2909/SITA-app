import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkplanComponent } from './workplan.component';

describe('WorkplanComponent', () => {
  let component: WorkplanComponent;
  let fixture: ComponentFixture<WorkplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        WorkplanComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one key result area', () => {
    expect(component.keyResultAreasArray.length).toBe(1);
  });

  it('should initialize with one workplan item', () => {
    const firstKRA = component.keyResultAreasArray.at(0);
    const workplanItems = component.getWorkplanItems(firstKRA);
    expect(workplanItems.length).toBe(1);
  });

  it('should add a new workplan item when addWorkplanItem is called', () => {
    const kraIndex = 0;
    component.addWorkplanItem(kraIndex);
    
    const firstKRA = component.keyResultAreasArray.at(kraIndex);
    const workplanItems = component.getWorkplanItems(firstKRA);
    expect(workplanItems.length).toBe(2);
  });

  it('should remove a workplan item when removeWorkplanItem is called', () => {
    const kraIndex = 0;
    component.addWorkplanItem(kraIndex); // Add a second item
    
    const firstKRA = component.keyResultAreasArray.at(kraIndex);
    let workplanItems = component.getWorkplanItems(firstKRA);
    expect(workplanItems.length).toBe(2);

    component.removeWorkplanItem(kraIndex);
    workplanItems = component.getWorkplanItems(firstKRA);
    expect(workplanItems.length).toBe(1);
  });

  it('should not remove the last workplan item', () => {
    const kraIndex = 0;
    const firstKRA = component.keyResultAreasArray.at(kraIndex);
    const workplanItems = component.getWorkplanItems(firstKRA);
    
    component.removeWorkplanItem(kraIndex);
    expect(workplanItems.length).toBe(1);
  });

  it('should add a new key result area', () => {
    component.addKeyResultArea();
    expect(component.keyResultAreasArray.length).toBe(2);
  });

  it('should initialize new key result area with empty values', () => {
    component.addKeyResultArea();
    const newKRA = component.keyResultAreasArray.at(1);
    
    expect(newKRA.get('title')?.value).toBe('');
    expect(newKRA.get('output')?.value).toBe('');
    expect(component.getWorkplanItems(newKRA).length).toBe(1);
  });
}); 