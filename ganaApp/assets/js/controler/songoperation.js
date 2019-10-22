 var songsoperation = {
    playList: [],
    addSong:function(song){
        this.playList.push(song);
    },
    deleteSong:function(){
        
    },
    filterSong:function(fltrvalue){

        return this.playList[fltrvalue];
        // if(!isNaN(fltrvalue)){
        //     this.playList.filter((value)=>{
        //         value["id"] === fltrvalue;
        //     })
        // }else if(typeof mk === "string" && !fltrvalue == ""){
        //     return this.playList.filter((value)=>{
        //         value["title"] === fltrvalue;
        //     })
        // }
        // else{
        //     return;
        // }
        
    },
    getSong:function(){
        return this.playList;
    },
    printSong:function(){
        console.log(this.playList);
    }

}