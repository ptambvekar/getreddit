$(function(){
	
	let parameters={ //object where properties for pagination are saved.
	before:null,
	after:null,
	limit:3,
	count:0,
	dist:0,
	};
	
	function getPosts(isAfter){
	
		var data={
			limit:parameters['limit'],
		}
		if(isAfter && parameters['after']){
			data['after']=parameters['after'];
			data['count']=parameters['count'] + parameters['dist'];
			parameters['count']+=parameters['dist'];
		}
		else if(!isAfter && parameters['before']){
			data['before']=parameters['before'];
			data['count']=parameters['count']+1;
			parameters['count']-=parameters['dist'];
		}
		else if(isAfter!==null){ //first time isAfter will be null so skip this
		/** In case we requested Previous (or Next) posts but have 'before' (or 'after') as Null, ie we are showing first page (or Last page) Hence dont fire any request, just return;
		**/
			return; 
		}
		$.ajax({
		url:'https://www.reddit.com/r/business/new.json',
		type:'get',
		data:data,
		dataType:'json',
		success:onSuccess,
		error:onError,
		});
	}
	function onSuccess(response){
		var data=response.data;
		if(data.before || data.after){
			// these attributes tell from which posts the next posts have to be retrieved
			parameters['before']= data.before; 
			parameters['after']=  data.after ;
			parameters['dist']=	  data.dist	 ;
		}
		else{
			return;
		}
		var children = data.children; // posts
		var container=$('#postContainer');
		children.length > 0 && container.children().remove(); // remove existing posts if new posts are available from the API call
		children.forEach(function(post){
			let data=post.data;
			var posts='<div class="card bg-light text-center card-adjust shadow"> <div class="card-body">   <p class="card-text">'+data.title+'   </p> </div>   <div class="card-footer">   <div class = "row">       <div class = "col-sm-6 col-md-6 col-xs-12"> <a href="http://www.reddit.com'+data.permalink+'" target="_blank">'+data.num_comments+' comments</a></div> <div class = "col-sm-6 col-md-6 col-xs-12 text-muted"> Submitted by '+data.author+'</div>   </div> </div> </div>'
			container.append(posts)
		});
	}
	function onError(response){
		console.log(response);
	}
	function addEvents(){
	
		$('#downArrow').on('click',function(){
			getPosts(true);
		});

		$('#upArrow').on('click',function(){
			getPosts(false);
		});
	}
	addEvents();
	getPosts(null); //Initial loading of posts
	
	
});