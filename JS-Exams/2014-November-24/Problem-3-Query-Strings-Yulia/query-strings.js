function solve(input){
    var result = {};

    for (var i = 0; i < input.length; i++) {
        var line = input[i];

        if (line.indexOf("http") > -1){
            var del = line.indexOf("?");
            line = line.slice(del + 1, line.length);
        }
        var queries = line.split('&');

        for (var j = 0; j < queries.length; j++) {
            var currQuery = queries[j];

            currQuery = currQuery.replace(/%20|\+/g, ' ').split(/\s*=\s*/);

            var key = currQuery[0];
            var value = currQuery[1];
            value = value.replace(/\s+/g, ' ').trim();
			
            if (!result[key]) {
                result[key] = [];
            }

            result[key].push(value);
        }

        var keys = Object.keys(result);
        var output = '';

        for (var j = 0; j < keys.length; j++) {
            var keyStr = keys[j] + '=';
            var values = getValues(keys[j], result);
            output += keyStr + values;
            delete result[keys[j]]
        }

        console.log(output);
    }

    function getValues(key, obj){
        var out = "[";

        for (var j = 0; j < obj[key].length; j++) {
            out += obj[key][j] + ', ';
        }

        out = out.substring(0, out.length - 2) + ']';
        return out;
    }
}

solve([
    'foo=%20foo&value=+val&foo+=5+%20+203',
    'foo=poo%20&value=valley&dog=wow+',
    'url=https://softuni.bg/trainings/coursesinstances/details/1070',
    'https://softuni.bg/trainings?trainer=nakov&course=oop&course=php'
]);