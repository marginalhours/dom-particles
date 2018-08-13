const Bus = {
  PRELOAD: 0,
  RUNNING: 1,
  PAUSED: 2,
	/* Overall state (see enum above) */
	state: 0,

	/* Events Pub/Sub stuff (for game logic) */
	topics: {},

	// returns a token that can be used to unsubscribe
	sub: function(topic, listener){
		if(!this.topics[topic]) this.topics[topic] = [];
		let new_token = this.token();
		this.topics[topic].push({func:listener, token:new_token});

		return new_token;
	},

	pub: function(topic, data){
		if(!this.topics[topic] || this.topics[topic].length < 1) return;
		this.topics[topic].forEach(function(listener){
			listener.func(data);
		});
	},

	token: function(){
		return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2); // remove `0.`
	},

	unsub: function(topic, token){
		if(this.topics[topic])
		{
			this.topics[topic] = this.topics[topic].filter((item) => item.token !== token);
		}
	},

	/* overall delta measurement */
	uptime: 0,

	update: function(dt){
		this.uptime += dt;
	},

	getTimestamp: function(){
		/* returns HH:MM:SS timestamp since game began */
		var hours = Math.floor(this.uptime / 36e5),
		mins = Math.floor((this.uptime % 36e5) / 6e4),
		secs = Math.floor((this.uptime % 6e4) / 1000);
		return ('0' + hours).slice(-2) + ':' + ('0' + mins).slice(-2) + ':' + ('0' + secs).slice(-2) ;
	},

  log: function(content){
    console.log("[" + this.getTimestamp() + "] " + content.entity + ": " + content.message);
  }
};

Bus.start = function(){
	Bus.state = Bus.RUNNING;
	Bus.busLog("starting game...");
  Bus.pub('game-start');
	Bus.onFrame();
};

let time = new Date().getTime();

Bus.onFrame = function(){
	// get immediate delta
	let now = new Date().getTime(),
		dt = now - (time || now);
	time = now;

	switch(this.state) {
		case Bus.PRELOAD:
			break;
		case Bus.RUNNING:
			this.pub("update", dt);
			break;
		case Bus.PAUSED:
			break;
	}
	// load next frame
	requestAnimationFrame(this.onFrame);
};

Bus.onFrame = Bus.onFrame.bind(Bus);

Bus.busLog = function(msg){
	Bus.log({
		entity : "Bus",
		message: msg
	});
};

// subscribe to updates to keep track of delta
Bus.sub("update", (dt) =>{
	Bus.update(dt);
});

export default Bus;
