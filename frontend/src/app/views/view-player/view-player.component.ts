import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../interfaces/player';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FieldPositionComponent } from '../../components/field-position/field-position.component';
import { Chart } from 'chart.js/auto';
import { PositionKey } from '../../interfaces/positionKeys';
@Component({
  selector: 'app-view-player',
  standalone: true,
  imports: [CommonModule, FieldPositionComponent],
  templateUrl: './view-player.component.html',
  styleUrl: './view-player.component.css'
})



export class ViewPlayerComponent implements OnInit {

  playerId!: number;
  player!: Player;
  fifaVersion!: string;
  positions: PositionKey[] = [];
  public chart: any;
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
  }; 
  
    constructor(private route: ActivatedRoute,
                private playerService: PlayerService,
                private sanitizer: DomSanitizer

    ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = params['id'];
      this.fifaVersion = String(this.route.snapshot.paramMap.get('fifa_version'));
      this.getPlayerDetails()
      this.positions = this.player.player_positions.split(', ') as PositionKey[];
      if (this.playerId && this.fifaVersion) {
        this.getPlayerDetails()
      }
      this.createChart()
    });
   
  }

  getPlayerDetails() {
    this.playerService.getPlayerById(this.playerId, this.fifaVersion).subscribe((response: Player) => {
try {
  this.player = response; 
} catch (error) {
  console.error('Error al obtener los detalles del jugador:', error);
}

});
  } 
  
  toggleSection(section: string): void {
    this.sections[section] = !this.sections[section];
  }

  formatLabel(label: String): String {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);  
  }

  getFifaIconUrl(version: number): string {
    return `/fifa-icons/fifa-${version}.png`;
  }


  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'radar',
      data: {
        labels: ['Style', 'Comfort', 'Fuel Economy', 'Performance', 'Value for Money'],
        datasets: [
          {
            label: "BMW 7 Series",
            data: [4, 4, 1, 3, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.5)', 
            borderColor: 'rgba(54, 162, 235, 1)', 
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
          },
          {
            label: "Mercedes Benz C Class C180 Kompressor",
            data: [5, 3, 5, 5, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)', 
            pointBackgroundColor: 'rgba(255, 99, 132, 1)', 
          },
          {
            label: "Porsche Boxster 997 II",
            data: [5, 5, 4, 4, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.5)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', 
          },
        ]
      },
      
    });
  }

}

