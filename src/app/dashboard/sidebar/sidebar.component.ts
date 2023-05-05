import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public role: string = "";
  constructor(private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.role = this.authentificationService.getRole();
  }

  disconnect(){
    this.authentificationService.clear();
    this.router.navigate(['/']);
  }
}
