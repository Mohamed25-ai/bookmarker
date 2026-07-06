var siteName = document.getElementById("exampleFormControlInput1");
var siteUrl = document.getElementById("exampleFormControlInput2");
var searchInput = document.getElementById("search-input");
var checkNameIsEmpty = document.querySelector(".submit-modal-button");
var nameWarning = document.querySelector(".warning-name-container");
var urlWarning = document.querySelector(".warning-url-container");
var submitButton = document.querySelector(".submit-button");
var sitesUrlList = [];
if (localStorage.getItem("urls") != null) {
  sitesUrlList = JSON.parse(localStorage.getItem("urls"));
  for (i = 0; i < sitesUrlList.length; i++) {
    sitesUrlList[i].isEdit = false;
  }
  displayUrls(sitesUrlList);
} else {
  sitesUrlList = [];
}
function addNewUrl() {
  if (siteName.value == "" || siteUrl.value == "") {
    const modal = new bootstrap.Modal(
      document.getElementById("staticBackdrop"),
    );
    modal.show();
    return;
  } else {
    checkNameIsEmpty.setAttribute("data-bs-toggle", "");
    checkNameIsEmpty.setAttribute("data-bs-target", "");
    var firstUrl = {
      name: upper(siteName.value),
      url: lower(siteUrl.value),
      isEdit: false,
    };
    if (
      validateFirstINPUT(firstUrl.name) &&
      validateSecondINPUT(firstUrl.url)
    ) {
      nameWarning.innerHTML = `<p class="warning-message-name"></p>`;
      urlWarning.innerHTML = `<p class="warning-message-url"></p>`;
      sitesUrlList.push(firstUrl);
      localStorage.setItem("urls", JSON.stringify(sitesUrlList));
      displayUrls(sitesUrlList);

      clearInputs();
    } else {
      if (!validateFirstINPUT(firstUrl.name)) {
        nameWarning.innerHTML = `<p class="warning-message-name text-danger ms-1">Enter a valid name</p>`;
      }
      if (!validateSecondINPUT(firstUrl.url)) {
        urlWarning.innerHTML = `<p class="warning-message-url text-danger ms-1">Url must end with .com</p>`;
      }
    }
  }
}

function upper(str = "") {
  str1 = str[0].replace(str[0], str[0].toUpperCase());
  var x = "";
  for (var i = 1; i < str.length; i++) {
    x += str[i].replace(str[i], str[i].toLowerCase());
  }
  return str1 + x;
}
function lower(str = "") {
  return str.replace(str, str.toLowerCase());
}
function validateFirstINPUT(input) {
  var regexFirst = /^[a-zA-Z0-9ِ]{3,30}$/i;
  return regexFirst.test(input);
}
function validateSecondINPUT(input) {
  var regexSecond = /^[a-zA-Z0-9ِ]{3,30}\.(com?)$/i;
  return regexSecond.test(input);
}
function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}
function displayUrls(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `<div class="container bg-white first-row py-2">
        <div class="row">
          <div class="col-2 d-flex justify-content-center">
            <p class="field-font my-2">${i + 1}</p>
          </div>
          <div class="col-3 d-flex justify-content-center">
            <p class="field-font my-2">${list[i].name}</p>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <a href="https://${list[i].url}" target="_blank">
              <button class="btn visit-button field-font" type="submit">
                <i class="fa-solid fa-eye pe-1"></i>Visit
              </button>
            </a>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <button
              onclick="editUrl(${i})"
              class="btn field-font Edit-button"
              type="submit"
              ${list[i].isEdit ? "disabled" : ""}
            >
              <i class="fa-solid fa-edit pe-1"></i>Edit
            </button>
          </div>
          <div class="col-2 d-flex justify-content-center ">  
                        <button onclick="deleteUrls(${i})" class="btn  field-font  Delete-button" type="submit">
                                <i class="fa-solid fa-trash-can pe-1"></i>Delete
                        </button>
                    </div>
          </div>
          
      </div>`;
  }
  document.getElementById("urlTable").innerHTML = cartona;
}
function deleteUrls(index) {
  sitesUrlList.splice(index, 1);
  displayUrls(sitesUrlList);
  localStorage.setItem("urls", JSON.stringify(sitesUrlList));
}
function editUrl(i) {
  submitButton.innerHTML = `<button
              type="button"
              onclick="submitEdit(${i})"
              class="submit-modal-button btn btn-danger px-5"
              data-bs-toggle=""
              data-bs-target=""
            >
              Save Changes
            </button>`;
  var currentSiteName = sitesUrlList[i].name;
  var currentSiteUrl = sitesUrlList[i].url;
  siteName.value = currentSiteName;
  siteUrl.value = currentSiteUrl;
  for (let index = 0; index < sitesUrlList.length; index++) {
    sitesUrlList[index].isEdit = false;
  }
  sitesUrlList[i].isEdit = true;
  displayUrls(sitesUrlList);
}

function submitEdit(i) {
  var name = siteName.value;
  var url = siteUrl.value;
  if (name == "" || url == "") {
    const modal = new bootstrap.Modal(
      document.getElementById("staticBackdrop"),
    );
    modal.show();
    return;
  }
  checkNameIsEmpty.setAttribute("data-bs-toggle", "");
  checkNameIsEmpty.setAttribute("data-bs-target", "");
  if (validateFirstINPUT(name) && validateSecondINPUT(url)) {
    nameWarning.innerHTML = `<p class="warning-message-name"></p>`;
    urlWarning.innerHTML = `<p class="warning-message-url"></p>`;
    sitesUrlList[i].name = upper(name);
    sitesUrlList[i].url = lower(url);
    sitesUrlList[i].isEdit = false;
    localStorage.setItem("urls", JSON.stringify(sitesUrlList));
    submitButton.innerHTML = ` <button
                type="button"
                onclick="addNewUrl()"
                class="submit-modal-button btn btn-danger px-5"
                data-bs-toggle=""
                data-bs-target=""
              >
                Submit
              </button>`;
    displayUrls(sitesUrlList);
    clearInputs();
  } else {
    if (!validateFirstINPUT(name)) {
      nameWarning.innerHTML = `<p class="warning-message-name text-danger ms-1">Enter a valid name</p>`;
    }
    if (!validateSecondINPUT(url)) {
      urlWarning.innerHTML = `<p class="warning-message-url text-danger ms-1">Url must end with .com</p>`;
    }
  }
}
function handleSearchUrl() {
  var existedUrls = [];
  var searchValue = searchInput.value.toLowerCase();
  for (let index = 0; index < sitesUrlList.length; index++) {
    if (sitesUrlList[index].name.toLowerCase().includes(searchValue.trim().toLowerCase())) {
      existedUrls.push(sitesUrlList[index]);
    }
  }
  displayUrls(existedUrls);
}
