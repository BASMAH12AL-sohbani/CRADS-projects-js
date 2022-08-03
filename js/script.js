let title = document.getElementById("title"),
price = document.getElementById("price"),
taxes = document.getElementById("taxes"),
ads = document.getElementById("ads"),
discount = document.getElementById("discount"),
total = document.getElementById("total"),
count = document.getElementById("count"),
category = document.getElementById("category"),
submit = document.getElementById("submit");

let mood = 'create'; 
let tmp;

// get total 
function getTotal(){
   if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
    total.innerHTML= result;
    total.style.background = '#040';
   }
   else{
    total.innerHTML= '';
    total.style.background = '#ee2e20';
   }
}

//create prodect
let dataPro;
if(localStorage.product !=null){
    dataPro =JSON.parse(localStorage.product);
}else{
    dataPro =[];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != "" && price.value != "" && category.value !="" && newPro.count<100){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i=0 ; i<newPro.count ; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp]= newPro;
            mood = 'create';
            submit.innerHTML="Create";
            count.style.display = "block";
        }
        clearData();
    }
    
    
    localStorage.setItem('product' , JSON.stringify(dataPro));
    showDate();
}


//save data storage

//clear inputs
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
}


//read
function showDate(){
    getTotal();
    let table ='';
    for(let i=1 ; i< dataPro.length ; i++){
        table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btndeletAll = document.getElementById('deletAll');

    if(dataPro.length>0){
        btndeletAll.innerHTML = `
        <button onclick = "deletAll()"> Delet All (${dataPro.length})</button>`
    }
    else{
        btndeletAll.innerHTML ='';
    }
}
showDate();

//count



//delet
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showDate();
}
function deletAll(){
    localStorage.clear();
    dataPro.splice(0);
    showDate();
}


//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML="Update";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior: 'smooth'
    })



}


//search 
let moodSearch = "title";
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        moodSearch = "title";
    }else{
        moodSearch = "category";
    }
    search.placeholder = "Search By " +moodSearch;
    search.focus();
    search.value="";
    showDate();

}
function searchData(value){
    let table = "";
    if(moodSearch == "title"){
        for(let i=0 ;i< dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
        }

    }else{
        for(let i=0 ;i< dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;

}

//clean data cotrol data
