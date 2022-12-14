const field = document.getElementById('inpField');
const ansBtn = document.getElementById('answer-btn');
const overlay = document.getElementById('overlay');
const img = document.getElementById('img');
const resp = document.getElementById('resp');
const respText = document.getElementById('respText');
const ansBox = document.getElementById('ans-box');
const verseBox = document.getElementById('verse');
const api_url = "https://api.quran.com/api/v4/verses/by_key/1:3?language=en&words=true";
const heart = document.getElementById('hearts');
const check = document.getElementById('correctAnsCount');
const fire = document.getElementById('fire');
const multipleChoice = document.getElementById('choiceBoxes');
let hearts = 3;
let rightAnsCount = 0;
let consequtiveCount = 0;



var correctAns = randomInteger(1, 114);


function next(surahNumber){
  console.log(surahNumber)
  var verse = "";
    let randAya = randomInteger(1,3);
    var response = fetch(`https://api.quran.com/api/v4/verses/by_key/${surahNumber}:${randAya}?language=ar&words=true`)
        .then(result => result.json())
        .then((output) => {
            console.log(output)
            for(let i = 0; i < output.verse.words.length-1; i++){
              verse += output.verse.words[i].transliteration.text + " ";
            }
            //console.log(output.verse)
          
            verseBox.innerText = verse;
    }).catch(err => console.error(err));    
}



next(correctAns);
  
  
function refresh(){
  location.reload();
}



function on() {
  overlay.style.display = "block";
}

function off() {
  overlay.style.display = "none";
}


function reset(){
  field.value = "";
  multipleChoice.innerHTML = "";
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function callNext(){
  correctAns = randomInteger(1, 114);
  next(correctAns);
}


function responseHandler(choiceTexts){
  if(choiceTexts.textContent == surahList[correctAns]){
    img.src = "images/check.png";
    resp.textContent = "إجابة صحيحة";
    
    callNext();
    rightAnsCount++;
    consequtiveCount++;
    check.innerText = rightAnsCount;
    fire.innerText = consequtiveCount;
  }else{
        img.src= "images/bheart.png";
        resp.textContent = "إجابة خاطئة";
        
        callNext();
        if(hearts == 1){
          rightAnsCount= 0;
          hearts = 1;
          consequtiveCount= 0;
          respText.innerText = `انتهت اللعبه!
          هذة سورة ${surahList[correctAns]} وهي سورة رقم ${correctAns} في القرآن الكريم`;
          ansBtn.textContent= 'إعادة';
          ansBtn.addEventListener('click',(evt)=>{
            evt.preventDefault();
            refresh();
          })
          // fire.innerText = consequtiveCount;
          heart.innerHTML = 0;
          // check.innerHTML = rightAnsCount;
        }else{
            consequtiveCount = 0;
            fire.innerText = consequtiveCount;
            heart.innerHTML = --hearts;
        }
      }

      reset();
      choices();
      on();
}




const surahList = { 
  1: "الفَاتِحَة",
  2: "البَقَرَة",
  3: "آل عِمرَان",
  4: "النِّسَاء",
  5: "المَائدة",
  6: "الأنعَام",
  7: "الأعرَاف",
  8: "الأنفَال",
  9: "التوبَة",
  10:"يُونس",
  11:"هُود",
  12:"يُوسُف",
  13:"الرَّعْد",
  14:"إبراهِيم",
  15:"الحِجْر",
  16:"النَّحْل",
  17:"الإسْرَاء",
  18:"الكهْف",
  19:"مَريَم",
  20:"طه",
  21:"الأنبيَاء",
  22:"الحَج",
  23:"المُؤمنون",
  24:"النُّور",
  25:"الفُرْقان",
  26:"الشُّعَرَاء",
  27:"النَّمْل",
  28:"القَصَص",
  29:"العَنكبوت",
  30:"الرُّوم",
  31:"لقمَان",
  32:"السَّجدَة",
  33:"الأحزَاب",
  34:"سَبَأ",
  35:"فَاطِر",
  36:"يس",
  37:"الصَّافات",
  38:"ص",
  39:"الزُّمَر",
  40:"غَافِر",
  41:"فُصِّلَتْ",
  42:"الشُّورَى",
  43:"الزُّخْرُف",
  44:"الدخَان",
  45:"الجَاثيَة",
  46:"الأحْقاف",
  47:"محَمَّد",
  48:"الفَتْح",
  49:"الحُجرَات",
  50:"ق",
  51:"الذَّاريَات",
  52:"الطُّور",
  53:"النَّجْم",
  54:"القَمَر",
  55:"الرَّحمن",
  56:"الوَاقِعَة",
  57:"الحَديد",
  58:"المجَادلة",
  59:"الحَشر",
  60:"المُمتَحنَة",
  61:"الصَّف",
  62:"الجُمُعَة",
  63:"المنَافِقون",
  64:"التغَابُن",
  65:"الطلَاق",
  66:"التحْريم",
  67:"المُلْك",
  68:"القَلَم",
  69:"الحَاقَّة",
  70:"المعَارج",
  71:"نُوح",
  72:"الجِن",
  73:"المُزَّمِّل",
  74:"المُدَّثِّر",
  75:"القِيَامَة",
  76:"الإنسَان",
  77:"المُرسَلات",
  78:"النَّبَأ",
  79:"النّازعَات",
  80:"عَبَس",
  81:"التَّكوير",
  82:"الانفِطار",
  83:"المطفِّفِين",
  84:"الانْشِقَاق",
  85:"البرُوج",
  86:"الطَّارِق",
  87:"الأَعْلى",
  88:"الغَاشِية",
  89:"الفَجْر",
  90:"البَلَد",
  91:"الشَّمْس",
  92:"الليْل",
  93:"الضُّحَى",
  94:"الشَّرْح",
  95:"التِّين",
  96:"العَلَق",
  97:"القَدْر",
  98:"البَينَة",
  99:"الزلزَلة",
  100: "العَادِيات",
  101: "القَارِعة",
  102: "التَّكَاثر",
  103: "العَصْر",
  104: "الهُمَزَة",
  105: "الفِيل",
  106: "قُرَيْش",
  107: "المَاعُون",
  108: "الكَوْثَر",
  109: "الكَافِرُون",
  110: "النَّصر",
  111: "المَسَد",
  112: "الإخْلَاص",
  113: "الفَلَق",
  114: "النَّاس"
 }; 

 console.log(Object.keys(surahList))

function choices() {
  let added = false; 
  const randomAns = randomInteger(0, 3);
  for(let i = 0; i < 4; i++){

    let choice = document.createElement('input');
    let choiceText = document.createElement('label');

    choiceText.setAttribute("id", "choice");
    choiceText.htmlFor = `choice ${i}`;
    choice.id =  `choice ${i}`;
    choice.type = 'radio';
    choice.name = `option`;
    choiceText.addEventListener('click', ()=>{
      respText.innerText = `هذة سورة ${surahList[correctAns]} وهي سورة رقم ${correctAns} في القرآن الكريم`;
      responseHandler(choiceText);    
    }); 

    


    if((randomAns == i) && added == false){
      console.log("correct answer added! " + surahList[correctAns] + " rand " +randomAns );
      choiceText.textContent = surahList[correctAns];
      added =  true;
    }else{
      choiceText.textContent = surahList[randomInteger(1, 114)];
    }


    multipleChoice.appendChild(choice);
    multipleChoice.appendChild(choiceText);
  }

  added = false;
}
 

choices();