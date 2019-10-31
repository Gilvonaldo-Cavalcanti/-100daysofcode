import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ProgressoService } from 'src/app/services/progresso.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '', 
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(
    private progressoService: ProgressoService,
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID)private locale: string) { 

      this.eventSource.push(this.progressoService.getEventos());

     }

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent(){
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCDate(), start.getUTCMonth(), start.getUTCFullYear()));
      eventCopy.startTime = new Date(Date.UTC(start.getUTCDate() + 1, start.getUTCMonth(), start.getUTCFullYear()));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

    this.progressoService.addEvento(eventCopy);
  }


  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours()+1);
    this.event.endTime = (selected.toISOString());
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  
  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'De: ' + start + '<br><br>Até: '+ end,
      buttons: ['OK']
    })
  }


}
