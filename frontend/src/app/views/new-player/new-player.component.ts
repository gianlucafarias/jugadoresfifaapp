import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgIf],
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.css'
})

export class NewPlayerComponent {

  newPlayerForm!: FormGroup;
  sections: { [key: string]: boolean } = {
    basicInfo: true,
    stats: false,
    attacking: false,
    skill: false,
    movement: false,
    power: false,
    mentality: false,
    defending: false,
    goalkeeping: false
  };
  categories = {
    Ataque: [
      'attacking_crossing', 'attacking_finishing', 'attacking_heading_accuracy',
      'attacking_short_passing', 'attacking_volleys'
    ],
    Habilidades: [
      'skill_dribbling', 'skill_curve', 'skill_fk_accuracy', 
      'skill_long_passing', 'skill_ball_control'
    ],
    Movimiento: [
      'movement_acceleration', 'movement_sprint_speed', 'movement_agility', 
      'movement_reactions', 'movement_balance'
    ],
    Poder: [
      'power_shot_power', 'power_jumping', 'power_stamina', 
      'power_strength', 'power_long_shots'
    ],
    Mentalidad: [
      'mentality_aggression', 'mentality_interceptions', 'mentality_positioning',
      'mentality_vision', 'mentality_penalties', 'mentality_composure'
    ],
    Defensa: [
      'defending_marking', 'defending_standing_tackle', 'defending_sliding_tackle'
    ],
    Porteria: [
      'goalkeeping_diving', 'goalkeeping_handling', 'goalkeeping_kicking',
      'goalkeeping_positioning', 'goalkeeping_reflexes', 'goalkeeping_speed'
    ]
  };  fifaVersions = [23, 22, 21, 20, 19, 18, 17, 16, 15];

  constructor(private playerService: PlayerService, private router: Router, private fb: FormBuilder) {
    this.newPlayerForm = this.fb.group({
      // campos requeridos
      long_name: [''],
      club_name: [''],
      nationality_name: [''],
      age: [''],
      fifa_version: [''],
      fifa_update: [''],
      preferred_foot: [''],
      player_positions: [''],
      player_traits: [''],
      player_face_url: [''],
      overall: [50],

      potential: [50],
      value_eur: [0],
      wage_eur: [0],
      pace: [null],
      shooting: [null],
      passing: [null],
      dribbling: [null],
      defending: [null],
      physic: [null],
      attacking_crossing: [null],
      attacking_finishing: [null],
      attacking_heading_accuracy: [null],
      attacking_short_passing: [null],
      attacking_volleys: [null],
      
      skill_dribbling: [null],
      skill_curve: [null],
      skill_fk_accuracy: [null],
      skill_long_passing: [null],
      skill_ball_control: [null],

      movement_acceleration: [null],
      movement_sprint_speed: [null],
      movement_agility: [null],
      movement_reactions: [null],
      movement_balance: [null],

      power_shot_power: [null],
      power_jumping: [null],
      power_stamina: [null],
      power_strength: [null],
      power_long_shots: [null],

      mentality_aggression: [null],
      mentality_interceptions: [null],
      mentality_positioning: [null],
      mentality_vision: [null],
      mentality_penalties: [null],
      mentality_composure: [null],

      defending_marking: [null],
      defending_standing_tackle: [null],
      defending_sliding_tackle: [null],

      goalkeeping_diving: [null],
      goalkeeping_handling: [null],
      goalkeeping_kicking: [null],
      goalkeeping_positioning: [null],
      goalkeeping_reflexes: [null],
      goalkeeping_speed: [null],
      
      ...this.initializeCategoryFormControls(),

    });

  }

  ngOnInit(): void {
  }

  createPlayer(player: any): void {
    this.playerService.createPlayer(player).subscribe(
      (response: any) => {
        const playerId = response.player.id;
        const fifa_version = player.fifa_version;
        this.router.navigate([`/players/${fifa_version}/${playerId}`]);
      },
      (error) => {
        alert('Error al crear el jugador');
        console.error('Error al crear el jugador:', error);
      }
    );

  }

  private initializeCategoryFormControls(): { [key: string]: any } {
    const controls: { [key: string]: any } = {};
    Object.values(this.categories).forEach((statList) => {
      statList.forEach((stat) => {
        controls[stat] = [null];
      });
    });
    return controls;
  }

  toggleSection(section: string): void {
    this.sections[section] = !this.sections[section];
  }

  formatLabel(label: String): String {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  onSubmit(): void {
    if (this.newPlayerForm.invalid) {
      return;
    }

    
    this.createPlayer(this.newPlayerForm.value);
    
  }

}