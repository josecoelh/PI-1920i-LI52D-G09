


window.addEventListener("load", processHashChange);
window.addEventListener("hashchange",processHashChange);
var clickcounters =
    {
        Popclick : (window.location.hash !== "popular")? 1 : 2,
        Groupsclick : (window.location.hash !== "groups")? 1 : 2
    };
function pageload() {

    document.querySelector("#gamesResult").innerHTML = "";
    document.querySelector("#groupsResult").innerHTML = "";
    document.querySelector("#header").innerHTML = headerDiv;
    document.querySelector("#games").innerHTML = gamesDiv;
    document.querySelector("#groups").innerHTML = groupsDiv;
    document.querySelector("#popularButton").addEventListener("click",
         ()=>{processClick("Popclick","popular")});
    document.querySelector("#getGroupsButton").addEventListener("click",
        ()=>{processClick("Groupsclick","groups")});
    function processClick(counterName, hashUpdate){
        if(clickcounters[counterName] === 1){
            clickcounters[counterName]++;
            window.location.hash = hashUpdate//"popular";
        }
        else{
            clickcounters[counterName]--;
            window.location.hash = "";}
    }
}


function processHashChange() {
    rout( window.location.hash)
}