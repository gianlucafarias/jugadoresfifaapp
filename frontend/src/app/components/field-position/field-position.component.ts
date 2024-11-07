import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


type PositionKey = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'ST';

@Component({
  selector: 'app-field-position',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-position.component.html',
  styleUrls: ['./field-position.component.css']
})
export class FieldPositionComponent {
  @Input() positions?: PositionKey[] = []; 

  positionMap: Record<PositionKey, { top: string; left: string }> = {
    GK: { top: '90%', left: '50%' },
    CB: { top: '70%', left: '50%' },
    LB: { top: '70%', left: '30%' },
    RB: { top: '70%', left: '70%' },
    CDM: { top: '60%', left: '50%' },
    CM: { top: '50%', left: '50%' },
    CAM: { top: '40%', left: '50%' },
    LM: { top: '50%', left: '30%' },
    RM: { top: '50%', left: '70%' },
    LW: { top: '20%', left: '30%' },
    RW: { top: '20%', left: '70%' },
    ST: { top: '10%', left: '50%' },
  };
}