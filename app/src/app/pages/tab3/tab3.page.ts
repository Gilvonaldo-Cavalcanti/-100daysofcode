import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  private router: Router;

  constructor() { }

  ngOnInit() {
  }


  pageAddAvaliacao(){
    this.router.navigateByUrl("avaliacoes", { skipLocationChange: true });  }

}
