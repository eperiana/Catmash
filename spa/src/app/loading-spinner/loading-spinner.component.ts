import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements OnInit{
  @Input() mode: 'list' | 'battle' = 'list';


  private readonly messages: string[] = [
    "Les chats préparent leurs plus belles poses...",
    "Miaou-ment... chargement en cours",
    "Les félins se coiffent pour la compétition",
    "Chargement... un chat vient de renverser le serveur",
    "Synchronisation des moustaches...",
    "Le jury félin délibère",
    "Patience... ils comparent leurs croquettes "
  ];

  private readonly battleMessages = [
    "Les combattants s’échauffent",
    "Un duel de regards intenses se prépare",
    "Les chats sortent leurs griffes (gentiment)",
    "Les juges distribuent les croquettes...",
    "Préparez-vous pour un affrontement de légende",
    "Qui aura le plus beau poil aujourd’hui ?"
  ];

  message = '';

  ngOnInit() {
    const messages = this.mode === 'battle' ? this.battleMessages : this.messages;
    this.message = messages[Math.floor(Math.random() * messages.length)];
  }
}
