/* global document */

'use strict';

const allNodeList = document.querySelectorAll('*');
const allElements = Array.prototype.slice.call(allNodeList, 0);

const prefixElements = document.querySelectorAll('.prefix');
const suffixElements = document.querySelectorAll('.suffix');

function el(selector) {
	return document.querySelector(selector);
}

function setClockElOn(selector) {
	el(selector).classList.add('on');
}

function setPrefixElOn(number) {
	prefixElements[number - 1].classList.add('on');
}

function setSuffixElOn(number) {
	switch (number){
		case 20:
			suffixElements[12].classList.add('on');
			return
		case 30:
			suffixElements[13].classList.add('on');
			return
		case 40:
			suffixElements[14].classList.add('on');
			return
		case 50:
			suffixElements[15].classList.add('on');
			return
		default:
			suffixElements[number - 1].classList.add('on');
	}
}

function setMinutes(minutes) {
	let mn = minutes.toString().split('');
	if(mn.length==2){
		if(minutes==11||minutes==12){
			setSuffixElOn(minutes)
		}else if(minutes==17){
			setSuffixElOn(10)
			setClockElOn('.sevensf')
		}else{
			if(mn[1]!=0){
				setSuffixElOn(mn[1])
				if(minutes>20){setClockElOn('.andsf')}
			}
			setSuffixElOn(mn[0]*10)
		}
	}else{
		setSuffixElOn(mn[0]);
	}
}

function clearClock() {
	allElements.forEach(element => {
		element.classList.remove('on');
	});
}

/** Main / Update Clock
----------------------------------------------------------------------------- */
function updateClock() {
	const date = new Date();
	let hour = date.getHours();
	const minutes = date.getMinutes();

	clearClock();

	// Convert 24 hour time to 12 hour
	if (hour >= 13) {
		hour -= 12;
		setClockElOn('.pm')
	}else{
		setClockElOn('.am')
	}
	if (parseInt(hour, 10) === 0) {
		hour = 12;
	}

	// 'Turn off' all clock elements

	setClockElOn('.it');
	setClockElOn('.is');

	switch (minutes){
		case 30:
			setClockElOn('.half')
			setSuffixElOn(hour);
			break;
		case 15:
			setClockElOn('.quarter')
			setClockElOn('.from')
			setSuffixElOn(hour);
			break;
		case 45:
			setClockElOn('.quarter')
			setClockElOn('.to')
			setSuffixElOn(hour+1);
			break;
		case 25:
			setClockElOn('.half-after')
			setClockElOn('.from')
			setPrefixElOn(5);
			setSuffixElOn(hour)
			break;
		case 35:
			setClockElOn('.half-after')
			setClockElOn('.to')
			setPrefixElOn(5);
			setSuffixElOn(hour)
			break;
		default:
			setPrefixElOn(hour);
			setClockElOn('.hours')
			setMinutes(minutes);
			break;
		}
}

/** Tick / init
----------------------------------------------------------------------------- */
setInterval(updateClock, 1000);
updateClock();
