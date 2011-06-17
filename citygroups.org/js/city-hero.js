/**
 * Client JS for home page
 */

// Globals...yeah, I know.
var imgServer = 'http://localhost:5984';
var elasticSearchServer = 'http://localhost:9200';
var imgServer = 'http://ec2-184-73-122-209.compute-1.amazonaws.com:5984'; 
var elasticSearchServer = 'http://ec2-184-73-122-209.compute-1.amazonaws.com:9200';

// Global maps containers
var maps = {};


/**
 * ==== COMPILING THE MISSION STATEMENT ====
 */ 
String.prototype.format = function(context) {
    var s = this
      , strings = context //[].slice.apply(arguments, 0)
      , i
      , reg
    
    for (i in strings) {
        reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, strings[i])
    }
    
    return s;
}

function compileFromValues(bufferSel, template, keySels) {
    var keySel
      , key
      , context = {}
    
    function _buildContext() {
        var keySel
          , key
          , context = {};
        
        for (key in keySels) {
            keySel = keySels[key]
            context[key] = $(keySel).val();
        }
        
        return context;
    }
    
    for (key in keySels) {
        keySel = keySels[key]
        $(keySel).change(function() {
            context = _buildContext();
            $(bufferSel).html(template.format(context));
        });
        $(keySel).keyup(function() {
            context = _buildContext();
            $(bufferSel).html(template.format(context));
            $('.project-mission-mashup-good-stuff').show();
        });
    }
}

function compileMissionFromParts() {
    compileFromValues('#project-mission-mashup'
                    , '{problem} {values} So, {solution}'
                    , { problem: '#project-mission-problem'
                      , values: '#project-mission-values'
                      , solution: '#project-mission-solution' });
}

function initFieldWizardTips() {
    $('.wizard-tip').each(function (ind, tip) {
        var input_id_len
          , tip_class
          , tip_classes
          , i;
        
        // The field and the wizard tip must have corresponding id's. When
        // a field receives focus, hide all tips and show the one for that
        // field.
        tip_classes = $(tip).attr('class').split(/\s+/);
        for (i in tip_classes) {
            tip_class = tip_classes[i];
            input_id_len = tip_class.length - ('-wizard-tip').length
            
            if (input_id_len <= 0)
                continue;
            
            input_id = tip_class.substr(0,input_id_len);
            $('#' + input_id).focus(function() {
                $('.wizard-tip').hide();
                $(tip).show();
                var xpos = $(tip).offset().left;
                var ypos = $(this).offset().top;
                $(tip).offset({left:xpos, top:ypos});
            });
        }
    });
}

(function($) {
    $(document).ready(function() {
        // Fields with wizard tips
        initFieldWizardTips();
        
        // Set up the mission statement mashup
        compileMissionFromParts()
        
        var format = 'MM dd, yy';
        $('#project-deadline-formatted').datepicker({dateFormat: format});
        $('#project-deadline-formatted').change(function() {
            date = $.datepicker.parseDate(format, $(this).val());
            $('#project-deadline').val($.datepicker.formatDate('yy-mm-dd', date));
        });
        
        function goToCompactMissionView() {
            $('.project-mission-section').show();
            $('.project-mission-step-by-step-section').hide();
            $('#project-mission').focus();
        }
        
        function goToMissionMashupView() {
            $('.project-mission-section').hide();
            $('.project-mission-step-by-step-section').show();
            $('#project-mission-problem').focus();
            
            var old_mission = $('#project-mission').val();
            if (old_mission) {
                $('#project-mission-former').html(old_mission);
                $('.project-mission-former-section').show();
            }
        }
        
        $('#show-project-mission-step-by-step').click(function() {
            goToMissionMashupView();
            return false;
        });
        
        $('#accept-project-mission-mashup').click(function() {
            var new_mission = $('#project-mission-mashup').html();
            $('#project-mission').val(new_mission);
            
            goToCompactMissionView();
            return false;
        });

        $('#reject-project-mission-mashup').click(function() {
            goToCompactMissionView();
            return false;
        });
    });
})(jQuery);


/**
 * ==== WAYFINDER ====
 */

$(document).ready(function () {
});

/**
 * ==== OTHER STUFF ====
 */
