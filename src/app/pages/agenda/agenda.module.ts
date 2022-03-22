import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconModule } from '@visurel/iconify-angular';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { AgendaEdicaoComponent } from './agenda-edicao/agenda-edicao.component';
import { AgendaComponent } from './agenda.component';
import { AgendaRoutingModule } from './agenda-routing.module';


@NgModule({
	declarations: [AgendaComponent, AgendaEdicaoComponent],
	imports: [
		CommonModule,
		AgendaRoutingModule,
		AngularCalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		ScrollbarModule,
		MatSnackBarModule,
		MatInputModule,
		MatDatepickerModule,
		ReactiveFormsModule,
		PageLayoutModule,
		MatNativeDateModule,
		IconModule,
		ContainerModule
	],
	entryComponents: [AgendaEdicaoComponent]
})
export class AgendaModule { }
