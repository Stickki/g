const settingsIcon = document.querySelector(".settingsIcon"); 
const settings = document.querySelector(".settings"); 
const containerSettings = document.querySelector(".containerSetting"); 
const printContainet = document.querySelector("#print-container"); 
const defaultColorText = document.querySelector("#color-text"); 
const defaultBgColor = document.querySelector("#color"); 
const premerDiv = document.querySelector(".bg"); 
const printButton = document.getElementById('print-btn'); 
const imageInput = document.querySelector("#image-input") 
const downloadButton = document.querySelector('#download'); 
 
let date = ''; 
let color = ''; 
let teach = ''; 
let agenda = ''; 
let time = ''; 
let grup = ''; 
let nameString = ''; 
let file; 
 
imageInput.addEventListener('change', () => { 
  file = imageInput.files[0] 
  premerDiv.style.backgroundImage = `url(${URL.createObjectURL(imageInput.files[0])})`; 
  premerDiv.style.backgroundSize = "cover"; 
  premerDiv.style.backgroundPosition = "center"; 
}); 
 
downloadButton.classList.add("disp-none"); 
printButton.classList.add("disp-none"); 
 
settingsIcon.onclick = function () { 
  settings.classList.toggle("activeMenu"); 
  containerSettings.classList.toggle("active"); 
}; 
 
 
document.querySelector("#date").addEventListener('input', (e) => date = e.target.value); 
document.querySelector("#teach").addEventListener('input', (e) => teach = e.target.value); 
document.querySelector("#agenda").addEventListener('input', (e) => agenda = e.target.value); 
document.querySelector("#color").addEventListener('input', (e) => color = e.target.value); 
document.querySelector("#grup").addEventListener('input', (e) => ( 
  grup = e.target.value = e.target.value.slice(0,2) 
)); 
document.querySelector("#surname").addEventListener('input', (e) => ( 
  nameString = e.target.value = e.target.value.slice(0, 120) 
)); 
 
class CreateDocument { 
  constructor() { 
    this.createElement; 
    this.ducumentBlock; 
    this.imageUrl; 
  } 
  createDocumentContainer() { 
    this.ducumentBlock = document.createElement('div') 
    this.ducumentBlock.classList.add("print-page") 
    return this.ducumentBlock 
  } 
 
  createStyleDocument() { 
    this.createElement.style.background = defaultBgColor.value; 
    this.createElement.style.color = defaultColorText.value;   
    downloadButton.classList.remove("disp-none"); 
    printButton.classList.remove("disp-none"); 
  } 
 
  createDocument(i) { 
    this.createElement = this.createDocumentContainer(); 
    this.createElement.innerHTML = `<div class="xz"> 
                                      <span class="title-page">Запрошення на батьківські збори</span> 
                                      <div class= "containet-text-page"> 
                                        <p>Дата та час проведення: ${date} ${time}</p> 
                                        <p>Номер групи: ${grup}</p> 
                                        <p>Керівник групи: ${teach}</p> 
                                        <p>Питання порядку денного: ${agenda}</p> 
                                        <p>Отримувач: <span class="surn">${this.arrNames[i]}</span></p> 
                                      </div> 
                                    </div>`; 
     
    this.createStyleDocument() 
    if(file) { 
      this.imageUrl = URL.createObjectURL(file); 
      this.createElement.style.backgroundImage = `url(${this.imageUrl})`; 
      this.createElement.style.backgroundSize = "cover"; 
      this.createElement.style.backgroundPosition = "center"; 
    } 
 
    return this.createElement; 
  } 
} 
 
class GenerateDocument extends CreateDocument { 
  constructor() { 
    super() 
    this.arrNames; 
    this.arrDocument = [] 
  } 
  createDocumentContainer() { 
    return super.createDocumentContainer() 
  } 
 
  generate() { 
    this.arrNames = nameString?.split(",").map(name => name.trim()); 
    if(this.arrNames) { 
      for (let i = 0; i < this.arrNames.length; i++) { 
        this.arrDocument.push(this.createDocument(i)) 
     } 
    } 
    return this.arrDocument; 
  }

print() { 
    let countPage = 0; 
    for(let i = 0; i < this.arrDocument.length; i++) { 
      countPage++ 
      if(countPage == 6) { 
        this.arrDocument[i].classList.add("page-break") 
      } 
    } 
    window.print(); 
  } 
 
  changeColor({colorBg, colorText}) { 
    premerDiv.style.background = colorBg; 
    if(this.arrDocument.length !== 0) { 
      for(let i = 0; i < this.arrDocument.length; i++) { 
        console.log(colorBg, colorText) 
        this.arrDocument[i].style.color = colorText; 
        this.arrDocument[i].style.background = colorBg; 
      } 
    } 
  } 
 
  download() { 
    const imageName = document.querySelectorAll('.surn'); 
    if(this.arrDocument.length !== 0) { 
      for (let i = 0; i < this.arrDocument.length; i++) { 
        html2canvas(this.arrDocument[i]).then(canvas => { 
          let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
          let downloadLink = document.createElement("a"); 
          downloadLink.href = image; 
          downloadLink.download = `${imageName[i].innerHTML}.png`; 
          downloadLink.click(); 
        }); 
      } 
    } 
  } 
 
  changeImageBg(url) { 
    for(let i = 0; i < this.arrDocument.length; i++) { 
      this.arrDocument[i].style.backgroundImage = url; 
      this.arrDocument[i].style.backgroundSize = "cover"; 
      this.arrDocument[i].style.backgroundPosition = "center"; 
    } 
  } 
} 
 
const generateDocument = new GenerateDocument() 
 
document.querySelector("#acceptButton").addEventListener('click', () => { 
  let documents = generateDocument.generate() 
  printContainet.prepend(...documents); 
}) 
 
defaultBgColor.addEventListener('input', (e) => { 
  generateDocument.changeColor({colorBg: e.target.value}) 
}); 
 
defaultColorText.addEventListener('input', (e) => { 
  generateDocument.changeColor({colorText: e.target.value}) 
}); 
 
printButton.addEventListener('click', () => { 
  generateDocument.print() 
}); 
 
downloadButton.addEventListener('click', () => { 
  generateDocument.download() 
}); 
 
imageInput.addEventListener('change', () => { 
  generateDocument.changeImageBg(`url(${URL.createObjectURL(imageInput.files[0])})`) 
}) 
 
const addEventListeners = (selector, iconClass) => { 
  const icon = document.querySelector(iconClass); 
  const input = document.querySelector(selector); 
 
  input.addEventListener("focus", () => { 
    icon.classList.add("color-true"); 
  }); 
 
  input.addEventListener("blur", () => { 
    icon.classList.remove("color-true"); 
  }); 
 
  input.addEventListener("input", () => { 
    icon.classList.add("color-true-v"); 
  }); 
}; 
 
addEventListeners("#date", ".fa-calendar");
addEventListeners("#time", ".fa-clock-o");