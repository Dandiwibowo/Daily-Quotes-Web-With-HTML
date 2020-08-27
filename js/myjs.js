var quotesData = [];
var counter = 0;
function getColor(){
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}
function shootId(x){
    return document.getElementById(x);
}
function getData (){
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 10000);

    fetch("https://quotes-api.archv.id/api/quotes/v1/latest", { signal })
    .then(response => response.json())
    .then(result => {
        var contentData = result.content;
        contentData.forEach(element => {
            quotesData.push({
                "openQuote" : getColor(),
                "author": element.author,
                "content" : element.content,
                "background" : "images/"+(Math.floor(Math.random() * 41) + 1)+".jpg",
            });
        });
        console.log(quotesData);
        showData();
        shootId("loading").style.display="none";
    }).catch(err => {
        if (err.name === 'AbortError') {
            shootId("errorText").innerHTML = "Request Timeout";
            shootId("errorImages").src="images/timeout.gif";
        } else {
          console.error('Uh oh, an error!', err);
        }
        shootId("loadingContent").style.display="none";
        shootId("errorContent").style.display="block";
    });
}

function showData(){

    shootId("bigBanner").classList.toggle('fadeOut');
    setTimeout(()=>{
        // ===================== For background ================
        shootId("bigBanner").style.background=`url(${quotesData[counter].background})`;
        shootId("bigBanner").style.backgroundSize=`cover`;
        shootId("bigBanner").style.backgroundRepeat=`no-repeat`;
        shootId("bigBanner").style.backgroundPosition=`center`;
        // ===================== End of background ================
        

        // ===================== For Text and Color ================
        shootId("openingQuotes").style.color=quotesData[counter].openQuote;
        shootId("quoteText").innerHTML=quotesData[counter].content;
        shootId("quoteCreator").innerHTML=quotesData[counter].author;
        // ===================== End of background ================
        

        shootId("bigBanner").classList.toggle('fadeOut');
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