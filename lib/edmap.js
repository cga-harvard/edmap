		//var tableid = 1658423;		//old dataset
		var tableid = 4352217;	// new dataset 2009 data updated on 6/6/2012 by Giovanni Zambotti 	
		var lat = 36;
		var lng = -86;
		var maptype = google.maps.MapTypeId.TERRAIN;
		var zoom = 4;
		var map;
				
		var markers_allEDs = [];
		var markers_allEDs_big = [];
		var markers_FED_HOSP = [];
		var markers_FED_HOSP_big = [];
		var markers_CAH09 = [];
		var markers_CAH09_big = [];
		var markers_COTH09 = [];
		var markers_COTH09_big = [];
		var markers_ACAD = [];
		var markers_ACAD_big = [];
		var markers_vis3 = [];
		var markers_vis3_big = [];
		var markers_vis2 = [];
		var markers_vis2_big = [];
		var markers_vis1 = [];
		var markers_vis1_big = [];
		var markers_vis0 = [];
		var markers_vis0_big = [];
		
		var ic = null;
		var myOptions1 = "";
		var opt = { minZoom: 3, maxZoom: 17};
		var geocoder = new google.maps.Geocoder();
		var fooArray = [];
		var poly = new google.maps.Polygon();
		
		var geocodeMarker = new google.maps.Marker
		
		google.maps.Map.prototype.clearMarkers = function() {
			if(ic) {
				ic.close();
			}
		}	
		
		$(document).ready(function() {	     
			$("#trigger").click(function() {
				$("#trigger").toggleClass("active");
				$("#toc").toggle();
            });
			$('#refresh_site').click(function() {
                location.reload();
            });	
	    });
				
		function initialize() {            
			var myOptions = {
                zoom: zoom,
                mapTypeId: maptype,
                center: new google.maps.LatLng(lat,lng),				
				navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL, position: google.maps.ControlPosition.TOP_LEFT},
				streetViewControl: false,
				mapTypeControl: true,		
				mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, position: google.maps.ControlPosition.TOP_LEFT},
				zoomControl: true,
				zoomControlOptions: {style: google.maps.ZoomControlStyle.LARGE, position: google.maps.ControlPosition.LEFT_TOP}
            }
            map = new google.maps.Map(document.getElementById("main"), myOptions);
			map.setOptions(opt);
			map.enableKeyDragZoom({
				key: "shift", 
				boxStyle: {
					border: "2px dashed #006599",
					backgroundColor: "transparent",
					opacity: 1.0
				},
				veilStyle: {
					backgroundColor: "grey",
					opacity: 0.5,
					cursor: "crosshair"
				},
				visualEnabled: true,
				visualPosition: google.maps.ControlPosition.LEFT,
				visualPositionOffset: new google.maps.Size(8, -10),
				visualPositionIndex: null,
				visualSprite: "http://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",
				visualSize: new google.maps.Size(20, 20),
				visualTips: {
					off: "Turn on",
					on: "Turn off"
				}
			});
			
			$.fx.speeds._default = 1000;
			$(function() {
				$( "#dialog" ).dialog({
					autoOpen: false,
					show: "blind",
					hide: "explode",
					minWidth: 800
				});
				$( "#opener" ).click(function() {
					$( "#dialog" ).dialog( "open" );
					return false;
				});
				
				$( "#dialog_disclaimer" ).dialog({
					autoOpen: false,
					show: "blind",
					hide: "explode",
					minWidth: 800
				});
				$( "#opener_disclaimer" ).click(function() {
					$( "#dialog_disclaimer" ).dialog( "open" );
					return false;
				});				
			});
			
			
            $("#cbbox").value = "View specific state..."
			
			addOptions();		
			//add_FED_HOSP();
			/*
			google.maps.event.addListener(map, "zoom_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#all_EDs').is(':checked') == true){add_allEDs_big(); remove_allEDs();}
				else if(zoom <= 12 && $('#all_EDs').is(':checked') == true){add_allEDs();remove_allEDs_big();}
				else if(zoom > 12 && $('#FED_HOSP').is(':checked') == true){add_FED_HOSP_big();remove_FED_HOSP();}
				else if (zoom <= 12 && $('#FED_HOSP').is(':checked') == true){add_FED_HOSP();remove_FED_HOSP_big();}
				else if(zoom > 12 && $('#CAH09').is(':checked') == true){add_CAH09_big();remove_CAH09();}
				else if (zoom <= 12 && $('#CAH09').is(':checked') == true){add_CAH09();remove_CAH09_big();}
				else if(zoom > 12 && $('#COTH09').is(':checked') == true){add_COTH09_big();remove_COTH09();}
				else if (zoom <= 12 && $('#COTH09').is(':checked') == true){add_COTH09();remove_COTH09_big();}
				else if(zoom > 12 && $('#ACAD').is(':checked') == true){add_ACAD_big();remove_ACAD();}
				else if (zoom <= 12 && $('#ACAD').is(':checked') == true){add_ACAD();remove_ACAD_big();}
				else if(zoom > 12 && $('#vis3').is(':checked') == true){add_vis3_big();remove_vis3();}
				else if (zoom <= 12 && $('#vis3').is(':checked') == true){add_vis3();remove_vis3_big();}
				else if(zoom > 12 && $('#vis2').is(':checked') == true){add_vis2_big();remove_vis2();}
				else if (zoom <= 12 && $('#vis2').is(':checked') == true){add_vis2();remove_vis2_big();}
				else if(zoom > 12 && $('#vis1').is(':checked') == true){add_vis1_big();remove_vis1();}
				else if (zoom <= 12 && $('#vis1').is(':checked') == true){add_vis1();remove_vis1_big();}
				else if(zoom > 12 && $('#vis0').is(':checked') == true){add_vis0_big();remove_vis0();}
				else if (zoom <= 12 && $('#vis0').is(':checked') == true){add_vis0();remove_vis0_big();}				
			});
			*/
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#all_EDs').is(':checked') == true){add_allEDs_big(); remove_allEDs();}
				else if(zoom <= 12 && $('#all_EDs').is(':checked') == true){add_allEDs();remove_allEDs_big();}							
			});	
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#FED_HOSP').is(':checked') == true){add_FED_HOSP_big();remove_FED_HOSP();}
				else if (zoom <= 12 && $('#FED_HOSP').is(':checked') == true){add_FED_HOSP();remove_FED_HOSP_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#CAH09').is(':checked') == true){add_CAH09_big();remove_CAH09();}
				else if (zoom <= 12 && $('#CAH09').is(':checked') == true){add_CAH09();remove_CAH09_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#COTH09').is(':checked') == true){add_COTH09_big();remove_COTH09();}
				else if (zoom <= 12 && $('#COTH09').is(':checked') == true){add_COTH09();remove_COTH09_big();}							
			});

			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#CAH09').is(':checked') == true){add_CAH09_big();remove_CAH09();}
				else if (zoom <= 12 && $('#CAH09').is(':checked') == true){add_CAH09();remove_CAH09_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#ACAD').is(':checked') == true){add_ACAD_big();remove_ACAD();}
				else if (zoom <= 12 && $('#ACAD').is(':checked') == true){add_ACAD();remove_ACAD_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#vis3').is(':checked') == true){add_vis3_big();remove_vis3();}
				else if (zoom <= 12 && $('#vis3').is(':checked') == true){add_vis3();remove_vis3_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#vis2').is(':checked') == true){add_vis2_big();remove_vis2();}
				else if (zoom <= 12 && $('#vis2').is(':checked') == true){add_vis2();remove_vis2_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#vis1').is(':checked') == true){add_vis1_big();remove_vis1();}
				else if (zoom <= 12 && $('#vis1').is(':checked') == true){add_vis1();remove_vis1_big();}							
			});
			
			google.maps.event.addListener(map, "bounds_changed", function() {				
				var zoom = map.getZoom();
				if(zoom > 12 && $('#vis0').is(':checked') == true){add_vis0_big();remove_vis0();}
				else if (zoom <= 12 && $('#vis0').is(':checked') == true){add_vis0();remove_vis0_big();}							
			});
			
        }
				
		function recenter(lat, lng, zoom) {						
			var stateValue = $("#state_zoom").val();
			if(stateValue == "Alaska"){
				lat=64; lng=-142; zoom= 4;
				map.setCenter(new google.maps.LatLng(lat,lng));
				map.setZoom(zoom);				
			}
			else if(stateValue == "Hawaii"){
				console.log('hawaii');
				lat=21; lng=-158; zoom= 7;
				map.setCenter(new google.maps.LatLng(lat,lng));
				map.setZoom(zoom);				
			}
			else if(stateValue == "48States"){
				lat=40; lng=-98; zoom= 4;
				map.setCenter(new google.maps.LatLng(lat,lng));
				map.setZoom(zoom);
				console.log('48states');
			}				
        }
		
		function addOptions() {
			$("#cbbox").append('<option id="defaultOption" value="View specific State..." selected="selected">View specific State...</option>');			
			for (var i = 0; i < states.length; i++) {
				$("#cbbox").append('<option class="stateOptions" value = "'+ (states[i][0]-1) +'" >'+ states[i][4] +'</option>');
			}
		}
		
		$('#search_form').live("submit", function() {
			codeAddress();
		});
		
		function codeAddress() {			
			geocodeMarker.setMap(null);
			var address = document.getElementById("address").value;
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				var geocodeImage = 'http://maps.google.com/mapfiles/arrow.png'; 
				map.setCenter(results[0].geometry.location);				
				geocodeMarker = new google.maps.Marker({
					map: map,
					icon: geocodeImage,
					zoom: 14,			
					position: results[0].geometry.location
				});				
				
				poly.setMap(null);				
				map.fitBounds(results[0].geometry.viewport);
				
				} else {
				alert("Geocode was not successful for the following reason: " + status);
				}
			});
			
		}		
		
		// -------------- ALL EDs ---------------------------------------//
		
		function all_EDs_change(){			
			if($('#all_EDs').is(':checked') == false){remove_allEDs();remove_allEDs_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_allEDs_big();}
				else if(zoom <= 12){add_allEDs();}			
			}
		}	
		
		function add_allEDs() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, all_EDs, score, Ftype from " + tableid + " where ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){
							
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, all_EDs, score, Ftype from " + tableid + " &jsonCallback=?", function(data){				
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
					//for(var i = 0; i < data.table.rows.length; i++) {					
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);															
						var all_EDs = data.table.rows[i][5];
						var vScore = data.table.rows[i][6];
						var vFtype = data.table.rows[i][7];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}	
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
					attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
					markers_allEDs.push(marker);
					}					
			});			
		}
				
		function add_allEDs_big() {
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();	
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, all_EDs, score, Ftype from " + tableid + " where ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, all_EDs, score, Ftype from " + tableid + " &jsonCallback=?", function(data){
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
					//for(var i = 0; i < data.table.rows.length; i++) {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);															
						var all_EDs = data.table.rows[i][5];
						var vScore = data.table.rows[i][6];
						var vFtype = data.table.rows[i][7]
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}	
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_allEDs_big.push(marker);
					}							
			});
		}
		
		function remove_allEDs(){			
				for (var i=(markers_allEDs.length-1);i>=0;i--) {
					markers_allEDs[i].setMap(null);
					markers_allEDs.pop();
					}						
				markers_allEDs = [];	
		}
				
		function remove_allEDs_big(){
			for (var i=(markers_allEDs_big.length-1);i>=0;i--) {
				markers_allEDs_big[i].setMap(null);
				markers_allEDs_big.pop();
				}						
			markers_allEDs_big = [];			
		}		
		// -------------- FED_HOSP ---------------------------------------//
		
		function FED_HOSP_change(){									
			if($('#FED_HOSP').is(':checked') == false){remove_FED_HOSP(); remove_FED_HOSP_big();}
			else{
				var zoom = map.getZoom();				
				if(zoom > 12){add_FED_HOSP_big(); }
				else if(zoom <= 12){add_FED_HOSP();}			
			}	
		}
		
		function add_FED_HOSP() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();	
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, FED_HOSP, score, Ftype from " + tableid + " where FED_HOSP = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){					
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, FED_HOSP, score, Ftype from " + tableid + " where FED_HOSP = 1 &jsonCallback=?", function(data){
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
					//for(var i = 0; i < data.table.rows.length; i++) {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);							
						var FED_HOSP = data.table.rows[i][5];
						var vScore = data.table.rows[i][6];
						var vFtype = data.table.rows[i][7];						
						var markerImage = 'img/fedplus_small.png';
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_FED_HOSP.push(marker);
					}					
			});			
		}
		
		function add_FED_HOSP_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();	
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, FED_HOSP, score, Ftype from " + tableid + " where FED_HOSP = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){			
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, FED_HOSP, score, Ftype from " + tableid + " where FED_HOSP = 1 &jsonCallback=?", function(data){
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
					//for(var i = 0; i < data.table.rows.length; i++) {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);						
						var vScore = data.table.rows[i][6];
						var vFtype = data.table.rows[i][7];						
						var markerImage = 'img/fedplus.png';
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_FED_HOSP_big.push(marker);
					}					
			});			
		}
		
		function remove_FED_HOSP(){
			var num = markers_FED_HOSP.length;
			for (var i=(num-1);i>=0;i--) {
					markers_FED_HOSP[i].setMap(null);
					markers_FED_HOSP.pop();
					}						
			markers_FED_HOSP = [];		
		}
		
		function remove_FED_HOSP_big(){
			var num = markers_FED_HOSP_big.length;
			for (var i=(num-1);i>=0;i--) {
				markers_FED_HOSP_big[i].setMap(null);
				markers_FED_HOSP_big.pop();
				}						
			markers_FED_HOSP_big = [];			
		}	
		
		// -------------- CAH09---------------------------------------//
		
		function CAH09_change(){									
			if($('#CAH09').is(':checked') == false){remove_CAH09(); remove_CAH09_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_CAH09_big();}
				else if(zoom <= 12){add_CAH09();}			
			}	
		}
		
		function add_CAH09() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();	
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, CAH09, score, Ftype from " + tableid + " where CAH09 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){			
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, CAH09, score, Ftype from " + tableid + " where CAH09 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var vScore = data.table.rows[i][6];
						var vFtype = data.table.rows[i][7];						
						var markerImage = 'img/plus_small.png';
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_CAH09.push(marker);
					}					
			});			
		}
		
		function add_CAH09_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();	
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, CAH09, score, Ftype from " + tableid + " where CAH09 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){						
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, CAH09, score, Ftype from " + tableid + " where CAH09 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);						
						var vScore = data.table.rows[i][6];
						var vFtype = data.table.rows[i][7];						
						var markerImage = 'img/plus.png';
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_CAH09_big.push(marker);
					}					
			});			
		}
		
		function remove_CAH09(){
			for (var i=(markers_CAH09.length-1);i>=0;i--) {
					markers_CAH09[i].setMap(null);
					markers_CAH09.pop();
					}						
			markers_CAH09 = [];		
		}
		
		function remove_CAH09_big(){
			for (var i=(markers_CAH09_big.length-1);i>=0;i--) {
				markers_CAH09_big[i].setMap(null);
				markers_CAH09_big.pop();
				}						
			markers_CAH09_big = [];			
		}	
		
		// --------------------- COTH09 -------------------------------------------------//
		function COTH09_change(){									
			if($('#COTH09').is(':checked') == false){remove_COTH09(); remove_COTH09_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_COTH09_big();}
				else if(zoom <= 12){add_COTH09();}			
			}	
		}
		
		function add_COTH09() {
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();	
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, COTH09, all_EDs, score, Ftype from " + tableid + " where COTH09 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){			
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, COTH09, all_EDs, score, Ftype from " + tableid + " where COTH09 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var all_EDs = data.table.rows[i][6];
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_COTH09.push(marker);
					}					
			});			
		}
		
		function add_COTH09_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, COTH09, all_EDs, score, Ftype from " + tableid + " where COTH09 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, COTH09, all_EDs, score, Ftype from " + tableid + " where COTH09 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);
						var all_EDs = data.table.rows[i][6];						
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_COTH09_big.push(marker);
					}					
			});			
		}
		
		function remove_COTH09(){
			for (var i=(markers_COTH09.length-1);i>=0;i--) {
					markers_COTH09[i].setMap(null);
					markers_COTH09.pop();
					}						
			markers_COTH09 = [];		
		}
		
		function remove_COTH09_big(){
			for (var i=(markers_COTH09_big.length-1);i>=0;i--) {
				markers_COTH09_big[i].setMap(null);
				markers_COTH09_big.pop();
				}						
			markers_COTH09_big = [];			
		}	
		
		// --------------------- ACAD -------------------------------------------------//
		function ACAD_change(){									
			if($('#ACAD').is(':checked') == false){remove_ACAD(); remove_ACAD_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_ACAD_big();}
				else if(zoom <= 12){add_ACAD();}			
			}	
		}
		
		function add_ACAD() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, ACAD, all_EDs, score, Ftype from " + tableid + " where ACAD = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){			
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, ACAD, all_EDs, score, Ftype from " + tableid + " where ACAD = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var all_EDs = data.table.rows[i][6];
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_ACAD.push(marker);
					}					
			});			
		}
		
		function add_ACAD_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, ACAD, all_EDs, score, Ftype from " + tableid + " where ACAD = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, ACAD, all_EDs, score, Ftype from " + tableid + " where ACAD = 1 &jsonCallback=?", function(data){			
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);
						var all_EDs = data.table.rows[i][6];						
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_ACAD_big.push(marker);
					}					
			});			
		}
		
		function remove_ACAD(){
			for (var i=(markers_ACAD.length-1);i>=0;i--) {
					markers_ACAD[i].setMap(null);
					markers_ACAD.pop();
					}						
			markers_ACAD = [];		
		}
		
		function remove_ACAD_big(){
			for (var i=(markers_ACAD_big.length-1);i>=0;i--) {
				markers_ACAD_big[i].setMap(null);
				markers_ACAD_big.pop();
				}						
			markers_ACAD_big = [];			
		}
		
		// --------------------- VIS3 -------------------------------------------------//
		function vis3_change(){									
			if($('#vis3').is(':checked') == false){remove_vis3(); remove_vis3_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_vis3_big();}
				else if(zoom <= 12){add_vis3();}			
			}	
		}
		
		function add_vis3() {
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis3, all_EDs, score, Ftype from " + tableid + " where vis3 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis3, all_EDs, score, Ftype from " + tableid + " where vis3 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var all_EDs = data.table.rows[i][6];
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis3.push(marker);
					}					
			});			
		}
		
		function add_vis3_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis3, all_EDs, score, Ftype from " + tableid + " where vis3 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){			
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis3, all_EDs, score, Ftype from " + tableid + " where vis3 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);
						var all_EDs = data.table.rows[i][6];						
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis3_big.push(marker);
					}					
			});			
		}
		
		function remove_vis3(){
			for (var i=(markers_vis3.length-1);i>=0;i--) {
					markers_vis3[i].setMap(null);
					markers_vis3.pop();
					}						
			markers_vis3 = [];		
		}
		
		function remove_vis3_big(){
			for (var i=(markers_vis3_big.length-1);i>=0;i--) {
				markers_vis3_big[i].setMap(null);
				markers_vis3_big.pop();
				}						
			markers_vis3_big = [];			
		}
		
		// --------------------- VIS2 -------------------------------------------------//
		function vis2_change(){									
			if($('#vis2').is(':checked') == false){remove_vis2(); remove_vis2_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_vis2_big();}
				else if(zoom <= 12){add_vis2();}			
			}	
		}
		
		function add_vis2() {
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis2, all_EDs, score, Ftype from " + tableid + " where vis2 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){			
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis2, all_EDs, score, Ftype from " + tableid + " where vis2 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var all_EDs = data.table.rows[i][6];
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis2.push(marker);
					}					
			});			
		}
		
		function add_vis2_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis2, all_EDs, score, Ftype from " + tableid + " where vis2 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){					
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis2, all_EDs, score, Ftype from " + tableid + " where vis2 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);
						var all_EDs = data.table.rows[i][6];						
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis2_big.push(marker);
					}					
			});			
		}
		
		function remove_vis2(){
			for (var i=(markers_vis2.length-1);i>=0;i--) {
					markers_vis2[i].setMap(null);
					markers_vis2.pop();
					}						
			markers_vis2 = [];		
		}
		
		function remove_vis2_big(){
			for (var i=(markers_vis2_big.length-1);i>=0;i--) {
				markers_vis2_big[i].setMap(null);
				markers_vis2_big.pop();
				}						
			markers_vis2_big = [];			
		}
		
		// --------------------- VIS1 -------------------------------------------------//
		function vis1_change(){									
			if($('#vis1').is(':checked') == false){remove_vis1(); remove_vis1_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_vis1_big();}
				else if(zoom <= 12){add_vis1();}			
			}	
		}
		
		function add_vis1() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis1, all_EDs, score, Ftype from " + tableid + " where vis1 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){						
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis1, all_EDs, score, Ftype from " + tableid + " where vis1 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var all_EDs = data.table.rows[i][6];
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis1.push(marker);
					}					
			});			
		}
		
		function add_vis1_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis1, all_EDs, score, Ftype from " + tableid + " where vis1 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){									
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis1, all_EDs, score, Ftype from " + tableid + " where vis1 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);
						var all_EDs = data.table.rows[i][6];						
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis1_big.push(marker);
					}					
			});			
		}
		
		function remove_vis1(){
			for (var i=(markers_vis1.length-1);i>=0;i--) {
					markers_vis1[i].setMap(null);
					markers_vis1.pop();
					}						
			markers_vis1 = [];		
		}
		
		function remove_vis1_big(){
			for (var i=(markers_vis1_big.length-1);i>=0;i--) {
				markers_vis1_big[i].setMap(null);
				markers_vis1_big.pop();
				}						
			markers_vis1_big = [];			
		}
		
		// --------------------- VIS0 -------------------------------------------------//
		function vis0_change(){									
			if($('#vis0').is(':checked') == false){remove_vis0(); remove_vis0_big();}
			else{
				var zoom = map.getZoom();
				if(zoom > 12){add_vis0_big();}
				else if(zoom <= 12){add_vis0();}			
			}	
		}
		
		function add_vis0() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis0, all_EDs, score, Ftype from " + tableid + " where vis0 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){									
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis0, all_EDs, score, Ftype from " + tableid + " where vis0 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);					
						var all_EDs = data.table.rows[i][6];
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus_small.png';}
						else{var markerImage = 'img/fedplus_small.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis0.push(marker);
					}					
			});			
		}
		
		function add_vis0_big() {				
			var bounds = map.getBounds();							
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis0, all_EDs, score, Ftype from " + tableid + " where vis0 = 1 AND ST_INTERSECTS(LATITUDE, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + "))) &jsonCallback=?", function(data){												
			//$.getJSON("http://tables.googlelabs.com/api/query?sql=select NAME, CITY, STATE, LATITUDE, LONGITUDE, vis0, all_EDs, score, Ftype from " + tableid + " where vis0 = 1 &jsonCallback=?", function(data){
					//for(var i = 0; i < data.table.rows.length; i++) {
					var tableRowsLength = data.table.rows.length;
					for (var i = tableRowsLength - 1; i >= 0; --i)  {
						var vName = data.table.rows[i][0];
						var vCity = data.table.rows[i][1];
						var vState = data.table.rows[i][2];
						var latlng = new google.maps.LatLng(data.table.rows[i][3], data.table.rows[i][4]);
						var all_EDs = data.table.rows[i][6];						
						var vScore = data.table.rows[i][7];
						var vFtype = data.table.rows[i][8];						
						if(all_EDs == 1){var markerImage = 'img/plus.png';}
						else{var markerImage = 'img/fedplus.png';}
						var marker = new google.maps.Marker({
							position: latlng,										
							icon: markerImage,
							infoName: vName,
							infoCity: vCity,
							infoState: vState,
							infoScore: vScore,
							infoFtype: vFtype,							
							map: map
						});	
						attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype);	
						markers_vis0_big.push(marker);
					}					
			});			
		}
		
		function remove_vis0(){
			for (var i=(markers_vis0.length-1);i>=0;i--) {
					markers_vis0[i].setMap(null);
					markers_vis0.pop();
					}						
			markers_vis0 = [];		
		}
		
		function remove_vis0_big(){
			for (var i=(markers_vis0_big.length-1);i>=0;i--) {
				markers_vis0_big[i].setMap(null);
				markers_vis0_big.pop();
				}						
			markers_vis0_big = [];			
		}
		// --------------------- INFO WINDOW ------------------------------------------- //
		function attachInfowindow(marker, latlng, vName, vCity, vState, vScore, vFtype){
				var textWindow = '';
				
				textWindow+= vName + "<br />" + vCity + ", " + vState + "<br />" + vScore + " visits per hour<br />" + vFtype + "<br />" +
				"<a href='http://www.google.com/search?=en&q=" + vName + "," + vCity +","+ vState + "' target='_blank'><img src='img/isymbol18.png' style='border:0px' width='12' height='12' align='top'/></a>&nbsp;"+"<a href='http://www.google.com/search?=en&q=" + vName + "," + vCity +","+ vState + "' target='_blank' style='color:#006599'>For more info</a>&nbsp;&mdash;&nbsp;Zoom to ED&nbsp;<img src='img/zoom.png' width='12' height='12' onclick=\"javascript:map.setZoom(17); map.setCenter(new google.maps.LatLng("+latlng.lat()+ ',' + latlng.lng() + "));\"></img>"
							
				var boxText = document.createElement("div");
				boxText.style.cssText = "border: 2px solid #006599; margin-top: 8px; background: white; padding: 5px; border-radius:4px; color: #000;";	
		
				boxText.innerHTML = textWindow;
							
				var myOptions1 = {
							content: boxText
							,disableAutoPan: false
							,maxWidth: 0
							,pixelOffset: new google.maps.Size(-20, 0)
							,zIndex: null
							,boxStyle: { 
								background: "url('img/tipbox.png') no-repeat",
								opacity: 0.85,
								width: "200px"
							}
							,closeBoxMargin: "10px 2px 2px 2px"
							,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
							,infoBoxClearance: new google.maps.Size(1, 1)
							,isHidden: false
							,pane: "floatPane"
							,enableEventPropagation: false
							,position: latlng
					};								
				
				google.maps.event.addListener(marker, 'click', function() {
					//ic.open(map, marker);
					if (ic) ic.close();
					ic  = new InfoBox(myOptions1);
					ic.open(map, marker); 
					});
		}
		
		
		
		function recenterize(){		
			var innerArray = [];			
			
			Array.prototype.max = function() {
			var max = this[0];
			var len = this.length;
			for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
			return max;
			}
				
			Array.prototype.min = function() {
				var min = this[0];
				var len = this.length;
				for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
				return min;
				}		
			var c_lat = new Array;
			var c_lng = new Array;
			
						
			downloadUrl("lib/states.xml", function(data) {			
				poly.setMap(null);
				var statesXML = data.documentElement.getElementsByTagName("state");
				for (var a = 0; a < statesXML.length; a++) {
					// get any state attributes
					var label  = statesXML[a].getAttribute("name");					
					var clock  = statesXML[a].getAttribute("id");
					
					if(label == $.map($("#cbbox :selected"), function(e) { return $(e).text(); })){
						var points = statesXML[a].getElementsByTagName("point");
						for (var i = 0; i < points.length; i++) {
							var latlng = new google.maps.LatLng(parseFloat(points[i].getAttribute("lat")),parseFloat(points[i].getAttribute("lng")));					
								innerArray.push(latlng);
								c_lat.push(parseFloat(points[i].getAttribute("lat")));
								c_lng.push(parseFloat(points[i].getAttribute("lng")));
							}
						
					bounds = new google.maps.LatLngBounds(new google.maps.LatLng( c_lat.min(), c_lng.min() - 1), new google.maps.LatLng(c_lat.max(), c_lng.max()));
					// unclock wise
					var outerArray0 = [new google.maps.LatLng(80,-220), new google.maps.LatLng(-20,-220), new google.maps.LatLng(-20,-50), new google.maps.LatLng(80,-50), new google.maps.LatLng(80,-220)];
					// clock wise
					var outerArray1 = [new google.maps.LatLng(80,-220), new google.maps.LatLng(80,-50),	new google.maps.LatLng(-20,-50), new google.maps.LatLng(-20,-220), new google.maps.LatLng(80,-220)];
										
					if(clock == 0){var paths = [innerArray, outerArray0];}
					else{var paths = [innerArray, outerArray1];}		
					
					poly = new google.maps.Polygon({
						paths: paths,						
						strokeColor: "#006599",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: "#000000",
						fillOpacity: 0.65
					});

					poly.setMap(map);
					map.fitBounds(bounds)
							
					}				
				}			
			});	
		}		
		
		var url_dynamap_counties2010 = 'http://cga1.cga.harvard.edu:8399/arcgis/rest/services/CGAservices/counties2010/MapServer';
		var url_dynamap_msa2010 = 'http://cga1.cga.harvard.edu:8399/arcgis/rest/services/CGAservices/msa2010/MapServer';
		var url_dynamap_cd112 = 'http://cga1.cga.harvard.edu:8399/arcgis/rest/services/CGAservices/cd112/MapServer';			
				
		var dynamap_counties2010, dynamap_msa2010, dynamap_cd112;
		
		function arcgis1(){			
			if($('input[name=counties2010]').is(':checked')){				
				dynamap_counties2010 = new gmaps.ags.MapOverlay(url_dynamap_counties2010);
				dynamap_counties2010.setMap(map);				
			}
			else{dynamap_counties2010.setMap(null);}
		}
		
		function arcgis2(){
			if($('input[name=msa2010]').is(':checked')){										
				dynamap_msa2010 = new gmaps.ags.MapOverlay(url_dynamap_msa2010);
				dynamap_msa2010.setMap(map);				
			}
			else{dynamap_msa2010.setMap(null);}
		}
		
		function arcgis3(){	
			if($('input[name=cd112]').is(':checked')){								
				dynamap_cd112 = new gmaps.ags.MapOverlay(url_dynamap_cd112);
				dynamap_cd112.setMap(map);				
			}
			else{dynamap_cd112.setMap(null);}
		}
		
		function uncheck_arcgis(){				
			$('input[type=checkbox]').each(function () {
				if (this.checked) {
				   //console.log($(this).val());
				   if($(this).val() == "counties2010"){dynamap_counties2010.setMap(null);}
				   else if($(this).val() == "msa2010"){dynamap_msa2010.setMap(null);}
				   else if($(this).val() == "cd112"){dynamap_cd112.setMap(null);}
				}
			});
			$('input:checkbox').not('.ed').removeAttr('checked');
		}
		
		function uncheck_ed(){				
			$('input[type=checkbox]').each(function () {
				if (this.checked) {
					if($(this).val() == "vis0"){remove_vis0(); remove_vis0_big();}
					else if($(this).val() == "vis1"){remove_vis1(); remove_vis1_big();}						
					else if($(this).val() == "vis2"){remove_vis2(); remove_vis2_big();}				
					else if($(this).val() == "vis3"){remove_vis3(); remove_vis3_big();}
					else if($(this).val() == "ACAD"){remove_ACAD(); remove_ACAD_big();}
					else if($(this).val() == "COTH09"){remove_COTH09(); remove_COTH09_big();}
					else if($(this).val() == "CAH09"){remove_CAH09(); remove_CAH09_big();}
					else if($(this).val() == "FED_HOSP"){remove_FED_HOSP(); remove_FED_HOSP_big();}
					else if($(this).val() == "all_EDs"){remove_allEDs(); remove_allEDs_big();}
				}
			});
			$('input:checkbox').not('.ags').removeAttr('checked');
		}
		