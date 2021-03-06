


// qi = initial production per day
// Di = nominal annual decline
// b = b-factor
// time = time in months
//TODO: SPECIAL CASE FOR ZERO TO ONE MONTH
var tqi = 100;
var tDi = .5;
var tb = .9;
var tstart = 1;
var tend = 72;

function hyperbolicAnnualSpotRate (qi, Di, b, time) {
	var q = 0;
	q = qi * Math.pow((1+ b*Di*time), (-1.0/b));
	return q;
}
console.log(hyperbolicAnnualSpotRate(tqi, tDi, tb, 0));
console.log(hyperbolicAnnualSpotRate(tqi, tDi, tb, 1));

function hyperbolicCumAnnualProduction(qi, Di, b, time) {
	var q1 = hyperbolicAnnualSpotRate (qi, Di, b, time-1);
	var q2 = q2 = hyperbolicAnnualSpotRate (qi, Di, b, time); 
	var Np = 0;
	var NpFinal = 0; 

	Np1 = ((Math.pow(qi, b) / (((1-b)*Di))) * (Math.pow(qi, (1-b)) - Math.pow(q1, (1-b))));
	Np1 *= 365;
	Np2 = ((Math.pow(qi, b) / (((1-b)*Di))) * (Math.pow(qi, (1-b)) - Math.pow(q2, (1-b))));
	Np2 *= 365;
	
	if (q1 == qi) {
		NpFinal = Np2;
	}else {
		 NpFinal = Np2 - Np1;
	}	
	return NpFinal;
}

console.log(hyperbolicCumAnnualProduction(tqi, tDi, tb, 1));


function hyperbolicMonthlySpotRate (qi, Di, b, time) {
	var q = 0;
	var Di_month = Di/12.0;
	q = qi * Math.pow((1+ b*Di_month*time), (-1.0/b));
	return q;
}

console.log(hyperbolicMonthlySpotRate (tqi, tDi, tb, 2));


function hyperbolicCumMonthProduction(qi, Di, b, time) {
	var q1 = hyperbolicMonthlySpotRate (qi, Di, b, time-1);
	var q2 = q2 = hyperbolicMonthlySpotRate (qi, Di, b, time); 
	var Np = 0;
	var Di_month = Di/12.0;
	var NpFinal = 0; 
	var days = 0;
	//ONLY WORKS FOR FIRST YEAR!!!!!
	// if (time ==2){
	// 	days=28;
	// }else if (time == 8){
	// 	days = 31;
	// }else if (time % 2 == 0) {
	// 	days = 30;
	// }else {
	// 	days = 31;
	// }
	days = 365.0/12.0;
	//console.log("days var = " + days);
	Np1 = ((Math.pow(qi, b) / (((1-b)*Di_month))) * (Math.pow(qi, (1-b)) - Math.pow(q1, (1-b))));
	Np1 *= days;
	Np2 = ((Math.pow(qi, b) / (((1-b)*Di_month))) * (Math.pow(qi, (1-b)) - Math.pow(q2, (1-b))));
	Np2 *= days;
	
	if (q1 == qi) {
		NpFinal = Np2;
	}else {
		 NpFinal = Np2 - Np1;
	}	
	return NpFinal;
}

console.log(hyperbolicCumMonthProduction(tqi, tDi, tb, 2));

function hyperbolicMultiMonthCumProduction(qi, Di, b, start, end) {
	var rollingCum = 0;
	var q = 0;
	var Np = 0;
	for(var t=start; t<=end; t++){
		q = hyperbolicMonthlySpotRate (qi, Di, b, t);
		Np = hyperbolicCumMonthProduction(qi, Di, b, t);
		rollingCum +=Np;
		console.log("END OF MO = " + t)
		console.log("SPOT      = " + q);
		console.log("MO CUM    = " + Np);
		console.log("ROLL CUM  = " + rollingCum);
	}

}

hyperbolicMultiMonthCumProduction(tqi, tDi, tb, tstart, tend);