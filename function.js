
let library = [];
let pre_library = [{name:"Foundation",author:"Isaac Asimov",pages:255,description:"The Foundation series is Isaac Asimov’s iconic masterpiece. Unfolding against the backdrop of a crumbling Galactic Empire, the story of Hari Seldon’s two Foundations is a lasting testament to an extraordinary imagination, one that shaped science fiction as we know it todayThe First Foundation has been defeated, crushed by the formidable mental powers of the Mule. But whispers of the mysterious Second Foundation, the only hope of defeating the Mule, are beginning to spread… Surviving members of the First Foundation also fear the secret powers of the Second Foundation, vowing to find and destroy it. However, the location of the Second Foundation remains shrouded in mystery. Finding it will lead the Foundation to the opposite end of the Galaxy, where the fate of Seldon’s two Foundations awaits",alreadyread:true},
                    {name:"Hamlet",author:"Wiliam Shakespeare",pages:289,description:"Shakespeare’s telling of the story of Prince Hamlet was derived from several sources, notably from Books III and IV of Saxo Grammaticus’s 12th-century Gesta Danorum and from volume 5 (1570) of Histoires tragiques, a free translation of Saxo by François de Belleforest. The play was evidently preceded by another play of Hamlet (now lost), usually referred to as the Ur-Hamlet, of which Thomas Kyd is a conjectured author.",alreadyread:true},
                    {name:"Animal Farm",author:"George Orwell",pages:112,description:"The story of “Animal Farm” by George Orwell opens with the Old Major, a prize-winning boar, in Manor Farm, calls for a secret meeting at night. He shares his dream in which animals are free and happy without any humans to control them. The animals embrace his dream and he motivates them to aspire to attain that dream. Soon after the death of Old Major, the pigs, smarter animals on the farm, works to achieve freedom.One fine day, the rebellion breaks out and the animals, fed up with Farmer Jones, drive him and his family out of the farm. Also, they rename the property as Animal Farm.",alreadyread:true},
                    {name:"The Picture of Dorian Gray",author:"Oscar Wilde",pages:272,description:"Written in his distinctively dazzling manner, Oscar Wilde’s story of a fashionable young man who sells his soul for eternal youth and beauty is the author’s most popular work. The tale of Dorian Gray’s moral disintegration caused a scandal when it ﬁrst appeared in 1890, but though Wilde was attacked for the novel’s corrupting inﬂuence, he responded that there is, in fact, “a terrible moral in Dorian Gray.” Just a few years later, the book and the aesthetic/moral dilemma it presented became issues in the trials occasioned by Wilde’s homosexual liaisons, which resulted in his imprisonment. Of Dorian Gray’s relationship to autobiography, Wilde noted in a letter, “Basil Hallward is what I think I am: Lord Henry what the world thinks me: Dorian what I would like to be—in other ages, perhaps.",alreadyread:false}
                    ];
function book(name, author, pages, description,read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.alreadyread = read;

    book.prototype.updateRead = function (){
        this.alreadyread = !this.alreadyread;

    }
    book.prototype.printinfo = function(){
        return "Book name is "+this.name+" and author is "+this.author; 
    }

}

function addBookLibrary (){

    $('#new_book').addClass("was-validated");
    let isOkay = true;
    if (!$('#book_name').val() ||!$('#pages').val() || !$('#author').val()){
        isOkay = false; 
    }

    if(isOkay){
        const newBook = new book($('#book_name').val(),$('#author').val(),$('#pages').val(),$('#description').val(),$('#alreadyread').is(":checked"));
        library.push(newBook);
        displayLibrary();
    }
    

}
function loadMemory (){
    let books = localStorage.getItem('books');
    for (let index = 0; index < books.length; index++) {
        const element = new book(pre_library[index].name,pre_library[index].author,pre_library[index].pages,pre_library[index].description,pre_library[index].alreadyread);
       library.push(element);
    }


}


