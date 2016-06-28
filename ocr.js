// var fs = require('fs');
// var gm = require('gm').subClass({graphicsmagick: true});
//
// gm("a.png")
// .despeckle()
// .write('b.png', function cb(err){
//     if(err) {
//         throw err;
//     }
// });
//

var Future = require('fibers/future');
var lwip = require('lwip');
var _ = require('underscore');

lwip.open('a.png', function(err, image){
    if (err) {
        throw err;
    }

    image.clone(function(err, newImage){
        var count = 0;
        var batch = newImage.batch();
        for (var x = 0, width = newImage.width(); x < width; x++) {
            for (var y = 0, height = newImage.height(); y < height; y++) {
                var color = image.getPixel(x,y);
                var total = color.r + color.g + color.b;
                if (total < 250) {
                    color.r  = 255;
                    color.g  = 255;
                    color.b  = 255;
                }
                // else {
                //     color.r  = 255;
                //     color.g  = 255;
                //     color.b  = 255;
                // }
                batch.setPixel(x,y,color);
            }
        }

        batch.exec(function(err,image){
            if (err) {
                throw err;
            }
            image.writeFile('b.png', function(err,image){
                if(err) throw err;
            });
        });


    });

    // var height = image.height();
    // var width = image.width();
    //
    // var data = new Array();
    //
    // for (var x = 0, len1 = width; x < len1; x++) {
    //     data[x] = new Array();
    //     for (var y = 0, len2 = height; y < len2; y++) {
    //         var color = image.getPixel(x,y);
    //         var total = color.r + color.g + color.b;
    //         data[x][y] = color;
    //     }
    // }
    //
    // var newData = new Array();
    // for (var x = 0, len1 = width; x < len1; x++) {
    //     newData[x] = new Array();
    //     for (var y = 0, len2 = height; y < len2; y++) {
    //         var color = _
    //     }
    // }
    //
    // newData[0][0].r = 100;
    // console.log(data[0][0].r);

});



