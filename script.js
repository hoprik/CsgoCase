import * as THREE from 'three';

class Items{
    name;
    skin;
    rarity;
    img;
    constructor(name, skin, rarity, img){
        this.name = name;
        this.rarity = rarity
        this.img = img;
        this.skin = skin;
    }
}

let drops1 = [new Items("M4A1-S", "Decimator", 4 , "items/m4a1-s/1.webp"),
    new Items("Sawed-Off", "Apocalypto", 3, "items/sawed/1.webp"), 
    new Items("AWP", "Gungnir", 5, "items/awp/1.webp"),
    new Items("AK-47", "Neon Rider", 5, "items/ak-47/1.webp"),
    new Items("Galil AR", "Phoenix Blacklight", 3, "items/galil/1.webp"),
    new Items("USP-S", "Target Acquired", 3, "items/usp-s/1.webp"),
    new Items("SG 553", "Integrale", 4, "items/sg-553/1.webp"),
    new Items("???", "Knife", 6, "items/rarity.webp")]

let drops2 = [new Items("ff-S", "Decimator", 4 , "items/m4a1-s/1.webp"),
    new Items("dfdf-Off", "Apocalypto", 3, "items/sawed/1.webp"), 
    new Items("gh","Gungnir", 5, "items/awp/1.webp"),
    new Items("gh-47", "Neon Rider", 5, "items/ak-47/1.webp"),
    new Items("gh AR", "Phoenix Blacklight", 3, "items/galil/1.webp"),
    new Items("gh-S", "Target Acquired", 3, "items/usp-s/1.webp"),
    new Items("dfd 553", "Integrale", 4, "items/sg-553/1.webp"),
    new Items("???", "Knife", 6, "items/rarity.webp")]

let case_drop = drops1;


dropgen(case_drop)

function dropgen(drops){
    drops.forEach(e=>{
        let drop = document.createElement("div")
        let img = document.createElement("img")
        let name = document.createElement("p")
        let skin = document.createElement("p")
        let rarity = document.createElement("div")
        //class
        drop.className="drop";
        name.className="nameDrop"
        skin.className="nameSkin"
        rarity.className="rarity";
        img.className="weapon";
        //text
        name.innerText=e.name;
        skin.innerText=e.skin;
        img.src=e.img;
        img.style.height="100px";
        img.style.objectFit="cover";
        if (e.rarity==0){
            rarity.style.backgroundColor="#d4d4d4";
        }
        else if (e.rarity==1){
            rarity.style.backgroundColor="#7692cf";
        }
        else if (e.rarity==2){
            rarity.style.backgroundColor="#3666cf";
        }
        else if (e.rarity==3){
            rarity.style.backgroundColor="#8c54cc";
        }
        else if (e.rarity==4){
            rarity.style.backgroundColor="#d751db";
        }
        else if (e.rarity==5){
            rarity.style.backgroundColor="#e6514c";
        }
        else if (e.rarity==6){
            rarity.style.backgroundColor="#edc524";
        }
        else if (e.rarity==7){
            rarity.style.backgroundColor="#a86218";
        }
        //
        let dropsTable = document.querySelector(".drops");
        drop.appendChild(img);
        drop.appendChild(name);
        drop.appendChild(skin);
        drop.appendChild(rarity);
        dropsTable.appendChild(drop)
    })
}


const slider = document.querySelector('.drops');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

const button = document.querySelector(".case")

let caseFild = document.querySelector(".caseOpening")
let pixel;  
let dropInCaseArray = []
let audioCase;
let intelrval;
let time = 0 
let lastS

button.addEventListener("click", (e)=>{
    genItemsForCase(case_drop, 1000)
    audioCase = audioManager("audio/openCase.mp3")
    pixel = 22
    intelrval = setInterval(openCase, 0.2)

})

