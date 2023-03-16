let settingsIcon = document.querySelector(".settingsIcon");
let settings = document.querySelector(".settings");
let containerSettings = document.querySelector(".containerSetting");
settingsIcon.onclick = function () {
  settings.classList.toggle("activeMenu");
  containerSettings.classList.toggle("active");
};

const withdrawalCard = () => {
  let printContainet = document.querySelector("#print-container");
  let date = document.querySelector("#date").value;
  let grup = document.querySelector("#grup").value;
  let teach = document.querySelector("#teach").value;
  let nameString = document.querySelector("#surname").value;
  let agenda = document.querySelector("#agenda").value;

  let divPrint = document.createElement("div");
  divPrint.classList.add("print-page");
  // a.style.background = color;
  divPrint.innerHTML = `<div class="xz"><h4>Запрошення на батьківські збори</h4><br>Дата та час проведення: ${date}<br>Номер нупи: ${grup}<br>Класний керівник групи: ${teach}<br>Питання порядку денного:<br>${agenda}<br>Отримувач: ${nameString}</div>`;
  printContainet.append(divPrint);

  let color = document.querySelector("#color").value;
  divPrint.style.background = color;

  const file = imageInput.files[0];
  // Створити URL для файлу
  let imageUrl = URL.createObjectURL(file);
  // Змінити фон div на обране зображення
  divPrint.style.backgroundImage = `url(${imageUrl})`;
  divPrint.style.backgroundSize = "cover";
  divPrint.style.backgroundPosition = "center";
};

document.querySelector("#acceptButton").onclick = withdrawalCard;

document.querySelector("#acceptButton").addEventListener('click', () => {
  if (!teach.value) {
    teach.classList.add('error');
    span_teach.style.color = 'red';

  } else{
    teach.classList.remove('error');
    withdrawalCard();
  }
});
// картинка фону прикладу
const imageInput = document.querySelector("#image-input");
const premerDiv = document.querySelector(".bg");

imageInput.addEventListener("change", function () {
  // Отримати вибраний файл
  const file = imageInput.files[0];

  // Створити URL для файлу
  const imageUrl = URL.createObjectURL(file);

  // Змінити фон div на обране зображення
  premerDiv.style.backgroundImage = `url(${imageUrl})`;
  premerDiv.style.backgroundSize = "cover";
  premerDiv.style.backgroundPosition = "center";
  document.querySelector(
    ".print-page"
  ).style.backgroundImage = `url(${imageUrl})`;
  document.querySelector(".print-page").style.backgroundSize = "cover";
  document.querySelector(".print-page").style.backgroundPosition = "center";
});

document.querySelector("#color").addEventListener("input", function (ev) {
  let color = document.querySelector("#color").value;
  premerDiv.style.background = color;
  document.querySelector(".print-page").style.background = color;
});

const span_teach = document.querySelector('.span-teach');









