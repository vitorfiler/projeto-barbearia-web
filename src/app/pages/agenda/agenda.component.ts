import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, endOfMonth, addDays, addHours, isSameMonth, isSameDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { CommomService } from 'src/app/services/commom.service';
import { CalendarEditComponent } from '../login-final/calendar/calendar-edit/calendar-edit.component';
import icChevronLeft from '@iconify/icons-ic/twotone-chevron-left';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import { AgendaEdicaoComponent } from './agenda-edicao/agenda-edicao.component';

const colors: any = {
  blue: {
    primary: '#5c77ff',
    secondary: '#FFFFFF'
  },
  yellow: {
    primary: '#ffc107',
    secondary: '#FDF1BA'
  },
  red: {
    primary: '#f44336',
    secondary: '#FFFFFF'
  }
};

@Component({
  selector: 'vex-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  icChevronLeft = icChevronLeft;
  icChevronRight = icChevronRight;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  titulo = 'adsfgdfgdfgdfgdfgd';
  titulo2 = 'asfafaf';
  data = '';
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 7),
      // end: addDays(new Date(), 1),
      title: this.titulo,
      color: colors.primary,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: this.titulo,
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: this.titulo,
      color: colors.primary,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: this.titulo2,
      color: colors.red,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
  activeDayIsOpen = true;

  constructor(private dialog: MatDialog,
    private router: Router,
    private commomService: CommomService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    var validaSessao = this.commomService.validaSessao();
    if (!validaSessao) {
      this.router.navigate(['login']);
      return;
    }
    // console.log(startOfDay(new Date()));

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);

    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);

    const dialogRef = this.dialog.open(AgendaEdicaoComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event = result;
        this.snackbar.open('Updated Event: ' + event.title);
        this.refresh.next();
      }
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
