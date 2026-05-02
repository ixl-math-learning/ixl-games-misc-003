var EVENT_FIRST_LAUNCH = 100002;
var EVENT_LAUNCH = 100003;
var EVENT_RESUME = 100004;

var EVENT_WIN = 111513;
var EVENT_LOSE = 111514;
var EVENT_QUIT = 111515;

var EVENT_SHARE_MANUAL = 104711;
var EVENT_SHARE_FACEBOOK = 52009;

function Tracking() {
	var instance = this;
	var eventToken = 0;
	
	this.SendLaunchEvent = function (launchID) {
		if (!LUDIVERSION) {
			eventToken ++;
			var json = {
				"ggi": GGI,
				"ts": instance.GetTimeStamp(),
				"entity_type": "Asphalt Retro HTML5",
				"entity_id": "4377:80665:0.0.1:unknown:facebookhtml5",
				"proto_ver": "1",
				"events": [{
					"data": {
						"launch_type": launchID,
						"ses_id": g_stateEngine.m_sessionID,
						"ses_time": g_stateEngine.m_sessionTime,
						"game_time": g_stateEngine.m_gameTime,
					},
					"gdid": 387057,
					"ts": instance.GetTimeStamp(),
					"type": 387057,
					"token": eventToken
				}]
			}
			
			this.Send (json);
		}
	}
	
	this.SendRaceEvent = function (car, color, track, result, score, timeSpent) {
		if (!LUDIVERSION) {
			eventToken ++;
			if (car == 0) {
				if (color == 0) color = "blue";
				if (color == 1) color = "red";
				if (color == 2) color = "white";
			}
			else if (car == 1) {
				if (color == 0) color = "yellow";
				if (color == 1) color = "red";
				if (color == 2) color = "white";
			}
			else if (car == 2) {
				if (color == 0) color = "red";
				if (color == 1) color = "yellow";
				if (color == 2) color = "white";
			}
			
			if (car == 0) car = "Skyline GT-R";
			if (car == 1) car = "Gallardo";
			if (car == 2) car = "Ford GT";
			
			if (track == 0) track = "Tokyo";
			if (track == 1) track = "New York";
			if (track == 2) track = "Paris";
			
			var json = {
				"ggi": GGI,
				"ts": instance.GetTimeStamp(),
				"entity_type": "Asphalt Retro HTML5",
				"entity_id": "4377:80665:0.0.1:unknown:facebookhtml5",
				"proto_ver": "1",
				"events": [{
					"data": {
						"car": car,
						"color": color,
						"track": track,
						"result": result,
						"score": score,
						"time_spent": timeSpent,
						"ses_id": g_stateEngine.m_sessionID,
						"ses_time": g_stateEngine.m_sessionTime,
						"game_time": g_stateEngine.m_gameTime,
					},
					"gdid": 387053,
					"ts": instance.GetTimeStamp(),
					"type": 387053,
					"token": eventToken
				}]
			}
			
			this.Send (json);
		}
	}
	
	this.SendShareEvent = function () {
		if (!LUDIVERSION) {
			eventToken ++;
			var json = {
				"ggi": GGI,
				"ts": instance.GetTimeStamp(),
				"entity_type": "Asphalt Retro HTML5",
				"entity_id": "4377:80665:0.0.1:unknown:facebookhtml5",
				"proto_ver": "1",
				"events": [{
					"data": {
						"share_type": EVENT_SHARE_MANUAL,
						"social_network": EVENT_SHARE_FACEBOOK,
						"ses_id": g_stateEngine.m_sessionID,
						"ses_time": g_stateEngine.m_sessionTime,
						"game_time": g_stateEngine.m_gameTime,
					},
					"gdid": 387054,
					"ts": instance.GetTimeStamp(),
					"type": 387054,
					"token": eventToken
				}]
			}
			
			this.Send (json);
		}
	}
	
	
	this.Send = function (eventJSON) {
		if (!LUDIVERSION) {
			eventJSON = JSON.stringify(eventJSON);
			
			var params = "event=" + eventJSON;
			var request = new XMLHttpRequest();
			request.open("POST", TRACKING_URL, true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.onload = function(e) {
				if (request.readyState == 4 && request.status == 200) {
					
				}
			};
			request.send(params);
		}
	}
	
	this.GetTimeStamp = function () {
		return ((new Date().getTime() / 1000) >> 0);
	}
	
	
	
	
	
	
	
	
	
	
	this.SendLudiLoginDay = function () {
		if (LUDIVERSION) {
			var firstLogin = localStorage.firstLogin;
			if (firstLogin == null) {
				firstLogin = this.GetTimeStamp();
				localStorage.firstLogin = firstLogin;
			}
			
			var day = ((this.GetTimeStamp() - firstLogin) / 86400) >> 0;
			var dayString = "D";
			if (day < 10) dayString += "0";
			dayString += day;
			
			dataLayer.push({
				"event" : "ga_event",
				"ga_category" : "Gamepage", 
				"ga_action" : "Return",
				"ga_label": "Asphalt Retro",
				"ga_noninteraction" : true,
				"days" : dayString
			});
		}
	}
	
	this.SendLudiMainMenu = function () {
		if (LUDIVERSION) {
			dataLayer.push({
				"event" : "ga_event",
				"ga_category" : "Gamepage", 
				"ga_action" : "Main Menu",
				"ga_label": "Asphalt Retro",
				"ga_noninteraction" : true
			});
		}
	}
	
	this.SendLudiActionPhase = function () {
		if (LUDIVERSION) {
			dataLayer.push({
				"event" : "ga_event",
				"ga_category" : "Gamepage", 
				"ga_action" : "Start",
				"ga_label": "Asphalt Retro",
				"ga_noninteraction" : true
			});
		}
	}
	
	this.SendLudiFinish = function () {
		if (LUDIVERSION) {
			dataLayer.push({
				"event" : "ga_event",
				"ga_category" : "Gamepage", 
				"ga_action" : "Completion",
				"ga_label": "Asphalt Retro",
				"ga_noninteraction" : true
			});
		}
	}
}

g_tracking = new Tracking();