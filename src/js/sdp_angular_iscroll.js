(function(){
	'user strict';
	angular.module('sdp-angular-iscroll',[])
	.directive('sdpAngularIscroll',[function(){
		return {
	        scope:{
	            iscrollInstance:"=?",
	            topText:"=?",
	            topTextOptions:"=?",
	            bottomText:"=?",
	            bottomTextOptions:"=?",
	            isLoadingMore:"=?",
	            isRefreshing:"=?",
	            refresh:"=?",
	            loadMore:"=?",
	            hasMore:"=?",
	            pullDownOffset:"@",
	            pullUpOffset:"@",
	            options:"=?"
	        },
	        link: function (scope, element, attributes) {
	            scope.component=$(element);
	            scope.pullDownOffset=0;
	            scope.pullUpOffset=0;
	            scope.isLoadingMorePrepare=false;
	            scope.isRefreshingPrepare=false;
	            scope.isRefreshingReady=false;
	            scope.isLoadingMoreReady=false;
	            scope.initialMaxScrollY=0;
	            scope.isRefreshing=false;
	            scope.isLoadingMore=false;
	            scope.topTextOptions={
					load:'is refreshing',
					pull:'pull down to refresh',
					release:'release to refresh'
				}
	            var options={ 
	                mouseWheel: true,
	                snap: false,
	                momentum: true,
	                hScrollbar: false,
	                useTransition: true,
	                onRefresh:function(){
	                    if(scope.isLoadingMore){
	                        this.scrollTo(0,this.y+parseInt(scope.pullUpOffset));
	                    }
	
	                    this.minScrollY=-scope.pullDownOffset;
	             


	                    scope.initialMaxScrollY=this.maxScrollY;


	                    scope.topText=scope.topTextOptions.pull
	                    // scope.bottomText=scope
	                    scope.isRefreshingReady=false;
	                    scope.isRefreshing=false;
	                    scope.isLoadingMoreReady=false;
	                    scope.isLoadingMore=false;
	                },
	                onScrollEnd: function(e){

	                    if (!!scope.isRefreshingReady&&!scope.isRefreshing) { 
	                    	if(typeof(scope.refresh)==="function"){
	                    		scope.$apply(function(){
	                    			scope.isRefreshing=true;
									scope.topText=scope.topTextOptions.load;
	                    		})

	                    		scope.refresh();
	                    	}        
	   
	                    }
	                    //console.log(this.y+","+scope.initialMaxScrollY+","+parseInt(scope.pullUpOffset)+","+scope.hasMore+","+scope.isLoadingMore);
	                    if(this.y<scope.initialMaxScrollY+parseInt(scope.pullUpOffset)&&scope.hasMore&&!scope.isLoadingMore){
	                    	if(typeof(scope.loadMore)==="function"){
	                    		scope.$apply(function(){
	                    			scope.isLoadingMore=true;
	                    		})
	                    		scope.loadMore(); 
	                    	}        
	   

	                    }

	                },
	                onScrollTop:function(){

	                },
	                onScrollMove:function(){
	                    //console.log(this.y+","+this.maxScrollY+","+this.minScrollY+scope.hasMore+scope.isLoadingMore);
	                    if (this.y > 0 && !!scope.isRefreshingPrepare && !scope.isRefreshing) {
	                        // console.log("a")
	                        scope.isRefreshingReady=true;
	                        scope.isRefreshingPrepare=false;
	                        scope.$apply(function(){
	                            scope.topText= scope.topTextOptions.release;
	                        });
	          
	                        this.minScrollY = 0;
	                    } else if (this.y<0&&this.y>-parseInt(scope.pullDownOffset)&&!scope.isRefreshing) {
	                        // console.log("b")
	                        scope.isRefreshingPrepare=true;
	                        scope.isRefreshingReady=false;
	                        scope.$apply(function(){
	                            scope.topText = 'pull down to refresh';
	                        });
	                        this.minScrollY = -parseInt(scope.pullDownOffset);
	                    }
	                    //} else if (this.y < (this.maxScrollY - 5) && !!scope.isLoadingMorePrepare) {
	                    // if (this.y < scope.initialMaxScrollY && !!scope.isLoadingMorePrepare && !scope.isLoadingMore) {
	                    //     // console.log("c")
	                    //     scope.isLoadingMoreReady=true;
	                    //     scope.isLoadingMorePrepare=false;
	                    //     scope.$apply(function(){
	                    //         scope.bottomText = 'release to load more';
	                    //     })
	                    //     this.maxScrollY=scope.initialMaxScrollY
	                    //     // this.maxScrollY = this.maxScrollY+40;
	                    // }else if (this.y < (scope.initialMaxScrollY + 40) && this.y>scope.initialMaxScrollY && !scope.isLoadingMore) {
	                    //     // console.log("d")

	                    //     scope.isLoadingMorePrepare=true;
	                    //     scope.isLoadingMoreReady=false;
	                    //     scope.$apply(function(){
	                    //         scope.bottomText= 'pull up to load more';
	                    //     })

	                    //     this.maxScrollY = scope.initialMaxScrollY+parseInt(scope.pullUpOffset);
	                    // }
	                }

	            };
	            // angular.extend(scope.options,options);
	            scope.iscrollInstance=new iScroll( scope.component[0],options);
	        }    
    	};
	}]);
})();