function toggleread(book_name){
    let book =library.find(book => book.name == book_name) ;
    let book_index = library.map(function(e) { return e.name; }).indexOf(book_name);

    book.updateRead();

    if (book_name ==  $('#detail-name').text()){
        $('#detail-readtoggle').prop('checked',book.alreadyread);
    }

}

function togglereaddetail(){
    let book =library.find(book => book.name == $('#detail-name').text()) ;
    let book_index = library.map(function(e) { return e.name; }).indexOf($('#detail-name').text());

    book.updateRead();

     $('#readtoggle'+book_index).prop('checked',book.alreadyread);
    
}




$( document ).ready(function() {

    createLibrary();
    displayLibrary();   
}); 



  $(window).on('beforeunload', function(){
   localStorage.setItem("books", JSON.stringify(library));
   
});

function displayLibrary(){
    $('#content').html('');
    for (let index = 0; index < library.length; index++) {
        let selectedBook = library[index];
        let rowindex =0;
        
       
        if(index%3 == 0){
            $('<div class="row mb-4"  id="row'+index+'"> </div>').appendTo('#content');
            rowindex = index
        }
        $('<div class="col-md-4" id="column'+index+'"></div>').appendTo('#row'+rowindex);
        $('<div class="card h-100" id="card'+index+'"></div>').appendTo('#column'+index);
        $('<div class="card-body" onclick="showDetail(\''+selectedBook.name+'\');" id="card_body'+index+'"></div>').appendTo('#card'+index);
        $('<h5 class="card-title">'+selectedBook.name+'</h5 >').appendTo('#card_body'+index);
        $('<h6 class="card-subtitle mb-2 text-muted">'+selectedBook.author+'</h6>').appendTo('#card_body'+index);
        $('<p class="card-text text-ellipsis">'+selectedBook.description+'</p> ').appendTo('#card_body'+index);
        $('<div class="bg-white card-footer" id="card_footer'+index+'"></div>').appendTo('#card'+index);
        $('<div class="d-flex justify-content-end" id="card_footer_flex'+index+'"></div>').appendTo('#card_footer'+index);
        $('<div class="form-check form-switch" id="card_footer_form'+index+'"></div>').appendTo('#card_footer_flex'+index);
        $('<input class="form-check-input" onchange="toggleread(\''+selectedBook.name+'\')" type="checkbox" id="readtoggle'+index+'"><label class="form-check-label" for="readtoggle">Read</label>').appendTo('#card_footer_form'+index);

        if(selectedBook.alreadyread){
            $('#readtoggle'+index).prop('checked',selectedBook.alreadyread);
        }
        if(index == 0){
            showDetail(selectedBook.name);
        }
        
    } 
}

function createLibrary(){

    if(localStorage.getItem("books") === null){
        for (let index = 0; index < pre_library.length; index++) {
            const element = new book(pre_library[index].name,pre_library[index].author,pre_library[index].pages,pre_library[index].description,pre_library[index].alreadyread);
           library.push(element);
                     
        }
        localStorage.setItem("books", JSON.stringify(library));
       
    }else{

        let books = JSON.parse(localStorage.getItem("books"));
        for (let index = 0; index < books.length; index++) {
            const element = new book(books[index].name,books[index].author,books[index].pages,books[index].description,books[index].alreadyread);
           library.push(element);
                     
        }

    }

}

function showDetail(book_name){
    let selected = library.find(book => book.name == book_name);
    $('#detail-name').text(selected.name);
    $('#detail-author').text("Author: "+selected.author);
    $('#detail-desc').text(selected.description);
    $('#detail-pages').text("Pages" + selected.pages);
    $('#detail-readtoggle').prop('checked',selected.alreadyread);

}

function resetForm(){
    $('#new_book').removeClass("was-validated");
    $('#new_book')[0].reset();
}

function deleteBook(){
    library.splice(library.findIndex(book => book.name ==  $('#detail-name').text()), 1);
    displayLibrary();

}