function openCase(){
    caseFild.scrollLeft += pixel
    pixel -= 0.02
    // console.log(caseFild.scrollLeft);
    if (lastS == caseFild.scrollLeft){
        pixel = Math.floor(pixel)
        caseFild.scrollLeft += pixel
    }
    lastS = caseFild.scrollLeft
    console.log(pixel);
    if (pixel < 0){
        clearInterval(intelrval)
        audioCase.pause()
        const dropInCase = document.getElementsByClassName("dropC")
        let id = 0;
        let current;
        let arrayDropInCase = [];
        for (const iterator of dropInCase) {
            const xPosition = iterator.getBoundingClientRect().left
            arrayDropInCase.push({pos: xPosition, id, iterator})
            id++
        }
        const cof = window.innerWidth/caseFild.offsetWidth

        let left =arrayDropInCase.filter(v => v.pos < window.innerWidth/2);
        current = left[left.length-1]
        let dropWin = dropInCaseArray[current.id]
        console.log(current.id);
        console.log(current.iterator);
        pixel = 0
        console.log(dropWin.skin);
        document.body.insertAdjacentHTML("afterbegin", `<div class="showCase"><div class="caseShowItem"><img class="weapon" src="${dropWin.img}" style="height: 400px; object-fit: cover;"><p class="nameDrop">${dropWin.name}</p><p class="nameSkin">${dropWin.skin}</p><div class="rarity" style="background-color: ${getColorByID(dropWin.rarity)}; width: 540px;"></div></div></div>`)
        deleteItemFromWindow()
        dropInCaseArray = []
        audioCase = "";  
        id = 0;
        arrayDropInCase = [];
        audioManager("audio/itemShow.mp3")
    }
}


function deleteItemFromWindow(){
    setTimeout(()=>{
        document.querySelector(".showCase").remove()
        window.location.reload()
    }, 5000)
}

//Белая - 90
//Голубая - 55
//Синия - 40
//Фиолетовая - 20
//Розовая - 13
//Красная - 5
//Желтая - 1
//Золотая - 0.3

function genItemsForCase(drops, countObject){
    for (let countObj = 0; countObj < countObject; countObj++) {
        let dropRarity;
        if (chanceRandom(90)){
            dropRarity = Object.values(drops.filter(item => item.rarity==0))
            genDropCart(dropRarity)
        }
        else if(chanceRandom(85)){
            dropRarity = Object.values(drops.filter(item => item.rarity==1))
            genDropCart(dropRarity)
        }
        else if(chanceRandom(55)){
            dropRarity = Object.values(drops.filter(item => item.rarity==2))
            genDropCart(dropRarity)
        }
        else if(chanceRandom(40)){
            dropRarity = Object.values(drops.filter(item => item.rarity==3))
            genDropCart(dropRarity)
        }
        else if(chanceRandom(20)){
            dropRarity = Object.values(drops.filter(item => item.rarity==4))
            genDropCart(dropRarity)
        }
        else if(chanceRandom(13)){
            dropRarity = Object.values(drops.filter(item => item.rarity==5))
            genDropCart(dropRarity)
        }
        else if(chanceRandom(5)){
            dropRarity = Object.values(drops.filter(item => item.rarity==6))
            genDropCart(dropRarity);
        }
        else{
            dropRarity = Object.values(drops.filter(item => item.rarity==7))
            genDropCart(dropRarity)
        }
    }
}

function audioManager(audioSrc){
    let audio = new Audio();
    audio.src = audioSrc;
    audio.autoplay = true;
    return audio;
}

function genDropCart(dropMap){
    let randomArray = Math.floor(Math.random()*dropMap.length-1)
    let item = dropMap[randomArray]
    if (item != undefined){
        let drop = document.createElement("div")
        let img = document.createElement("img")
        let name = document.createElement("p")
        let skin = document.createElement("p")
        let rarity = document.createElement("div")
        //class
        drop.className="dropC";
        name.className="nameDrop"
        skin.className="nameSkin"
        img.className="weapon";
        //text
        name.innerText=item.name;
        skin.innerText=item.skin;
        img.src=item.img;
        img.style.height="100px";
        img.style.objectFit="cover";
        let dropsTable = document.querySelector(".caseOpening");
        drop.appendChild(img);
        drop.appendChild(name);
        drop.appendChild(skin);
        drop.appendChild(rarity);
        dropsTable.appendChild(drop)
        dropInCaseArray.push(item)
    }
}

function chanceRandom(chance) {
    const random = Math.random()*100;
    if (random > chance) {
        return true;
    } else {
        return false;
    }
}


function getColorByID(id){
    let color
    if (id == 0){
        color = "#d4d4d4";
    }
    else if (id==1){
        color = "#7692cf";
    }
    else if (id==2){
        color = "#3666cf";
    }
    else if (id==3){
        color = "#8c54cc";
    }
    else if (id==4){
        color = "#d751db";
    }
    else if (id==5){
        color = "#e6514c";
    }
    else if (id==6){
        color = "#edc524";
    }
    else if (id==7){
        color = "#a86218";
    }
    return color
}