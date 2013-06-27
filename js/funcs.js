


// qi = initial production per day
// Di = nominal annual decline
// b = b-factor
// time = time in months
//TODO: SPECIAL CASE FOR ZERO TO ONE MONTH
var tqi = 100;
var tDi = .5;
var tb = .9;
var tstart = 0;
var tend = 12;


function hyperbolicMonthlySpotRate (qi, Di, b, time) {
	var q = 0;
	var Di_month = Di/12.0;
	q = qi * Math.pow((1+ b*Di_month*time), (-1.0/b));
	return q;
}

console.log(hyperbolicMonthlySpotRate (tqi, tDi, tb, 2));


function hyperbolicCumMonthProduction(qi, Di, b, time) {
	var q1 = hyperbolicMonthlySpotRate (qi, Di, b, time-1);
	var q2 = hyperbolicMonthlySpotRate (qi, Di, b, time);
	var Np = 0;
	var Di_month = Di/12.0;
	Np1 = ((Math.pow(qi, b) / (((1-b)*Di_month))) * (Math.pow(qi, (1-b)) - Math.pow(q1, (1-b))));
	Np1 *= 30;
	Np2 = ((Math.pow(qi, b) / (((1-b)*Di_month))) * (Math.pow(qi, (1-b)) - Math.pow(q2, (1-b))));
	Np2 *= 30;
	var NpFinal = Np2 - Np1;
	return NpFinal;
}

console.log(hyperbolicCumMonthProduction(tqi, tDi, tb, 2));

function hyperbolicMultiMonthCumProduction(qi, Di, b, start, end) {
	for(var t=start; t<=end; t++){
		var q = hyperbolicMonthlySpotRate (qi, Di, b, t);
		var Np = hyperbolicCumMonthProduction(qi, Di, b, t);
		console.log("TIME = " + t)
		console.log("SPOT = " + q);
		console.log("CUM  = " + Np);

	}

}

hyperbolicMultiMonthCumProduction(tqi, tDi, tb, tstart, tend);