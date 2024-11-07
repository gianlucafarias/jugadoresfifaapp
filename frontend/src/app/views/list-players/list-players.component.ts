import { Component, OnInit } from '@angular/core';
import { PlayerShort } from '../../interfaces/playerShort';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FileUploadService } from '../../services/file-upload.service';
import { Player } from '../../interfaces/player';


@Component({
  selector: 'app-list-players',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule, NgxSkeletonLoaderModule],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.css'
})
export class ListPlayersComponent implements OnInit {

  filterForm!: FormGroup;
  listPlayers: PlayerShort[] = [];
  page: number = 1;
  totalPages: number = 1;
  limit: number = 8;
  filtrosAplicados: any = {};
  loader: boolean = true;
  jugadoresImportados: any[] = [];
  isDeleteModalOpen: boolean = false;
  playerIdToDelete: number | null = null;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private sanitizer: DomSanitizer,
    private authService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,

  ) {}


  
  jugadoresFiltrados: PlayerShort[] = [];

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url); 
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); 
      return;
    }
    this.filterForm = this.fb.group({
      nombre: [''], 
      nacionalidad: [''],
      club: [''],  
      posicion: [''],
      fifa_version: [''],
    });

    this.route.queryParams.subscribe(params => {
      const filters= {
        nombre: params['nombre'] || '',
        nacionalidad: params['nacionalidad'] || '',
        club: params['club'] || '',
        posicion: params['posicion'] || '',
        fifa_version: params['fifa_version'] || '',
        page: params['page'] || 1,
      }
      this.filterForm.patchValue(filters);
      this.filtrosAplicados = filters;
      this.getPlayers(this.filtrosAplicados);
    });

    this.getPlayers();
    this.loader = false;
   
  }

  getPlayers(filters: any = this.filtrosAplicados): void {
    this.playerService.getPlayers(filters, this.page, this.limit).subscribe(response => {
      this.listPlayers = response.players; 
      this.totalPages = response.totalPages; 
    });
  }

  // paginacion
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.page },
        queryParamsHandling: 'merge',
      });
    this.getPlayers(this.filtrosAplicados)
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.page },
        queryParamsHandling: 'merge',
      });
      this.getPlayers(this.filtrosAplicados)
    }
  }

  // navegar a jugador
  navigateToPlayer(playerId: any, fifaVersion: number): void {
    this.router.navigate([`/players/${fifaVersion}/${playerId}`]);
  }

  // filtros
  aplicarFiltros(): void {
    this.filtrosAplicados = this.filterForm.value;
    this.page = 1;
    const filters = this.filterForm.value; 

    // aplicar filtros en la url
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filtrosAplicados,
      queryParamsHandling: 'merge',
    });

    this.getPlayers(this.filtrosAplicados)
  }




  getFifaIconUrl(version: number): string {
    return `/fifa-icons/fifa-${version}.png`;
  }


  // importar csv

// exportar jugadores
  jugadoresExport() {
    const jugadoresFiltrados = this.filtrosAplicados || {}
    this.playerService.getPlayers(jugadoresFiltrados, 1, this.totalPages * this.limit).subscribe(response => {
      const exportData = response.players.map((player: Player) => ({
        nombre: player.long_name,
        nacionalidad: player.nationality_name,
        club: player.club_name,
        posicion: player.player_positions,
        fifa_version: player.fifa_version,
        edad: player.age,
        altura: player.height_cm,
        peso: player.weight_kg,
      }))
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Jugadores');
      XLSX.writeFile(workbook, 'jugadores.xlsx');
    });
  }

  // eliminar jugador
  openDeleteModal(playerId: any): void {
    this.isDeleteModalOpen = true;
    this.playerIdToDelete = playerId;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.playerIdToDelete = null;
  }

  deletePlayer(): void {
    if (this.playerIdToDelete) {
      this.playerService.deletePlayer(this.playerIdToDelete).subscribe(() => {
        this.getPlayers(this.filtrosAplicados);
        this.closeDeleteModal();
      });
    }
  }

  editPlayer(playerId: any, fifaVersion: number): void {
    this.router.navigate([`/players/${fifaVersion}/${playerId}/edit`]);
  }
}

