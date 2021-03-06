$(function(){

        var blockRating = $('.blockRating');

        var wrapperReviews = $('.wrapperReviews');

        blockRating.each(function(){

            var dataRating = $(this).find('.rating').data('rating').split(';');

            var lengthDataRating = dataRating.length;

            // start raring Square
            var $arrUl = $(this).find('.ratingSquare');

            $arrUl.each(function(indx){

                var $arrLi = $(this).find('li');

                var index = $arrUl.index();

                var dataValue = dataRating[indx];

                for(var i=0; i<dataValue; i++){

                  $arrLi.eq(i).addClass('active');

                }

            });
            // end rating Square


            // start rating Stars
            starRating(dataRating);   //function summation stars

            $(this).find('.amoutStars').text(result);

            var stars = $(this).find('.ratingStar li');

            //showing stars
            showStars(stars, result);

        });

        //showing stars of the comments
        function showStars(element, number){    
                
            element.each(function(indx){

                var k = indx+1;

                 if (number == k){
                    $(this).addClass('active');

                    return false;

                } else if(number > k){
                    
                    $(this).addClass('active');

                } else {

                    $(this).addClass('active2');

                    return false;
                    
                }
                    
            });

        };

        //function summation stars 
        function starRating(arr){

            var a = arr;

            var li = a.length;

            for(var sun = 0, i = 0; i < li; i++){

                var value = parseFloat(a[i]);

                sun += value;
            }

            resultSun = sun / li;

            //result = Math.round(resultSun);
            result = (Math.round(resultSun*2)/2).toPrecision(2);
            // result = (resultSun).toFixed(1);

            return result;
        };


        //start Global sum
        function globalSum(){

            var globalArrStars = [];

            blockRating.find('.amoutStars').each(function(){

                globalArrStars.push($(this).text());

            });

            return globalArrStars;

        };

        function showGlobalStars(element){

            showStars(element, resultGlobalSumStars);

        };

        //start setting result rating
        var arrGlobalSum = globalSum();  //["4.8", "3.5"]

        var resultGlobalSumStars = starRating(arrGlobalSum);

        wrapperReviews.find('.amoutStars').text(resultGlobalSumStars);

        var globalStars = wrapperReviews.find('.ratingStar li');

        //showing stars
        showGlobalStars(globalStars);

        //start setting result rating

        //End Global sum


        //start create parameters for diagram

        var arrQuality = [];
        arrExpertise = [],
        arrCost = [],
        arrSchedule = [],
        arrResponse = [],
        arrProfessional = [];


        var arrRating = blockRating.find('.rating');

        arrRating.each(function(){

            var arrData = $(this).data('rating').split(';');

            var lengthData = arrData.length;

            for(var i=0; i<lengthData; i++) {

                var k = arrData[i];

                switch (i) {

                    case 0:
                    arrQuality.push(k);
                    break

                    case 1:
                    arrExpertise.push(k)
                    break

                    case 2:
                    arrCost.push(k)
                    break

                    case 3:
                    arrSchedule.push(k)
                    break

                    case 4:
                    arrResponse.push(k)
                    break

                    case 5:
                    arrProfessional.push(k)
                    break
                };

            };

        });

        //start setting
        var quality = starRating(arrQuality);
        var expertise = starRating(arrExpertise);
        var cost = starRating(arrCost);
        var schedule = starRating(arrSchedule);
        var response = starRating(arrResponse);
        var professional = starRating(arrProfessional);


        var companies=[
            { "developer": quality, "property":"Quality" },
            { "developer": expertise, "property":"Expertise" },
            { "developer": cost, "property":"Cost" },
            { "developer": schedule, "property":"Schedule" },
            { "developer": response, "property":"Response" },
            { "developer": professional, "property":"Professional" }
        ];

        var chart =  new dhtmlXChart({
            container:"chartDiv",
            view:"radar",
            value:"#developer#",
            tooltip:{
                template:"#developer#"
            },
            color:"#3399ff",
            line:{
                color:"#3399ff",
                width:1
            },
            fill:"#3399ff",
            xAxis:{
                template:"#property#"
            },
            yAxis:{
                start:0,
                step:1,
                end:5
            },
            disableItems:false,
            alpha: 0.2,
            legend:{
                layout:"y",
                width: 110,
                align:"right",
                valign:"middle",
                marker:{
                    width:15,
                    radius:3
                },
                values:[
                    //{text:"company A",color:"#3399ff"}
                ]
            }
        });

        chart.parse(companies,"json");

    });

