(function($) {
    /**
     * Carousel Code
     */
    $(document).ready(function() {
        $('#slide-list li').first().addClass('carousel-active');
        
        // Add homepage project carousel
        var sliding = false;        
        $('.slider-move').bind('click', function(ev) {
            // Kill the default click event
            ev.preventDefault();
            
            // Only proceed if the carousel is not currently sliding
            if(sliding === false) {
                sliding = true;
                
                // Figure out which direction we should go
                var dir = ($(ev.target).hasClass('totheright')) ? 'left' : 'right';

                // What is our current left-most image?
                var cur_image = $('#slide-list li.carousel-active');

                // What is the next image we want to go to?
                var next_image = (dir === 'left') ? $('#slide-list .carousel-active').next() : $('#slide-list .carousel-active').prev();

                // Only slide if there is an image to slide to
                if(next_image.length) {
                    // delta is the number of pixels to slide - this should be abstracted out to the 
                    var delta = 240;
                    var move_to = parseInt($('#slide-list').css('marginLeft'));
                    move_to = (dir === 'left') ? move_to - delta : move_to + delta;
                    //console.log(move_to);
                
                    $('#slide-list').animate(
                        { marginLeft: move_to+'px'}, 
                        500, 
                        function() { 
                            cur_image.removeClass('carousel-active');
                            next_image.addClass('carousel-active');
                            sliding = false;
                        }
                    );
                } else {
                    sliding = false;
                }
            }
        });
    });
    
    /**
     * Form jquery for client
     */
    $(document).ready(function() {
        var id = 1;
        // $('.form-item-help')....
        
        // Geocoding textfields
        $('.textfield.geocode').each(function () {
            id++;
            var geocodeMapID = 'geocode-input-map-id-' + id;
            $thisField = $(this);
            
            // Add place for map
            // TODO: Make this abstract for any textfield
            $thisField.after('<div id="' + geocodeMapID + '" class="geocoding-input-map"></div>' + 
                '<input class="textfield hidden" type="text" name="project-lat" id="project-lat" size="50" />' + 
                '<input class="textfield hidden" type="text" name="project-lon" id="project-lon" size="50" />');
            
            // Make map
            var latlng = new google.maps.LatLng(41.659,-100.714);
            var options = {
                zoom: 2,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            map = new google.maps.Map(document.getElementById(geocodeMapID), options);
            
            // Create geocoder
            var geocoder = new google.maps.Geocoder();
            
            // Make marker for choosing: false,
            var markerShadow = new google.maps.MarkerImage(
                '/images/map-shadow-icon.png',
                new google.maps.Size(25, 25),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34)
            );
            var markerImage = new google.maps.MarkerImage(
                '/images/map-icon.png',
                new google.maps.Size(16, 25),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34)
            );
            var marker = new google.maps.Marker({
                map: map,
                draggable: true,
                icon: markerImage,
                shadow: markerShadow
            });
            
            // Autocomplete
            $thisField.autocomplete({
                // This bit uses the geocoder to fetch address values
                source: function(request, response) {
                    geocoder.geocode( {'address': request.term }, function(results, status) {
                        response($.map(results, function(item) {
                            return {
                                label: item.formatted_address,
                                value: item.formatted_address,
                                latitude: item.geometry.location.lat(),
                                longitude: item.geometry.location.lng()
                            }
                        }));
                    })
                },
                // This bit is executed upon selection of an address
                select: function(event, ui) {
                    $("#project-lat").val(ui.item.latitude);
                    $("#project-lon").val(ui.item.longitude);
                    var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
                    marker.setPosition(location);
                    map.setCenter(location);
                    map.setZoom(10);
                }
            });
            
            // Reverse geocode map
            google.maps.event.addListener(marker, 'drag', function() {
                geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && typeof results[0] != 'undefined') {
                        $thisField.val(results[0].formatted_address);
                        $('#project-lat').val(marker.getPosition().lat());
                        $('#project-lon').val(marker.getPosition().lng());
                    }
                });
            });
            
            // Give map to global
            maps[geocodeMapID] = map;
        });
    });
    
    /**
     * If there is a search box in the page, give it the focus.
     */
    $(document).ready(function() {
        // $('#q').focus();
    });

    /**
     * Search input labeler
     */
    $(document).ready(function() {
        $('.search_form input[title]').each(function() {
            $thisInput = $(this);
            if ($thisInput.val() == '') {
                $thisInput.val($thisInput.attr('title'));
            }
        
            $thisInput.focus(function() {
                if ($(this).val() === $(this).attr('title')) {
                    $(this).val('').addClass('focused');
                }
            });
        
            $thisInput.blur(function() {
                if ($(this).val() === '') {
                    $(this).val($(this).attr('title')).removeClass('focused');
                }
            });
        });
    });
    
    /**
     * Setup autocomplete search
     */
    $(document).ready(function() {
        
        $('#q').bind('keyup', function(ev) {
            var specialSearch = $('.search_form input[title]').attr('title');
            var searchString = ($('#q').val() == specialSearch) ? '' : $('#q').val();
            
            var wildcard = { "_all": "*"+ searchString +"*" };
            var postData = {
                "from" : 0, "size" : 20,
                "query": { "wildcard": wildcard }
            };
            $.ajax({
                url: elasticSearchServer+'/projects/projects/_search',
                type: "POST",
                dataType: "json",
                data: JSON.stringify(postData),
                success: function(data) {
                    var resultsHtml = '';

                    if(data.hits.hits) {
                        $.each(data.hits.hits, function(idx, el) {
                            resultsHtml += getProjectBox(el);
                        });
                        $('#searchResults').html(resultsHtml);
                    }
                    
                }
            });
        });
        
        $('#q').trigger('keyup');
        
        function getProjectBox(project) {
            // projIdentifier is a stop-gap until all the projects have slugs.
            var projIdentifier = (project._source.slug) ? project._source.slug : project._id;
            
            // Build the project blocks
            var ret = '';
            ret += '<div class="project_block">';
            ret += '<a href="/projects/'+projIdentifier+'">';

            if(project._source._attachments) {
                ret += '<img src="'+imgServer+'/projects/'+project._id+'/project-image" width="200" height="200" />';
            } else if (project._source.youtube_id) {
                ret += '<img width="200" height="200" src="http://img.youtube.com/vi/' + project._source.youtube_id + '/default.jpg" />';
            } else {
                ret += '<img src="/images/no-image.gif" width="200" height="200" />';
            }
            ret += '<span class="project_block_title">'+project._source.title+'</span>';
            ret += '</a>';
            ret += '</div>';
            return ret;
        }
    });

    /**
     * If there are messages, make them flash
     */
    $(document).ready(function() {
        $('.messages-wrapper').effect("highlight", {}, 700);
        $('.messages-wrapper').delay(5000).fadeOut(1000);
    });
})(jQuery);

/**
 * Cook handling
 */
var cookieHandler = cookieHandler || {};
cookieHandler.setCookie = function(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
cookieHandler.getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
cookieHandler.deleteCookie = function(name) {
    setCookie(name, "" , -1);
}
