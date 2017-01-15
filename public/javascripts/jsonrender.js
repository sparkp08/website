function makeArray(data) =  {
    console.log('hey', data);
    console.log('2', data[0]);
    console.log('3', data[0].FIPS);
    var i = 0;
    for (i; i < data.length; i++) {
        var currentData = data[i];
        countiesArray.push(
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

var countiesArray = [];