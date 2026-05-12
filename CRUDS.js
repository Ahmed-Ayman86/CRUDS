let title =document.getElementById('title');
let price =document.getElementById('price');
let ads =document.getElementById('ads');
let taxes =document.getElementById('taxes');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mode ='create';
let tt ;




function gettotal(){
   if(price.value !=''){
      let result = (+price.value + +ads.value + +taxes.value ) - +discount.value ;
      total.innerHTML = result;
      total.style.background='green';
    }else{
        total.innerHTML='';
        total.style.background='red';
    }

}


let datapro ;
if(localStorage.product !=null){

    datapro = JSON.parse(localStorage.product);
}else{

datapro=[];

}




submit.onclick= function(){
  let newpro={
    title : title.value.toLowerCase() ,
    price : price.value ,
    taxes : taxes.value ,
    ads : ads.value ,
    discount : discount.value ,
    total : total.innerHTML,
    count : count.value ,
    category : category.value.toLowerCase() ,

  }
 
  if(title.value !='' && count.value !=''){
  if(mode==='create'){
   datapro.push(newpro);

  }else{
   datapro[tt]=  newpro ;
   mode='create';
   submit.innerHTML='create';
   count.style.display='block';

  }
  cleardata()
    }
 localStorage.setItem('product', JSON.stringify(datapro));

 
 showdata()


}

showdata()

function cleardata(){
 title.value= '';
 price.value= '';
 taxes.value= '';
 ads.value= '';
 discount.value= '';
 total.innerHTML='';
 category.value='';
 count.value ='';
}

function showdata(){
 gettotal()
 let table ='';

 for(let i =0 ; i < datapro.length; i++){
      
    table += `
            <tr>   
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td> 
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})"  id="update">update</button></td>
            <td><button onclick="deletedata(${i})"  id="delete">delete</button></td>
            </tr> 

    `;
 
 }

 document.getElementById('tbody').innerHTML=table;

 let btndelete = document.getElementById('deleteall');


 if(datapro.length > 0){
 
    btndelete.innerHTML=`
    <button onclick="deleteall()"> Delete All </button>
    `
 }else{

   btndelete.innerHTML='';

 }

}


function deletedata(i){
   if(datapro[i].count > 1){
    datapro[i].count = datapro[i].count -1 ;

   }else{
   datapro.splice(i,1);}

   localStorage.product=JSON.stringify(datapro);
   showdata()

}
function deleteall(){

localStorage.clear()
datapro.splice(0)
showdata()

}

function updatedata(i){

 title.value=datapro[i].title;
 price.value=datapro[i].price;
 taxes.value=datapro[i].taxes;
 ads.value=datapro[i].ads;
 discount.value=datapro[i].discount;
 count.value=datapro[i].count;
 gettotal();
 
 category.value=datapro[i].category;
 submit.innerHTML="update";
 mode = 'update' ;
 tt =i ;
 scroll({
    top:0,
    behavior:'smooth',
    
 })
}

let searchmood = 'title';

 function searchmode(id){

 let searchtil =document.getElementById('search');

  if(id =='searchtitle'){
  searchmood = 'title';
  searchtil.placeholder='search by title';
  }else{
  searchmood= 'category' ;
  searchtil.placeholder='search by category';
  }

   searchtil.focus()
  search.value='';
  showdata()

}

function searchdata(value){
 let table ='';
  if(searchmood =='title'){

    for(let i =0 ; i < datapro.length; i++){
              if(datapro[i].title.includes(value.toLowerCase())){
               table += `
               <tr>   
              <td>${i}</td>
               <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td> 
              <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
             <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
              <td><button onclick="updatedata(${i})"  id="update">update</button></td>
              <td><button onclick="deletedata(${i})"  id="delete">delete</button></td>
               </tr> 

          `;
          document.getElementById('tbody').innerHTML=table;
        }

    }

  }else{
    

    for(let i =0 ; i < datapro.length; i++){
              if(datapro[i].category.includes(value.toLowerCase())){
               table += `
               <tr>   
              <td>${i}</td>
               <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td> 
              <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
             <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
              <td><button onclick="updatedata(${i})"  id="update">update</button></td>
              <td><button onclick="deletedata(${i})"  id="delete">delete</button></td>
               </tr> 

          `;
          document.getElementById('tbody').innerHTML=table;
        }

    }

    }
   
  

}