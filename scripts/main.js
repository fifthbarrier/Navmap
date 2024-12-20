/* jquery cookie management methods */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});
var currentSystem;
var nameRegex = /nickname = (.*)/g;
var idsNameRegex = /ids_name = (.*)/g;
var idsSysNameRegex = /strid_name = (.*)/g;
var atmosphereRadiusRegex = /atmosphere_range = (.*)/g;
var sysNameRegex = /system = (.*)/g;
var idsInfoRegex = /ids_info = (.*)/g;
var scaleRegex = /navmapscale = (.*)/g;
var commentRegex = /[\n\r]+;+.*/g;
var currentSystemNickname = "Sirius";
var systemNameFile = dataRootPath+"special_systems.txt";
var initialWorldFile = dataRootPath+"initialworld.ini";
var commodityFile = dataRootPath+"select_equip.ini";
var systemPathFile = dataRootPath+"universe/systems_shortest_path.ini";
var systemLegalPathFile = dataRootPath+"universe/shortest_legal_path.ini";
var infocardFile = dataRootPath+"infocards.txt";
var universeFile = dataRootPath+"universe/universe.ini";
var infocardMapFile = dataRootPath+"infocardmap.ini";
var solarArchFile = dataRootPath+"solararch.ini";
var planetTextureRootPath = "textures/planets/";
var objectRegex = /(\n[^\r\n;]*\[[Oo]bject\])([^;\[]*(?=\n\w*|$))/g;
var archetypeIgnoreArray = [
	"dsy_suprise_secret",
	"suprise_ku_dragon_secret",
	"suprise_dsy_gmg_vhf_secret",
	"suprise_dsy_or_hf_secret",
	"suprise_bw_elite2_secret",
	"suprise_dsy_bayonet_secret",
	"suprise_b_battleship_secret",
	"invisible_base"
];
var baseIgnoreArray = [
	"no_hidden_bases",
	"no_hidden_bases"
];
var ignoreObjectRegex = new RegExp(
	"nickname\\s*=\\s*(" + baseIgnoreArray.join("|") + ")" +
	"|" + 
	"base\\s*=\\s*(" + baseIgnoreArray.join("_base|") + ")" +
	"|" + 
	"archetype\\s*=\\s*(" + archetypeIgnoreArray.join("|") + ")", 'g'
	);
var archetypeShowArray = [
	"ithaca_station",
	"junction_wreck",
	"space_beamx_messina"
];
var showObjectRegex = new RegExp(
	"archetype\\s*=\\s*(" + archetypeShowArray.join("|") + ")", 'g'
);
var zoneRegex = /(\n[^\r\n;]*\[[Zz]one\])([^;\[]*(?=\n\w*|$))/g;
var zoneNicknameRegex = /zone = ([^\r\n;]*)/g;
var asteroidsRegex = /(\[[Aa]steroids\])(\r\n.+)*/g;
var lootableZoneRegex = /(\n[^\r\n;]*\[[Ll]ootable[Zz]one\])([^;\[]*(?=\n\w*|$))/g;
var lootableZoneDynamicCommodityRegex = /dynamic_loot_commodity = (.*)/g;
var lootableZoneDynamicDifficultyRegex = /dynamic_loot_difficulty = (.*)/g;
var lootableZoneDynamicCountRegex = /dynamic_loot_count = (.*)/g;
var lootableZoneAsteroidCommodityRegex = /asteroid_loot_commodity = (.*)/g;
var lootableZoneAsteroidDifficultyRegex = /asteroid_loot_difficulty = (.*)/g;
var lootableZoneAsteroidCountRegex = /asteroid_loot_count = (.*)/g;
var activeAsteroidGetRequests = -1;
var groupRegex = /(\n[^\r\n;]*\[[Gg]roup\])([^;\[]*(?=\n\w*|$))/g;
var commodityRegex = /(\n[^\r\n;]*\[[Cc]ommodity\])([^;\[]*(?=\n\w*|$))/g
var ambientRegex = /(\n[^\r\n;]*\[[Aa]mbient\])([^;\[]*(?=\n\w*|$))/g;
var systemRegex = /(\n[^\r\n;]*\[[Ss]ystem\])([^;\[]*(?=\n\w*|$))/g;
var solarRegex = /(\n[^\r\n;]*\[[Ss]olar\])([^;\[]*(?=\n\w*|$))/g;
var baseRegex = /(\n[^\r\n;]*\[[Bb]ase\])([^;\[]*(?=\n\w*|$))/g;
var posRegex = /pos = (.*)/g;
var sizeRegex = /size = (.*)/g;
var repRegex = /reputation = (.*)/g;
var pathRegex = /Path = (.*)/g;
var gotoRegex = /[^\r\n;]*goto = ([^\r\n;]*)/g;
var burnColourRegex = /burn_color = (.*)/g;
var colourRegex = /color = (.*)/g
var archetypeRegex = /archetype = (.*)/g
var fogColourRegex = /property_fog_color = (.*)/g;
var infocardMapRegex = /[^;][Mm]ap *= *([^;\n\r]+)/g;
var zoneTypeRegex = /property_flags = (.*)/g;
var nameRegex = /nickname = ([^\r\n;]*)/g;
var solarRadiusRegex = /solar_radius = ([^\r\n;]*)/;
var solarTypeRegex = /type = ([^\r\n;]*)/;
var solarShapeRegex = /solar_shape = ([^\r\n;]*)/;
var textureRegex = /material_library = ([^\r\n;]*)/;
var textureFluffStringRegex = /material_library *= *solar\\planets\\/g;
var textureFileRegex = /(\\)([^;\\\r\n\.]*)(?=[\.\r\n])/;
var rotationRegex = /rotate = (.*)/g;
var textRegex = /(<(text|TEXT)>.+?<\/(text|TEXT)>|<(para|PARA)\/>)/g;
/* oorpArray contains systems which should be considered as OORP or otherwise inaccessible by the universe map. See also:  */
var oorpArray = ["hi10","limbo","unch01","unch02","unch03","unch04","unch04b","unch05","unch06","unch07","unch08","unch09","unch10","fp7_system","ew08","ew11","bw46","li08","ew14","ku08","hi05","bw17","li14","ew17","ku16","hlp1","hlp2","bw11","ev03","ew05","hi03","ew45","ew18","ku17","ew85","hi22","ew12","rh11","rh12","rh10","li11","br17","br19","ew63","ga11","ga13","ga09","ga12","ga06","ga10","ga14","br10","iw09","li06","ca01","ev01","bw14", "bw13","st02c","st03b","hi19","hi08","hi08","ew37", "ku15", "li07","br22","br14","li10","bw21","bw58","li13","ev02","br09", "iw13", "ew19", "hi18"];
var systemScaleFactor = 1;
var searchTimedOut = "nope";
var universeFileGetResult;
var prevLabelMoveState;
var lastSearch;
var longSystemName;

var baseNameArray = {};
var systemNameArray = {};
var systemNameArrayState = "nope";
var systemClassArray = {};
var systemIdsNameArray = {};
var systemIdsNameArrayState = "nope";
var searchArray = {};
var matchArray = [];
var searchArrayState = "nope";
var systemPosArray = {};
var systemPosArrayState = "nope";
var systemInfoArray = {};
var systemScaleFactorArray = {};
var systemScaleFactorArrayState = "nope";
var infocardArray = {};
var infocardArrayState = "nope";
var infocardMapArray = {};
var infocardMapArrayState = "nope";
var baseSystemArray = {};
var baseSystemArrayState = "nope";
var factionNameArray = {};
var factionNameArrayState = "nope";
var commodityNameArray = {};
var commodityNameArrayState = "nope";
var connectionArray = {};
var connectionArrayState = "nope";
var solarArchArray = {};
var solarArchArrayState = "nope";
var jgConnectionArray = {};
var jgConnectionArrayState = "nope";
var systemConnectionState = "nope";
var universeMapState = "nope";
var sysLootableZoneArray = {};
var asteroidsURIArray = {};

function getDimensions(elem) {
	var parent = elem.parentNode;
	var style = window.getComputedStyle(elem);
	var parentStyle = window.getComputedStyle(parent);
	var rectElem = elem.getBoundingClientRect();
	var rectParent = parent.getBoundingClientRect();

	return {
		elem: {
			style: style,
			width: rectElem.width,
			height: rectElem.height,
			top: rectElem.top,
			bottom: rectElem.bottom,
			left: rectElem.left,
			right: rectElem.right
		},
		parent: {
			style: parentStyle,
			width: rectParent.width,
			height: rectParent.height,
			top: rectParent.top,
			bottom: rectParent.bottom,
			left: rectParent.left,
			right: rectParent.right
		}
	};
}

function getConstraints(element, scale) {
	var dims = getDimensions(element);
	var realWidth = dims.elem.width / scale;
	var realHeight = dims.elem.height / scale;
	var scaledWidth = realWidth * scale;
	var scaledHeight = realHeight * scale;
	var diffHorizontal = (scaledWidth - realWidth) / 2;
	var diffVertical = (scaledHeight - realHeight) / 2;
	var minX = (-(scaledWidth - dims.parent.width) + diffHorizontal) / scale;
	var maxX = (diffHorizontal) / scale;
	var minY = (-(scaledHeight - dims.parent.height) + diffVertical) / scale;
	var maxY = (diffVertical) / scale;
	return {
		minX: minX,
		maxX: maxX,
		minY: minY,
		maxY: maxY
	};
}

var map = document.querySelector('.map');

var panzoom = Panzoom(map, {
	maxScale: 5,
	minScale: 1,
	panOnlyWhenZoomed: false,
	canvas: true,
	contain: "outside",
	handleStartEvent: function(event) {
		event.preventDefault()
	}
});

var zoomInTreshold = 1.3;
var lastScale = 1;
var constraintsCache = null;

function shiftGrid(map, event) {
	if (constraintsCache == null || lastScale != event.detail.scale) {
		lastScale = event.detail.scale;
		constraintsCache = getConstraints(map, event.detail.scale);
	}

	var constraints = constraintsCache;

	var xOffset = constraints.maxX;
	var yOffset = constraints.maxY;

	$(".vertGridLine h3").css("transform","translateY(" + (-1*event.detail.y + yOffset) + "px)");
	$(".hzGridLine h3").css("transform","translateX(" + (-1*event.detail.x + xOffset) + "px)");
}

map.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

map.addEventListener('panzoomchange', function(event) {
	if (event.detail.scale == 1) {
		shiftGrid(map, event);
	} else {
		requestAnimationFrame(function(){
			shiftGrid(map, event);
		});
	}

	$("body").attr("data-mapscale", event.detail.scale);

	if (event.detail.scale > zoomInTreshold) {
		$("body").addClass("zoomedIn");
	} else {
		$("body").removeClass("zoomedIn");
	}
});

var dragSinceLastMouseUp = 0;
var lastX = 0;
var lastY = 0;

map.addEventListener('panzoompan', function(event) {
	var deltaX = lastX - event.detail.x;
	var deltaY = lastY - event.detail.y;
	dragSinceLastMouseUp += (deltaX*deltaX + deltaY*deltaY);
	lastX = event.detail.x;
	lastY = event.detail.y;
});

function onMouseUp() {
	dragSinceLastMouseUp = 0;
}

map.querySelector(".contents").addEventListener('click', function(event) {
	setTimeout(onMouseUp, 10);
});

document.addEventListener('click', function(event) {
	setTimeout(onMouseUp, 10);
});

function hasNotPannedRecently() {
	return (dragSinceLastMouseUp < 10);
}

/**
* Copyright 2009 by David Kerkeslager
* Released under the BSD License (http://davidkerkeslager.com/license.txt).
*
* This library defines an object-literal which allows one to store key/value pairs after the hash (#) in the URI.
* The syntax of the storage is modeled after the way that GET variables are stored after the question mark (?) in
* the URI.
*
* Example URI: "http://www.foo.com/index.html#foo=bar&baz=quux"
*
* Note: it should be obvious that this should not be used for storing private data of any kind.
*/

var URIHash =
{
	/**
	* Dump the contents of the URI hash into an associative array. If the hash is invalid, the method returns
	* undefined.
	*/
	dump: function()
	{
		var hash = document.location.hash;
		var dump = new Array();
		
		if(hash.length == 0) return dump;
		
		hash = hash.substring(1).split('&');
		
		for(var key in hash)
		{
			var pair = hash[key].split('=');
			
			if(pair.length != 2 || pair[0] in dump)
			return undefined;
			
			// escape for storage
			dump[unescape(pair[0])] = unescape(pair[1]);
		}
		
		return dump;
	},
	
	/**
	* Takes an associative array and stores it in the URI as a hash after the # prefix, replacing any pre-
	* existing hash.
	*/
	load: function(array)
	{
		var first = true;
		var hash = '';
		
		for(var key in array)
		{
			if(!first) hash += '&';
			hash += escape(key) + '=' + escape(array[key]);
		}
		
		document.location.hash = hash;
	},
	
	/**
	* Get the value of a key from the hash. If the hash does not contain the key or the hash is invalid,
	* the function returns undefined.
	*/
	get: function(key)
	{
		return this.dump()[key];
	},
	
	/**
	* Set the value of a key in the hash. If the key does not exist, the key/value pair is added.
	*/
	set: function(key,value)
	{
		var dump = this.dump();
		dump[key] = value;
		
		var hash = new Array();
		
		for(var key in dump)
		hash.push(escape(key) + '=' + escape(dump[key]));
		
		document.location.hash = hash.join('&');
	}
}

var clickHandlersEnabled = true;

/* zoneFlagArray is a special lookup array that sets zone classes depending on their zoneFlag attribute. */
var zoneFlagArray = {
	0: "zoneHidden",
	64: "zoneRockAsteroids",
	65: "zoneAlphaBigDust",
	66: "zoneRock",
	74: "zoneLeedsUraniumAsteroids",
	82: "zoneDublinGoldField",
	128: "zoneJerseyDebris",
	129: "zoneDetroitDebrisNormal",
	130: "zoneDetroitDebrisHigh",
	132: "zoneDetroitDebrisLow",
	256: "zoneIceAsteroidsSmall",
	257: "zoneIceAsteroidsTau37",
	258: "zoneIceAsteroids1",
	512: "zoneLavaRocks",
	513: "zoneVonRoheBeltLavaRocks",
	514: "zoneDresdenLavaRocks",
	1024: "zoneGreenAsteroids",
	1026: "zoneZetaGreenAsteroids",
	2049: "zoneIceAsteroids2",
	4096: "zoneMinefield1",
	4128: "zoneMinefield2",
	8192: "zoneAsteroidField",
	8200: "zoneAsteroids",
	16400: "zoneIceNebula",
	32768: "zoneDresdenFog",
	32776: "zoneLeedsSmog",
	32833: "zoneChugokuCloud",
	62768: "zoneNebulaWithFogColour",
	65536: "zoneExclusion1",
	131072: "zoneExclusion2",
	196608: "zoneExclusion3"
};

function updateCookie(){
	/* checks for and stores config changes between sessions */
	var elementValues = {};
	$(":checkbox").each(function(){
		elementValues[this.id] = this.checked;
	});
	
	elementValues["buttonText"] = $("button").text();
	$.cookie('elementValues', elementValues, { expires: 7, path: '/' })
}

function repopulateFormElements(){
	/* readds config changes if there are any stored ones when the page loads */
	var elementValues = $.cookie('elementValues');
	if (elementValues){
		Object.keys(elementValues).forEach(function(element) {
			var checked = elementValues[element];
			$("#" + element).prop('checked', checked);
		});
		$("button").text(elementValues["buttonText"]);
	}
}

$(document).ready(function () {
	$(":checkbox").on("change", function(){
		updateCookie();
		updateConfigClasses();
	});
	
	$("#configButton").click(function(event) {
		toggleConfigMenu();
		event.stopPropagation();
	});
	
	$.cookie.json = true;
	repopulateFormElements();
	/* initialise rising/falling edge detector */
	prevResponsiveState = "init";
	prevResponsiveModeState = "init";
	prevLabelMoveState = "init";
	updateConfigClasses();
});

function toggleConfigMenu () {
	/* Toggles the config menu and closes it if the user clicks outside the menu. */
	$(".configMenu").toggleClass("closed");
	if (document.querySelector(".configMenu").className.indexOf("closed") == -1) {
		$('html').click(function() {
			$(".configMenu").addClass("closed");
		});
		$(".configMenu").click(function(event){
			event.stopPropagation();
		});
	} else {
		$("html").unbind("click");
		$(".configMenu").unbind("click");
	}
}

function updateConfigClasses() {
	/* Runs when the map script determines that there has been a change in configuration -
	such as an option being changed in the config menu - which requires further action. */
	
	if (document.querySelector(".configOption#wrecks input").checked) {
		$(".object.wreck").removeClass("hidden");
		$(".contents .object.wreck label").hAlign();
	} else {
		$(".object.wreck").addClass("hidden");
	}
	
	if (document.querySelector(".configOption#onlyShowLatestPosition input").checked) {
		$(".contents").removeClass("showOldPlayerShipPositions");
	} else {
		$(".contents").addClass("showOldPlayerShipPositions");
	}
	
	if (document.querySelector(".configOption#showInternalNicknames input").checked) {
		$(".contents").addClass("showInternalNicknames");
	} else {
		$(".contents").removeClass("showInternalNicknames");
	}

	if (document.querySelector(".configOption#fitToWindow input").checked) {
		$("body").addClass("fitToWindow");
	} else {
		$("body").removeClass("fitToWindow");
	}
	
	if (document.querySelector(".configOption#wreckLabels input").checked) {
		$(".object.wreck label").removeClass("hidden");
		$(".contents .object.wreck label").hAlign();
	} else {
		$(".object.wreck label").addClass("hidden");
	}
	
	if (document.querySelector(".configOption#labelMove input").checked && (prevLabelMoveState == "unchecked" || prevLabelMoveState == "init")) {
		prevLabelMoveState = "checked";
		if (document.querySelector(".contents .system") == null && currentSystemNickname != "Sirius") {
			objectTerritorialConflictResolver($(".contents label:visible"));
		}
	} else if (!document.querySelector(".configOption#labelMove input").checked && (prevLabelMoveState == "checked" || prevLabelMoveState == "init")) {
		prevLabelMoveState = "unchecked";
	}
	
	if (document.querySelector(".configOption#zoneLabels input").checked) {
		$(".zone label").not($(".mineable label")).removeClass("hidden");
		$(".contents .zone label").hAlign();
	} else {
		$(".zone label").not($(".mineable label")).addClass("hidden");
	}
	
	if (document.querySelector(".configOption#zones input").checked) {
		$(".zone").removeClass("hidden");
		$(".contents .zone label").hAlign();
	} else {
		$(".zone").addClass("hidden");
	}
	
	if (document.querySelector(".configOption#connections input").checked
	&& document.querySelector(".systemConnectionProp") == null) {
		generateSystemConnections();
		if (document.querySelector(".contents .system") == null) {
			$(".systemConnectionProp").hide();
		}
	} else if (!(document.querySelector(".configOption#connections input").checked)) {
		$(".systemConnectionProp").hide();
	} else if (document.querySelector(".configOption#connections input").checked
	&& document.querySelector(".contents .system") !== null) {
		$(".systemConnectionProp").show();
	}
	
	if (document.querySelector(".configOption#oorp input").checked) {
		$(".oorp").removeClass("hidden");
		$(".contents .system.oorp label").hAlign();
	} else {
		$(".oorp").addClass("hidden");
	}
	
	generateSystemScale(currentSystem);
	
	if (document.querySelector(".contents .system") == null) {
		$(".systemConnectionProp").hide();
	}
	
	if (document.querySelector(".configOption#universeLabels input").checked
	&& document.querySelector(".contents .system") !== null) {
		$(".contents div label").removeClass("labelDisabled");
		$(".contents .system label").hAlign();
	} else if (document.querySelector(".contents .system") !== null) {
		$(".contents div label").addClass("labelDisabled");
	}
	
	if (document.querySelector(".configOption#systemLabels input").checked
	&& document.querySelector(".contents .system") == null) {
		$(".contents div label").removeClass("labelDisabled");
		$(".contents div label").hAlign();
	} else if (document.querySelector(".contents .system") == null) {
		$(".contents div label").addClass("labelDisabled");
	}
	
	if (document.querySelector(".configOption#showAllObjects input").checked
	&& document.querySelector(".contents .system") == null) {
		$(".contents").addClass("showAllObjects");
		$(".contents div label").hAlign();
	} else if (document.querySelector(".contents .system") == null) {
		$(".contents").removeClass("showAllObjects");
	}
	
	if (document.querySelector(".configOption#showAllObjectLabels input").checked
	&& document.querySelector(".contents .system") == null) {
		$(".contents").addClass("showAllObjectLabels");
		$(".contents div label").hAlign();
	} else if (document.querySelector(".contents .system") == null) {
		$(".contents").removeClass("showAllObjectLabels");
	}
	
	if (document.querySelector(".configOption#showInfocardedObjectLabels input").checked
	&& document.querySelector(".contents .system") == null) {
		$(".contents").addClass("showInfocardedObjectLabels");
		$(".contents div label").hAlign();
	} else if (document.querySelector(".contents .system") == null) {
		$(".contents").removeClass("showInfocardedObjectLabels");
	}

	//$(".system, .object").addClass("panzoom-exclude");
	
	generateTooltips();
	
	console.log("Config classes updated");
}

function generateSystemScale(system) {
	if (document.querySelector(".mapScale") != null) {
		currentSystem = system;
		if (document.querySelector(".configOption#scale input").checked) {
			$(".mapScale").addClass("arrows");
			baseSize = 30;
		} else {
			$(".mapScale").removeClass("arrows");
			baseSize = 27.5;
		}
		if (typeof systemScaleFactorArray[system.toLowerCase()] === "undefined") {
			document.querySelector(".mapScale h2").innerHTML = baseSize+"k";
		} else {
			document.querySelector(".mapScale h2").innerHTML = (Math.round(baseSize/systemScaleFactorArray[system.toLowerCase()]*10) / 10)+"K";
		}
	}
}

function generateLookupArrays() {
	/* contains all the AJAX .get requests responsible for generating the lookup arrays. */
	
	/* there is no case where caching would cause issues: the content for each mod directory is static. */
	$.ajaxSetup({
		cache: true
	});
	
	/* systemNameArray and systemClassArray reference internal nicknames to system names and classes (i.e. houses). */
	/* systemClassArray and systemNameFile are a bit special, as systemNameFile is not automagically generated; 
	there is no resource to do so, so these are set in special_systems.txt in the current data directory. */
	$.get(systemNameFile, function(data) {
		var nameArray = data.split("\n");
		for (i = 0; i < nameArray.length; i++) { 
			var keyPairArray = nameArray[i].split(" = ");
			systemNameArray[keyPairArray[0].toLowerCase()] = keyPairArray[1];
			systemClassArray[keyPairArray[0].toLowerCase()] = keyPairArray[1].toString().slice(0,2).toLowerCase();
		}
		systemNameArrayState = "ready";
		console.log("System nickname lookup array generated");
	});
	
	/* commodityNameArray references internal nicknames to commodity names. */
	$.get(commodityFile, function(data) {
		commodityFileGetResult = data.replace(commentRegex,"");
		var commodityArray = commodityFileGetResult.match(commodityRegex);
		for (i = 0; i < commodityArray.length; i++) {
			if (commodityArray[i].toLowerCase().indexOf("nickname =") != -1 && commodityArray[i].toLowerCase().indexOf("ids_name =") != -1) {
				var idsNameString = commodityArray[i].toLowerCase().match(idsNameRegex).join().substring(11);
				var nameString = commodityArray[i].toLowerCase().match(nameRegex).join().substring(11);
				commodityNameArray[nameString.toLowerCase()] = idsNameString;
			}
		}
		
		console.log("Commodity nickname lookup array generated");
	});
	
	/* factionNameArray references internal nicknames to faction name infocards. */
	$.get(initialWorldFile, function(data) {
		intialWorldFileGetResult = data.replace(commentRegex,"");
		var groupArray = intialWorldFileGetResult.match(groupRegex);
		for (i = 0; i < groupArray.length; i++) {
			if (groupArray[i].toLowerCase().indexOf("nickname =") != -1 && groupArray[i].toLowerCase().indexOf("ids_name =") != -1) {
				var idsNameString = groupArray[i].toLowerCase().match(idsNameRegex).join().substring(11);
				var nameString = groupArray[i].toLowerCase().match(nameRegex).join().substring(11);
				factionNameArray[nameString.toLowerCase()] = idsNameString;
			}
		}
		
		console.log("Faction nickname lookup array generated");
	});
	
	/* infocardMapArray lists any extra infocards associated with each infocard. */
	/* This is used for base and planet descriptions, which occasionally use another infocard for 
	block text in addition to the main infocard with "technical data" or similar content. */
	$.get(infocardMapFile, function(data) {
		var mapArray = data.replace(commentRegex,"").match(infocardMapRegex);
		for (i = 0; i < mapArray.length; i++) { 
			var lookupString = mapArray[i].split("=");
			var keyPairArray = lookupString[1].replace(/ /g,"").split(",");
			infocardMapArray[keyPairArray[0].toLowerCase()] = keyPairArray[1];
		}
		console.log("Infocard map lookup array generated");
	});
	
	/* infocardMapArray references infocard IDS numbers to infocards. */
	$.get(infocardFile, function(data) {
		var rawInfocardArray = data.replace(/\r/g,"").split("\n");
		for (i = 0; i < rawInfocardArray.length-1; i += 2) { 
			infocardArray[rawInfocardArray[i].toString()] = rawInfocardArray[i+1].toString();
		}
		infocardArrayState = "ready";
		console.log("Infocard lookup array generated");
	});
	
	/* systemPathArray lists systems connected to the input system (by jump gate or jump hole). */
	$.get(systemPathFile, function(data) {
		var rawPathFileArray = data.replace(/\r/g,"").split("\n");
		for (i = 0; i < rawPathFileArray.length; i++) { 
			if (rawPathFileArray[i].indexOf("Path =") != -1) {
				var currentConnection = rawPathFileArray[i].match(pathRegex).join().substring(7).replace(/ /g,"").split(",");
				if (typeof currentConnection[3] !== "undefined") {
					var lowCurrentConnection = currentConnection[0].trim().toLowerCase();
					if (typeof connectionArray[lowCurrentConnection] == "undefined") {
						connectionArray[lowCurrentConnection] = [currentConnection[3].trim().toLowerCase()];
					}
					if (connectionArray[lowCurrentConnection].indexOf(currentConnection[3].trim().toLowerCase()) == -1) {
						connectionArray[lowCurrentConnection].push(currentConnection[3].trim().toLowerCase());
					}
				}
			}
		}
		connectionArrayState = "ready";
		console.log("Connection lookup array generated");
	});
	
	/* jgConnectionArray lists systems connected to the input system (by jump gate only). */
	$.get(systemLegalPathFile, function(data) {
		var rawLegalPathFileArray = data.replace(/\r/g,"").split("\n");
		for (i = 0; i < rawLegalPathFileArray.length; i++) { 
			if (rawLegalPathFileArray[i].indexOf("Path =") != -1) {
				var currentConnection = rawLegalPathFileArray[i].match(pathRegex).join().substring(7).replace(/ /g,"").split(",");
				if (typeof currentConnection[3] !== "undefined") {
					var lowCurrentConnection = currentConnection[0].trim().toLowerCase();
					if (typeof jgConnectionArray[lowCurrentConnection] == "undefined") {
						jgConnectionArray[lowCurrentConnection] = [currentConnection[3].trim().toLowerCase()];
					}
					if (jgConnectionArray[lowCurrentConnection].indexOf(currentConnection[3].trim().toLowerCase()) == -1) {
						jgConnectionArray[lowCurrentConnection].push(currentConnection[3].trim().toLowerCase());
					}
				}
			}
		}
		jgConnectionArrayState = "ready";
		console.log("Jumpgate connection lookup array generated");
	});
	
	/* solarArchArray maps object solarArch attributes to object textures. */
	/* This is a fun one! It's only used for planets so far, 
	and is used for applying whichever texture 01.jpg happens to be to the planet in question. 
	01.jpg is the result of a bulk rename option run on the exported textures, as there is no 
	lookup array to the correct name of the texture inside each .utf file - they are originally
	relatively randomly named, so bulk renaming is just a somewhat cheap solution to ensure that
	the script finds at least one of the textures in the relevant folder. The drawback of this is
	that it is random whether it finds the up/down/left/right/bottom/top face of the planet texture,
	but it's not really a noticeable problem nor one that's fixable easily. */
	$.get(solarArchFile, function(data) {
		var solarArray = data.replace(commentRegex,"").match(solarRegex);
		for (i = 0; i < solarArray.length; i++) {
			if (solarArray[i].toLowerCase().match(nameRegex)) {
				var nicknameString = solarArray[i].toLowerCase().match(nameRegex).join().substring(11);
				var solarArchObject = {};
				
				if (solarArray[i].toLowerCase().match(textureRegex) && solarArray[i].toLowerCase().match(nameRegex).join().indexOf("planet_") != -1) {
					var textureFileString = solarArray[i].toLowerCase().match(textureRegex)[0].replace(textureFluffStringRegex,"");
					solarArchObject.texturePath = planetTextureRootPath + textureFileString + "/01.jpg";
				}
				
				if (solarArray[i].toLowerCase().match(solarTypeRegex)) {
					solarArchObject.type = solarArray[i].toLowerCase().match(solarTypeRegex)[1];
				}
				
				if (solarArray[i].toLowerCase().match(solarRadiusRegex)) {
					solarArchObject.radius = solarArray[i].toLowerCase().match(solarRadiusRegex)[1];
				}
				
				if (solarArray[i].toLowerCase().match(solarShapeRegex)) {
					solarArchObject.shape = solarArray[i].toLowerCase().match(solarShapeRegex)[1];
				}
				
				solarArchArray[nicknameString.toLowerCase()] = solarArchObject;
			}
		}
		solarArchArrayState = "ready";
		console.log("Solar Archetype lookup array generated");
	});
	
	/* systemIdsNameArray maps system nicknames to IDS infocard numbers for their in-game names. */
	/* systemPosArray maps system nicknames to their positions on the in-game universe map.
	Please note that some of these are overidden manually by using CSS or by replacing
	their positions in systemPosArray after generation, as seen with system ev01 below. */
	/* systemScaleFactorArray maps system nicknames to their respective system navmap scale factors. */
	$.get(universeFile, function(data) {
		universeFileGetResult = data.replace(commentRegex,"");
		var universeArray = universeFileGetResult.match(systemRegex);
		for (i = 0; i < universeArray.length; i++) {
			if (universeArray[i].toLowerCase().indexOf("strid_name =") != -1) {
				var sysNameIds = universeArray[i].toLowerCase().match(idsSysNameRegex).join().substring(13);
				var nameString = universeArray[i].toLowerCase().match(nameRegex).join().substring(11);
				systemIdsNameArray[nameString.toLowerCase()] = sysNameIds;
			}
			if (universeArray[i].toLowerCase().indexOf("pos =") != -1) {
				var sysPos = universeArray[i].toLowerCase().match(posRegex).join().substring(6).replace(/ /g,"").split(",");
				var nameString = universeArray[i].toLowerCase().match(nameRegex).join().substring(11);
				systemPosArray[nameString.toLowerCase()] = sysPos;
			}
			if (universeArray[i].toLowerCase().indexOf("navmapscale") != -1) {
				var scaleFactor = universeArray[i].toLowerCase().match(scaleRegex).join().substring(14);
				var nameString = universeArray[i].toLowerCase().match(nameRegex).join().substring(11);
				systemScaleFactorArray[nameString.toLowerCase()] = parseFloat(scaleFactor);
			}
		}
		/* manually moved systems, usually oorp/removed ones */
		/* 0,0 in upper left corner, first coordinate is x and second is y */
		systemPosArray["li09"] = [7,9.25];
		systemPosArray["ew15"] = [2,-1];

		systemIdsNameArrayState = "ready";
		systemScaleFactorArrayState = "ready";
		systemPosArrayState = "ready";
		console.log("System scale lookup array generated");
		console.log("Universe map position lookup array generated");
		console.log("System name infocard number lookup array generated");
	});
	generateSearchArray();
}

function generateSearchArray() {
	/* generates the search lookup array used for the search box and map links. */
	if (infocardArrayState != "ready" || systemIdsNameArrayState != "ready") {
		setTimeout(function(){generateSearchArray()},10);
	} else {
		/* add system names to search array */


		for (systemNickname in systemIdsNameArray) {
			if (systemNickname.toLowerCase().indexOf("sector") == -1) {
				try {
					matchArray.push(infocardArray[systemIdsNameArray[systemNickname]]);
					searchArray[infocardArray[systemIdsNameArray[systemNickname]]] = systemNickname;
					searchArray[infocardArray[systemIdsNameArray[systemNickname]].toLowerCase()] = systemNickname;
				} catch(e) {
					console.log("Could not add " + systemNickname);
				}
			}
		}

		/* add base names to search array */
		var universeBaseArray = universeFileGetResult.match(baseRegex);
		for (i = 0; i < universeBaseArray.length; i++) {
			if (universeBaseArray[i].toLowerCase().indexOf("proxy_base") == -1 
			&& universeBaseArray[i].toLowerCase().indexOf("miners") == -1
			&& universeBaseArray[i].toLowerCase().indexOf("system =") != -1
			&& universeBaseArray[i].toLowerCase().indexOf("strid_name") != -1
			&& !universeBaseArray[i].toLowerCase().match(ignoreObjectRegex)) {
				var baseName = infocardArray[universeBaseArray[i].toLowerCase().match(idsSysNameRegex).join().substring(13)];
				var systemNickname = universeBaseArray[i].toLowerCase().match(sysNameRegex).join().substring(9);
				if (typeof baseName !== "undefined" && typeof systemNickname !== "undefined") {
					baseSystemArray[baseName.toLowerCase()] = systemNickname.toLowerCase();
					matchArray.push(baseName);
					searchArray[baseName] = systemNickname;
					searchArray[baseName.toLowerCase()] = systemNickname;
				} else {
					console.log(universeBaseArray[i] + "Found a base without a defined system and base name with infocardNumber: "+universeBaseArray[i].toLowerCase().match(idsSysNameRegex).join().substring(13) + " and systemNick "+ systemNickname);
				}
			}
		}
		searchArray["Omicron Major"] = "st03";
		searchArray["omicron major"] = "st03";
		/* temp. manual fixes for duplicate stations */
		searchArray["Livadia Shipyard"] = "ew06";
		searchArray["livadia shipyard"] = "ew06";
		searchArray["Freeport 15"] = "rh09";
		searchArray["freeport 15"] = "rh09";
		searchArray["Battleship Amenta"] = "ew02";
		searchArray["battleship amenta"] = "ew02";
		
		searchArrayState = "ready";
		console.log("Base system lookup array generated");
		baseSystemArrayState = "ready";
		console.log("Search array generated");
	}
}

function parseInfocard(infocard) {
	/* Parses an MSXML infocard into displayable HTML. */
	/* Note: This currently ignores all formatting, and requires a rework. */
	if (infocard.toLowerCase().indexOf("<text>") == -1) {
		return infocard;
	} else {
		return infocard.toString().match(textRegex).map(function (textElement) { 
			if (textElement.toLowerCase().indexOf("<para") != -1) {
				return "<br class='infocardBreak'>";
			} else {
				return "<span class='infocardText'>"+textElement.slice(6,-7)+"</span>";
			}
		}).join("");
	}
}

function closeModal() {
	/* Used on the up/close button for the infocard container. */
	updateFragment("q",longSystemName);
	/*history.replaceState(longSystemName, "Discovery Navmap for "+longSystemName, "#"+encodeURI(longSystemName));*/
	$(".infocardContainer").remodal().close();
}

function showObjectInfo(idsNameNumber, idsInfoNumber, classString, zPosition, factionNickname, systemNickname, dynamicCommodity, dynamicDifficulty, dynamicCount, nickname) {
	/* Used to generate content for the infocard container when an object or zone is clicked. */
	$(".highlighter").remove();
	if (typeof searchArray[infocardArray[idsNameNumber]] !== "undefined" 
	&& searchArray[infocardArray[idsNameNumber]].toLowerCase() == currentSystemNickname.toLowerCase()) {
		updateFragment("q",infocardArray[idsNameNumber]);
		/*history.replaceState(longSystemName, "Discovery Navmap for "+longSystemName, "#"+encodeURI(infocardArray[idsNameNumber]));*/
	} else {
		updateFragment("q",longSystemName);
		/*history.replaceState(longSystemName, "Discovery Navmap for "+longSystemName, "#"+encodeURI(longSystemName));*/
	}
	if (clickHandlersEnabled) {
		var scaleFactor = 1;
		if (typeof systemScaleFactorArray[systemNickname] !== "undefined") {
			scaleFactor = parseFloat(systemScaleFactorArray[systemNickname]);
		}
		var planePosition;
		if (zPosition == 0) {
			planePosition = "on";
		} else if (zPosition > 0) {
			planePosition = (Math.round(parseFloat(zPosition)/(scaleFactor*1000)*10) / 10)+"K above";
		} else if (zPosition < 0) {
			planePosition = (Math.round(parseFloat(zPosition)/(scaleFactor*1000)*-10) / 10)+"K below";
		} else { 
			// :)))
			planePosition = "non-standard in relation to";
		}
		if (typeof factionNickname !== "undefined") {
			var ownerString = " It belongs to "+infocardArray[factionNameArray[factionNickname]]+".";
		} else {
			var ownerString = "";
		}
		var infoString = "";
		var miningString = "";
		var scrollUpString = "<div class='scrollUpButton' onclick='closeModal()'><i class='fa fa-times'></i><p>Close</p></div>";
		if (typeof dynamicCommodity !== "undefined") {
			if (dynamicCount.indexOf("1, 1") == -1) {
				amountString = dynamicCount.replace(/\s/g, '').split(",").join(" to ")+" units";
			} else {
				amountString = "one unit";
			}
			var commodityName = dynamicCommodity;
			var commodityArrayName = infocardArray[commodityNameArray[dynamicCommodity.toLowerCase()]];
			if (typeof commodityArrayName !== "undefined") {
				commodityName = commodityArrayName;
			}
			miningString = "<p>This zone drops "+amountString+" of the commodity "+commodityName+" when mined using <a id='miningLink' href='https://discoverygc.com/forums/showthread.php?tid=155629' target='_BLANK'>appropriate equipment</a>.</p>";
		}
		if (typeof idsInfoNumber !== "undefined") {
			if (typeof infocardMapArray[(parseInt(idsInfoNumber)).toString()] !== "undefined" && typeof infocardArray[infocardMapArray[(parseInt(idsInfoNumber)).toString()]] !== "undefined") { 
				var infocardURI = encodeURI(infocardArray[infocardMapArray[(parseInt(idsInfoNumber)).toString()]]);
				document.querySelector(".infocardContainer").innerHTML = "<h2>"+infocardArray[idsNameNumber]+"</h2>"+parseInfocard(infocardArray[idsInfoNumber])+parseInfocard(infocardArray[infocardMapArray[(parseInt(idsInfoNumber)).toString()]])+"<h3>Technical info</h3>"+miningString+"<p class='technicalInfo'>This object with internal nickname "+nickname+" is located "+planePosition+" the plane, and has name infocard number "+idsNameNumber+", infocard number "+idsInfoNumber+" and base description infocard number "+(parseInt(idsInfoNumber)+1).toString()+"."+ownerString+" "+"<a class='editLink' target='_blank'><i class='fa fa-pencil-square-o'></i></a></p>"+scrollUpString;
				document.querySelector(".editLink").href = "https://docs.google.com/forms/d/1bIYtQCx0lLgguEF6xWDm0RRFr0IIz-tM1Toh6SyB9wA/viewform?entry.515729986="+(parseInt(idsInfoNumber)+1).toString()+"&entry.628548621="+infocardURI+"&entry.899322418="+infocardURI;
			} else {
				var infocardURI = encodeURI(infocardArray[idsInfoNumber]);
				document.querySelector(".infocardContainer").innerHTML = "<h2>"+infocardArray[idsNameNumber]+"</h2>"+parseInfocard(infocardArray[idsInfoNumber])+"<h3>Technical info</h3>"+miningString+"<p  class='technicalInfo'>This object with internal nickname "+nickname+" is located "+planePosition+" the plane, and has name infocard number "+idsNameNumber+" and infocard number "+idsInfoNumber+"."+ownerString+" "+"<a class='editLink' target='_blank'><i class='fa fa-pencil-square-o'></i></a></p>"+scrollUpString;
				document.querySelector(".editLink").href = "https://docs.google.com/forms/d/1bIYtQCx0lLgguEF6xWDm0RRFr0IIz-tM1Toh6SyB9wA/viewform?entry.515729986="+idsInfoNumber+"&entry.628548621="+infocardURI+"&entry.899322418="+infocardURI;
			}
		} else if (typeof dynamicCommodity !== "undefined") {
			document.querySelector(".infocardContainer").innerHTML = miningString+scrollUpString;
		}
		console.log("Infocard "+idsInfoNumber+" for "+infocardArray[idsNameNumber]+" fetched");
		$(".remodal.infocardContainer").remodal().open();
		document.querySelector(".remodal-wrapper").scrollTo(0, 0);
	}
}

function findObjectName(internalNickname, classString) {
	/* Attempts to return an object name based on internal nickname if one cannot be determined by IDS number. */
	if (typeof classString !== "undefined" && typeof internalNickname !== "undefined" && classString.indexOf("jump") != -1) {
		if (classString.indexOf("hole") != -1) {
			var jumpSystems = internalNickname.slice(0,-5).split("_to_");
			/*return systemNameArray[jumpSystems[0].toLowerCase()] + " > " + systemNameArray[jumpSystems[1].toLowerCase()] + " Jump Hole";*/
			return "Jump Hole";
		} else {
			var jumpSystems = internalNickname.split("_to_");
			/* return systemNameArray[jumpSystems[0].toLowerCase()] + " > " + systemNameArray[jumpSystems[1].toLowerCase()] + " Jump Gate"; */
			return "Jump Gate";
		}
	}
	
	return internalNickname + " (int)";
}

function createLoadAnimation() {
	/* Adds the loading overlay. Used on page state transitions and the first load. */
	if (document.querySelector(".loadingOverlay") == null) {
		panzoom.reset();
		var loader = document.createElement("div");
		loader.innerHTML = "<div class='loadTextContainer'><h2 class='loaderTitle'>Loading...</h2><div class='loader'></div></div>";
		loader.className = "loadingOverlay";
		document.querySelector("body").appendChild(loader);
	}
}

$.extend($.expr[":"], {
	/* case-insensitive contains filter */
	"containsNC": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});

function createHighlightAnimation(element) {
	/* Adds and sets the animation used to highlight search results or linking to objects. */
	$(".highlighter").remove();
	console.log("Attempted to create highlight for " + element);
	if ($(element).length) {
		var highlight = document.createElement("div");
		highlight.className = "highlighter";
		element.append(highlight);
		requestAnimationFrame(
			function(){
				var scale = panzoom.getScale();
				var x = element.offset().left;
				var y = element.offset().top + map.getBoundingClientRect().top;
				panzoom.zoomToPoint(1.25,
					{
						clientX: x,
						clientY: y
					},
					{
						animate: true
					}
				);
			}
		);
		$(".highlighter").mouseover(function() {
			$(".highlighter").remove();
		});
	}
}

function generateUniverseMap() {
	/* Generates the... Well, you get the idea. The rest of the code might be worse. */
	createLoadAnimation();
	document.querySelector(".navContainer #showUniverseMap").style.display = "none";
	$(".grid").children().hide();
	document.querySelector(".mapLegend").style.display = "block";
	document.querySelector(".navContainer #helpLink").style.display = "block";
	document.querySelector("#navSystemTitle").style.display = "none";
	if (currentSystemNickname != "Sirius") {
		updateFragment("q","");
		/*history.replaceState("Sirius", "Discovery Navmap", ".");*/
	}
	/* checks to see if the map needs generate system connections or not. */
	if (document.querySelector(".configOption#connections  input").checked) {
		if (systemConnectionState = "ready") {
			var systemConnectionsEvaluated = true;
		} else {
			var systemConnectionsEvaluated = false;
		}
	} else {
		var systemConnectionsEvaluated = true;
	}
	
	if (infocardArrayState != "ready" || systemScaleFactorArrayState != "ready" || searchArrayState != "ready" || systemConnectionsEvaluated != true || systemNameArrayState != "ready") {
		setTimeout(function(){generateUniverseMap()},10);
	} else {
		if (document.querySelector(".configOption#connections input").checked) {
			$(".systemConnectionProp").show();
		}
		document.querySelector(".loaderTitle").innerHTML = "Generating map...";
		document.querySelector("#searchField").value = "";
		currentSystemNickname = "Sirius";
		document.querySelector(".grid").style.background = "url('./images/SiriusMap.jpg') black";
		document.querySelector(".grid").style.backgroundSize = "cover !important";
		/* empty the map div before doing anything else */
		$(".contents").children().not(".systemConnectionProp").remove();
		while (document.querySelector(".infocardContainer").firstChild) {
			document.querySelector(".infocardContainer").removeChild(document.querySelector(".infocardContainer").firstChild);
		}
		$(".remodal.infocardContainer").remodal().close();
		if (document.querySelector(".systemTitle") == null) {
			var systemTitle = document.createElement("h2");
			document.querySelector(".grid").appendChild(systemTitle);
		} else {
			var systemTitle = document.querySelector(".systemTitle");
			$(".systemTitle").show();
		}
		if (document.querySelector(".darkOverlay") == null) {
			var darkOverlay = document.createElement("div");
			darkOverlay.className = "darkOverlay";
			document.querySelector(".grid").appendChild(darkOverlay);
		}
		if (document.querySelector(".mapScale") != null) {
			document.querySelector(".grid").removeChild(document.querySelector(".mapScale"));
		}
		systemTitle.innerHTML = "Sirius";
		systemTitle.className = "systemTitle";
		/* add all systems to the map */
		for (var systemName in systemPosArray) {
			if (systemPosArray.hasOwnProperty(systemName)) {
				if (typeof systemIdsNameArray[systemName] !== "undefined" && systemName.toLowerCase().indexOf("sector") == -1) {
					var system = document.createElement("div");
					system.dataset.systemNickname = systemName;
					system.className = "system " + systemClassArray[systemName.toLowerCase()];
					var systemLabel = document.createElement("label");
					systemLabel.innerHTML = infocardArray[systemIdsNameArray[systemName.toLowerCase()]];
					system.appendChild(systemLabel);
					if (oorpArray.indexOf(systemName) != -1) {
						system.className += " oorp";
					}
					system.style.top = parseFloat(systemPosArray[systemName][1])*6.6-50 + "%";
					system.style.left = parseFloat(systemPosArray[systemName][0])*6.6-50  + "%";
					system.style.position = "absolute";
					document.querySelector(".contents").appendChild(system);
					system.addEventListener("click", function() {
						generateMap(this.dataset.systemNickname);
					});
				}
			}
		}

		$(".system").hover(
			function() { 
				var internalNickname = $(this).attr("data-system-nickname");
				$("[data-connected-points*=" + internalNickname + "] > .systemConnectionProp").addClass("highlightedConnection");
			},
			function() {
				$(".highlightedConnection").removeClass("highlightedConnection");
			}
		);

		console.log("Universe map generated");
		updateConfigClasses();
		$(".contents div label").hAlign();
		document.querySelector("body").removeChild(document.querySelector(".loadingOverlay"));
		universeMapState = "ready";
		/* check for search field input once we're done generating the map, just in case we missed anything. */
		$("#searchField").keyup();
	}
}

function generateSystemConnections() {
	if (document.querySelector(".systemConnectionProp") == null && document.querySelector(".configOption#connections  input").checked) {
		if (systemPosArrayState != "ready" || connectionArrayState != "ready" || jgConnectionArrayState != "ready") {
			setTimeout(function(){generateSystemConnections()},10);
		} else {
			for (var system in connectionArray) {
				if (connectionArray.hasOwnProperty(system)) {
					for (i = 0; i < connectionArray[system].length; i++) {
						if (typeof systemPosArray[system] !== "undefined" 
						&& typeof systemPosArray[connectionArray[system][i]] !== "undefined") {
							if (document.querySelector("[data-connected-points~="+connectionArray[system][i]+"]"+"[data-connected-points~="+system+"]") == null) {
								x1 = parseFloat(systemPosArray[system][1])*6.6-50;
								x2 = parseFloat(systemPosArray[connectionArray[system][i]][1])*6.6-50;
								y1 = parseFloat(systemPosArray[system][0])*6.6-50;
								y2 = parseFloat(systemPosArray[connectionArray[system][i]][0])*6.6-50;
								var propClass = "systemConnectionProp";
								if (oorpArray.indexOf(system) != -1 || oorpArray.indexOf(connectionArray[system][i]) != -1) {
									propClass += " oorp";
								}
								var connection = new Line(x1, x2, y1, y2, "systemConnection oneWayConnection", propClass, ".contents", system, connectionArray[system][i]);
							} else {
								/* if this code is run twice for the same systems, we've got a two-way connection: remove the oneWayConnection class. */
								$("[data-connected-points~="+connectionArray[system][i]+"]"+"[data-connected-points~="+system+"]").removeClass("oneWayConnection").addClass("twoWayConnection");
							}
						}
					}
				}
			}
			for (var system in jgConnectionArray) {
				if (jgConnectionArray.hasOwnProperty(system)) {
					for (i = 0; i < jgConnectionArray[system].length; i++) {
						if (typeof systemPosArray[system] !== "undefined" 
						&& typeof systemPosArray[jgConnectionArray[system][i]] !== "undefined") {
							var currentSystemSelector = document.querySelector("[data-connected-points~="+jgConnectionArray[system][i]+"]"+"[data-connected-points~="+system+"]");
							if (currentSystemSelector == null) {
								x1 = parseFloat(systemPosArray[system][1])*6.6-50;
								x2 = parseFloat(systemPosArray[jgConnectionArray[system][i]][1])*6.6-50;
								y1 = parseFloat(systemPosArray[system][0])*6.6-50;
								y2 = parseFloat(systemPosArray[jgConnectionArray[system][i]][0])*6.6-50;
								var propClass = "systemConnectionProp jgConnection";
								if (oorpArray.indexOf(system) != -1 || oorpArray.indexOf(jgConnectionArray[system][i]) != -1) {
									propClass += " oorp";
								}
								var connection = new Line(x1, x2, y1, y2, "systemConnection", propClass, ".contents", system, connectionArray[system][i]);
							} else if (currentSystemSelector.className.indexOf("jgConnection") == -1) {
								currentSystemSelector.className += " jgConnection";
							}
						}
					}
				}
			}
			systemConnectionState = "ready";
			updateConfigClasses();
		}
	}
}

function generateMap(system) {
	if (infocardArrayState != "ready" || systemScaleFactorArrayState != "ready" || searchArrayState != "ready" || document.querySelector(".loadingOverlay") !== null) {
		setTimeout(function(){generateMap(system)},10);
	} else {
		createLoadAnimation();
		document.querySelector(".navContainer #showUniverseMap").style.display = "block";
		document.querySelector("#navSystemTitle").style.display = "block";
		document.querySelector(".navContainer #helpLink").style.display = "none";
		$(".grid").children().show();
		$(".systemConnectionProp").hide();
		document.querySelector(".mapLegend").style.display = "none";
		document.querySelector(".loaderTitle").innerHTML = "Generating map...";
		document.querySelector("#searchField").value = "";
		currentSystemNickname = system;
		if (document.querySelector(".darkOverlay") != null) {
			var darkOverlay = document.createElement("div");
			darkOverlay.classname = "darkOverlay";
			document.querySelector(".grid").removeChild(document.querySelector(".darkOverlay"));
		}
		document.querySelector(".grid").style.background = "black";
		// to-do: parse system ini locations from universe.ini to avoid issues like this
		if (system.toLowerCase() == "fp7_system") {
			var systemFile = dataRootPath+"universe/systems/fp7/fp7_system.ini";
		} else {
			var systemFile = dataRootPath+"universe/systems/"+system+"/"+system+".ini";
		}
		if (typeof systemScaleFactorArray[system.toLowerCase()] === "undefined") {
			systemScaleFactor = 1;
		} else {
			systemScaleFactor = systemScaleFactorArray[system.toLowerCase()];
		}
		// empty the map div before doing anything else
		$(".contents").children().not(".systemConnectionProp").remove();
		while (document.querySelector(".infocardContainer").firstChild) {
			document.querySelector(".infocardContainer").removeChild(document.querySelector(".infocardContainer").firstChild);
		}
		if (document.querySelector(".mapScale") == null) {
			var mapScale = document.createElement("div");
			var mapScaleNumber = document.createElement("h2");
			var mapScaleArrowLeft = document.createElement("div");
			var mapScaleArrowRight = document.createElement("div");
			mapScaleArrowLeft.className = "arrowHead arrowL";
			mapScaleArrowRight.className = "arrowHead arrowR";
			mapScale.className = "mapScale";
			mapScale.appendChild(mapScaleArrowRight);
			mapScale.appendChild(mapScaleArrowLeft);
			mapScale.appendChild(mapScaleNumber);
			document.querySelector(".grid").appendChild(mapScale);
		}
		generateSystemScale(system);
		$(".remodal.infocardContainer").remodal().close();
		if (document.querySelector(".systemTitle") == null) {
			var systemTitle = document.createElement("h2");
		} else {
			var systemTitle = document.querySelector(".systemTitle");
			document.querySelector(".grid").appendChild(systemTitle);
		}
		longSystemName = infocardArray[systemIdsNameArray[system.toLowerCase()]];
		systemTitle.innerHTML = longSystemName;
		_gaq.push(["_trackEvent","mapModule","generated map for",longSystemName,0]);
		document.querySelector(".contents").dataset.systemNickname = system.toLowerCase();
		document.querySelector("#navSystemTitle").innerHTML = "Current System: " + longSystemName;
		systemTitle.className = "systemTitle";
		var posArray = [];
		var nameArray = [];
		sysLootableZoneArray = {};
		$.get(systemFile, function(unsanitizedData) {
			var data = unsanitizedData.replace(commentRegex,"");
			var sysAmbientObject = data.match(ambientRegex);
			if (sysAmbientObject.join().indexOf("color") != -1) {
				var ambientColourString = sysAmbientObject.join().match(colourRegex).join().substring(8).replace(/ /g,"");
				var ambientColourArray = ambientColourString.split(",");
				var ambientColourString = "rgb("+parseInt(ambientColourArray[0]*0.3)+","+parseInt(ambientColourArray[1]*0.3)+","+parseInt(ambientColourArray[2]*0.3)+")";
				document.querySelector(".grid").style.background = ambientColourString;
			}
			//grab lootable field files
			var asteroidsArray = {};
			asteroidsURIArray = {};
			if (data.indexOf("[Asteroids]") != -1) {
				var sysAsteroidsArray = data.match(asteroidsRegex);
				for (i = 0; i < sysAsteroidsArray.length; i++) {
					if (sysAsteroidsArray[i].indexOf("file") != -1 && sysAsteroidsArray[i].indexOf("zone") != -1) {
						var asteroidsDataArray = sysAsteroidsArray[i].split("\n");
						var asteroidsNickname = asteroidsDataArray[2].split(" = ")[1].toLowerCase();
						var asteroidsURI = asteroidsDataArray[1].split(" = ")[1];
						asteroidsURIArray[asteroidsNickname] = dataRootPath+asteroidsURI.replace(/\\/g,"/").toLowerCase();
					}
				}
				activeAsteroidGetRequests = 0;
				for (var asteroidsNickname in asteroidsURIArray) {
					// most satisfying solution I've seen in years. two lines providing a scope for keeping the iteration variable fixes /everything/ that was wrong.
					(function(asteroidsNickname) {
						activeAsteroidGetRequests += 1;
						console.log("Getting asteroid file for "+asteroidsNickname);
						$.get(asteroidsURIArray[asteroidsNickname], function(unsanitizedData) {
							var rawData = unsanitizedData.replace(commentRegex,"");
							zoneNicknameRegex.lastIndex = 0;
							activeAsteroidGetRequests -= 1;
							var lootableZones = rawData.match(lootableZoneRegex);
							for (zoneNumber in lootableZones) {
								var data = lootableZones[zoneNumber];
								if (data.indexOf("[LootableZone]") != -1 
								&& ((data.indexOf("dynamic_loot_commodity = ") != -1 || data.indexOf("asteroid_loot_commodity = ") != -1)) && data.match(lootableZoneRegex)) {
									// you've got loot and I want it now.
									console.log("You've got loot and I want it now.");
									var lootableZoneNickname = "";
									lootableZoneRegex.lastIndex = 0;
									var lootableZoneArray = data.match(lootableZoneRegex).join();
									if  (lootableZoneArray.indexOf("zone = ") == -1) {
										lootableZoneNickname = asteroidsNickname;
										console.log("Using asteroidsNickname: "+asteroidsNickname);
									} else {
										lootableZoneNickname = lootableZoneArray.match(zoneNicknameRegex)[0].substring(7);
										console.log("Using found zone nickname: "+lootableZoneNickname);
									}
									if (data.indexOf("dynamic_loot_commodity = ") != -1) {
										var lootableZoneDynamicCommodity = lootableZoneArray.match(lootableZoneDynamicCommodityRegex)[0].substring(25);
										var lootableZoneDynamicCount = lootableZoneArray.match(lootableZoneDynamicCountRegex)[0].substring(21);
										var lootableZoneDynamicDifficulty = lootableZoneArray.match(lootableZoneDynamicDifficultyRegex)[0].substring(26);
										if (typeof sysLootableZoneArray[lootableZoneNickname.toLowerCase()] == "undefined") {
											sysLootableZoneArray[lootableZoneNickname.toLowerCase()] = [lootableZoneDynamicCommodity, lootableZoneDynamicCount, lootableZoneDynamicDifficulty];
										} else {
											sysLootableZoneArray[lootableZoneNickname.toLowerCase()].push([lootableZoneDynamicCommodity, lootableZoneDynamicCount, lootableZoneDynamicDifficulty]);
										}
									}
									if (data.indexOf("asteroid_loot_commodity = ") != -1) {
										var lootableZoneAsteroidCommodity = lootableZoneArray.match(lootableZoneAsteroidCommodityRegex)[0].substring(25);
										var lootableZoneAsteroidCount = lootableZoneArray.match(lootableZoneAsteroidCountRegex)[0].substring(21);
										var lootableZoneAsteroidDifficulty = lootableZoneArray.match(lootableZoneAsteroidDifficultyRegex)[0].substring(26);
										if (typeof sysLootableZoneArray[lootableZoneNickname.toLowerCase()] == "undefined") {
											sysLootableZoneArray[lootableZoneNickname.toLowerCase()] = [].push([lootableZoneAsteroidCommodity, lootableZoneAsteroidCount, lootableZoneAsteroidDifficulty]);
										} else {
											sysLootableZoneArray[lootableZoneNickname.toLowerCase()].push([lootableZoneAsteroidCommodity, lootableZoneAsteroidCount, lootableZoneAsteroidDifficulty]);
										}
									}
								}
							}
						});
					})(asteroidsNickname);
				}
			}
			// generate zones
			var sysZoneArray = data.match(zoneRegex);
			if (sysZoneArray !== null) {
				for (i = 0; i < sysZoneArray.length; i++) {
					try {
						var nameString = sysZoneArray[i].match(nameRegex).join().substring(11);
						if (asteroidsURIArray[nameString.toLowerCase()]  != null || sysZoneArray[i].indexOf("66170") == -1) {
							var zoneName;
							var zone = document.createElement("div");
							zone.className += "zone";
							zone.dataset.internalNickname = nameString.toLowerCase();
							if (sysZoneArray[i].indexOf("ids_name") != -1) {
								var idsNameNumber = sysZoneArray[i].match(idsNameRegex).join().substring(11);
								zone.dataset.idsName = idsNameNumber;
								zoneName = infocardArray[idsNameNumber];
							} else {
								zone.className += " noName";
							}
							var zoneLabel = document.createElement("label");
							zoneLabel.innerHTML = zoneName;
							zone.appendChild(zoneLabel);
							var posString = sysZoneArray[i].match(posRegex).join().substring(6).replace(/ /g,"");
							var zonePosArray = posString.split(",");
							zone.style.top = parseFloat(zonePosArray[2])/2000*systemScaleFactor + "%";
							zone.style.left = parseFloat(zonePosArray[0])/2000*systemScaleFactor + "%";
							zone.dataset.zPos = zonePosArray[1]*systemScaleFactor;
							zone.style.position = "absolute";
							if (sysZoneArray[i].indexOf("ids_info") != -1 && sysZoneArray[i].match(idsInfoRegex)) {
								var idsInfoNumber = sysZoneArray[i].match(idsInfoRegex).join().substring(11);
								zone.dataset.idsInfo = idsInfoNumber;
								zone.addEventListener("click", function(event) {
									if (hasNotPannedRecently()) {
										showInfoEventHandler(this);
									}
								});
							} else {
								zone.className += " noInfo";
							}
							if (sysZoneArray[i].indexOf("rotate") != -1) {
								var rotateString = sysZoneArray[i].match(rotationRegex).join().substring(10).replace(/ /g,"");
								var zoneRotateArray = rotateString.split(",");
								var rotationSign = 1;
								if(parseInt(zoneRotateArray[0]) == -180 || parseInt(zoneRotateArray[0]) == 180) {
									rotationSign = -1*rotationSign;
								}
								/*if(parseFloat(zoneRotateArray[2]) == -180 || parseFloat(zoneRotateArray[2]) == 180) {
									rotationSign = -1*rotationSign;
								}*/
								zone.style.transform = "rotate("+-rotationSign*parseFloat(zoneRotateArray[1])+"deg)";
								zone.style.webkitTransform = "rotate("+-rotationSign*parseFloat(zoneRotateArray[1])+"deg)";
								zoneLabel.style.transform = "rotate("+rotationSign*parseFloat(zoneRotateArray[1])+"deg)";
								zoneLabel.style.webkitTransform = "rotate("+rotationSign*parseFloat(zoneRotateArray[1])+"deg)";
							}
							var sizeString = sysZoneArray[i].match(sizeRegex).join().substring(7).replace(/ /g,"");
							var zoneSizeArray = sizeString.split(",");
							// 131072: exclusion zone type 2, these are weird
							if (sysZoneArray[i].indexOf("131072") != -1) {
								zone.style.height = systemScaleFactor*parseFloat(zoneSizeArray[2])/2000 + "%";
								zone.style.width = systemScaleFactor*parseFloat(zoneSizeArray[0])/2000 + "%";
							} else {
								zone.style.height = systemScaleFactor*parseFloat(zoneSizeArray[2])/1000 + "%";
								zone.style.width = systemScaleFactor*parseFloat(zoneSizeArray[0])/1000 + "%";
							}
							zone.style.zIndex = Math.floor(-systemScaleFactor*parseFloat(zoneSizeArray[2])/1000*systemScaleFactor*parseFloat(zoneSizeArray[0])/1000);
							if (sysZoneArray[i].toLowerCase().indexOf("ellipsoid") != -1) {
								zone.className += " roundZone";
							} else if (sysZoneArray[i].toLowerCase().indexOf("sphere") != -1) {
								zone.style.height = zone.style.width;
								zone.className += " roundZone";
							} else if (sysZoneArray[i].toLowerCase().indexOf("cylinder") != -1) {
								zone.className += " cylinderZone";
							} else if (sysZoneArray[i].toLowerCase().indexOf("box") != -1) {
								zone.className += " boxZone";
							}
							if (sysZoneArray[i].indexOf("property_fog_color") != -1) {
								var fogColourString = sysZoneArray[i].match(fogColourRegex).join().substring(21).replace(/ /g,"");
								var fogColourArray = fogColourString.split(",");
								var fogColourString = "rgba("+parseInt(fogColourArray[0])+","+parseInt(fogColourArray[1])+","+parseInt(fogColourArray[2])+",0.45)";
								zone.style.backgroundColor = fogColourString;
							}
							if (sysZoneArray[i].indexOf("property_flags") != -1) {
								var zoneTypeNumber = sysZoneArray[i].match(zoneTypeRegex).join().substring(17).replace(/ /g,"");
								zone.className += " "+zoneFlagArray[zoneTypeNumber];
							} else {
								zone.className += " noZoneType";
							}
							if (sysZoneArray[i].indexOf("131072") != -1) {
								zone.style.marginTop = -systemScaleFactor*parseFloat(zoneSizeArray[2])/4000 + "%";
								zone.style.marginLeft = -systemScaleFactor*parseFloat(zoneSizeArray[0])/4000 + "%";
							} else {
								zone.style.marginTop = -systemScaleFactor*parseFloat(zoneSizeArray[2])/2000 + "%";
								zone.style.marginLeft = -systemScaleFactor*parseFloat(zoneSizeArray[0])/2000 + "%";
							}
							if (sysZoneArray[i].toLowerCase().indexOf("sphere") != -1) {
								zone.style.marginTop  = zone.style.marginLeft;
								zone.style.zIndex = Math.floor(-systemScaleFactor*parseFloat(zoneSizeArray[0])/1000*systemScaleFactor*parseFloat(zoneSizeArray[0])/1000);
							}
							document.querySelector(".contents").appendChild(zone);
						}
					} catch(error) {
						console.warn("Could not add zone!");
						console.log(sysZoneArray[i]);
						console.error(error);
					}
				}
			}	
			
			// generate objects
			var sysObjectArray = data.match(objectRegex);
			if (sysObjectArray !== null) {
				for (i = 0; i < sysObjectArray.length; i++) {
					try {
						if (sysObjectArray[i].toLowerCase().match(ignoreObjectRegex)) {
							continue;
						}
						var objectName;
						var object = document.createElement("div");
						var posString = sysObjectArray[i].match(posRegex).join().substring(6).replace(/ /g,"");
						var nameString = sysObjectArray[i].match(nameRegex).join().substring(11);
						object.dataset.internalNickname = nameString.toLowerCase();
						var objectClasses = getObjectClasses(sysObjectArray[i]);
						if (sysObjectArray[i].indexOf("ids_name") != -1) {
							var idsNameNumber = sysObjectArray[i].match(idsNameRegex).join().substring(11);
							object.dataset.idsName = idsNameNumber;
							objectName = infocardArray[idsNameNumber];
						} else {
							objectName = findObjectName(nameString, objectClasses);
							if (objectName.indexOf("???") != -1 && objectClasses.indexOf("tradelane") == -1) {
								object.style.display = "none";
							}
						}
						var objectLabel = document.createElement("label");
						objectLabel.innerHTML = objectName;
						object.appendChild(objectLabel);
						if (sysObjectArray[i].indexOf("ids_info") != -1 && sysObjectArray[i].match(idsInfoRegex)) {
							var idsInfoNumber = sysObjectArray[i].match(idsInfoRegex).join().substring(11);
							object.dataset.idsInfo = idsInfoNumber;
							object.addEventListener("click", function() {
								if (hasNotPannedRecently()) {
									if (this.className.indexOf("jump") != -1 && typeof this.dataset.jumpDest !== "undefined" && this.className.indexOf("unusableJump") == -1) {
										generateMap(this.dataset.jumpDest);
									} else {
										showObjectInfo(this.dataset.idsName, this.dataset.idsInfo, this.className, this.dataset.zPos, this.dataset.reputation, document.querySelector(".contents").dataset.systemNickname, undefined, undefined, undefined, this.dataset.internalNickname);
									}
								}
							});
						} else if (sysObjectArray[i].match(gotoRegex) && objectClasses.indexOf("unusableJump") == -1) {
							object.addEventListener("click", function() {
								if (hasNotPannedRecently()) {
									generateMap(this.dataset.jumpDest);
								}
							});
						}
						var objectPosArray = posString.split(",");
						object.style.top = parseFloat(objectPosArray[2])/2000*systemScaleFactor + "%";
						object.style.left = parseFloat(objectPosArray[0])/2000*systemScaleFactor + "%";
						object.dataset.zPos = objectPosArray[1]*systemScaleFactor;
						object.style.position = "absolute";
						object.className = objectClasses;
						document.querySelector(".contents").appendChild(object);
						if (sysObjectArray[i].indexOf("rotate =") != -1 && object.className.indexOf("tradelane") != -1) {
							var rotateString = sysObjectArray[i].match(rotationRegex).join().substring(9).replace(/ /g,"");
							var objectRotateArray = rotateString.split(",");
							if (sysObjectArray[i].indexOf("ga_lane") != -1) {
								object.style.transform = "rotate("+(-parseFloat(objectRotateArray[0]))+"deg)";
								object.style.webkitTransform = "rotate("+(-parseFloat(objectRotateArray[0]))+"deg)";
							} else {
								object.style.transform = "rotate("+(-parseFloat(objectRotateArray[1]))+"deg)";
								object.style.webkitTransform = "rotate("+(-parseFloat(objectRotateArray[1]))+"deg)";
							}
						}
						if (object.className.indexOf("jump") != -1 && sysObjectArray[i].match(gotoRegex)) {
							object.dataset.jumpDest = sysObjectArray[i].match(gotoRegex).join().substring(7).replace(/ /g,"").split(",")[0].toLowerCase();
						}
						if (sysObjectArray[i].indexOf("reputation =") != -1) {
							object.dataset.reputation = sysObjectArray[i].match(repRegex).join().substring(13);
						}
						if (sysObjectArray[i].indexOf("archetype") != -1) {
							var objectArchetype = sysObjectArray[i].match(archetypeRegex).join().substring(12).replace(/ /g,"");
							object.dataset.archetype = objectArchetype;
							if (typeof solarArchArray[objectArchetype] !== "undefined") {
								if (typeof solarArchArray[objectArchetype].texturePath !== "undefined") {
									object.style.backgroundImage = "url("+solarArchArray[objectArchetype].texturePath+")";
								}
								if (typeof solarArchArray[objectArchetype].radius !== "undefined" && (object.className.indexOf("star") != -1 || object.className.indexOf("planet") != -1)) {
									var rawObjectRadius = parseFloat(solarArchArray[objectArchetype].radius);
									var objectRadius = parseFloat(solarArchArray[objectArchetype].radius/2000*systemScaleFactor);
									object.dataset.radius = solarArchArray[objectArchetype].radius;
									object.style.width = objectRadius*2 + "%";
									object.style.height = objectRadius*2 + "%";
									object.style.marginTop = -objectRadius + "%";
									object.style.marginLeft = -objectRadius + "%";
									object.style.zIndex = Math.floor(-objectRadius*2);
								}
							}
						}
						if (objectRadius && sysObjectArray[i].indexOf("atmosphere_range =") != -1) {
							if (object.className.indexOf("star") != -1 || object.className.indexOf("planet") != -1) {
								var atmosphere = document.createElement("div");
								var rawAtmosphereRadius = parseFloat(sysObjectArray[i].match(atmosphereRadiusRegex).join().substring(19));
								var atmosphereRadius = 50*rawAtmosphereRadius/rawObjectRadius;
								
								atmosphere.className = "atmosphere";
								atmosphere.style.top = "50%";
								atmosphere.style.left = "50%";
								atmosphere.style.marginTop = -atmosphereRadius + "%";
								atmosphere.style.marginLeft = -atmosphereRadius + "%";
								atmosphere.style.position = "absolute";
								
								atmosphere.style.width = atmosphereRadius*2 + "%";
								atmosphere.style.height = atmosphereRadius*2 + "%";
								
								atmosphere.style.zIndex = -1;
								
								object.style.zIndex = Math.floor(-rawAtmosphereRadius/2000*systemScaleFactor);
								
								object.appendChild(atmosphere);
								
								if (rawAtmosphereRadius < rawObjectRadius*1.25 || (objectRadius < 2 && rawAtmosphereRadius < rawObjectRadius*1.5)) {
									atmosphere.style.display = "none";
								}
							}
						}
						
						if (sysObjectArray[i].indexOf("burn_color") != -1) {
							var burnColourString = sysObjectArray[i].match(burnColourRegex).join().substring(13).replace(/ /g,"");
							var burnColourArray = burnColourString.split(",");
							var burnColourString = "rgb("+parseInt(burnColourArray[0])+","+parseInt(burnColourArray[1])+","+parseInt(burnColourArray[2])+")";
							object.style.backgroundColor = burnColourString;
							if (object.className.indexOf("star") != -1) {
								object.style.boxShadow += " "+burnColourString;
								if (atmosphere) {
									atmosphere.style.boxShadow += " "+burnColourString;
								}
							}
						}
						if (object.className == "object") {
							object.className = "object unclassified";
						}
					} catch(error) {
						console.warn("Could not add object!");
						console.log(sysObjectArray[i]);
						console.error(error);
					}
				}
			}
			
			console.log("Map for "+system+" generated");
			$(".contents div label").hAlign();
			addLootableZoneData();
			// wait for asteroid get requests to finish
			removeLoadingOverlayWhenReady();
			$("#searchField").keyup();
			updateConfigClasses();
			if (lastSearch !== undefined && lastSearch !== "already used") {
				updateFragment("q",lastSearch);
				/*history.replaceState(longSystemName, "Discovery Navmap for "+longSystemName, "#"+encodeURI(lastSearch));*/
				createHighlightAnimation($(".mapContainer").find(".object label").filter(function() {
					return $(this).text().toLowerCase() === lastSearch.toLowerCase();
				}).parent());
				lastSearch = "already used";
			} else {
				updateFragment("q",longSystemName);
				/*history.replaceState(longSystemName, "Discovery Navmap for "+longSystemName, "#"+encodedSystemName);*/
			}
		});
	}
}

function removeLoadingOverlayWhenReady() {
	if (activeAsteroidGetRequests > 0) {
		setTimeout(function(){removeLoadingOverlayWhenReady();},10);
		document.querySelector(".loaderTitle").innerHTML = "Fetching field data... ("+activeAsteroidGetRequests+" left)";
	} else {
		document.querySelector("body").removeChild(document.querySelector(".loadingOverlay"));
		if (document.querySelector(".configOption#labelMove input").checked) {
			/* I'm almost sad that this hack for waiting for the page to render the mineable object labels to paint actually works. */
			setTimeout(function(){objectTerritorialConflictResolver($(".contents label:visible"));}, 0);
		}
		updateConfigClasses();
	}
}

function showInfoEventHandler(currentObject) {
	showObjectInfo(currentObject.dataset.idsName, currentObject.dataset.idsInfo, currentObject.className, currentObject.dataset.zPos, currentObject.dataset.reputation, document.querySelector(".contents").dataset.systemNickname, currentObject.dataset.dynamicCommodity, currentObject.dataset.dynamicDifficulty, currentObject.dataset.dynamicCount, currentObject.dataset.internalNickname);
}

function addLootableZoneData() {
	if (activeAsteroidGetRequests !== 0) {
		setTimeout(function(){addLootableZoneData();},10);
	} else {
		console.log("Adding lootable zones");
		for (var zoneNickname in sysLootableZoneArray) {
			zoneNickname = zoneNickname.toLowerCase();
			if (document.querySelector("[data-internal-nickname="+zoneNickname+"] label") !== null) {
				console.log("Adding lootable zone "+zoneNickname);
				var currentZone = document.querySelector("[data-internal-nickname="+zoneNickname+"]");
				var currentZoneLabel = document.querySelector("[data-internal-nickname="+zoneNickname+"] label");
				var mineIcon = '<svg class="mineableIcon" id="Слой_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M256.001,6C117.928,6,6,117.929,6,256c0,138.071,111.928,250,250.001,250  C394.072,506,506,394.071,506,256C506,117.929,394.072,6,256.001,6z M217.135,399.953c-1.43,3.027-5.043,4.315-8.068,2.881  l-32.872-15.559c-3.022-1.43-4.311-5.041-2.881-8.066l8.401-17.02c1.133,0.677,2.166,1.252,3.045,1.667  c8.685,4.096,29.274,7.318,44.631,9.271L217.135,399.953z M294.363,291.966c-2.992,6.319-10.547,9.021-16.873,6.029  c6.326,2.992,9.029,10.546,6.034,16.87c-2.992,6.321-10.547,9.023-16.873,6.029c6.326,2.994,9.028,10.544,6.032,16.868  c-2.991,6.324-10.548,9.021-16.87,6.029c6.323,2.992,9.028,10.546,6.032,16.87c-2.481,5.242-8.091,7.934-13.538,7.018l-0.007,0.056  c0,0-47.308-4.48-60.319-10.61c-0.008-0.007-0.015-0.008-0.028-0.016c-7.87-3.725-30.067-21.676-40.265-30.074  c-3.42-2.823-6.494-6.006-9.171-9.547c-1.74-2.305-5.301-5.199-7.909-6.434l-42.835-20.277c-5.457-2.584-8.383-8.585-7.046-14.469  c4.223-18.568,12.183-37.279,28.923-60.216c3.645-4.995,10.298-6.7,15.889-4.053l39.03,18.478  c10.448,4.945,27.898,5.808,38.78,1.918l6.535-2.334c4.491-1.606,11.68-1.249,15.99,0.79l7.516,3.56  c1.277,0.601,1.824,2.134,1.223,3.409l-2.233,4.72c-2.14,8.37,5.245,14.681,15.448,19.51c13.981,6.618,33.247,10.454,40.505,13.004  C294.655,278.088,297.355,285.64,294.363,291.966z M430.383,263.831c-1.004,0.586-2.281,0.384-3.056-0.482  c-30.99-34.623-67.257-63.727-108.513-86.006l-39.883,87.315c-8.446-2.268-19.427-5.299-27.916-9.317  c-4.489-2.126-11.708-6.194-11.494-10.263l42.138-85.371c-43.573-17.951-89.281-27.625-135.923-29.657  c-1.164-0.054-2.127-0.914-2.313-2.062c-0.181-1.144,0.469-2.263,1.556-2.674c52.527-19.817,106.815-22.695,156.165-5.084  l3.191-6.473c1.435-3.027,5.046-4.316,8.071-2.885l24.829,11.752c3.022,1.43,4.315,5.044,2.881,8.071l-3.03,6.634  c44.552,27.036,76.507,70.68,94.382,123.602C431.839,262.034,431.387,263.244,430.383,263.831z" style="fill:#FFFFFF;"/></svg>';
				if (currentZoneLabel.innerHTML.toLowerCase().indexOf("undefined") == -1) {
					currentZoneLabel.innerHTML += mineIcon;
				} else {
					currentZoneLabel.innerHTML = "Mineable Zone"+mineIcon;
				}
				currentZone.className += " mineable";
				currentZone.dataset.dynamicCommodity = sysLootableZoneArray[zoneNickname][0];
				currentZone.dataset.dynamicDifficulty = sysLootableZoneArray[zoneNickname][2];
				currentZone.dataset.dynamicCount = sysLootableZoneArray[zoneNickname][1];
				var eventData = $._data(this, 'events');
				if (!(eventData && eventData.click)) {
					currentZone.addEventListener("click", function() {
						if (hasNotPannedRecently()) {
							showInfoEventHandler(this);
						}
					});	
				}
			}
		}
	}
}

function getObjectClasses(objectString) {
	var nameString = objectString.match(nameRegex).join().substring(11);
	var baseRegex = /^\w+\d+_\d+$/g;
	var classArray = [];
	classArray.push("object");
	if (objectString.toLowerCase().indexOf("atmosphere_range =") != -1 && objectString.toLowerCase().indexOf("star =") == -1) {
		classArray.push("planet");
	} else if (objectString.toLowerCase().indexOf("base = ") != -1 || objectString.toLowerCase().indexOf("dock_with =") != -1) {
		classArray.push("base");
	}
	if (objectString.indexOf("base =") != -1) {
		classArray.push("dockable");
	}
	if (nameString.toLowerCase().indexOf("trade_lane") != -1 
	|| objectString.toLowerCase().indexOf("dsy_ga_lane") != -1 
	|| objectString.toLowerCase().indexOf("trade_lane_ring") != -1 
	|| objectString.toLowerCase().indexOf("next_ring =") != -1)  {
		classArray.push("tradelane");
	}
	if (objectString.indexOf("loadout =") != -1 && (nameString.toLowerCase().indexOf("wplatform") != -1 || objectString.toLowerCase().indexOf("261164") != -1)) {
		classArray.push("wPlatform");
	}
	
	/* the jumphole bit is required since we have some very silly jumpholes with loadouts in the mod. */
	if (objectString.indexOf("loadout =") != -1 && objectString.indexOf("reputation =") == -1 && objectString.toLowerCase().indexOf("archetype = jumphole") == -1) {
		/* hides unnamed wrecks */
		if (objectString.indexOf("ids_name") != -1) {
			classArray.push("wreck");
		}
	}
	if (nameString.toLowerCase().indexOf("proxy_base") != -1) {
		classArray.push("proxyBase");
	}
	if (nameString.toLowerCase().indexOf("_to_") != -1 || nameString.toLowerCase().indexOf("nomad_gate") != -1) {
		classArray.push("jump");
		if (nameString.toLowerCase().indexOf("_hole") != -1 || nameString.toLowerCase().indexOf("_jumphole") != -1 || objectString.toLowerCase().indexOf("archetype = jumphole") != -1) {
			classArray.push("hole");
		} else {
			classArray.push("gate");
		}
		if (!objectString.match(gotoRegex) || objectString.indexOf("505262") != -1 || nameString.indexOf("st03_to_fp7_jumphole_recv") != -1) {
			classArray.push("unusableJump");
		}
	}
	if (objectString.toLowerCase().indexOf("star =") != -1 && objectString.toLowerCase().indexOf("atmosphere_range =") != -1) {
		classArray.push("star");
	}
	if (objectString.toLowerCase().indexOf("_dock_ring") != -1) {
		classArray.push("dockingRing");
	}
	if (objectString.toLowerCase().indexOf("docking_fixture") != -1) {
		classArray.push("mooringFixture");
	}
	return classArray.join(" ");
}

function updateFragment(param,data) {
	if (window.location.hash.indexOf("=") == -1) {
		window.location.hash = "";
	}
	URIHash.set(param,data);
}

function checkURL() {
	if (searchArrayState != "ready" || universeMapState != "ready" || document.querySelector(".loadingOverlay") !== null) {
		setTimeout(function(){checkURL()},10);
	} else {
		if (window.location.hash) {
			try {				
				var noClick = (URIHash.get("noclick") === 'true');
				if (noClick) {
					clickHandlersEnabled = false;
				}
			}
			catch (e) {
				/* do nothing */
			}
			
			try {				
				var query = URIHash.get("q");
				lookupInputAndGenerateIfValid(query);				
			}
			catch (e) {
				/* for backwards compatibility with system/base-only URI fragment */
				var query = decodeURI(window.location.hash.substring(1));
				lookupInputAndGenerateIfValid(query);
			}
		}
	}
}

function lookupInputAndGenerateIfValid(query) {
	if (typeof searchArray[query] !== "undefined" && searchArray[query].toLowerCase() !== currentSystemNickname.toLowerCase()) {
		lastSearch = query;
		generateMap(searchArray[query]);
	}
}

function startSearchField() {
	if (searchArrayState != "ready") {
		setTimeout(function(){startSearchField()},10);
	} else {
		$("#searchField").autoComplete({
			minChars: 2,
			source: function(term, suggest){
				term = term.toLowerCase();
				var choices = matchArray;
				var matches = [];
				for (i=0; i<choices.length; i++) {
					if (~choices[i].toLowerCase().indexOf(term)) {
						matches.push(choices[i]);
					}
				}
				suggest(matches);
			},
			onSelect: function(e, term, item) {
				$("#searchField").keyup();
			}
		});
		
		$("#searchField").keyup(function(event) {
			if (event.keyCode != 38 && event.keyCode != 40) {
				var search = $.trim(this.value).toLowerCase();
				if ((search == "omega-5" || search == "freeport 1") && searchTimedOut == "nope") {
					setTimeout(function() {if (searchTimedOut == "yup") {$("#searchField").keyup();}}, 550);
					searchTimedOut = "yup";
				} else if (document.querySelector(".loadingOverlay") == null) {
					searchTimedOut = "nope";
					if (typeof searchArray[search] !== "undefined" && searchArray[search].toLowerCase() !== currentSystemNickname.toLowerCase()) {
						lastSearch = search;
						generateMap(searchArray[search]);
					} else if (typeof searchArray[search] !== "undefined" && searchArray[search].toLowerCase() == currentSystemNickname.toLowerCase()) {
						createHighlightAnimation($(".mapContainer").find(".object label").filter(function() {
							return $(this).text().toLowerCase() === search.toLowerCase();
						}).parent());
						document.querySelector("#searchField").value = "";
					}
				}
			}
		});
	}
}

(function ($) {
	$.fn.hAlign = function() {
		return this.each(function(i){
			var w = $(this).width();
			var ow = $(this).outerWidth();	
			var ml = (w + (ow - w)) / 2;	
			$(this).css("margin-left", "-" + ml + "px");
			$(this).css("left", "50%");
			$(this).css("position", "absolute");
		});
	};
})(jQuery);

var invertObject = function(object) {
	var invertedObject = {};
	for (var value in object) {
		if(object.hasOwnProperty(value)) {
			invertedObject[object[value]] = value;
		}
	}
	return invertedObject;
}

// line generator function
function Line(x1, x2, y1, y2, classString, propString, container, object1, object2) {
	var lineObject = document.createElement("div");
	var linePivot = document.createElement("div");
	var parent = document.querySelector(container);
	xDiff = (x1 - x2);
	yDiff = (y1 - y2);
	xAvg = (x1 + x2) / 2.000;
	yAvg = (y1 + y2) / 2.000;
	lineLength = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	linePivot.className = classString + " " + propString;
	linePivot.style.left = (yAvg) + "%";
	linePivot.style.top = (xAvg) + "%";
	linePivot.style.position = "absolute";
	linePivot.dataset.connectedPoints = object1 + " " + object2;
	lineObject.style.height = lineLength / 100 * parent.offsetHeight + "px";
	lineObject.style.transform = "translateY(-" + (lineLength / 200 * parent.offsetHeight) + "px)";
	lineObject.style.webkitTransform = "translateY(-" + (lineLength / 200 * parent.offsetHeight) + "px)";
	lineObject.style.position = "absolute";
	lineObject.className = propString;
	linePivot.style.transform = "rotate(" + (-Math.atan2(yDiff, xDiff)) + "rad)";
	linePivot.style.webkitTransform = "rotate(" + (-Math.atan2(yDiff, xDiff)) + "rad)";
	linePivot.appendChild(lineObject);
	document.querySelector(container).appendChild(linePivot);
}

function generateTooltips() {
	$( ".qtip" ).remove();
	$('.zone[data-z-pos][data-z-pos!=""][data-z-pos!=0], .object[data-z-pos][data-z-pos!=""][data-z-pos!=0], .object[data-ids-name]:has(label:hidden), .zone[data-ids-name]:has(label:hidden), .object.unclassified, .contents.showInternalNicknames [data-internal-nickname], .contents.showInternalNicknames [data-system-nickname]').qtip({
		content: {
			text: function(event, api) {
				var internalNicknameShown = false;
				var tooltipString = "";
				
				if ($(this).has("label:hidden").length !== 0 && typeof $(this).attr('data-ids-name') !== "undefined" && typeof infocardArray[$(this).attr('data-ids-name')] !== "undefined") {
					if (parseInfocard(infocardArray[$(this).attr('data-ids-name')]).trim() == "") {
						/* this is a trade lane or something else with a blank infocard. */
						if ($(this).hasClass("tradelane")) {
							tooltipString += "Trade Lane";
						} else {
							tooltipString += $(this).attr('data-internal-nickname');
							internalNicknameShown = true;
						}
					} else {
						tooltipString += parseInfocard(infocardArray[$(this).attr('data-ids-name')]);
					}
				} else if ($(this).hasClass("unclassified")) {
					tooltipString += $(this).attr('data-internal-nickname');
					internalNicknameShown = true;
				} else if ($(this).hasClass("playerShip")) {
					tooltipString += $(this).children("label").text();
				}
				if (typeof $(this).attr('data-z-pos') !== "undefined" && $(this).attr('data-z-pos') !== "0") {
					if (tooltipString !== "") {
						tooltipString += ", ";
					}
					var scaleFactor = 1;
					var systemNickname = document.querySelector(".contents").dataset.systemNickname;
					if (typeof systemScaleFactorArray[systemNickname] !== "undefined") {
						scaleFactor = parseFloat(systemScaleFactorArray[systemNickname]);
					}
					var zHeight = parseFloat((Math.round(parseFloat($(this).attr('data-z-pos'))/(scaleFactor*1000)*10) / 10).toFixed(2));
					if (zHeight > 0) {
						tooltipString += Math.abs(zHeight)+"K up";
					} else {
						tooltipString += Math.abs(zHeight)+"K down";
					}
				}
				
				if (document.querySelector(".contents.showInternalNicknames") && typeof $(this).data('internal-nickname') !== "undefined" && !internalNicknameShown) {
					tooltipString += " [" + $(this).data('internal-nickname') + "]";
				}
				if (document.querySelector(".contents.showInternalNicknames") && typeof $(this).data('system-nickname') !== "undefined") {
					tooltipString += " [" + $(this).data('system-nickname') + "]";
				}
				
				if (tooltipString !== "") {
					return tooltipString;
				}
			}
		},
		position: {
			viewport: $(".mapContainer"),
			container: $(".mapContainer"),
			my: 'bottom center',
			at: 'top center',
			adjust: {
				method: 'shift flip'
			},
			position: {
				container: $(".mapContainer"),
				target: 'event'
			}
		},
		style: {
			classes: 'qtip-dark qtip-shadow qtip-zMap',
			tip: {
				corner: true
			}
		}
	});
}

/* temp. object adding code begins */

function mapObject(objectClasses, posX, posY, posZ, rotX, rotY, rotZ, label) {
	console.log("rotX: "+rotX+"rotY: "+rotY+"rotZ: "+rotZ);
	var objectElement = document.createElement("div");
	objectElement.style.top = parseFloat(posX)/2000*systemScaleFactor + "%";
	objectElement.style.left = parseFloat(posZ)/2000*systemScaleFactor + "%";
	/*var rotSign = -Math.sign(rotX)*Math.sign(rotY);*/
	var rotCompensation = 0;
	var rotSign = 1;
	objectElement.style.transform = "rotate("+((rotSign*parseFloat(rotY)+rotCompensation))+"deg)";
	objectElement.style.webkitTransform = "rotate("+((rotSign*parseFloat(rotY)+rotCompensation))+"deg)";
	if(!!document.querySelector(".playerShip.previousLatestPos")) {
		var lastPos = document.querySelector(".playerShip.previousLatestPos");
		var xDiff = parseFloat(lastPos.style.top.slice(0,-1))*2000/systemScaleFactor - parseFloat(posX); console.log(xDiff);
		var zDiff = parseFloat(lastPos.style.left.slice(0,-1))*2000/systemScaleFactor - parseFloat(posZ); console.log(zDiff);
		var xAvg = (parseFloat(lastPos.style.top.slice(0,-1))*2000/systemScaleFactor + parseFloat(posX)) / 2.000;
		var zAvg = (parseFloat(lastPos.style.left.slice(0,-1))*2000/systemScaleFactor + parseFloat(posZ)) / 2.000;
		console.log(Math.atan2(zDiff, xDiff));
		objectElement.style.transform = "rotate(" + (-Math.atan2(zDiff, xDiff)) + "rad)";
		objectElement.style.webkitTransform = "rotate(" + (-Math.atan2(zDiff, xDiff)) + "rad)";
		/*if (zDiff <= 0) {
			rotSign = 1;
			rotCompensation = 180;
		} else {
			rotCompensation = 0;
			rotSign = -1;
		}*/
	}
	objectElement.dataset.zPos = posY*systemScaleFactor;
	objectElement.style.position = "absolute";
	objectElement.className = "object "+objectClasses;
	var objectLabel = document.createElement("label");
	objectLabel.style.display = "inline-block";
	objectLabel.style.transform = "rotate("+360-parseFloat(rotY)+"deg)";
	objectLabel.style.webkitTransform = "rotate("+360-parseFloat(rotY)+"deg)";
	objectLabel.style.transformOrigin = "right";
	objectLabel.style.webkitTransformOrigin = "right";
	objectLabel.innerHTML = label;
	objectElement.appendChild(objectLabel);
	if (objectClasses.indexOf("playerShip") !== -1) {
		objectElement.addEventListener("click", function(){
			$(this).qtip('destroy');
			$(this).remove();
		}); 
	}
	document.querySelector(".contents").appendChild(objectElement);
}

/* temp. object adding code ends */

/* fileReader code start */
var lastMapMatch = "";
var currentMapMatch = "";
var lastPosMatch = "";
var currentPosMatch = "";
var rawFile = "";
var isFirstRead = true;
var inputRegex = /\/map (.*)/g;
var positionRegex = /\] \/pos in .*[\n\r]+\[[^\]]*\] Position.*/g;
var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		rawFile = reader.result;
		var playerPosRegex = /\d\] Position ([^ ]*) ([^ ]*) ([^ ]*) Orient ([^ ]*) ([^ ]*) ([^ ]*)/g;
		try {
			currentMapMatch = rawFile.slice(rawFile.lastIndexOf("/map")).match(inputRegex)[0].slice(5);
		} catch(e){
			
		}
		try {
			currentPosMatch = rawFile.slice(rawFile.lastIndexOf("] /pos in ")).match(positionRegex)[0];
		} catch(e){
			
		}
		try {
			var playerPositionArrayExists = playerPosRegex.test(currentPosMatch);
		} catch(e){
			
		}
		try {
			var isProbablyDSAceLog = (rawFile.indexOf("] Freelancer Started") !== -1);
		} catch(e){
			
		}
		if (isProbablyDSAceLog) {
			$("body").addClass("fileReaderLoaded");
		} else {
			$("body").removeClass("fileReaderLoaded");
		}
		if (isFirstRead) {
			if (currentMapMatch !== null) {
				lastMapMatch = currentMapMatch;
			}
			if (currentPosMatch !== null) {
				lastPosMatch = currentPosMatch;
			}
			isFirstRead = false;
		}
		if (currentMapMatch != lastMapMatch && currentMapMatch !== null) {
			$(".configMenu").addClass("closed");
			lastMapMatch = currentMapMatch;
			var lowerCaseMatch = currentMapMatch.toLowerCase();
			if (lowerCaseMatch == "universe" || lowerCaseMatch == "sirius" || lowerCaseMatch == "universemap") {
				generateUniverseMap();
			} else if (lowerCaseMatch == "removehighlights" || lowerCaseMatch == "remove highlights") {
				$(".highlighter").remove();
			} else if (lowerCaseMatch == "scroll up" || lowerCaseMatch == "up") {
				$('html, body').animate({ scrollTop: 0}, 300);
			} else if (lowerCaseMatch == "scroll down" || lowerCaseMatch == "down") {
				$('html, body').animate({ scrollTop: $(document).height()}, 300);
			} else if (lowerCaseMatch == "removeships") { 
				$(".playerShip").remove();
			} else {
				document.querySelector("#searchField").value = currentMapMatch;
				$( "#searchField" ).keyup();
			}
		}
		if (currentPosMatch != lastPosMatch && currentPosMatch !== null && playerPositionArrayExists) {
			$(".configMenu").addClass("closed");
			lastPosMatch = currentPosMatch;
			document.querySelector("#searchField").value = currentPosMatch;
			$( "#searchField" ).keyup();
			var posSystemRegex = /\/pos in (.*)/g;
			var playerPosRegex = /\d\] Position ([^ ]*) ([^ ]*) ([^ ]*) Orient ([^ ]*) ([^ ]*) ([^ ]*)/g;
			var currentTimeRegex = /[\r\n]\[\d+\.\d+\.\d+ (\d+:\d+:\d+)\]/g;
			var posSystem = posSystemRegex.exec(currentPosMatch)[1].trim();
			var playerPositionArray = playerPosRegex.exec(currentPosMatch);
			var currentPositionTimestamp = currentTimeRegex.exec(currentPosMatch)[1];
			if (typeof searchArray[posSystem] !== "undefined" && searchArray[posSystem].toLowerCase() !== currentSystemNickname.toLowerCase()) {
				document.querySelector("#searchField").value = "";
				generateMap(searchArray[posSystem]);
				$(".highlighter").remove();
				$(".playerShip.previousLatestPos").removeClass("previousLatestPos");
				$(".playerShip.latestPos").addClass("previousLatestPos");
				$(".playerShip.latestPos").removeClass("latestPos");
				new mapObject("playerShip latestPos",playerPositionArray[3],playerPositionArray[2],playerPositionArray[1],playerPositionArray[4],playerPositionArray[5],playerPositionArray[6],currentPositionTimestamp);
				createHighlightAnimation($(".playerShip.latestPos"));
			} else if (typeof searchArray[posSystem] !== "undefined" && searchArray[posSystem].toLowerCase() == currentSystemNickname.toLowerCase()) {
				document.querySelector("#searchField").value = "";
				$(".highlighter").remove();
				$(".playerShip.previousLatestPos").removeClass("previousLatestPos");
				$(".playerShip.latestPos").addClass("previousLatestPos");
				$(".playerShip.latestPos").removeClass("latestPos");
				new mapObject("playerShip latestPos",playerPositionArray[3],playerPositionArray[2],playerPositionArray[1],playerPositionArray[4],playerPositionArray[5],playerPositionArray[6],currentPositionTimestamp);
				createHighlightAnimation($(".playerShip.latestPos"));
			}
			generateTooltips();
		}
	};
	reader.readAsText(input.files[0]);
	setInterval(function(){reader.readAsText(input.files[0]);},1000);
};
/* fileReader code end */

/* anti-overlap code start */
function objectTerritorialConflictResolver(objects) {
	var currentDiffSum = "nope";
	var prevDiffSum = "nope";
	var prevPrevDiffSum;
	var iterationCount = 1;
	while (prevPrevDiffSum != 0 && iterationCount < 8) {
		prevPrevDiffSum = prevDiffSum;
		prevDiffSum = currentDiffSum;
		currentDiffSum = 0;
		for (i = 0; i < objects.length; i++) {
			var objectArray = objects;
			var currentObject = objectArray[i];
			currentDiffSum += moveIfOverlapsAndReturnDiff(currentObject, objectArray);
		}
		iterationCount++;
	}
	console.log("Labels settled after "+iterationCount+" iterations");
}

function moveIfOverlapsAndReturnDiff(currentObject, objectArray) {
	var diffSum = 0;
	var reducedObjectArray = objectArray; //objectArray.splice(i, 1);
	for (o = 0; o < reducedObjectArray.length; o++) {
		if (overlaps(currentObject,reducedObjectArray[o]) && currentObject != reducedObjectArray[o]) {
			if ((currentObject.getBoundingClientRect().top) <= (reducedObjectArray[o].getBoundingClientRect().top)) {
				var currentTransform;
				if (reducedObjectArray[o].style.marginTop.match(/([\d\.]+)/g) && reducedObjectArray[o].style.marginTop.match(/([\d\.]+)/g)  != null) {
					currentTransform = parseFloat(reducedObjectArray[o].style.marginTop.match(/([\d\.]+)/g));
				} else {
					currentTransform = 0;
				}
				reducedObjectArray[o].style.marginTop = Math.abs(currentTransform+currentObject.getBoundingClientRect().bottom-reducedObjectArray[o].getBoundingClientRect().top)+"px";
				diffSum += Math.abs(currentObject.getBoundingClientRect().bottom-reducedObjectArray[o].getBoundingClientRect().top);
				/*moveIfOverlaps(reducedObjectArray[o], reducedObjectArray);*/
			} else {
				var currentTransform;
				if (currentObject.style.marginTop.match(/([\d\.]+)/g) && currentObject.style.marginTop.match(/([\d\.]+)/g)  != null) {
					currentTransform = parseFloat(currentObject.style.marginTop.match(/([\d\.]+)/g));
				} else {
					currentTransform = 0;
				}
				currentObject.style.marginTop = Math.abs(currentTransform+reducedObjectArray[o].getBoundingClientRect().bottom-currentObject.getBoundingClientRect().top)+"px";
				diffSum += Math.abs(reducedObjectArray[o].getBoundingClientRect().bottom-currentObject.getBoundingClientRect().top);
				/*moveIfOverlaps(currentObject, reducedObjectArray);*/
			}
		}
	}
	return diffSum;
}

function overlaps(objectA,objectB){
	var a = objectA.getBoundingClientRect();
	var b = objectB.getBoundingClientRect();
	
	var al = a.left;
	var ar = a.left+a.width;
	var bl = b.left;
	var br = b.left+b.width;
	
	var at = a.top;
	var ab = a.top+a.height;
	var bt = b.top;
	var bb = b.top+b.height;
	
	if(bl>ar || br<al){return false;} /*overlap not possible*/
	if(bt>ab || bb<at){return false;} /*overlap not possible*/
	
	if(bl>al && bl<ar){return true;}
	if(br>al && br<ar){return true;}
	
	if(bt>at && bt<ab){return true;}
	if(bb>at && bb<ab){return true;}
	
	return false;
}
/* anti-overlap code end */

(function($,sr){
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		
		return function debounced() {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				func.apply(obj, args);
				timeout = null;
			};
			
			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}
			
			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	
})(jQuery,'smartresize');

$(window).smartresize(function(){
	$(".systemConnection").remove();
	generateSystemConnections();
});

/*
*  Remodal - v1.1.1
*  http://vodkabears.github.io/remodal/
*
*  Made by Ilya Makarov
*  Under MIT License
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof exports?b(a,require("jquery")):b(a,a.jQuery||a.Zepto)}(this,function(a,b){"use strict";function c(a){if(w&&"none"===a.css("animation-name")&&"none"===a.css("-webkit-animation-name")&&"none"===a.css("-moz-animation-name")&&"none"===a.css("-o-animation-name")&&"none"===a.css("-ms-animation-name"))return 0;var b,c,d,e,f=a.css("animation-duration")||a.css("-webkit-animation-duration")||a.css("-moz-animation-duration")||a.css("-o-animation-duration")||a.css("-ms-animation-duration")||"0s",g=a.css("animation-delay")||a.css("-webkit-animation-delay")||a.css("-moz-animation-delay")||a.css("-o-animation-delay")||a.css("-ms-animation-delay")||"0s",h=a.css("animation-iteration-count")||a.css("-webkit-animation-iteration-count")||a.css("-moz-animation-iteration-count")||a.css("-o-animation-iteration-count")||a.css("-ms-animation-iteration-count")||"1";for(f=f.split(", "),g=g.split(", "),h=h.split(", "),e=0,c=f.length,b=Number.NEGATIVE_INFINITY;e<c;e++)d=parseFloat(f[e])*parseInt(h[e],10)+parseFloat(g[e]),d>b&&(b=d);return b}function d(){if(b(document).height()<=b(window).height())return 0;var a,c,d=document.createElement("div"),e=document.createElement("div");return d.style.visibility="hidden",d.style.width="100px",document.body.appendChild(d),a=d.offsetWidth,d.style.overflow="scroll",e.style.width="100%",d.appendChild(e),c=e.offsetWidth,d.parentNode.removeChild(d),a-c}function e(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)||(c=b(document.body),a=parseInt(c.css("padding-right"),10)+d(),c.css("padding-right",a+"px"),e.addClass(f))}}function f(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)&&(c=b(document.body),a=parseInt(c.css("padding-right"),10)-d(),c.css("padding-right",a+"px"),e.removeClass(f))}}function g(a,b,c,d){var e=k("is",b),f=[k("is",u.CLOSING),k("is",u.OPENING),k("is",u.CLOSED),k("is",u.OPENED)].join(" ");a.$bg.removeClass(f).addClass(e),a.$overlay.removeClass(f).addClass(e),a.$wrapper.removeClass(f).addClass(e),a.$modal.removeClass(f).addClass(e),a.state=b,!c&&a.$modal.trigger({type:b,reason:d},[{reason:d}])}function h(a,d,e){var f=0,g=function(a){a.target===this&&f++},h=function(a){a.target===this&&0===--f&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())};b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].on(r,g).on(s,h)}),a(),0===c(e.$bg)&&0===c(e.$overlay)&&0===c(e.$wrapper)&&0===c(e.$modal)&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())}function i(a){a.state!==u.CLOSED&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(b,c){a[c].off(r+" "+s)}),a.$bg.removeClass(a.settings.modifier),a.$overlay.removeClass(a.settings.modifier).hide(),a.$wrapper.hide(),f(),g(a,u.CLOSED,!0))}function j(a){var b,c,d,e,f={};for(a=a.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,","),b=a.split(","),e=0,c=b.length;e<c;e++)b[e]=b[e].split(":"),d=b[e][1],("string"==typeof d||d instanceof String)&&(d="true"===d||"false"!==d&&d),("string"==typeof d||d instanceof String)&&(d=isNaN(d)?d:+d),f[b[e][0]]=d;return f}function k(){for(var a=q,b=0;b<arguments.length;++b)a+="-"+arguments[b];return a}function l(){var a,c,d=location.hash.replace("#","");if(d){try{c=b('[data-remodal-id="'+d+'"]')}catch(e){}c&&c.length&&(a=b[p].lookup[c.data(p)],a&&a.settings.hashTracking&&a.open())}else n&&n.state===u.OPENED&&n.settings.hashTracking&&n.close()}function m(a,c){var d=b(document.body),e=d,f=this;f.settings=b.extend({},t,c),f.index=b[p].lookup.push(f)-1,f.state=u.CLOSED,f.$overlay=b("."+k("overlay")),null!==f.settings.appendTo&&f.settings.appendTo.length&&(e=b(f.settings.appendTo)),f.$overlay.length||(f.$overlay=b("<div>").addClass(k("overlay")+" "+k("is",u.CLOSED)).hide(),e.append(f.$overlay)),f.$bg=b("."+k("bg")).addClass(k("is",u.CLOSED)),f.$modal=a.addClass(q+" "+k("is-initialized")+" "+f.settings.modifier+" "+k("is",u.CLOSED)).attr("tabindex","-1"),f.$wrapper=b("<div>").addClass(k("wrapper")+" "+f.settings.modifier+" "+k("is",u.CLOSED)).hide().append(f.$modal),e.append(f.$wrapper),f.$wrapper.on("click."+q,'[data-remodal-action="close"]',function(a){a.preventDefault(),f.close()}),f.$wrapper.on("click."+q,'[data-remodal-action="cancel"]',function(a){a.preventDefault(),f.$modal.trigger(v.CANCELLATION),f.settings.closeOnCancel&&f.close(v.CANCELLATION)}),f.$wrapper.on("click."+q,'[data-remodal-action="confirm"]',function(a){a.preventDefault(),f.$modal.trigger(v.CONFIRMATION),f.settings.closeOnConfirm&&f.close(v.CONFIRMATION)}),f.$wrapper.on("click."+q,function(a){var c=b(a.target);c.hasClass(k("wrapper"))&&f.settings.closeOnOutsideClick&&f.close()})}var n,o,p="remodal",q=a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.NAMESPACE||p,r=b.map(["animationstart","webkitAnimationStart","MSAnimationStart","oAnimationStart"],function(a){return a+"."+q}).join(" "),s=b.map(["animationend","webkitAnimationEnd","MSAnimationEnd","oAnimationEnd"],function(a){return a+"."+q}).join(" "),t=b.extend({hashTracking:!0,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnOutsideClick:!0,modifier:"",appendTo:null},a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.DEFAULTS),u={CLOSING:"closing",CLOSED:"closed",OPENING:"opening",OPENED:"opened"},v={CONFIRMATION:"confirmation",CANCELLATION:"cancellation"},w=function(){var a=document.createElement("div").style;return void 0!==a.animationName||void 0!==a.WebkitAnimationName||void 0!==a.MozAnimationName||void 0!==a.msAnimationName||void 0!==a.OAnimationName}(),x=/iPad|iPhone|iPod/.test(navigator.platform);m.prototype.open=function(){var a,c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&(a=c.$modal.attr("data-remodal-id"),a&&c.settings.hashTracking&&(o=b(window).scrollTop(),location.hash=a),n&&n!==c&&i(n),n=c,e(),c.$bg.addClass(c.settings.modifier),c.$overlay.addClass(c.settings.modifier).show(),c.$wrapper.show().scrollTop(0),c.$modal.focus(),h(function(){g(c,u.OPENING)},function(){g(c,u.OPENED)},c))},m.prototype.close=function(a){var c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&c.state!==u.CLOSED&&(c.settings.hashTracking&&c.$modal.attr("data-remodal-id")===location.hash.substr(1)&&(location.hash="",b(window).scrollTop(o)),h(function(){g(c,u.CLOSING,!1,a)},function(){c.$bg.removeClass(c.settings.modifier),c.$overlay.removeClass(c.settings.modifier).hide(),c.$wrapper.hide(),f(),g(c,u.CLOSED,!1,a)},c))},m.prototype.getState=function(){return this.state},m.prototype.destroy=function(){var a,c=b[p].lookup;i(this),this.$wrapper.remove(),delete c[this.index],a=b.grep(c,function(a){return!!a}).length,0===a&&(this.$overlay.remove(),this.$bg.removeClass(k("is",u.CLOSING)+" "+k("is",u.OPENING)+" "+k("is",u.CLOSED)+" "+k("is",u.OPENED)))},b[p]={lookup:[]},b.fn[p]=function(a){var c,d;return this.each(function(e,f){d=b(f),null==d.data(p)?(c=new m(d,a),d.data(p,c.index),c.settings.hashTracking&&d.attr("data-remodal-id")===location.hash.substr(1)&&c.open()):c=b[p].lookup[d.data(p)]}),c},b(document).ready(function(){b(document).on("click","[data-remodal-target]",function(a){a.preventDefault();var c=a.currentTarget,d=c.getAttribute("data-remodal-target"),e=b('[data-remodal-id="'+d+'"]');b[p].lookup[e.data(p)].open()}),b(document).find("."+q).each(function(a,c){var d=b(c),e=d.data("remodal-options");e?("string"==typeof e||e instanceof String)&&(e=j(e)):e={},d[p](e)}),b(document).on("keydown."+q,function(a){n&&n.settings.closeOnEscape&&n.state===u.OPENED&&27===a.keyCode&&n.close()}),b(window).on("hashchange."+q,l)})});

/* jQuery autoComplete v1.0.6 - https://github.com/Pixabay/jQuery-autoComplete */
!function(e){e.fn.autoComplete=function(t){var o=e.extend({},e.fn.autoComplete.defaults,t);return"string"==typeof t?(this.each(function(){var o=e(this);"destroy"==t&&(e(window).off("resize.autocomplete",o.updateSC),o.off("blur.autocomplete focus.autocomplete keydown.autocomplete keyup.autocomplete"),o.data("autocomplete")?o.attr("autocomplete",o.data("autocomplete")):o.removeAttr("autocomplete"),e(o.data("sc")).remove(),o.removeData("sc").removeData("autocomplete"))}),this):this.each(function(){function t(e){var t=s.val();if(s.cache[t]=e,e.length&&t.length>=o.minChars){for(var a="",c=0;c<e.length;c++)a+=o.renderItem(e[c],t);s.sc.html(a),s.updateSC(0)}else s.sc.hide()}var s=e(this);s.sc=e('<div class="autocomplete-suggestions '+o.menuClass+'"></div>'),s.data("sc",s.sc).data("autocomplete",s.attr("autocomplete")),s.attr("autocomplete","off"),s.cache={},s.last_val="",s.updateSC=function(t,o){if(s.sc.css({top:s.offset().top+s.outerHeight(),left:s.offset().left,width:s.outerWidth()}),!t&&(s.sc.show(),s.sc.maxHeight||(s.sc.maxHeight=parseInt(s.sc.css("max-height"))),s.sc.suggestionHeight||(s.sc.suggestionHeight=e(".autocomplete-suggestion",s.sc).first().outerHeight()),s.sc.suggestionHeight))if(o){var a=s.sc.scrollTop(),c=o.offset().top-s.sc.offset().top;c+s.sc.suggestionHeight-s.sc.maxHeight>0?s.sc.scrollTop(c+s.sc.suggestionHeight+a-s.sc.maxHeight):0>c&&s.sc.scrollTop(c+a)}else s.sc.scrollTop(0)},e(window).on("resize.autocomplete",s.updateSC),s.sc.appendTo("body"),s.sc.on("mouseleave",".autocomplete-suggestion",function(){e(".autocomplete-suggestion.selected").removeClass("selected")}),s.sc.on("mouseenter",".autocomplete-suggestion",function(){e(".autocomplete-suggestion.selected").removeClass("selected"),e(this).addClass("selected")}),s.sc.on("mouseup",".autocomplete-suggestion",function(t){var a=e(this),c=a.data("val");(c||a.hasClass("autocomplete-suggestion"))&&(s.val(c),o.onSelect(t,c,a),s.sc.hide())}),s.on("blur.autocomplete",function(){try{over_sb=e(".autocomplete-suggestions:hover").length}catch(t){over_sb=0}over_sb?s.is(":focus")||s.focus():(s.last_val=s.val(),s.sc.hide())}),o.minChars||s.on("focus.autocomplete",function(){s.last_val="\n",s.trigger("keyup.autocomplete")}),s.on("keydown.autocomplete",function(t){if((40==t.which||38==t.which)&&s.sc.html()){var a,c=e(".autocomplete-suggestion.selected",s.sc);return c.length?(a=40==t.which?c.next(".autocomplete-suggestion"):c.prev(".autocomplete-suggestion"),a.length?(c.removeClass("selected"),s.val(a.addClass("selected").data("val"))):(c.removeClass("selected"),s.val(s.last_val),a=0)):(a=40==t.which?e(".autocomplete-suggestion",s.sc).first():e(".autocomplete-suggestion",s.sc).last(),s.val(a.addClass("selected").data("val"))),s.updateSC(0,a),!1}if(27==t.which)s.val(s.last_val).sc.hide();else if(13==t.which){var c=e(".autocomplete-suggestion.selected",s.sc);c.length&&(o.onSelect(t,c.data("val"),c),setTimeout(function(){s.sc.hide()},10))}}),s.on("keyup.autocomplete",function(a){if(!~e.inArray(a.which,[13,27,35,36,37,38,39,40])){var c=s.val();if(c.length>=o.minChars){if(c!=s.last_val){if(s.last_val=c,clearTimeout(s.timer),o.cache){if(c in s.cache)return void t(s.cache[c]);for(var l=1;l<c.length-o.minChars;l++){var i=c.slice(0,c.length-l);if(i in s.cache&&!s.cache[i].length)return void t([])}}s.timer=setTimeout(function(){o.source(c,t)},o.delay)}}else s.last_val=c,s.sc.hide()}})})},e.fn.autoComplete.defaults={source:0,minChars:3,delay:150,cache:1,menuClass:"",renderItem:function(e,t){var o=new RegExp("("+t.split(" ").join("|")+")","gi");return'<div class="autocomplete-suggestion" data-val="'+e+'">'+e.replace(o,"<b>$1</b>")+"</div>"},onSelect:function(e,t,o){}}}(jQuery);

/* qTip2 v2.2.1 | Plugins: tips viewport modal | Styles: core basic css3 | qtip2.com | Licensed MIT | Sun Aug 09 2015 06:46:07 */
!function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)}(function(d){"use strict";function e(a,b,c,e){this.id=c,this.target=a,this.tooltip=E,this.elements={target:a},this._id=R+"-"+c,this.timers={img:{}},this.options=b,this.plugins={},this.cache={event:{},target:d(),disabled:D,attr:e,onTooltip:D,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=D}function f(a){return a===E||"object"!==d.type(a)}function g(a){return!(d.isFunction(a)||a&&a.attr||a.length||"object"===d.type(a)&&(a.jquery||a.then))}function h(a){var b,c,e,h;return f(a)?D:(f(a.metadata)&&(a.metadata={type:a.metadata}),"content"in a&&(b=a.content,f(b)||b.jquery||b.done?b=a.content={text:c=g(b)?D:b}:c=b.text,"ajax"in b&&(e=b.ajax,h=e&&e.once!==D,delete b.ajax,b.text=function(a,b){var f=c||d(this).attr(b.options.content.attr)||"Loading...",g=d.ajax(d.extend({},e,{context:b})).then(e.success,E,e.error).then(function(a){return a&&h&&b.set("content.text",a),a},function(a,c,d){b.destroyed||0===a.status||b.set("content.text",c+": "+d)});return h?f:(b.set("content.text",f),g)}),"title"in b&&(d.isPlainObject(b.title)&&(b.button=b.title.button,b.title=b.title.text),g(b.title||D)&&(b.title=D))),"position"in a&&f(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&f(a.show)&&(a.show=a.show.jquery?{target:a.show}:a.show===C?{ready:C}:{event:a.show}),"hide"in a&&f(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&f(a.style)&&(a.style={classes:a.style}),d.each(Q,function(){this.sanitize&&this.sanitize(a)}),a)}function i(a,b){for(var c,d=0,e=a,f=b.split(".");e=e[f[d++]];)d<f.length&&(c=e);return[c||a,f.pop()]}function j(a,b){var c,d,e;for(c in this.checks)for(d in this.checks[c])(e=new RegExp(d,"i").exec(a))&&(b.push(e),("builtin"===c||this.plugins[c])&&this.checks[c][d].apply(this.plugins[c]||this,b))}function k(a){return U.concat("").join(a?"-"+a+" ":" ")}function l(a,b){return b>0?setTimeout(d.proxy(a,this),b):void a.call(this)}function m(a){this.tooltip.hasClass(_)||(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=l.call(this,function(){this.toggle(C,a)},this.options.show.delay))}function n(a){if(!this.tooltip.hasClass(_)&&!this.destroyed){var b=d(a.relatedTarget),c=b.closest(V)[0]===this.tooltip[0],e=b[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==b[0]&&"mouse"===this.options.position.target&&c||this.options.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(c||e))try{a.preventDefault(),a.stopImmediatePropagation()}catch(f){}else this.timers.hide=l.call(this,function(){this.toggle(D,a)},this.options.hide.delay,this)}}function o(a){!this.tooltip.hasClass(_)&&this.options.hide.inactive&&(clearTimeout(this.timers.inactive),this.timers.inactive=l.call(this,function(){this.hide(a)},this.options.hide.inactive))}function p(a){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(a)}function q(a,c,e){d(b.body).delegate(a,(c.split?c:c.join("."+R+" "))+"."+R,function(){var a=x.api[d.attr(this,T)];a&&!a.disabled&&e.apply(a,arguments)})}function r(a,c,f){var g,i,j,k,l,m=d(b.body),n=a[0]===b?m:a,o=a.metadata?a.metadata(f.metadata):E,p="html5"===f.metadata.type&&o?o[f.metadata.name]:E,q=a.data(f.metadata.name||"qtipopts");try{q="string"==typeof q?d.parseJSON(q):q}catch(r){}if(k=d.extend(C,{},x.defaults,f,"object"==typeof q?h(q):E,h(p||o)),i=k.position,k.id=c,"boolean"==typeof k.content.text){if(j=a.attr(k.content.attr),k.content.attr===D||!j)return D;k.content.text=j}if(i.container.length||(i.container=m),i.target===D&&(i.target=n),k.show.target===D&&(k.show.target=n),k.show.solo===C&&(k.show.solo=i.container.closest("body")),k.hide.target===D&&(k.hide.target=n),k.position.viewport===C&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new z(i.at,C),i.my=new z(i.my),a.data(R))if(k.overwrite)a.qtip("destroy",!0);else if(k.overwrite===D)return D;return a.attr(S,c),k.suppress&&(l=a.attr("title"))&&a.removeAttr("title").attr(bb,l).attr("title",""),g=new e(a,k,c,!!j),a.data(R,g),g}function s(a){return a.charAt(0).toUpperCase()+a.slice(1)}function t(a,b){var d,e,f=b.charAt(0).toUpperCase()+b.slice(1),g=(b+" "+qb.join(f+" ")+f).split(" "),h=0;if(pb[b])return a.css(pb[b]);for(;d=g[h++];)if((e=a.css(d))!==c)return pb[b]=d,e}function u(a,b){return Math.ceil(parseFloat(t(a,b)))}function v(a,b){this._ns="tip",this.options=b,this.offset=b.offset,this.size=[b.width,b.height],this.init(this.qtip=a)}function w(a,b){this.options=b,this._ns="-modal",this.init(this.qtip=a)}var x,y,z,A,B,C=!0,D=!1,E=null,F="x",G="y",H="width",I="height",J="top",K="left",L="bottom",M="right",N="center",O="flipinvert",P="shift",Q={},R="qtip",S="data-hasqtip",T="data-qtip-id",U=["ui-widget","ui-tooltip"],V="."+R,W="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),X=R+"-fixed",Y=R+"-default",Z=R+"-focus",$=R+"-hover",_=R+"-disabled",ab="_replacedByqTip",bb="oldtitle",cb={ie:function(){for(var a=4,c=b.createElement("div");(c.innerHTML="<!--[if gt IE "+a+"]><i></i><![endif]-->")&&c.getElementsByTagName("i")[0];a+=1);return a>4?a:0/0}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||D};y=e.prototype,y._when=function(a){return d.when.apply(d,a)},y.render=function(a){if(this.rendered||this.destroyed)return this;var b,c=this,e=this.options,f=this.cache,g=this.elements,h=e.content.text,i=e.content.title,j=e.content.button,k=e.position,l=("."+this._id+" ",[]);return d.attr(this.target[0],"aria-describedby",this._id),f.posClass=this._createPosClass((this.position={my:k.my,at:k.at}).my),this.tooltip=g.tooltip=b=d("<div/>",{id:this._id,"class":[R,Y,e.style.classes,f.posClass].join(" "),width:e.style.width||"",height:e.style.height||"",tracking:"mouse"===k.target&&k.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":D,"aria-describedby":this._id+"-content","aria-hidden":C}).toggleClass(_,this.disabled).attr(T,this.id).data(R,this).appendTo(k.container).append(g.content=d("<div />",{"class":R+"-content",id:this._id+"-content","aria-atomic":C})),this.rendered=-1,this.positioning=C,i&&(this._createTitle(),d.isFunction(i)||l.push(this._updateTitle(i,D))),j&&this._createButton(),d.isFunction(h)||l.push(this._updateContent(h,D)),this.rendered=C,this._setWidget(),d.each(Q,function(a){var b;"render"===this.initialize&&(b=this(c))&&(c.plugins[a]=b)}),this._unassignEvents(),this._assignEvents(),this._when(l).then(function(){c._trigger("render"),c.positioning=D,c.hiddenDuringWait||!e.show.ready&&!a||c.toggle(C,f.event,D),c.hiddenDuringWait=D}),x.api[this.id]=this,this},y.destroy=function(a){function b(){if(!this.destroyed){this.destroyed=C;var a,b=this.target,c=b.attr(bb);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),d.each(this.plugins,function(){this.destroy&&this.destroy()});for(a in this.timers)clearTimeout(this.timers[a]);b.removeData(R).removeAttr(T).removeAttr(S).removeAttr("aria-describedby"),this.options.suppress&&c&&b.attr("title",c).removeAttr(bb),this._unassignEvents(),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=E,delete x.api[this.id]}}return this.destroyed?this.target:(a===C&&"hide"!==this.triggering||!this.rendered?b.call(this):(this.tooltip.one("tooltiphidden",d.proxy(b,this)),!this.triggering&&this.hide()),this.target)},A=y.checks={builtin:{"^id$":function(a,b,c,e){var f=c===C?x.nextid:c,g=R+"-"+f;f!==D&&f.length>0&&!d("#"+g).length?(this._id=g,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):a[b]=e},"^prerender":function(a,b,c){c&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(a,b,c){this._updateContent(c)},"^content.attr$":function(a,b,c,d){this.options.content.text===this.target.attr(d)&&this._updateContent(this.target.attr(c))},"^content.title$":function(a,b,c){return c?(c&&!this.elements.title&&this._createTitle(),void this._updateTitle(c)):this._removeTitle()},"^content.button$":function(a,b,c){this._updateButton(c)},"^content.title.(text|button)$":function(a,b,c){this.set("content."+b,c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(this.position[b]=a[b]=new z(c,"at"===b))},"^position.container$":function(a,b,c){this.rendered&&this.tooltip.appendTo(c)},"^show.ready$":function(a,b,c){c&&(!this.rendered&&this.render(C)||this.toggle(C))},"^style.classes$":function(a,b,c,d){this.rendered&&this.tooltip.removeClass(d).addClass(c)},"^style.(width|height)":function(a,b,c){this.rendered&&this.tooltip.css(b,c)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(a,b,c){this.rendered&&this.tooltip.toggleClass(Y,!!c)},"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){this.rendered&&this.tooltip[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var a=this.options.position;this.tooltip.attr("tracking","mouse"===a.target&&a.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},y.get=function(a){if(this.destroyed)return this;var b=i(this.options,a.toLowerCase()),c=b[0][b[1]];return c.precedance?c.string():c};var db=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,eb=/^prerender|show\.ready/i;y.set=function(a,b){if(this.destroyed)return this;{var c,e=this.rendered,f=D,g=this.options;this.checks}return"string"==typeof a?(c=a,a={},a[c]=b):a=d.extend({},a),d.each(a,function(b,c){if(e&&eb.test(b))return void delete a[b];var h,j=i(g,b.toLowerCase());h=j[0][j[1]],j[0][j[1]]=c&&c.nodeType?d(c):c,f=db.test(b)||f,a[b]=[j[0],j[1],c,h]}),h(g),this.positioning=C,d.each(a,d.proxy(j,this)),this.positioning=D,this.rendered&&this.tooltip[0].offsetWidth>0&&f&&this.reposition("mouse"===g.position.target?E:this.cache.event),this},y._update=function(a,b){var c=this,e=this.cache;return this.rendered&&a?(d.isFunction(a)&&(a=a.call(this.elements.target,e.event,this)||""),d.isFunction(a.then)?(e.waiting=C,a.then(function(a){return e.waiting=D,c._update(a,b)},E,function(a){return c._update(a,b)})):a===D||!a&&""!==a?D:(a.jquery&&a.length>0?b.empty().append(a.css({display:"block",visibility:"visible"})):b.html(a),this._waitForContent(b).then(function(a){c.rendered&&c.tooltip[0].offsetWidth>0&&c.reposition(e.event,!a.length)}))):D},y._waitForContent=function(a){var b=this.cache;return b.waiting=C,(d.fn.imagesLoaded?a.imagesLoaded():d.Deferred().resolve([])).done(function(){b.waiting=D}).promise()},y._updateContent=function(a,b){this._update(a,this.elements.content,b)},y._updateTitle=function(a,b){this._update(a,this.elements.title,b)===D&&this._removeTitle(D)},y._createTitle=function(){var a=this.elements,b=this._id+"-title";a.titlebar&&this._removeTitle(),a.titlebar=d("<div />",{"class":R+"-titlebar "+(this.options.style.widget?k("header"):"")}).append(a.title=d("<div />",{id:b,"class":R+"-title","aria-atomic":C})).insertBefore(a.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover","mouseover"===a.type)}),this.options.content.button&&this._createButton()},y._removeTitle=function(a){var b=this.elements;b.title&&(b.titlebar.remove(),b.titlebar=b.title=b.button=E,a!==D&&this.reposition())},y._createPosClass=function(a){return R+"-pos-"+(a||this.options.position.my).abbrev()},y.reposition=function(c,e){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=C;var f,g,h,i,j=this.cache,k=this.tooltip,l=this.options.position,m=l.target,n=l.my,o=l.at,p=l.viewport,q=l.container,r=l.adjust,s=r.method.split(" "),t=k.outerWidth(D),u=k.outerHeight(D),v=0,w=0,x=k.css("position"),y={left:0,top:0},z=k[0].offsetWidth>0,A=c&&"scroll"===c.type,B=d(a),E=q[0].ownerDocument,F=this.mouse;if(d.isArray(m)&&2===m.length)o={x:K,y:J},y={left:m[0],top:m[1]};else if("mouse"===m)o={x:K,y:J},(!r.mouse||this.options.hide.distance)&&j.origin&&j.origin.pageX?c=j.origin:!c||c&&("resize"===c.type||"scroll"===c.type)?c=j.event:F&&F.pageX&&(c=F),"static"!==x&&(y=q.offset()),E.body.offsetWidth!==(a.innerWidth||E.documentElement.clientWidth)&&(g=d(b.body).offset()),y={left:c.pageX-y.left+(g&&g.left||0),top:c.pageY-y.top+(g&&g.top||0)},r.mouse&&A&&F&&(y.left-=(F.scrollX||0)-B.scrollLeft(),y.top-=(F.scrollY||0)-B.scrollTop());else{if("event"===m?c&&c.target&&"scroll"!==c.type&&"resize"!==c.type?j.target=d(c.target):c.target||(j.target=this.elements.target):"event"!==m&&(j.target=d(m.jquery?m:this.elements.target)),m=j.target,m=d(m).eq(0),0===m.length)return this;m[0]===b||m[0]===a?(v=cb.iOS?a.innerWidth:m.width(),w=cb.iOS?a.innerHeight:m.height(),m[0]===a&&(y={top:(p||m).scrollTop(),left:(p||m).scrollLeft()})):Q.imagemap&&m.is("area")?f=Q.imagemap(this,m,o,Q.viewport?s:D):Q.svg&&m&&m[0].ownerSVGElement?f=Q.svg(this,m,o,Q.viewport?s:D):(v=m.outerWidth(D),w=m.outerHeight(D),y=m.offset()),f&&(v=f.width,w=f.height,g=f.offset,y=f.position),y=this.reposition.offset(m,y,q),(cb.iOS>3.1&&cb.iOS<4.1||cb.iOS>=4.3&&cb.iOS<4.33||!cb.iOS&&"fixed"===x)&&(y.left-=B.scrollLeft(),y.top-=B.scrollTop()),(!f||f&&f.adjustable!==D)&&(y.left+=o.x===M?v:o.x===N?v/2:0,y.top+=o.y===L?w:o.y===N?w/2:0)}return y.left+=r.x+(n.x===M?-t:n.x===N?-t/2:0),y.top+=r.y+(n.y===L?-u:n.y===N?-u/2:0),Q.viewport?(h=y.adjusted=Q.viewport(this,y,l,v,w,t,u),g&&h.left&&(y.left+=g.left),g&&h.top&&(y.top+=g.top),h.my&&(this.position.my=h.my)):y.adjusted={left:0,top:0},j.posClass!==(i=this._createPosClass(this.position.my))&&k.removeClass(j.posClass).addClass(j.posClass=i),this._trigger("move",[y,p.elem||p],c)?(delete y.adjusted,e===D||!z||isNaN(y.left)||isNaN(y.top)||"mouse"===m||!d.isFunction(l.effect)?k.css(y):d.isFunction(l.effect)&&(l.effect.call(k,this,d.extend({},y)),k.queue(function(a){d(this).css({opacity:"",height:""}),cb.ie&&this.style.removeAttribute("filter"),a()})),this.positioning=D,this):this},y.reposition.offset=function(a,c,e){function f(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}if(!e[0])return c;var g,h,i,j,k=d(a[0].ownerDocument),l=!!cb.ie&&"CSS1Compat"!==b.compatMode,m=e[0];do"static"!==(h=d.css(m,"position"))&&("fixed"===h?(i=m.getBoundingClientRect(),f(k,-1)):(i=d(m).position(),i.left+=parseFloat(d.css(m,"borderLeftWidth"))||0,i.top+=parseFloat(d.css(m,"borderTopWidth"))||0),c.left-=i.left+(parseFloat(d.css(m,"marginLeft"))||0),c.top-=i.top+(parseFloat(d.css(m,"marginTop"))||0),g||"hidden"===(j=d.css(m,"overflow"))||"visible"===j||(g=d(m)));while(m=m.offsetParent);return g&&(g[0]!==k[0]||l)&&f(g,1),c};var fb=(z=y.reposition.Corner=function(a,b){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,N).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!b;var c=a.charAt(0);this.precedance="t"===c||"b"===c?G:F}).prototype;fb.invert=function(a,b){this[a]=this[a]===K?M:this[a]===M?K:b||this[a]},fb.string=function(a){var b=this.x,c=this.y,d=b!==c?"center"===b||"center"!==c&&(this.precedance===G||this.forceY)?[c,b]:[b,c]:[b];return a!==!1?d.join(" "):d},fb.abbrev=function(){var a=this.string(!1);return a[0].charAt(0)+(a[1]&&a[1].charAt(0)||"")},fb.clone=function(){return new z(this.string(),this.forceY)},y.toggle=function(a,c){var e=this.cache,f=this.options,g=this.tooltip;if(c){if(/over|enter/.test(c.type)&&e.event&&/out|leave/.test(e.event.type)&&f.show.target.add(c.target).length===f.show.target.length&&g.has(c.relatedTarget).length)return this;e.event=d.event.fix(c)}if(this.waiting&&!a&&(this.hiddenDuringWait=C),!this.rendered)return a?this.render(1):this;if(this.destroyed||this.disabled)return this;var h,i,j,k=a?"show":"hide",l=this.options[k],m=(this.options[a?"hide":"show"],this.options.position),n=this.options.content,o=this.tooltip.css("width"),p=this.tooltip.is(":visible"),q=a||1===l.target.length,r=!c||l.target.length<2||e.target[0]===c.target;return(typeof a).search("boolean|number")&&(a=!p),h=!g.is(":animated")&&p===a&&r,i=h?E:!!this._trigger(k,[90]),this.destroyed?this:(i!==D&&a&&this.focus(c),!i||h?this:(d.attr(g[0],"aria-hidden",!a),a?(this.mouse&&(e.origin=d.event.fix(this.mouse)),d.isFunction(n.text)&&this._updateContent(n.text,D),d.isFunction(n.title)&&this._updateTitle(n.title,D),!B&&"mouse"===m.target&&m.adjust.mouse&&(d(b).bind("mousemove."+R,this._storeMouse),B=C),o||g.css("width",g.outerWidth(D)),this.reposition(c,arguments[2]),o||g.css("width",""),l.solo&&("string"==typeof l.solo?d(l.solo):d(V,l.solo)).not(g).not(l.target).qtip("hide",d.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete e.origin,B&&!d(V+'[tracking="true"]:visible',l.solo).not(g).length&&(d(b).unbind("mousemove."+R),B=D),this.blur(c)),j=d.proxy(function(){a?(cb.ie&&g[0].style.removeAttribute("filter"),g.css("overflow",""),"string"==typeof l.autofocus&&d(this.options.show.autofocus,g).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):g.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(a?"visible":"hidden")},this),l.effect===D||q===D?(g[k](),j()):d.isFunction(l.effect)?(g.stop(1,1),l.effect.call(g,this),g.queue("fx",function(a){j(),a()})):g.fadeTo(90,a?1:0,j),a&&l.target.trigger("qtip-"+this.id+"-inactive"),this))},y.show=function(a){return this.toggle(C,a)},y.hide=function(a){return this.toggle(D,a)},y.focus=function(a){if(!this.rendered||this.destroyed)return this;var b=d(V),c=this.tooltip,e=parseInt(c[0].style.zIndex,10),f=x.zindex+b.length;return c.hasClass(Z)||this._trigger("focus",[f],a)&&(e!==f&&(b.each(function(){this.style.zIndex>e&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+Z).qtip("blur",a)),c.addClass(Z)[0].style.zIndex=f),this},y.blur=function(a){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass(Z),this._trigger("blur",[this.tooltip.css("zIndex")],a),this)},y.disable=function(a){return this.destroyed?this:("toggle"===a?a=!(this.rendered?this.tooltip.hasClass(_):this.disabled):"boolean"!=typeof a&&(a=C),this.rendered&&this.tooltip.toggleClass(_,a).attr("aria-disabled",a),this.disabled=!!a,this)},y.enable=function(){return this.disable(D)},y._createButton=function(){var a=this,b=this.elements,c=b.tooltip,e=this.options.content.button,f="string"==typeof e,g=f?e:"Close tooltip";b.button&&b.button.remove(),b.button=e.jquery?e:d("<a />",{"class":"qtip-close "+(this.options.style.widget?"":R+"-icon"),title:g,"aria-label":g}).prepend(d("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),b.button.appendTo(b.titlebar||c).attr("role","button").click(function(b){return c.hasClass(_)||a.hide(b),D})},y._updateButton=function(a){if(!this.rendered)return D;var b=this.elements.button;a?this._createButton():b.remove()},y._setWidget=function(){var a=this.options.style.widget,b=this.elements,c=b.tooltip,d=c.hasClass(_);c.removeClass(_),_=a?"ui-state-disabled":"qtip-disabled",c.toggleClass(_,d),c.toggleClass("ui-helper-reset "+k(),a).toggleClass(Y,this.options.style.def&&!a),b.content&&b.content.toggleClass(k("content"),a),b.titlebar&&b.titlebar.toggleClass(k("header"),a),b.button&&b.button.toggleClass(R+"-icon",!a)},y._storeMouse=function(a){return(this.mouse=d.event.fix(a)).type="mousemove",this},y._bind=function(a,b,c,e,f){if(a&&c&&b.length){var g="."+this._id+(e?"-"+e:"");return d(a).bind((b.split?b:b.join(g+" "))+g,d.proxy(c,f||this)),this}},y._unbind=function(a,b){return a&&d(a).unbind("."+this._id+(b?"-"+b:"")),this},y._trigger=function(a,b,c){var e=d.Event("tooltip"+a);return e.originalEvent=c&&d.extend({},c)||this.cache.event||E,this.triggering=a,this.tooltip.trigger(e,[this].concat(b||[])),this.triggering=D,!e.isDefaultPrevented()},y._bindEvents=function(a,b,c,e,f,g){var h=c.filter(e).add(e.filter(c)),i=[];h.length&&(d.each(b,function(b,c){var e=d.inArray(c,a);e>-1&&i.push(a.splice(e,1)[0])}),i.length&&(this._bind(h,i,function(a){var b=this.rendered?this.tooltip[0].offsetWidth>0:!1;(b?g:f).call(this,a)}),c=c.not(h),e=e.not(h))),this._bind(c,a,f),this._bind(e,b,g)},y._assignInitialEvents=function(a){function b(a){return this.disabled||this.destroyed?D:(this.cache.event=a&&d.event.fix(a),this.cache.target=a&&d(a.target),clearTimeout(this.timers.show),void(this.timers.show=l.call(this,function(){this.render("object"==typeof a||c.show.ready)},c.prerender?0:c.show.delay)))}var c=this.options,e=c.show.target,f=c.hide.target,g=c.show.event?d.trim(""+c.show.event).split(" "):[],h=c.hide.event?d.trim(""+c.hide.event).split(" "):[];this._bind(this.elements.target,["remove","removeqtip"],function(){this.destroy(!0)},"destroy"),/mouse(over|enter)/i.test(c.show.event)&&!/mouse(out|leave)/i.test(c.hide.event)&&h.push("mouseleave"),this._bind(e,"mousemove",function(a){this._storeMouse(a),this.cache.onTarget=C}),this._bindEvents(g,h,e,f,b,function(){return this.timers?void clearTimeout(this.timers.show):D}),(c.show.ready||c.prerender)&&b.call(this,a)},y._assignEvents=function(){var c=this,e=this.options,f=e.position,g=this.tooltip,h=e.show.target,i=e.hide.target,j=f.container,k=f.viewport,l=d(b),q=(d(b.body),d(a)),r=e.show.event?d.trim(""+e.show.event).split(" "):[],s=e.hide.event?d.trim(""+e.hide.event).split(" "):[];d.each(e.events,function(a,b){c._bind(g,"toggle"===a?["tooltipshow","tooltiphide"]:["tooltip"+a],b,null,g)}),/mouse(out|leave)/i.test(e.hide.event)&&"window"===e.hide.leave&&this._bind(l,["mouseout","blur"],function(a){/select|option/.test(a.target.nodeName)||a.relatedTarget||this.hide(a)}),e.hide.fixed?i=i.add(g.addClass(X)):/mouse(over|enter)/i.test(e.show.event)&&this._bind(i,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+e.hide.event).indexOf("unfocus")>-1&&this._bind(j.closest("html"),["mousedown","touchstart"],function(a){var b=d(a.target),c=this.rendered&&!this.tooltip.hasClass(_)&&this.tooltip[0].offsetWidth>0,e=b.parents(V).filter(this.tooltip[0]).length>0;b[0]===this.target[0]||b[0]===this.tooltip[0]||e||this.target.has(b[0]).length||!c||this.hide(a)}),"number"==typeof e.hide.inactive&&(this._bind(h,"qtip-"+this.id+"-inactive",o,"inactive"),this._bind(i.add(g),x.inactiveEvents,o)),this._bindEvents(r,s,h,i,m,n),this._bind(h.add(g),"mousemove",function(a){if("number"==typeof e.hide.distance){var b=this.cache.origin||{},c=this.options.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&this.hide(a)}this._storeMouse(a)}),"mouse"===f.target&&f.adjust.mouse&&(e.hide.event&&this._bind(h,["mouseenter","mouseleave"],function(a){return this.cache?void(this.cache.onTarget="mouseenter"===a.type):D}),this._bind(l,"mousemove",function(a){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(_)&&this.tooltip[0].offsetWidth>0&&this.reposition(a)})),(f.adjust.resize||k.length)&&this._bind(d.event.special.resize?k:q,"resize",p),f.adjust.scroll&&this._bind(q.add(f.container),"scroll",p)},y._unassignEvents=function(){var c=this.options,e=c.show.target,f=c.hide.target,g=d.grep([this.elements.target[0],this.rendered&&this.tooltip[0],c.position.container[0],c.position.viewport[0],c.position.container.closest("html")[0],a,b],function(a){return"object"==typeof a});e&&e.toArray&&(g=g.concat(e.toArray())),f&&f.toArray&&(g=g.concat(f.toArray())),this._unbind(g)._unbind(g,"destroy")._unbind(g,"inactive")},d(function(){q(V,["mouseenter","mouseleave"],function(a){var b="mouseenter"===a.type,c=d(a.currentTarget),e=d(a.relatedTarget||a.target),f=this.options;b?(this.focus(a),c.hasClass(X)&&!c.hasClass(_)&&clearTimeout(this.timers.hide)):"mouse"===f.position.target&&f.position.adjust.mouse&&f.hide.event&&f.show.target&&!e.closest(f.show.target[0]).length&&this.hide(a),c.toggleClass($,b)}),q("["+T+"]",W,o)}),x=d.fn.qtip=function(a,b,e){var f=(""+a).toLowerCase(),g=E,i=d.makeArray(arguments).slice(1),j=i[i.length-1],k=this[0]?d.data(this[0],R):E;return!arguments.length&&k||"api"===f?k:"string"==typeof a?(this.each(function(){var a=d.data(this,R);if(!a)return C;if(j&&j.timeStamp&&(a.cache.event=j),!b||"option"!==f&&"options"!==f)a[f]&&a[f].apply(a,i);else{if(e===c&&!d.isPlainObject(b))return g=a.get(b),D;a.set(b,e)}}),g!==E?g:this):"object"!=typeof a&&arguments.length?void 0:(k=h(d.extend(C,{},a)),this.each(function(a){var b,c;return c=d.isArray(k.id)?k.id[a]:k.id,c=!c||c===D||c.length<1||x.api[c]?x.nextid++:c,b=r(d(this),c,k),b===D?C:(x.api[c]=b,d.each(Q,function(){"initialize"===this.initialize&&this(b)}),void b._assignInitialEvents(j))}))},d.qtip=e,x.api={},d.each({attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&"object"==typeof f&&f.options.suppress)return arguments.length<2?d.attr(c,bb):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr(bb,b))}return d.fn["attr"+ab].apply(this,arguments)},clone:function(a){var b=(d([]),d.fn["clone"+ab].apply(this,arguments));return a||b.filter("["+bb+"]").attr("title",function(){return d.attr(this,bb)}).removeAttr(bb),b}},function(a,b){if(!b||d.fn[a+ab])return C;var c=d.fn[a+ab]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+ab]=d.cleanData,d.cleanData=function(a){for(var b,c=0;(b=d(a[c])).length;c++)if(b.attr(S))try{b.triggerHandler("removeqtip")}catch(e){}d["cleanData"+ab].apply(this,arguments)}),x.version="2.2.1",x.nextid=0,x.inactiveEvents=W,x.zindex=15e3,x.defaults={prerender:D,id:D,overwrite:C,suppress:C,content:{text:C,attr:"title",title:D,button:D},position:{my:"top left",at:"bottom right",target:D,container:D,viewport:D,adjust:{x:0,y:0,mouse:C,scroll:C,resize:C,method:"flipinvert flipinvert"},effect:function(a,b){d(this).animate(b,{duration:200,queue:D})}},show:{target:D,event:"mouseenter",effect:C,delay:90,solo:D,ready:D,autofocus:D},hide:{target:D,event:"mouseleave",effect:C,delay:0,fixed:D,inactive:D,leave:"window",distance:D},style:{classes:"",widget:D,width:D,height:D,def:C},events:{render:E,move:E,show:E,hide:E,toggle:E,visible:E,hidden:E,focus:E,blur:E}};var gb,hb="margin",ib="border",jb="color",kb="background-color",lb="transparent",mb=" !important",nb=!!b.createElement("canvas").getContext,ob=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,pb={},qb=["Webkit","O","Moz","ms"];if(nb)var rb=a.devicePixelRatio||1,sb=function(){var a=b.createElement("canvas").getContext("2d");return a.backingStorePixelRatio||a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||1}(),tb=rb/sb;else var ub=function(a,b,c){return"<qtipvml:"+a+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(b||"")+' style="behavior: url(#default#VML); '+(c||"")+'" />'};d.extend(v.prototype,{init:function(a){var b,c;c=this.element=a.elements.tip=d("<div />",{"class":R+"-tip"}).prependTo(a.tooltip),nb?(b=d("<canvas />").appendTo(this.element)[0].getContext("2d"),b.lineJoin="miter",b.miterLimit=1e5,b.save()):(b=ub("shape",'coordorigin="0,0"',"position:absolute;"),this.element.html(b+b),a._bind(d("*",c).add(c),["click","mousedown"],function(a){a.stopPropagation()},this._ns)),a._bind(a.tooltip,"tooltipmove",this.reposition,this._ns,this),this.create()},_swapDimensions:function(){this.size[0]=this.options.height,this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width,this.size[1]=this.options.height},_useTitle:function(a){var b=this.qtip.elements.titlebar;return b&&(a.y===J||a.y===N&&this.element.position().top+this.size[1]/2+this.options.offset<b.outerHeight(C))},_parseCorner:function(a){var b=this.qtip.options.position.my;return a===D||b===D?a=D:a===C?a=new z(b.string()):a.string||(a=new z(a),a.fixed=C),a},_parseWidth:function(a,b,c){var d=this.qtip.elements,e=ib+s(b)+"Width";return(c?u(c,e):u(d.content,e)||u(this._useTitle(a)&&d.titlebar||d.content,e)||u(d.tooltip,e))||0},_parseRadius:function(a){var b=this.qtip.elements,c=ib+s(a.y)+s(a.x)+"Radius";return cb.ie<9?0:u(this._useTitle(a)&&b.titlebar||b.content,c)||u(b.tooltip,c)||0},_invalidColour:function(a,b,c){var d=a.css(b);return!d||c&&d===a.css(c)||ob.test(d)?D:d},_parseColours:function(a){var b=this.qtip.elements,c=this.element.css("cssText",""),e=ib+s(a[a.precedance])+s(jb),f=this._useTitle(a)&&b.titlebar||b.content,g=this._invalidColour,h=[];return h[0]=g(c,kb)||g(f,kb)||g(b.content,kb)||g(b.tooltip,kb)||c.css(kb),h[1]=g(c,e,jb)||g(f,e,jb)||g(b.content,e,jb)||g(b.tooltip,e,jb)||b.tooltip.css(e),d("*",c).add(c).css("cssText",kb+":"+lb+mb+";"+ib+":0"+mb+";"),h},_calculateSize:function(a){var b,c,d,e=a.precedance===G,f=this.options.width,g=this.options.height,h="c"===a.abbrev(),i=(e?f:g)*(h?.5:1),j=Math.pow,k=Math.round,l=Math.sqrt(j(i,2)+j(g,2)),m=[this.border/i*l,this.border/g*l];return m[2]=Math.sqrt(j(m[0],2)-j(this.border,2)),m[3]=Math.sqrt(j(m[1],2)-j(this.border,2)),b=l+m[2]+m[3]+(h?0:m[0]),c=b/l,d=[k(c*f),k(c*g)],e?d:d.reverse()},_calculateTip:function(a,b,c){c=c||1,b=b||this.size;var d=b[0]*c,e=b[1]*c,f=Math.ceil(d/2),g=Math.ceil(e/2),h={br:[0,0,d,e,d,0],bl:[0,0,d,0,0,e],tr:[0,e,d,0,d,e],tl:[0,0,0,e,d,e],tc:[0,e,f,0,d,e],bc:[0,0,d,0,f,e],rc:[0,0,d,g,0,e],lc:[d,0,d,e,0,g]};return h.lt=h.br,h.rt=h.bl,h.lb=h.tr,h.rb=h.tl,h[a.abbrev()]},_drawCoords:function(a,b){a.beginPath(),a.moveTo(b[0],b[1]),a.lineTo(b[2],b[3]),a.lineTo(b[4],b[5]),a.closePath()},create:function(){var a=this.corner=(nb||cb.ie)&&this._parseCorner(this.options.corner);return(this.enabled=!!this.corner&&"c"!==this.corner.abbrev())&&(this.qtip.cache.corner=a.clone(),this.update()),this.element.toggle(this.enabled),this.corner},update:function(b,c){if(!this.enabled)return this;var e,f,g,h,i,j,k,l,m=this.qtip.elements,n=this.element,o=n.children(),p=this.options,q=this.size,r=p.mimic,s=Math.round;b||(b=this.qtip.cache.corner||this.corner),r===D?r=b:(r=new z(r),r.precedance=b.precedance,"inherit"===r.x?r.x=b.x:"inherit"===r.y?r.y=b.y:r.x===r.y&&(r[b.precedance]=b[b.precedance])),f=r.precedance,b.precedance===F?this._swapDimensions():this._resetDimensions(),e=this.color=this._parseColours(b),e[1]!==lb?(l=this.border=this._parseWidth(b,b[b.precedance]),p.border&&1>l&&!ob.test(e[1])&&(e[0]=e[1]),this.border=l=p.border!==C?p.border:l):this.border=l=0,k=this.size=this._calculateSize(b),n.css({width:k[0],height:k[1],lineHeight:k[1]+"px"}),j=b.precedance===G?[s(r.x===K?l:r.x===M?k[0]-q[0]-l:(k[0]-q[0])/2),s(r.y===J?k[1]-q[1]:0)]:[s(r.x===K?k[0]-q[0]:0),s(r.y===J?l:r.y===L?k[1]-q[1]-l:(k[1]-q[1])/2)],nb?(g=o[0].getContext("2d"),g.restore(),g.save(),g.clearRect(0,0,6e3,6e3),h=this._calculateTip(r,q,tb),i=this._calculateTip(r,this.size,tb),o.attr(H,k[0]*tb).attr(I,k[1]*tb),o.css(H,k[0]).css(I,k[1]),this._drawCoords(g,i),g.fillStyle=e[1],g.fill(),g.translate(j[0]*tb,j[1]*tb),this._drawCoords(g,h),g.fillStyle=e[0],g.fill()):(h=this._calculateTip(r),h="m"+h[0]+","+h[1]+" l"+h[2]+","+h[3]+" "+h[4]+","+h[5]+" xe",j[2]=l&&/^(r|b)/i.test(b.string())?8===cb.ie?2:1:0,o.css({coordsize:k[0]+l+" "+(k[1]+l),antialias:""+(r.string().indexOf(N)>-1),left:j[0]-j[2]*Number(f===F),top:j[1]-j[2]*Number(f===G),width:k[0]+l,height:k[1]+l}).each(function(a){var b=d(this);b[b.prop?"prop":"attr"]({coordsize:k[0]+l+" "+(k[1]+l),path:h,fillcolor:e[0],filled:!!a,stroked:!a}).toggle(!(!l&&!a)),!a&&b.html(ub("stroke",'weight="'+2*l+'px" color="'+e[1]+'" miterlimit="1000" joinstyle="miter"'))})),a.opera&&setTimeout(function(){m.tip.css({display:"inline-block",visibility:"visible"})},1),c!==D&&this.calculate(b,k)},calculate:function(a,b){if(!this.enabled)return D;var c,e,f=this,g=this.qtip.elements,h=this.element,i=this.options.offset,j=(g.tooltip.hasClass("ui-widget"),{});return a=a||this.corner,c=a.precedance,b=b||this._calculateSize(a),e=[a.x,a.y],c===F&&e.reverse(),d.each(e,function(d,e){var h,k,l;
	e===N?(h=c===G?K:J,j[h]="50%",j[hb+"-"+h]=-Math.round(b[c===G?0:1]/2)+i):(h=f._parseWidth(a,e,g.tooltip),k=f._parseWidth(a,e,g.content),l=f._parseRadius(a),j[e]=Math.max(-f.border,d?k:i+(l>h?l:-h)))}),j[a[c]]-=b[c===F?0:1],h.css({margin:"",top:"",bottom:"",left:"",right:""}).css(j),j},reposition:function(a,b,d){function e(a,b,c,d,e){a===P&&j.precedance===b&&k[d]&&j[c]!==N?j.precedance=j.precedance===F?G:F:a!==P&&k[d]&&(j[b]=j[b]===N?k[d]>0?d:e:j[b]===d?e:d)}function f(a,b,e){j[a]===N?p[hb+"-"+b]=o[a]=g[hb+"-"+b]-k[b]:(h=g[e]!==c?[k[b],-g[b]]:[-k[b],g[b]],(o[a]=Math.max(h[0],h[1]))>h[0]&&(d[b]-=k[b],o[b]=D),p[g[e]!==c?e:b]=o[a])}if(this.enabled){var g,h,i=b.cache,j=this.corner.clone(),k=d.adjusted,l=b.options.position.adjust.method.split(" "),m=l[0],n=l[1]||l[0],o={left:D,top:D,x:0,y:0},p={};this.corner.fixed!==C&&(e(m,F,G,K,M),e(n,G,F,J,L),(j.string()!==i.corner.string()||i.cornerTop!==k.top||i.cornerLeft!==k.left)&&this.update(j,D)),g=this.calculate(j),g.right!==c&&(g.left=-g.right),g.bottom!==c&&(g.top=-g.bottom),g.user=this.offset,(o.left=m===P&&!!k.left)&&f(F,K,M),(o.top=n===P&&!!k.top)&&f(G,J,L),this.element.css(p).toggle(!(o.x&&o.y||j.x===N&&o.y||j.y===N&&o.x)),d.left-=g.left.charAt?g.user:m!==P||o.top||!o.left&&!o.top?g.left+this.border:0,d.top-=g.top.charAt?g.user:n!==P||o.left||!o.left&&!o.top?g.top+this.border:0,i.cornerLeft=k.left,i.cornerTop=k.top,i.corner=j.clone()}},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns),this.qtip.elements.tip&&this.qtip.elements.tip.find("*").remove().end().remove()}}),gb=Q.tip=function(a){return new v(a,a.options.style.tip)},gb.initialize="render",gb.sanitize=function(a){if(a.style&&"tip"in a.style){var b=a.style.tip;"object"!=typeof b&&(b=a.style.tip={corner:b}),/string|boolean/i.test(typeof b.corner)||(b.corner=C)}},A.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create(),this.qtip.reposition()},"^style.tip.(height|width)$":function(a){this.size=[a.width,a.height],this.update(),this.qtip.reposition()},"^content.title|style.(classes|widget)$":function(){this.update()}},d.extend(C,x.defaults,{style:{tip:{corner:C,mimic:D,width:6,height:6,border:C,offset:0}}}),Q.viewport=function(c,d,e,f,g,h,i){function j(a,b,c,e,f,g,h,i,j){var k=d[f],s=u[a],t=v[a],w=c===P,x=s===f?j:s===g?-j:-j/2,y=t===f?i:t===g?-i:-i/2,z=q[f]+r[f]-(n?0:m[f]),A=z-k,B=k+j-(h===H?o:p)-z,C=x-(u.precedance===a||s===u[b]?y:0)-(t===N?i/2:0);return w?(C=(s===f?1:-1)*x,d[f]+=A>0?A:B>0?-B:0,d[f]=Math.max(-m[f]+r[f],k-C,Math.min(Math.max(-m[f]+r[f]+(h===H?o:p),k+C),d[f],"center"===s?k-x:1e9))):(e*=c===O?2:0,A>0&&(s!==f||B>0)?(d[f]-=C+e,l.invert(a,f)):B>0&&(s!==g||A>0)&&(d[f]-=(s===N?-C:C)+e,l.invert(a,g)),d[f]<q&&-d[f]>B&&(d[f]=k,l=u.clone())),d[f]-k}var k,l,m,n,o,p,q,r,s=e.target,t=c.elements.tooltip,u=e.my,v=e.at,w=e.adjust,x=w.method.split(" "),y=x[0],z=x[1]||x[0],A=e.viewport,B=e.container,C=(c.cache,{left:0,top:0});return A.jquery&&s[0]!==a&&s[0]!==b.body&&"none"!==w.method?(m=B.offset()||C,n="static"===B.css("position"),k="fixed"===t.css("position"),o=A[0]===a?A.width():A.outerWidth(D),p=A[0]===a?A.height():A.outerHeight(D),q={left:k?0:A.scrollLeft(),top:k?0:A.scrollTop()},r=A.offset()||C,("shift"!==y||"shift"!==z)&&(l=u.clone()),C={left:"none"!==y?j(F,G,y,w.x,K,M,H,f,h):0,top:"none"!==z?j(G,F,z,w.y,J,L,I,g,i):0,my:l}):C};var vb,wb,xb="qtip-modal",yb="."+xb;wb=function(){function a(a){if(d.expr[":"].focusable)return d.expr[":"].focusable;var b,c,e,f=!isNaN(d.attr(a,"tabindex")),g=a.nodeName&&a.nodeName.toLowerCase();return"area"===g?(b=a.parentNode,c=b.name,a.href&&c&&"map"===b.nodeName.toLowerCase()?(e=d("img[usemap=#"+c+"]")[0],!!e&&e.is(":visible")):!1):/input|select|textarea|button|object/.test(g)?!a.disabled:"a"===g?a.href||f:f}function c(a){k.length<1&&a.length?a.not("body").blur():k.first().focus()}function e(a){if(i.is(":visible")){var b,e=d(a.target),h=f.tooltip,j=e.closest(V);b=j.length<1?D:parseInt(j[0].style.zIndex,10)>parseInt(h[0].style.zIndex,10),b||e.closest(V)[0]===h[0]||c(e),g=a.target===k[k.length-1]}}var f,g,h,i,j=this,k={};d.extend(j,{init:function(){return i=j.elem=d("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return D}}).hide(),d(b.body).bind("focusin"+yb,e),d(b).bind("keydown"+yb,function(a){f&&f.options.show.modal.escape&&27===a.keyCode&&f.hide(a)}),i.bind("click"+yb,function(a){f&&f.options.show.modal.blur&&f.hide(a)}),j},update:function(b){f=b,k=b.options.show.modal.stealfocus!==D?b.tooltip.find("*").filter(function(){return a(this)}):[]},toggle:function(a,e,g){var k=(d(b.body),a.tooltip),l=a.options.show.modal,m=l.effect,n=e?"show":"hide",o=i.is(":visible"),p=d(yb).filter(":visible:not(:animated)").not(k);return j.update(a),e&&l.stealfocus!==D&&c(d(":focus")),i.toggleClass("blurs",l.blur),e&&i.appendTo(b.body),i.is(":animated")&&o===e&&h!==D||!e&&p.length?j:(i.stop(C,D),d.isFunction(m)?m.call(i,e):m===D?i[n]():i.fadeTo(parseInt(g,10)||90,e?1:0,function(){e||i.hide()}),e||i.queue(function(a){i.css({left:"",top:""}),d(yb).length||i.detach(),a()}),h=e,f.destroyed&&(f=E),j)}}),j.init()},wb=new wb,d.extend(w.prototype,{init:function(a){var b=a.tooltip;return this.options.on?(a.elements.overlay=wb.elem,b.addClass(xb).css("z-index",x.modal_zindex+d(yb).length),a._bind(b,["tooltipshow","tooltiphide"],function(a,c,e){var f=a.originalEvent;if(a.target===b[0])if(f&&"tooltiphide"===a.type&&/mouse(leave|enter)/.test(f.type)&&d(f.relatedTarget).closest(wb.elem[0]).length)try{a.preventDefault()}catch(g){}else(!f||f&&"tooltipsolo"!==f.type)&&this.toggle(a,"tooltipshow"===a.type,e)},this._ns,this),a._bind(b,"tooltipfocus",function(a,c){if(!a.isDefaultPrevented()&&a.target===b[0]){var e=d(yb),f=x.modal_zindex+e.length,g=parseInt(b[0].style.zIndex,10);wb.elem[0].style.zIndex=f-1,e.each(function(){this.style.zIndex>g&&(this.style.zIndex-=1)}),e.filter("."+Z).qtip("blur",a.originalEvent),b.addClass(Z)[0].style.zIndex=f,wb.update(c);try{a.preventDefault()}catch(h){}}},this._ns,this),void a._bind(b,"tooltiphide",function(a){a.target===b[0]&&d(yb).filter(":visible").not(b).last().qtip("focus",a)},this._ns,this)):this},toggle:function(a,b,c){return a&&a.isDefaultPrevented()?this:void wb.toggle(this.qtip,!!b,c)},destroy:function(){this.qtip.tooltip.removeClass(xb),this.qtip._unbind(this.qtip.tooltip,this._ns),wb.toggle(this.qtip,D),delete this.qtip.elements.overlay}}),vb=Q.modal=function(a){return new w(a,a.options.show.modal)},vb.sanitize=function(a){a.show&&("object"!=typeof a.show.modal?a.show.modal={on:!!a.show.modal}:"undefined"==typeof a.show.modal.on&&(a.show.modal.on=C))},x.modal_zindex=x.zindex-200,vb.initialize="render",A.modal={"^show.modal.(on|blur)$":function(){this.destroy(),this.init(),this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}},d.extend(C,x.defaults,{show:{modal:{on:D,effect:C,blur:C,stealfocus:C,escape:C}}})})}(window,document);