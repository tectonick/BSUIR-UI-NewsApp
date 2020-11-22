async function loadNews(){
    const API_KEY='1b492488a06f476880d9b54d4e64fbbb';
    let url = 'https://newsapi.org/v2/top-headlines?' +
    'country=ru&' +
    'apiKey='+API_KEY;
    return await fetch(url, {mode:'cors'}).then((response)=>response.json());
}


function displayMoreNews(count){

    if (typeof displayMoreNews.displayed == 'undefined')     displayMoreNews.displayed=0;
    let start=displayMoreNews.displayed;
    let end=displayMoreNews.displayed+count;
    let newsBlock=document.querySelector('main');
    for (let index = start; index < end; index++) {
        let newSection=document.createElement('section');

        if (news.articles.length<=index){
            newSection.innerText="No news for today";
            document.getElementById('more-button').style.display='none';
            newsBlock.appendChild(newSection);  
            return;
        }

        newSection.classList.add('news-item');

        let article = news.articles[index];
        let title=document.createElement('h2');
        title.innerText=article.title;
        let author=document.createElement('em');
        author.innerText='Источник: '+article.source.name;
        let img=document.createElement('img');
        img.src=article.urlToImage;
        let description=document.createElement('p');
        description.innerText=article.description;
        let link=document.createElement('a');
        link.innerText="Подробнее в источнике";
        link.href=article.url;

        newSection.appendChild(img);
        newSection.appendChild(title);
        newSection.appendChild(author);

        newSection.appendChild(description);
        newSection.appendChild(link);

        newsBlock.appendChild(newSection);    
        displayMoreNews.displayed++; 

        addSource(article.source.name);
    }
    document.getElementById('not-found').style.display='none';
}

function addSource(source){
    if (typeof addSource.sources =='undefined') addSource.sources=[];
    if (addSource.sources.indexOf(source)<0){
        addSource.sources.push(source);
        let newOption=document.createElement('option');
        newOption.innerHTML=source;
        newOption.value=source;
        document.getElementById('filter').appendChild(newOption);
    }
}

var news;

async function init(){
    news= await loadNews();
    addSource('Все источники')
    console.log(news);
    displayMoreNews(5);
    
}

document.getElementById('more-button').addEventListener('click',(e)=>{
    e.preventDefault();
    displayMoreNews(5);
    
})

document.getElementById('search-btn').addEventListener('click',()=>{
    filter();
});

document.getElementById("search").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

document.getElementById('filter').addEventListener('change',(e)=>{
    filter();
})

function filter(){
    let val=document.getElementById('search').value;
    let source=document.getElementById('filter').value;

    let newsItems=document.getElementsByClassName('news-item');
    let found=false;
    
    for (let index = 0; index < newsItems.length; index++) {

        let newsSource=newsItems[index].getElementsByTagName('em')[0];

        if ((newsSource.innerHTML.indexOf(source)>=0)||(source=='Все источники')){

            if ((newsItems[index].innerHTML.indexOf(val)>=0)||(val=='')){
                newsItems[index].style.display='block';
                found=true;
            } else{
                newsItems[index].style.display='none';
            }            

        } else{
            newsItems[index].style.display='none';
        }   
    }

    if (!found){
        document.getElementById('not-found').style.display='block';
    } else {
        document.getElementById('not-found').style.display='none';
    }
}

init();