
const articles = [
    {
        id: '1',
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma.',
        tags: 'geo, tech',
        author: 'Diana Rossi',
        published: '2023-02-11',
        img: 'rubber-duck.jpg'
    },
    {
        id: '2',
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: 'viaggi, geo',
        author: 'Fabio Mari',
        published: '2023-03-14',
        img: 'deep-sea.jpg'
    },
    {
        id: '3',
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici',
        tags: 'cucina',
        author: 'Marta Bianchi',
        published: '2023-04-20',
        img: 'kitchen-food.jpg'
    },
    {
        id: '4',
        title: 'Arte moderna: oltre i confini convenzionali',
        content: 'Un\'analisi delle tendenze e delle sfide nell\'arte contemporanea, con interviste a artisti emergenti.',
        tags: 'arte, tech',
        author: 'Gabriele Neri',
        published: '2023-05-29',
        img: 'modern-art.jpg'
    }
]

//dichiarazione variabili globali/comuni
const row = document.querySelector('.row');
const main = document.createElement('main');

//Creazione del tag main per sfruttarlo come eventHandler
main.setAttribute('id', 'siteMain');
main.classList.add('px-0');
row.appendChild(main);
const mainEl = document.getElementById('siteMain');


//funzione per l'assemblaggio della card dei filtri
function creaFiltersCard(tags) {

    const cardFiltersMarkUp = `
    <header id="siteHeader" class="px-0">
        <h1 class="text-center py-3">News Feed</h1>
        <div class="card d-flex flex-row justify-content-between p-3">
            <div class="filtro-tag">
            <label for="tags">Filtra per tags:</label>
            <select id="tags">
                ${creaOptions('Tutti i tags')}
                ${tags.map((tag) => creaOptions(tag))}
                ${creaOptions('politica')}
            </select>
            </div>
            <div class="filtro-saved">
                <input id="saved" type="checkbox">
                <label for="saved">Solo news salvate</label>
            </div>
        </div>
    </header>
    `

    row.insertAdjacentHTML('afterbegin', cardFiltersMarkUp);

}


//Creazione array vuoto di supporto per le savedCards
const savedCards = [];

//Creazione array vuoto di supporto per i Tags
let supportArray = [];

//Creazione di un unico grande array, contenente i duplicati di tutti i tag presi dagli oggetti
articles.map((article) => {

    const tags = article.tags.split(', ');

    supportArray = supportArray.concat(tags);

})

//Applicazione di Set per scremare tutti i doppioni all'interno dell'array
let tagsNoDuplicate = Array.from(new Set(supportArray));

//richiamo la funzione DOPO la dichiarazione della variabile contenente il Set
creaFiltersCard(tagsNoDuplicate);


//funzione per la creazione del mark-up delle options
function creaOptions(tag) {

    const optionMarkUp = `
    <option>${tag}</option>
    `

    return optionMarkUp;

}


//funzione per l'assemblaggio della card
function creaCard(id, title, content, author, published, img, tags) {

    const cardMarkUp = `
    <div class="card p-3 news" data-id="${id}">
        <div class="title d-flex justify-content-between align-items-center">
            <h2 class="mb-0 fw-bold">${title}</h2>
            <i class="fa-regular fa-2x fa-bookmark"></i>            
        </div>
        <h5 class="mb-0 fw-bold">pubblicato da ${author}</h5>
        <p>in data ${published}</p>
        <h6>${content}</h6>
        <img src="./m2_assets_newsfeed/images/${img}" alt="${img}">
        <ul class="tags d-flex list-unstyled mt-3 mb-0"> 
        ${tags.map((tag) => creaTags(tag)).join('')}      
        </ul>
    </div>
    `

    main.insertAdjacentHTML('beforeend', cardMarkUp);

}


//funzione per creazione dei tag ed affibbiazione colore
function creaTags(tags) {

    const tagMarkup = `
    <li class="py-1 px-2 
        ${tags == 'geo' ? 'bg-primary'
            : tags == 'tech' ? 'bg-success'
                : tags == 'viaggi' ? 'bg-warning'
                    : tags == 'cucina' ? 'bg-danger'
                        : tags == 'arte' ? 'bg-info'
                            : tags == 'politica' ? 'bg-dark'
                                : 'bg-success-subtle'}
    rounded-3 me-2 text-white">${tags}</li>
    `;
    return tagMarkup;

}

