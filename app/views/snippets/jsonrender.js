makeArray = function(data) {
	console.log(data.FIPS);
}

function makeArray(data) {
    console.log('hey', data);
    var i = 0;
    for (i; i < data.length; i++) {
        var currentData = data.[i];
        array2.push(
            [   currentData.FIPS,
                currentData.Unemployment,
                currentData.County,
                currentData.Force,
                currentData.Employed,
                currentData.Unemployed,
                currentData.Period
                ]);
        }
}

var array2 = [];

addColor(array2, periodValue);