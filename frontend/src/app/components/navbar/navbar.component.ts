import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  

  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.isLoggedIn = this.userService.isAuthenticated();
  }

  logout(): void {
    this.userService.logout();
  }
}

