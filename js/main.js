var siteName=document.getElementById('exampleFormControlInput1');
var siteUrl=document.getElementById('exampleFormControlInput2');

var sitesUrlList=[];
if(localStorage.getItem('urls')!=null){
    sitesUrlList=JSON.parse(localStorage.getItem('urls'));
    displayUrls();
}
else{
    sitesUrlList=[];
}

var checkNameIsEmpty=document.querySelector('.submit-modal-button');
var nameWarning=document.querySelector('.warning-name-container');
var urlWarning=document.querySelector('.warning-url-container');
function addNewUrl(){
    if(siteName.value==""&&siteUrl.value==""){
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
    return;
    }
    else{
        checkNameIsEmpty.setAttribute("data-bs-toggle","");
        checkNameIsEmpty.setAttribute("data-bs-target","");
        var firstUrl={
        name:upper(siteName.value),
        url:lower(siteUrl.value),
    };
    if(validateFirstINPUT(firstUrl.name)&&validateSecondINPUT(firstUrl.url)){
    nameWarning.innerHTML = `<p class="warning-message-name"></p>`;
    urlWarning.innerHTML = `<p class="warning-message-url"></p>`;
        sitesUrlList.push(firstUrl);    
    localStorage.setItem('urls',JSON.stringify(sitesUrlList));
    var cartona="";
    for(var i=0; i<sitesUrlList.length; i++){
        cartona+=`<div class="container bg-white first-row py-2">
                <div class="row">
                    <div class="col-3  d-flex justify-content-center  ">
                        <p class="field-font my-2">${i+1}</p>
                    </div>
                    <div class="col-3 d-flex justify-content-center ">
                        <p class="field-font my-2">${sitesUrlList[i].name}</p>
                    </div>
                    <div class="col-3 d-flex justify-content-center ">
                        <a href="https://${sitesUrlList[i].url}" target="_blank">
                            <button class="btn visit-button field-font" type="submit">
                                <i class="fa-solid fa-eye pe-1 "></i>Visit
                            </button>
                        </a>
                    </div>
                    <div class="col-3 d-flex justify-content-center ">  
                        <button onclick="deleteUrls()" class="btn  field-font  Delete-button" type="submit">
                                <i class="fa-solid fa-trash-can pe-1"></i>Delete
                        </button>
                    </div>
                </div>
            </div>`;
    };
    document.getElementById('urlTable').innerHTML=cartona;
    clearInputs();
    }
    else{
        if(!validateFirstINPUT(firstUrl.name)){
            nameWarning.innerHTML=`<p class="warning-message-name text-danger ms-1">Enter a valid name</p>`;
        }
        if(!validateSecondINPUT(firstUrl.url)){
            urlWarning.innerHTML=`<p class="warning-message-url text-danger ms-1">Url must end with .com</p>`;
        }
    }
}
}

function upper(str=""){
    str1=str[0].replace(str[0],str[0].toUpperCase());
    var x="";
    for(var i=1;i<str.length;i++){
        x+=str[i].replace(str[i],str[i].toLowerCase());
    }
    return str1+x;
}
function lower(str=""){
    return str.replace(str,str.toLowerCase());
}
function validateFirstINPUT(input){
    var regexFirst=/^[a-zA-Z0-9ِ]{3,30}$/i;
    return regexFirst.test(input);
}
function validateSecondINPUT(input){
    var regexSecond=/^[a-zA-Z0-9ِ]{3,30}\.(com?)$/i;
    return regexSecond.test(input);
}
function clearInputs(){
    siteName.value="";
    siteUrl.value="";
    
}
function deleteUrls(index){
    sitesUrlList.splice(index,1);
    displayUrls();
    localStorage.setItem('urls',JSON.stringify(sitesUrlList));
}
function displayUrls(){
    var cartona="";
    for(var i=0; i<sitesUrlList.length; i++){
        cartona+=`<div class="container bg-white first-row py-2">
        <div class="row">
        <div class="col-3  d-flex justify-content-center  ">
        <p class="field-font my-2">${i+1}</p>
        </div>
        <div class="col-3 d-flex justify-content-center ">
        <p class="field-font my-2">${sitesUrlList[i].name}</p>
        </div>
        <div class="col-3 d-flex justify-content-center ">
        <a href="https://${sitesUrlList[i].url}" target="_blank">
        <button class="btn visit-button field-font" type="submit">
        <i class="fa-solid fa-eye pe-1 "></i>Visit
        </button>
        </a>
        </div>
        <div class="col-3 d-flex justify-content-center ">  
        <button onclick="deleteUrls(${i})" class="btn  field-font  Delete-button" type="submit">
        <i class="fa-solid fa-trash-can pe-1"></i>Delete
        </button>
        </div>
        </div>
        </div>`;
    };
    document.getElementById('urlTable').innerHTML=cartona;
}