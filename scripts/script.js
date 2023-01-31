
//This function fill screen with pixels
const create_screen = (screen_map) => {
    return new Promise((resolve) => {
    let screen_width = sessionStorage.getItem("screen_width");
    let screen_heigth = sessionStorage.getItem("screen_height");
    var counter = 0;
    for(let i=0; screen_heigth> i; ++i){
        let new_line = $('<div id="line_' + i + '" class="d-flex p-0 x-line">');
        for(let y=0; screen_width>y; ++y){
            
            if(screen_map[i][y] === 0){
                if(y != screen_width - 1){
                    counter++;
                }
                else{
                    x=$('<div num="' + counter + '" class="pack" style="width:' + counter*0.53 + 'vw; margin-left: '+ counter * 1 +'px;"></div>');
                    new_line.append(x);
                    counter = 0;
                }
            }

            if(screen_map[i][y] === 1){
                if(counter != 0){
                    x=$('<div num="' + counter + '" class="pack" style="width:' + counter*0.53 + 'vw; margin-left: '+ counter * 1 +'px;"></div>');
                    new_line.append(x);
                    counter = 0;
                }
                new_line.append($('<i id="dot' + i + '_' + y + '" class="dot bi bi-circle-fill v_dot"></i>'));
            }
        }
        $("#map").append(new_line);
        
    }
    resolve();  
})
}








const get_heandlers = ()=>{
    var tab = [];
    var t = [];
    var x = [];
    $('.x-line').each(function(){
        tab.push(this);
    });
    
    
    $(tab).each(function(){
        x = [];
        $(this.children).each(function(){
            x.push(this);
        });
        t.push(x);
    });

    return t;
}


class Company {
    constructor(name, land, city, coordinates, column){
        this.name = name;
        this.land = land;
        this.city = city;
        this.coordinates = coordinates;
        this.column = column;
        this.map = get_heandlers();
    }

        #evtIN(obj, e ,dot){
            // try{
            //     this.#evtOUT(obj);
            // }finally{}
            let dot_position;
            let hint = $('<div id="hint"><ul><li>' + this.name + '</li><li>' + this.land + '</li></ul></div>');
            $('body').prepend(hint);
            dot_position = dot[0].getBoundingClientRect();
            var n = .5 * dot.css('font-size').slice(0, -2);

            hint.css({
                "top": dot_position.top,
                "left": dot_position.left - 217,
                "transform": 'translateY(-50%) translateY(' + n + 'px)'
            });
            hint.show('50');
            let timer = sessionStorage.getItem("timer");
            clearTimeout(timer);
            $('.c-name').css('color', '#5e0509');
            $('.column' + obj.column).css('color', '#6f060a');
            $(e.currentTarget).css('color', 'white');
            $('header').css('opacity', '0');
            dot[0].style.color = "white";
            sessionStorage.setItem('x', obj.coordinates[0]);
            sessionStorage.setItem('y', obj.coordinates[1]);
        }

        #evtOUT(obj){
            let x = sessionStorage.getItem('x');
            let y = sessionStorage.getItem('y');
            console.log(x + ' ' + y);
            $('#dot' + [x] + '_' + [y])[0].style.color = "#8d090e";
            $('#hint').remove();
            let timer = setTimeout(function(){
                $('.c-name').css('color', 'white');
                $('.column' + obj.column).css('color', 'white');
                $('header').css('opacity', '1');
            },200);
            sessionStorage.setItem("timer", timer);
        }


    get_element(){

        

        let obj = this;
        let element = $("<li class='c-name column" + obj.column +"'>" + obj.name + "</li>");
        let dot = $('#dot' + [obj.coordinates[0]] + '_' + [obj.coordinates[1]]);
        




        element.hover((e)=>{
            if($(window).width()> 576){
                if(sessionStorage.getItem('clicked') == 'true'){
                    $('#map').css('left', 0);
                    this.#evtOUT(obj, dot);
                }
                sessionStorage.setItem('clicked', 'false');
                this.#evtIN(obj, e, dot);
            }
        },
        ()=>{
            if($(window).width()> 576){
                this.#evtOUT(obj, dot);
            }
 
        });
        element.click(
            (e)=>{
                if(sessionStorage.getItem('clicked') === 'true'){
                    this.#evtOUT(obj, dot);
                }
                if($(window).width()<= 576){
                    sessionStorage.setItem('clicked', 'true');
                    var windowWidth = $(window).width()* .5;
                    var x = $('#bg_map_box')[0].scrollLeft + $(dot[0]).offset().left;
                    var new_position = x - windowWidth;
                    console.log(new_position + ' ' + windowWidth + ' ' + $('#bg_map_box')[0].scrollLeft + ' ' + $(dot[0]).offset().left);
                    $('#bg_map_box').scrollLeft(new_position);
                    
                    // $('#map').animate({
                    //     left: new_position   
                    // }, 1000);

                    // console.log(new_position);
                    
                    setTimeout(()=>{
                        this.#evtIN(obj, e, dot);
                    }, 1000);
                }
            }
        )

        return element[0];
    }
}



