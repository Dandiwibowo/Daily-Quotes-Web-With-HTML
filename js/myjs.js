var quotesData = [];
var counter = 0;
function getColor(){
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}
function getData (){
    fetch("https://quotes-api.archv.id/api/quotes/v1/latest")
    .then(response => response.json())
    .then(result => {
        var contentData = result.content;
        contentData.forEach(element => {
            quotesData.push({
                "openQuote" : getColor(),
                "author": element.author,
                "content" : element.content,
                "background" : "images2/"+(Math.floor(Math.random() * 41) + 1)+".jpg",
            });
        });
        console.log(quotesData);
        showData();
        document.getElementById("loading").style.display="none";
    })
    .then()
    .catch(function() {
        document.getElementById("loadingContent").style.display="none";
        document.getElementById("errorContent").style.display="block";
    });
}

function showData(){

    document.getElementById('bigBanner').classList.toggle('fadeOut');
    setTimeout(()=>{
        // ===================== For background ================
        document.getElementById("bigBanner").style.background=`url(${quotesData[counter].background})`;
        document.getElementById("bigBanner").style.backgroundSize=`cover`;
        document.getElementById("bigBanner").style.backgroundRepeat=`no-repeat`;
        document.getElementById("bigBanner").style.backgroundPosition=`center`;
        // ===================== End of background ================
        

        // ===================== For Text and Color ================
        document.getElementById("openingQuotes").style.color=quotesData[counter].openQuote;
        document.getElementById("quoteText").innerHTML=quotesData[counter].content;
        document.getElementById("quoteCreator").innerHTML=quotesData[counter].author;
        // ===================== End of background ================
        

        document.getElementById('bigBanner').classList.toggle('fadeOut');
    }, 1000)
    
}

function nextQuotes(){
    counter++;
    if(counter==quotesData.length)
        counter = 0;
    showData();
}

function prevQuotes(){
    counter--;
    if(counter<0)
        counter = quotesData.length-1;
    showData();
}

getData();