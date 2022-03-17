import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'valueTime'
})
export class ValueTimePipe implements PipeTransform {

	transform(value: any, ...args: unknown[]): any {
		let time = value;
		let hrs = Math.floor(time / 60);
		let min = time % 60;

		let resul = (time < 60) ? time + ("min") : (time == 60) ? hrs + ("h") : hrs + "H" + min + "m";
		return resul;
	}

}
