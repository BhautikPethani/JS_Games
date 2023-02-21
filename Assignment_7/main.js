var imagesArray = [
  {id: 0, imgSrc: "https://www.vmcdn.ca/f/files/via/images/science-world-vancouver-false-creek.jpg;w=960"},
  {id: 1, imgSrc: "https://i.insider.com/5d38ca7d36e03c5dfa2ed4e3?width=1000&format=jpeg&auto=webp"},
  {id: 2, imgSrc: "https://www.planetware.com/wpimages/2021/06/canada-tourist-attractions-banff-rocky-mountains-lake-louise-and-glacier.jpg"},
  {id: 3, imgSrc: "https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Gateway-Of-India_600-1280x720.jpg"},
  {id: 4, imgSrc: "https://www.planetware.com/wpimages/2020/11/europe-top-attractions-eiffel-tower.jpg"},
  {id: 5, imgSrc: "https://i.insider.com/5d38b0b336e03c401422cdf8?width=750&format=jpeg&auto=webp"},
  {id: 6, imgSrc: "https://blogbox.indianeagle.com/wp-content/uploads/2016/02/Jatayu-Nature-Park-in-Kerala-among-new-tourist-attractions-in-India.jpg"},
  {id: 7, imgSrc: "https://www.usnews.com/object/image/00000163-8d5b-d398-ad7f-8dffef190000/2-giza-getty.jpg?update-time=1527086541593&size=responsive640"},
  {id: 0, imgSrc: "https://www.vmcdn.ca/f/files/via/images/science-world-vancouver-false-creek.jpg;w=960"},
  {id: 1, imgSrc: "https://i.insider.com/5d38ca7d36e03c5dfa2ed4e3?width=1000&format=jpeg&auto=webp"},
  {id: 2, imgSrc: "https://www.planetware.com/wpimages/2021/06/canada-tourist-attractions-banff-rocky-mountains-lake-louise-and-glacier.jpg"},
  {id: 3, imgSrc: "https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Gateway-Of-India_600-1280x720.jpg"},
  {id: 4, imgSrc: "https://www.planetware.com/wpimages/2020/11/europe-top-attractions-eiffel-tower.jpg"},
  {id: 5, imgSrc: "https://i.insider.com/5d38b0b336e03c401422cdf8?width=750&format=jpeg&auto=webp"},
  {id: 6, imgSrc: "https://blogbox.indianeagle.com/wp-content/uploads/2016/02/Jatayu-Nature-Park-in-Kerala-among-new-tourist-attractions-in-India.jpg"},
  {id: 7, imgSrc: "https://www.usnews.com/object/image/00000163-8d5b-d398-ad7f-8dffef190000/2-giza-getty.jpg?update-time=1527086541593&size=responsive640"}
];

var coverImg = "https://img.freepik.com/free-vector/set-famous-landmark-vectors_53876-77150.jpg";
shuffle(imagesArray);

var imgElements = [];
var lblSeconds = document.getElementById("seconds");
var sortedDataTable = document.getElementById("sortedData");
initImgElements();

var numberOfPairs = 0;

var scoreBoard = [];

var firstFlip = true;
var previousImgID = -1;
var seconds = 0;

function initImgElements(){
  for (i=0; i<16; i++){
    imgElements[i] = document.getElementById(i);
    imgElements[i].src = coverImg;
    imgElements[i].alt = imagesArray[i].id;
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

var secondsInterval = setInterval(()=>{
  seconds++;
  lblSeconds.innerHTML = seconds;
},1000);

async function imgFlip(index){
  imgElements[index].src = imagesArray[index].imgSrc;

  if(firstFlip){
    previousImgID = index;
    firstFlip = false;
  }else{
    firstFlip = true;
    await new Promise(resolve => setTimeout(resolve, 800));
    if(previousImgID != -1){
      console.log("Match: "+imgElements[index].alt + " + " + imgElements[previousImgID].alt);
      if(imgElements[previousImgID].alt != imgElements[index].alt){
        imgElements[previousImgID].src = coverImg;
        imgElements[index].src = coverImg;
      }else{
        numberOfPairs++;
        if(numberOfPairs >= 7){
          await new Promise(resolve => setTimeout(resolve, 3000));
          reset();
          clearInterval(secondsInterval);
        }
      }
      previousImgID = -1;
    }
  }
}

function reset(){
  shuffle(imagesArray);
  initImgElements();
  numberOfPairs = 0;
  firstFlip = true;
  previousImgID = -1;
  scoreBoard.push(seconds);
  seconds = 0;
  lblSeconds.innerHTML = seconds;
  secondsInterval = setInterval(()=>{
    seconds++;
    lblSeconds.innerHTML = seconds;
  },1000);
  displayTableData();
}

function displayTableData(){
  scoreBoard = scoreBoard.sort((a,b)=>a-b);

  sortedDataTable.innerHTML = "";
  for(let i = 0; i < scoreBoard.length; i++){
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${scoreBoard[i]}</td>
    `;
    sortedDataTable.appendChild(row);
    if(i==5){
      break;
    }
  }
}
