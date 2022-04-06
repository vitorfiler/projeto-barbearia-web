import { Component, OnInit } from "@angular/core";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger20ms } from "src/@vex/animations/stagger.animation";

@Component({
    selector: 'vex-exibicao-promocoes',
    templateUrl: './exibicao-promocoes.component.html',
    styleUrls: ['./exibicao-promocoes.component.scss'],
    animations: [
        fadeInUp400ms,
        stagger20ms
    ]
})

export class ExibicaoPromocoesComponent implements OnInit {

    ngOnInit() {

    }
}
