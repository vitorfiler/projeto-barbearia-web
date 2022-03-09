import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { AgendaComponent } from './agenda.component';



const routes: VexRoutes = [
    {
        path: '',
        component: AgendaComponent,
        data: {
            toolbarShadowEnabled: true,
            scrollDisabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgendaRoutingModule {
}
