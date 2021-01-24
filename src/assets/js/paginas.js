const $instanext=document.querySelector(".instanext");
const $instanextsection=document.querySelector(".instanextsection");


$instanext.addEventListener("click", ()=>{
    $instanextsection.classList.toggle("showinstagramfeed");
    change()
})

function change(){
    if ($instanext.textContent=="Show more..") {
    $instanext.textContent = "Show less..";
}
       else $instanext.textContent = "Show more..";
}
