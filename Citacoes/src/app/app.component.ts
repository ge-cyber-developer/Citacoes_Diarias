import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'Citacoes';
  content = ''
  author = ''

  PedirCitacao = true // Ponte - Too many requests

  PegarDaAPI() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com',
        'X-RapidAPI-Key': environment.API_KEY
      }
    };

    fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=pt', options)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error()
        }
      })
      .then(response => {
        this.content = response.content
        this.author = response.originator.name
        console.log(response)
        console.log(response.originator.name)
      })
      .catch(err => {
        console.log("DEU ERRO")
        if (this.PedirCitacao == true){
          this.PedirCitacao = false
          this.content="Delayed for 2 second."
          setTimeout(() => {
            this.PegarDaAPI()
            this.PedirCitacao = true
          }, 2000)
        }
      });
  }

  TrocarCitacao() {

    this.PegarDaAPI()
  }

  ngOnInit() {
    return this.PegarDaAPI();
  }
}