const load_companies = (places)=>{
    let companies = [];
    let x = [];
    let idx = 0;
    let ob;
    let counter = 0;


    let list_element = $('<ul class="companies_list"></ul>');
    let companies_box = $('#companies_box');

    
    
    places.forEach(element => {        
        if(!(counter<7)){
            companies_box.append(list_element);
            companies.push(x);
            counter = 0;
            x = [];
            list_element = $('<ul class="companies_list"></ul>') 
            idx++;
        }
        ob = new Company(element.name, element.residence.land, element.residence.city, element.coordinates, idx);
            x.push(ob.get_element());
            list_element.append(ob.get_element());
            counter++;
    });
    companies_box.append(list_element);

    companies.push(x);
}

function adjust_screen(){
    var map = $('#map');

        if(($(window).width()*2/2.9) < $(window).height()){
            $('.x-line').css("margin-bottom", ".4vh");
        }
        if(($(window).width()*2/2.9) > $(window).height()){
            $('.x-line').css("margin-bottom", "0");
        }

        if($(window).width()<576){
            $('.x-line').css("margin-bottom", "0");
            $('.pack').each(function(){
                let num = $(this).attr("num");
                $(this).css({
                    "width": 5 *  num + 'px',
                    "margin-left": 2 * num + 'px',
                    "margin-top": '2px',
                    "flex-shrink": 0 
                });
            });
            $('#bg_map_box').scrollLeft($(window).width()* .5);
        }else{
            $('.pack').each(function(){
                let num = $(this).attr("num");

                $(this).css({
                    "width": .53 *  num + 'vw',
                    "margin-left": 1*num + 'px',
                    "flex-shrink": 1 
                });
            });
        }
    
        $('.dot').css('color', '#8d090e');
        $('.c-name').css('color', 'white');
        $('header').css('opacity', 1);
    
    
        try{
            $('#hint').remove();
        }finally{}
}

$(document).ready(function(){
    $('#bg_map_box').scroll(()=>{
        try{
            $('#hint').remove();
        }finally{}
    });
    $('#description_box').click(adjust_screen);
    window.onresize = ()=>{
        adjust_screen();
    }
    
    $.ajax({
        type: "get",
        url: "../json/install_screen.json",
        // url: "https://oneonshow.pl/ZadanieRekrutacyjne/json/install_screen.json",
        dataType: "json",
        success: function (screen_map) {

            // glob_variables
            sessionStorage.setItem("screen_width", 144);
            sessionStorage.setItem("screen_height", 70);
            const build_screen = async (screen_map)=>{
                await create_screen(screen_map);
                await $.ajax({
                type: "get",
                url: "../json/places.json",
                // url: "https://oneonshow.pl/ZadanieRekrutacyjne/json/places.json",
                dataType: "json",
                success: function(places){
                    load_companies(places.PLACES);
                }
            });
                adjust_screen();
        }
        build_screen(screen_map);
}
});




});

