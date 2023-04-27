import { Component, HostListener, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css'],
})
export class HysComponent implements OnInit {
  skill: Skill[] = [];

  screenWidth: number;

  constructor(
    private sSkill: SkillService,
    private tokenService: TokenService
  ) {}

  isLogged = false;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.cargarSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.screenWidth = window.innerWidth;
  }

  cargarSkills(): void {
    this.sSkill.lista().subscribe((data) => {
      this.skill = data;
    });
  }

  delete(id: number) {
    if (id != undefined) {
      this.sSkill.delete(id).subscribe(
        (data) => {
          this.cargarSkills();
        },
        (err) => {
          alert('No se pudo borrar este skill');
        }
      );
    }
  }
}
{
}
