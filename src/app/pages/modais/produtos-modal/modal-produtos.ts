import { Component, Inject, OnInit } from "@angular/core";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";

@Component({
	selector: 'modal-produtos',
	templateUrl: 'produtos-modal.html',
	animations: [
		stagger60ms,
		fadeInUp400ms
	]

})
export class ProdutosConstrucaoModal implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
