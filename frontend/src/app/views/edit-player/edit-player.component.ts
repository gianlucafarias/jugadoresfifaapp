import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css'
})
export class EditPlayerComponent implements OnInit {

  private playerId!: number;
  player!: Player;
  editPlayerForm!: FormGroup;
  fifaVersion!: string;
  mainStats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physic', 'attacking_crossing', 'attacking_finishing', 'attacking_heading_accuracy', 'attacking_short_passing', 'attacking_volleys', 'skill_dribbling', 'skill_curve', 'skill_fk_accuracy', 'skill_long_passing', 'skill_ball_control', 'movement_acceleration', 'movement_sprint_speed', 'movement_agility', 'movement_reactions', 'movement_balance', 'power_shot_power', 'power_jumping', 'power_stamina', 'power_strength', 'power_long_shots', 'mentality_aggression', 'mentality_interceptions', 'mentality_positioning', 'mentality_vision', 'mentality_penalties', 'mentality_composure', 'defending_marking', 'defending_standing_tackle', 'defending_sliding_tackle', 'goalkeeping_diving', 'goalkeeping_handling', 'goalkeeping_kicking', 'goalkeeping_positioning', 'goalkeeping_reflexes', 'goalkeeping_speed'];
  fifaVersions = [23, 22, 21, 20, 19, 18, 17, 16, 15];

  sections: { [key: string]: boolean } = {
    basicInfo: true,
    stats: false,
  };

  constructor(private route: ActivatedRoute,
    private playerService: PlayerService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.editPlayerForm = this.fb.group({
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

    });
  }
  ngOnInit(): void {
    this.playerId = Number(this.route.snapshot.paramMap.get('id'));
    this.fifaVersion = String(this.route.snapshot.paramMap.get('fifa_version')); 
    this.getPlayerData(this.playerId);

  }

  getPlayerData(id: number): void {
    this.playerService.getPlayerById(id, this.fifaVersion).subscribe((data) => {
      this.editPlayerForm.patchValue(data); 
    });
  }

  toggleSection(section: string): void {
    this.sections[section] = !this.sections[section];
  }

  formatLabel(label: String): String {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  onSubmit(): void {
    if (this.editPlayerForm.valid) {
      const updatedData = this.editPlayerForm.value;
      this.playerService.updatePlayer(this.playerId, updatedData).subscribe((response) => {
      });
    }
  }
}