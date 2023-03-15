// import items from './db.json' assert {type: 'json'};

function showGroup(group) {
  document.querySelector(".inputBoxList").value = group;
}
function showSurname(surname) {
  document.querySelector(".boxName").value = surname;
}

let dropdown = document.querySelector(".groupList1");
let dropactive = document.querySelector(".dropBlockList1");
dropdown.onclick = function () {
  dropactive.classList.toggle("active");
};

let dropdown2 = document.querySelector(".groupList2");
let dropactive2 = document.querySelector(".dropBlockList2");
dropdown2.onclick = function () {
  dropactive2.classList.toggle("active");
};

let settingsIcon = document.querySelector(".settingsIcon");
let settings = document.querySelector(".settings");
let containerSettings = document.querySelector(".containerSetting");
settingsIcon.onclick = function () {
  settings.classList.toggle("activeMenu");
  containerSettings.classList.toggle("active");
};

const inputBoxList = document.querySelector(".inputBoxList");
const dropListElement = document.querySelectorAll(".dropListElement");
const boxName = document.querySelector(".boxName");


inputBoxList.addEventListener("click", () => {
  inputBoxList.classList.toggle("inputClick");
});
boxName.addEventListener("click", () => {
  boxName.classList.toggle("inputClick");
});
dropListElement.forEach((elem) => {
  elem.addEventListener("click", () => {
    inputBoxList.classList.remove("inputClick");
  });
});

const withdrawalCard = () => {
  let printContainet = document.querySelector("#print-container");
  let date = document.querySelector("#date").value;
  let grup = document.querySelector("#grup").value;
  let teach = document.querySelector("#teach").value;
  let nameString = document.querySelector("#surname").value;

  let divPrint = document.createElement("div");
  divPrint.classList.add("print-page");
  // a.style.background = color;
  divPrint.innerHTML = `<div class="xz">дата проведення:${date}<br>номер нупи №${grup}<br>викладач:${teach}<br>кому:${nameString}</div>`;
  printContainet.append(divPrint);
};

document.querySelector("#acceptButton").onclick = withdrawalCard;

const dropBlockList2 = async () => {
  let response = await fetch('js/surnames.json');
  let arr = await response.json();
  let dropBlockList2 = document.querySelector('.dropBlockList2');
  let listElements = dropBlockList2.querySelectorAll('.dropListElement');

  // Проверяем наличие элементов в списке
  if (listElements.length === 0) {
    for (let i = 0; i < arr.length; i++) {
      let divList = document.createElement('div');
      divList.classList.add('dropListElement');
      divList.innerHTML = `${arr[i]}`;
      divList.addEventListener('click', () => {
        showSurname(arr[i]);
      });
      dropBlockList2.append(divList);
    }
  }
};

if (document.querySelector("#surname")) {
  document.querySelector("#surname").onclick = dropBlockList2;
}
// document.querySelector('#color').addEventListener('input', function (ev) {
//   let color = document.querySelector('#color').value;
//   premerDiv.style.background = color;
// });

// картинка фону прикладу
const imageInput = document.querySelector('#image-input');
const premerDiv = document.querySelector('.backgroundColorImg');

imageInput.addEventListener('change', function () {
  // Отримати вибраний файл
  const file = imageInput.files[0];

  // Створити URL для файлу
  const imageUrl = URL.createObjectURL(file);

  // Змінити фон div на обране зображення
  premerDiv.style.backgroundImage = `url(${imageUrl})`;
  premerDiv.style.backgroundSize = 'cover';
  premerDiv.style.backgroundPosition = 'center';
});

document.querySelector('#color').addEventListener('input', function (ev) {
  let color = document.querySelector('#color').value;
  document.querySelector('.backgroundColorImg').style.background = color;
});





