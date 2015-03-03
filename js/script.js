// JavaScript Document 
/* Author : Dennis Chow  */

var leaderBoard = {
	opt : {
		frequency: 15,
		limit: 10
	},
	root : null,
	init : function(){

		// Assign element as the obj root
		this.root = $('#leaderboard');

		// Create new Poller -  provide custom options and callback function
		var bandPoller = new Poller( leaderBoard.opt, leaderBoard.refresh );

		// Start Poller
		bandPoller.start();
	},
	refresh : function(data){

		// Feed Content to LeaderBoard
		var ranking = function(){
			$(data).each(function(i,obj){
				var block = leaderBoard.generate(obj);
				$('UL', leaderBoard.root).append( block );
				setTimeout(function(){
					block.removeClass('hidden');
				},i*100);
			});
		}

		// Empty Leader Board before content feeding
		$('UL LI', leaderBoard.root).stop().animate({
			'opacity' : 0
		}, leaderBoard.opt.frequency * 100, function(e){
			$('UL', leaderBoard.root).empty(); // Empty List-item
			ranking();
		});

		// console.log(data);

	},
	generate : function(e){
		// Generate HTML markup
		var listItem 	= $('<li class="list-item hidden" />');
		var para 		= $('<p />').appendTo( listItem );
		var bandName 	= $('<span class="band-name" />').append( e.name ).appendTo( para );
		var mentioned 	= $('<span class="mentioned" />').appendTo( para );
		var count 		= $('<span class="count" />').append( e.count ).appendTo( mentioned );
		var text 		= $('<span class="text" />').append( 'Mentions' ).appendTo( mentioned );
		// console.log( listItem.html() );
		return listItem;
	}
}

leaderBoard.init();