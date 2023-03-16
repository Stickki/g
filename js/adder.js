let settingsIcon = document.querySelector(".settingsIcon");
let settings = document.querySelector(".settings");
let containerSettings = document.querySelector(".containerSetting");
settingsIcon.onclick = function () {
  settings.classList.toggle("activeMenu");
  containerSettings.classList.toggle("active");
};

document.querySelector("#acceptButton").addEventListener('click', () => {



  let arr;
  let printContainet = document.querySelector("#print-container");
  let date = document.querySelector("#date").value;
  let grup = document.querySelector("#grup").value;
  let teach = document.querySelector("#teach").value;
  let nameString = document.querySelector("#surname").value;
  let agenda = document.querySelector("#agenda").value;
  let time = document.querySelector('#time').value;
  let color = document.querySelector("#color").value;
  arr = nameString.split(",").map(name => name.trim());
  const file = imageInput.files[0];



  for (let i = 0; i < arr.length; i++) {
    let divPrint = document.createElement("div");
    divPrint.classList.add("print-page");
    // divPrint.innerHTML = `<div class="xz"><h4>Запрошення на батьківські збори</h4><br>Дата та час проведення: ${date}<br>Номер нупи: ${grup}<br>Класний керівник групи: ${teach}<br>Питання порядку денного:<br>${agenda}<br>Отримувач: ${arr[i]}</div>`;
    divPrint.innerHTML = `<div class="xz">
                          <span class="title-page">Запрошення на батьківські збори</span>
                          <div class= "containet-text-page">
                            <p>Дата та час проведення: ${date} ${time}</p>
                            <p>Номер групи: ${grup}</p>
                            <p>Керівник групи: ${teach}</p>
                            <p>Питання порядку денного: ${agenda}</p>
                            <p>Отримувач: <span class="surn">${arr[i]}</span></p>
                          </div>
                        </div>`;

    divPrint.style.background = color;
    if (typeof file !== 'undefined' && file !== null && file !== '') {


      // Створити URL для файлу
      imageUrl = URL.createObjectURL(file);
      // Змінити фон div на обране зображення
      divPrint.style.backgroundImage = `url(${imageUrl})`;
      divPrint.style.backgroundSize = "cover";
      divPrint.style.backgroundPosition = "center";
    }
    printContainet.append(divPrint);
  }
}

);



// картинка фону прикладу
const imageInput = document.querySelector("#image-input");
const premerDiv = document.querySelector(".bg");

imageInput.addEventListener("change", function () {
  // Отримати вибраний файл
  const file = imageInput.files[0];

  // Створити URL для файлу
  let imageUrl = URL.createObjectURL(file);


  // Змінити фон div на обране зображення
  premerDiv.style.backgroundImage = `url(${imageUrl})`;
  premerDiv.style.backgroundSize = "cover";
  premerDiv.style.backgroundPosition = "center";
  if (document.querySelector(".print-page") !== null) {
    let printPages = document.querySelectorAll('.print-page');
    for (let i = 0; i < printPages.length; i++) {
      printPages[i].style.backgroundImage = `url(${imageUrl})`;
      printPages[i].style.backgroundSize = "cover";
      printPages[i].style.backgroundPosition = "center";
    }
  }
  return imageUrl;
});

document.querySelector("#color").addEventListener("input", function () {
  let color = document.querySelector("#color").value;
  premerDiv.style.background = color;

  if (document.querySelector(".print-page") !== null) {
    let printPages = document.querySelectorAll('.print-page');
    for (let i = 0; i < printPages.length; i++) {
      printPages[i].style.background = color;
    }
  }
});




// виклик меню друку
const printButton = document.getElementById('print-btn');
printButton.addEventListener('click', () => {
  var newElement = document.createElement("div");
  let k = 0;
  newElement.classList.add('indent');


  let arrpage = document.querySelectorAll('.print-page');
  for (let i = 0; i < arrpage.length; i++) {
    k++;
    if (k == 6) {
      arrpage[i].classList.add("page-break");
      k = 0;

    }

  }
  window.print();

});

document.querySelector('#download').addEventListener('click', () => {
  const printPage = document.querySelectorAll('.print-page');
  const imageName = document.querySelectorAll('.surn');
  // Prompt user to input a name for the image
  for (let i = 0; i < printPage.length; i++) {

  // Convert HTML element to canvas
  html2canvas(printPage[i]).then(canvas => {
    // Convert canvas to data URL
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    // Set download link's href attribute to the data URL
    let downloadLink = document.createElement("a");
    downloadLink.href = image;
    
    // Set the download attribute with the user-provided image name
    downloadLink.download = `${imageName[i].innerHTML}.png`;
    
    // Trigger download
    downloadLink.click();
  });
}
});





