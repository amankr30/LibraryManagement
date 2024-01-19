const container = document.querySelector(".container");
const hero=document.querySelector(".hero")
const bookdetailsform=document.querySelector("#bookdetailsform");
const form=document.querySelector("form");
const addbook=document.getElementById("addbook");
const title=document.getElementById("title");
const author=document.getElementById("author");
const pages=document.getElementById("pages");





const myLibrary = localStorage.getItem('myLibrary')?JSON.parse(localStorage.getItem('myLibrary')):[];

showAllBooks();

function showAllBooks(){
  myLibrary.forEach((value,index)=>{

    
    const div=document.createElement("div");
    div.setAttribute("class","mainbox");

    const innerDiv=document.createElement("div");
    innerDiv.setAttribute("class","box");
    div.append(innerDiv);

    const bookName=document.createElement("span");
    bookName.setAttribute("id","bookname");
    bookName.innerText=value.title;
    innerDiv.append(bookName);

    const authorName=document.createElement("span");
    authorName.setAttribute("id","authorname");
    authorName.innerText=value.author;
    innerDiv.append(authorName);
    
    const pageCount=document.createElement("span");
    pageCount.setAttribute("id","pagecount");
    pageCount.innerText=value.pages;
    innerDiv.append(pageCount);

    const button=document.createElement("div");
    button.setAttribute("class","button");

    const readStatus=document.createElement("button");
    readStatus.setAttribute("id","readstatus");
    readStatus.innerText="Read Status";

     // Set initial background color based on checkbox value
     readStatus.style.backgroundColor = value.read ? "green" : "red";
     readStatus.innerText = value.read ? "Reading completed" : "Not read it yet!!";

    button.append(readStatus);


    const remove=document.createElement("button");
    remove.setAttribute("id","removebook");
    remove.innerText="Remove";
    button.append(remove);
    

    remove.addEventListener("click",()=>{
      removebook();
      myLibrary.splice(index,1);
      localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
      showAllBooks();
    })

    innerDiv.append(button);

    hero.append(div);

     // Toggle background color on checkbox change
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = value.read;

    checkbox.addEventListener("change", () => {
      value.read = checkbox.checked;
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      readStatus.style.backgroundColor = value.read ? "green" : "red";
      readStatus.innerText = value.read ? "Reading completed" : "Not read it yet!!";
    });

    innerDiv.append(checkbox);
  });
}


function removebook(){
  myLibrary.forEach(()=>{
    const div=document.querySelector(".mainbox");
    div.remove();
  });
}






addbook.addEventListener("click",()=>{
  bookdetailsform.showModal();
  bookdetailsform.classList.add("show");
  document.body.style.overflow = "hidden";
});
  



form.addEventListener("submit",(e)=>{
  e.preventDefault();
  removebook();
  const readCheckbox = document.querySelector(".checkbox");
  const isRead = readCheckbox.checked;
  
  myLibrary.push({
    title:title.value,
    author:author.value,
    pages:pages.value,
    read:isRead,    

  });
  localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
   showAllBooks();
   bookdetailsform.style.display="none";
   document.body.style.overflow = "";
   
})











