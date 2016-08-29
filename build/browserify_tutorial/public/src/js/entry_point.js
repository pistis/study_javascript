var _ = require('underscore');
var Ball = require('./ball');

function createRandomBallList(inputLimit, colorLimit, sizeLimit) {
    var ballList = [];
 
    for (var i = 0; i < inputLimit; i++) {
       ballList.push(new Ball(i, _.random(0, colorLimit), _.random(1, sizeLimit)));
        //ballList.push(new Ball(i, 5, 6));
    }
 
    return ballList;
};

var ballList = createRandomBallList(10, 10, 10);
console.log(ballList);