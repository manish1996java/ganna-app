window.addEventListener('load', init);

function init() {
    
    window.addEventListener("scroll",(event)=>{
        console.log(window.scroll);
    });

    let clearbtn = document.querySelector("#clear");
    let resetbtn = document.querySelector("#resetlist");
    clearbtn.addEventListener("click",()=>{
        clear();
    });
    resetbtn.addEventListener("click",()=>{
        reset();
    })

    document.querySelectorAll('.carousal').forEach((ele,key)=>{

        let obj = perform(ele);

        ele.children[0].addEventListener("click",obj.prev);
        ele.children[1].addEventListener("click",obj.next);

    })
    
    fetchDataFrServer();

}


function fetchDataFrServer(){
    let promise = fetch("https://raw.githubusercontent.com/manishdevlpr88/sampleJsonFiles/master/music.json");
    promise.then((res)=>{
        res.json().then((obj)=>{
            obj["songList"].forEach((songobj,index)=>{
                
                // createSongElement(songobj.song_thumb,songobj.song_name,"sdlfjsldjflsdjfl");
                let songobject = new Song(index,songobj.song_name,songobj.song_name,songobj.song_thumb,songobj.song_url);
                songsoperation.addSong(songobject);        
            });
            printElement();
            addListener()
        }).catch(()=>{

        })
    }).catch(()=>{

    })
    
}





function printElement(){
    console.log("printElement");
    let songlist = songsoperation.getSong();
    printingOnScreen(songlist);
}

function printingOnScreen(objarray){
    if(objarray !== null ){
        objarray.forEach((songobj)=>{
            console.log("cheack");
            createSongElement(songobj.id,songobj.imagesrc,songobj.title,songobj.description);
        })
    }
    else{
        let songlist = document.querySelector("#songlist");
        songlist.innerText = "";
    }   
}

function createSongElement(id,imagesrc,heading,para,){    

    let ul = document.querySelector("#songlist");
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let i = document.createElement("i");
    let img = document.createElement("img");
    let divimg = document.createElement("div");
    let divdetail = document.createElement("div");
    
    



    img.src=imagesrc;
    i.className = "fas fa-ellipsis-h";
    h3.innerText = heading;
    p.innerText = para;
    
    divimg.className = "images";
    divimg.appendChild(img);
    
    divdetail.className = "detail";
    divdetail.appendChild(h3);
    divdetail.appendChild(p);

    li.className = "row";
    li.appendChild(divimg);
    li.appendChild(divdetail);
    li.appendChild(i);
    li.id = id;
    ul.appendChild(li);
}


function addListener(){
    let liAll = document.querySelectorAll("#songlist li");
    console.log(liAll);
    liAll.forEach((li)=>{
        li.addEventListener("click",()=>{
            let resetlibg = document.querySelectorAll("#songlist li");
            resetlibg.forEach((rslibg)=>{
                rslibg.style.cssText= "background-color: #EFEFEF;";
            })
            
            li.style.cssText= "background-color: rgba(162, 159, 159, 0.577)";
            playSong(li.id);
        })
    })
}

var isSlected = false;
function isSelectedToggle(){
    isSlected = !isSlected;
}

function playSong(id){
    let song = songsoperation.filterSong(id);
    let audio = document.querySelector("audio");
    console.log(song.url);
    audio.src = song.url;
    audio.play();
}

function perform(ele){
    let transvar = 0;
	let obj = {
    	next:next,
		prev:prev
	};
    function next(){
        console.log(ele.children["3"].children["0"]);
        let slider = ele.children["3"].children["0"];
        if(transvar >= (-30)){
            transvar-=5;
        }
        slider.style.cssText = `transform: translateX(${transvar}%)`;
        
    }
    function prev(){
        console.log(ele.children["3"].children["0"]);
        let slider = ele.children["3"].children["0"];
        if(transvar <=  0){
            transvar+=5;
        }
        slider.style.cssText = `transform: translateX(${transvar}%)`;
    }
	return obj;
}

function reset(){
    printElement();
}
function clear(){
    printingOnScreen(null);
}

