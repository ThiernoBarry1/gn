import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Chat } from '../model/chat-model';
import { Message } from '../model/message';
import { GptService } from '../gpt-service/gpt.service';

@Component({
  selector: 'app-echange-form',
  templateUrl: './echange-form.component.html',
  styleUrls: ['./echange-form.component.scss'],
})
export class EchangeFormComponent implements OnInit {
  gptForm: FormGroup;
  models: string[] = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0613', 'gpt-4'];
  chat!: Chat;
  assistant: string = '';
  subscription!: Subscription;

  /**
   *  Constructeur
   * @param fb une instance de FormeBuilder
   * @param gptService une instance du service
   */
  constructor(private fb: FormBuilder, private gptService: GptService) {
    this.gptForm = this.fb.group({
      model: ['gpt-3.5-turbo', Validators.required],
      temperature: [0.1],
      system: [''],
      user: ['', Validators.required],
    });
  }

  /**
   * Appelé à l'initialisation du composant.
   */
  ngOnInit() {
    this.chat = { model: '', messages: [] };
    console.log('assistant=', this.assistant);
  }

  /**
   * Appelé lors qu'on clique sur le btn submit
   */
  onSubmit() {
    this.setChat();
    this.subscription = this.gptService.sendToBoot(this.chat).subscribe(
      (res) => {
        console.log('response=', res);
        if (res && res.choices) {
          this.assistant = res.choices
            .map((choice) => choice.message.content)
            .join('');
        } else {
          this.assistant = 'Aucune reponse';
        }
      },
      () => {
        console.log('erreur');
      },
      () => {
        console.log('terminer');
      }
    );
    //console.log('gptResponse={}', gptResponse);
  }

  /**
   * Construit l'object d'appel au boot.
   */
  setChat(): void {
    this.chat.model = this.gptForm.value.model;
    let messageSystem: Message = {
      role: 'system',
      content: this.gptForm.value.system,
    };
    let messageUser: Message = {
      role: 'user',
      content: this.gptForm.value.user,
    };
    this.chat.messages = [messageSystem, messageUser];
    this.chat.temperature = this.gptForm.value.temperature;
    console.info('form submitted, this.chat', this.chat);
  }

  /**
   * Méthode appelé lors de la destruction du composant.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