//Ciclo forEach per la creazione delle cards
articles.forEach((article) => {

    creaCard(article.id, article.title, article.content, article.author, newDate(article.published), article.img, splitTags(article.tags));

})


//Seleziono tutte le card tramite la classe 'news'
const news = Array.from(document.getElementsByClassName('news'));

/*Aggiunto l'eventListener ai bookmarks tramite event delegation*/
mainEl.addEventListener('click', function(event) {

    const bookmark = event.target;

    if(bookmark.classList.contains('fa-2x')) {

       bookmark.classList.remove('fa-regular');
       bookmark.classList.add('fa-solid');

       if(bookmark.classList.contains('fa-solid')){

        const dataId = bookmark.closest('.news').getAttribute('data-id');
        savedCards.push(dataId);

       }

    }

})

//Funzione per dividere i tags
function splitTags(tags) {

    return tags.split(', ');

}

//Funzione per riformattare la data
function newDate(published){

    return published.split('-').reverse().join('-');

}

/*Funzione contenente il markup dell'empty case*/
function emptyMarkUp() {

    const feedbackMarkUp = `
        <h3 id='empty' class='text-white'>Nessun elemento contiene i criteri di ricerca</h3>
        `

    row.insertAdjacentHTML('beforeend', feedbackMarkUp);

}


/*Funzione per verificare se la singola news contenga il 'd-none'*/
function checkDNone(news) {

    return news.classList.contains('d-none');

}


/*Funzione unica che filtra sia per il 'tipo' che per il 'salvataggio' con il bookmark*/
function filtri() {
    const selected = select.value;
    const saved = checkbox.checked;
    const empty = document.getElementById('empty');

    /*Nel caso la checkbox sia smarcata*/
    if (saved) {

        /*Filtro che agisce sia per il select che per gli articoli salvati*/
        const doubleFilter = articles.filter(article => {

            const tags = article.tags.split(', ');
            const index = article.id - 1;

            if (!(savedCards.includes(article.id))) {
                if (!(news[index].classList.contains('d-none')))

                    news[index].classList.add('d-none');

            } else {

                if (tags.includes(selected)) {

                    news[index].classList.remove('d-none');

                } else if (selected === 'Tutti i tags') {

                    news[index].classList.remove('d-none');

                } else {

                    news[index].classList.add('d-none');

                }

            }

        })

        /*Gestione dell'empty case*/
        if ((savedCards.length === 0) && (empty !== null) && (!news.every(checkDNone))) {
            
            empty.remove();

        }

        if ((savedCards.length !== 0) && (empty !== null) && (!news.every(checkDNone))) {

            empty.remove();

        }

        if ((savedCards.length === 0) && (empty === null)) {
            
            emptyMarkUp();

        }

        if ((savedCards.length !== 0) && (empty === null) && (news.every(checkDNone))) {

            emptyMarkUp();

        }

    /*Nel caso la checkbox non sia smarcata*/
    } else {
        /*Filtro che agisce solo per il select*/
        const selectFilter = articles.filter(article => {

            const tags = article.tags.split(', ');
            const index = article.id - 1;

            if (tags.includes(selected)) {

                news[index].classList.remove('d-none');

            } else if (selected === 'Tutti i tags') {

                news[index].classList.remove('d-none');

            } else {

                news[index].classList.add('d-none');

            }

        })

        /*Gestione dell'empty case*/
        if ((savedCards.length === 0) && (empty !== null)) {

            empty.remove();

        }

        if (!(news.every(checkDNone)) && (empty !== null)) {

            empty.remove();

        }

        if ((news.every(checkDNone)) && (empty !== null)){

            return;

        }
        if (news.every(checkDNone)) {

            emptyMarkUp();

        }

    }
}


//selezione dell'elemento select e checkbox
const select = document.querySelector('select');
const checkbox = document.getElementById('saved');

//aggiunto evento 'change' sul select e sulla checkbox
select.addEventListener('change', filtri);
checkbox.addEventListener('change', filtri);


