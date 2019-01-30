mapboxgl.accessToken = 'pk.eyJ1IjoiZGVya2FjaCIsImEiOiJjanFjdWFzeGozejZnNDNvYmpsbXR1azJzIn0.03a1jcE5orWtncfaDCxuPA';

$(document).ready(function () {

    let longitude = 26.25;
    let latitude = 50.61;
    let myZoom = 13.15;
    let myStyle = 'mapbox://styles/mapbox/streets-v9';

    $(`a.dropdown-item[data-icon=${$('#map-markers').attr("data-current-icon")}]`).addClass("selected");
    $('.register').addClass("selected-btn");
    $('.singin-form').css('display', 'none');
    $('#submitButton').text('Register');
    $('.formalert').css('display', 'none');
    $('#about').css('display', 'none');
    $('#main').css('display', 'none');
    $('#mapSetting').css('visibility', 'hidden');
    $('#menu-weather').css('display', 'none');
    $('#weathermap').css('display', 'none');


    $('#toTourist').click(function (e) {
        $('#menu-weather').css('display', 'none');
        $('#menu').css('display', 'block');
        $('#weathermap').css('display', 'none');
        $('#main').css('display', 'block');
        TouristMap.resize();

    });

    $('#toWeather').click(function (e) {
        $('#menu').css('display', 'none');
        $('#main').css('display', 'none');
        $('#menu-weather').css('display', 'block');
        $('#weathermap').css('display', 'block');
        map.resize();
    });

    $('.register').click(function (e) {

        let jObj = $(this);

        jObj.parent().children().removeClass("selected-btn");
        jObj.addClass("selected-btn");
        $('.singin-form').css('display', 'none');
        $('.registration-form').css('display', 'block');
        $('#submitButton').text('Register');
        $('.formalert').css('display', 'none');
    });

    $('.signIn').click(function (e) {

        let jObj = $(this);

        jObj.parent().children().removeClass("selected-btn");
        jObj.addClass("selected-btn");
        $('.singin-form').css('display', 'block');
        $('.registration-form').css('display', 'none');
        $('#submitButton').text('Sing in');
        $('.formalert').css('display', 'none');
    });


    $('[name=registrationForm]').validate(
        {
            rules: {
                first_name: 'required',
                user_name: 'required',
                user_name_email: 'required',
                user_email: {
                    required: true,
                    email: true,
                },
                user_email_again: {
                    required: true,
                    email: true,
                    equalTo: "#email"
                },
                user_password: {
                    required: true,
                    minlength: 8,
                }
            },
            messages: {
                first_name: 'This field is required.',
                user_name: 'This field is required.',
                user_name_email: 'This field is required.',
                user_email: {
                    required: 'User email is required.',
                    email: 'Please enter a valid email.',
                },
                user_email_again: {
                    required: 'User email is required.',
                    email: 'Please enter a valid email.',
                    equalTo: 'Please enter the same email again.'
                },
                user_password: {
                    minlength: 'Password must be at least 8 characters long.'
                }
            },
            submitHandler: function (form) {
                return true;
            }
        });

    $(document).on("click", "#goForwardButton", function () {
        $('#formOfRegistration').css('display', 'none');
        $('#main').css('display', 'block');
        TouristMap.resize();
        $('#mapSetting').css('visibility', 'visible');
    });

    $('[name=registrationForm]').on('submit', function (event) {
        event.preventDefault();
        let jObj = $(this);

        if (!jObj.valid()) {
            $('.formalert').css('display', 'block');
            $('.formalert').addClass('alert-danger');
            $('#alert_main_word').text("Warning!");
            $('#alert_message').text("Fill all fields please!");
            $('#goForwardButton').css('visibility', 'hidden');
        }
        else {
            $('.formalert').css('display', 'block');
            $('.formalert').removeClass('alert-danger');

            if ($('#singin_button').hasClass('selected-btn')) {

                let userNameOrEmail = $('#usernameOrEmail').val();               

                $.ajax({
                    url: `http://localhost:61090/ProductService.svc/IsUserNameInDb/${userNameOrEmail}`,
                    type: "GET",
                    success: function (data) {                        
                        if (data.IsUserNameInDbResult === "True") {
                            $.ajax({
                                url: `http://localhost:61090/ProductService.svc/IsDBUserInDb/${userNameOrEmail}/${md5($("#pwd").val(), "key")}`,
                                type: "GET",
                                cache: false,
                                xhrFields: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                success: function (data) {                                   
                                    if (data.IsDBUserInDbResult === "True") {

                                        $('.formalert').addClass('alert-success');
                                        $('#alert_main_word').text("Success!");
                                        $('#alert_message').text("You have singed in successfully!");
                                        $('#goForwardButton').css('visibility', 'visible');
                                        $('#submitButton').attr("data-registred", "1");
                                    }
                                    else {
                                        $('.formalert').addClass('alert-danger');
                                        $('#alert_main_word').text("Warning!");
                                        $('#alert_message').text("Incorrect password.");
                                        $('#goForwardButton').css('visibility', 'hidden');
                                    }
                                },
                                error: function (data) {
                                    $('.formalert').addClass('alert-danger');
                                    $('#alert_main_word').text("Warning!");
                                    $('#alert_message').text("Something goes wrong.");
                                    $('#goForwardButton').css('visibility', 'hidden');
                                }
                            });
                        }
                        else {
                            $('.formalert').addClass('alert-danger');
                            $('#goForwardButton').css('visibility', 'hidden');
                            $('#alert_main_word').text("Warning!");

                            if (userNameOrEmail.indexOf('@') > -1) {
                                $('#alert_message').text("User with this email doesn't exist!");
                            }
                            else {
                                $('#alert_message').text("User with this username doesn't exist!");
                            }
                        }
                    },
                    error: function (data) {
                        $('.formalert').addClass('alert-danger');
                        $('#alert_main_word').text("Warning!");
                        $('#alert_message').text("Something goes wrong. DataBase can not save your data!");
                        $('#goForwardButton').css('visibility', 'hidden');
                    }
                });
            }
            else {
                $.ajax({
                    url: `http://localhost:61090/ProductService.svc/IsUserNameInDb/${$("#username").val()}`,
                    type: "GET",
                    success: function (data) {
                       
                        if (data.IsUserNameInDbResult === "True") {
                            $('.formalert').addClass('alert-danger');
                            $('#alert_main_word').text("Warning!");
                            $('#alert_message').text("User with this username exists!");
                            $('#goForwardButton').css('visibility', 'hidden');
                        }
                        else {
                            $.ajax({
                                url: `http://localhost:61090/ProductService.svc/RegisterDBUser/${$("#fullname").val()}/${$("#username").val()}/${$("#email").val()}/${md5($("#pwd").val(), "key")}`,
                                type: "GET",
                                success: function (data) {
                                   
                                    if (data.RegisterDBUserResult === "True") {
                                        $('.formalert').addClass('alert-success');
                                        $('#alert_main_word').text("Success!");
                                        $('#alert_message').text("You have registered successfully!");
                                        $('#goForwardButton').css('visibility', 'hidden');
                                    }
                                    else {
                                        $('.formalert').addClass('alert-danger');
                                        $('#alert_main_word').text("Warning!");
                                        $('#alert_message').text("DataBase can not save your data!");
                                        $('#goForwardButton').css('visibility', 'hidden');
                                    }
                                },
                                error: function (data) {
                                    $('.formalert').addClass('alert-danger');
                                    $('#alert_main_word').text("Warning!");
                                    $('#alert_message').text("Something goes wrong. DataBase can not save your data!");
                                    $('#goForwardButton').css('visibility', 'hidden');
                                }
                            });
                        }
                    },
                    error: function (data) {
                        $('.formalert').addClass('alert-danger');
                        $('#alert_main_word').text("Warning!");
                        $('#alert_message').text("Something goes wrong. DataBase can not save your data!");
                        $('#goForwardButton').css('visibility', 'hidden');
                    }
                });
            }
        }
    });


    let TouristMap = new mapboxgl.Map({
        container: 'map', // container id
        style: myStyle,
        center: [longitude, latitude], // starting position
        zoom: myZoom // starting zoom
    });

    //click to find out about this app or return to app
    $(document).on("click", "#secondPage ", function () {

        let jObj = $(this);
        let myText = jObj.text();
        let Isregistred = $('#submitButton').attr("data-registred");

        if (myText == "About programm" && Isregistred == "0") {

            $('#formOfRegistration').css('display', 'none');
            jObj.text("Back to registration");
            $('#main').css('display', 'none');
            $('#about').css('display', 'block');
            $('#mapSetting').css('visibility', 'hidden');

        }
        else if (myText == "Back to registration") {
            jObj.text("About programm");
            $('#about').css('display', 'none');
            $('#formOfRegistration').css('display', 'block');
        }
        else if (myText == "About programm" && Isregistred == "1") {
            jObj.text("Back home");
            $('#main').css('display', 'none');
            $('#about').css('display', 'block');
            $('#mapSetting').css('visibility', 'hidden');

        }
        else if (myText == "Back home") {
            jObj.text("About programm");
            $('#about').css('display', 'none');
            $('#main').css('display', 'block');
            $('#mapSetting').css('visibility', 'visible');
        }
    });

    TouristMap.getCanvas().style.cursor = 'pointer';

    TouristMap.on('load', function () {
        SetLayer();

        //$.ajax({
        //    url: 'http://localhost:61090/ProductService.svc//DBPlacesByOneParam/Error=122_OpenTime=12_CloseTime=14_Rate=3_Icon=theatre',
        //    dataType: "json",
        //    success: function (data) {
        //        console.log(data);
        //    }
        //});
    });


    function mapOn(placeName) {
        TouristMap.on('click', placeName, function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(TouristMap);
        });
    }

    $('.time').html($('#working-time').attr("data-current-time"));

    $('#input-time').on('input', function () {
        $('.time').html(this.value);
        $('#working-time').attr("data-current-time", this.value);
        SetLayer();
    });

    $('.rate').html($('#rating').attr("data-current-rate"));

    $('#input-rate').on('input', function () {
        $('.rate').html(this.value);
        $('#rating').attr("data-current-rate", this.value);
        SetLayer();
    });

    function SetStars(stars) {
        let text = '';

        for (let i = 0; i < 5; i++) {
            if (i <= stars - 1) {
                text = text + '<span class="fa fa-star checked"></span>';
            }
            else {
                text = text + '<span class="fa fa-star"></span>';
            }
        }
        return text;
    }


    function SetLayer() {

        $.ajax({
            url: `http://localhost:61090/ProductService.svc/DBPlacesByParams/${$('#map-markers').attr("data-current-icon")}/${$('#working-time').attr("data-current-time")}/${$('#rating').attr("data-current-rate")}`,
            type: "GET",
            success: function (data) {
                let arr = [];

                let counter = +$('#map').attr("data-counter");

                for (let j = 0; j < data.GetDBPlacesByParamsResult.length; j++) {
                    let arrayElem = data.GetDBPlacesByParamsResult[j];

                    let descr = `<strong>${arrayElem.Name}</strong><p>${arrayElem.LinkRef}${arrayElem.LinkText}</a>${arrayElem.AboutPlace}</p><p>${arrayElem.OpenTime}-${arrayElem.CloseTime}</p>
                    ${SetStars(arrayElem.Rate)}`;

                    let ob = {
                        "type": "Feature",
                        "properties": {
                            "description": descr,
                            "icon": arrayElem.Icon,
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [arrayElem.Longitude, arrayElem.Latitude]
                        }
                    };

                    arr.push(ob);
                }

                if (counter > 0) {

                    TouristMap.removeLayer('places' + counter);
                }

                counter++;
                let placeName = 'places' + counter;

                let myLayer = {
                    "id": placeName,
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": arr
                        }
                    },
                    "layout": {
                        "icon-image": "{icon}-15",
                        "icon-allow-overlap": true,
                        'visibility': 'visible'
                    }
                };

                // Add a layer showing the places.
                TouristMap.addLayer(myLayer);

                // When a click event occurs on a feature in the places layer, open a popup at the
                // location of the feature, with description HTML from its properties.	
                mapOn(placeName);

                $('#map').attr("data-counter", counter);
            },
            error: function (data) {
                alert("alarm!!!")
            }
        });
    }


    $(document).on("click", "a.dropdown-item", function () {

        let jObj = $(this);
        let attribute = jObj.attr("data-icon");
        jObj.parent().children().removeClass("selected");
        jObj.addClass("selected");

        if (typeof attribute !== typeof undefined && attribute !== false) {
            $('#map-markers').attr("data-current-icon", attribute);
            SetLayer();
        }
    });
});


