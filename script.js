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

let drops = [new Items("M4A1-S", "Decimator", 4 , "https://clck.ru/33obo8"),
    new Items("Sawed-Off", "Apocalypto", 3, "https://clck.ru/33obw7"), 
    new Items("AWP", "Gungnir", 5, "https://clck.ru/33obyj"),
    new Items("AK-47", "Neon Rider", 5, "https://clck.ru/33oc6Q"),
    new Items("Galil AR", "Phoenix Blacklight", 3, "https://clck.ru/33oc8G"),
    new Items("USP-S", "Target Acquired", 3, "https://clck.ru/33ocB2"),
    new Items("???", "Knife", 6, "https://clck.ru/33ocCH")]

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

button.addEventListener("click", (e)=>{
    e.remove()
})

//Белая - 90
//Голубая - 55
//Синия - 40
//Фиолетовая - 20
//Розовая - 13
//Красная - 5
//Желтая - 1
//Золотая - 0.3

function genItemsForCase(dropsArray, countObject, rarityTable){
    for (let countObj = 0; countObj < countObj; countObj++) {
        let random = Math.floor(Math.random() * 100)
        if (0<random<90){
            
        }
        else if (0<random<55){

        }
        else if (0<random<40){

        }
        else if (0<random<20){

        }
        else if (0<random<13){

        }
        else if (0<random<5){

        }
        else if (0<random<1){

        }
        else if (0<random<0.3){

        }
    }
}