import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent implements OnInit {
  @Input() playerData!: Player | null;
  @Output() formSubmit = new EventEmitter<Player>();
  playerForm!: FormGroup;
  



  constructor(private playerService: PlayerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.playerData) {
      this.playerForm.patchValue(this.playerData);
    }

  }

  initForm(): void {
    this.playerForm = this.fb.group({
      long_name: ['', Validators.required],
      short_name: ['', Validators.required],
      age: ['', Validators.required],
      nationality: ['', Validators.required],
      club: ['', Validators.required],
      value: ['', Validators.required],
      wage: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      this.formSubmit.emit(this.playerForm.value);
    }
  }


}
