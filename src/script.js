//Dropdown and Theme Logic
const dropdown = document.getElementById("dropdown");
const display_btn = document.querySelector("button[title='display']");
const light_btn = document.querySelector("button[title='light mode']");
const os_btn = document.querySelector("button[title='os mode']");
const dark_btn = document.querySelector("button[title='dark mode']");
const arrow = document.getElementById("test")
const theme_mode = localStorage.getItem("theme_mode");
function load_theme(mode)
{
    localStorage.setItem("theme_mode", mode);
    let color;
    if(mode == "os_preference")
    {
        color = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'
    }
    else
    {
        color = mode=='dark_mode' ? 'dark':'light'
    }


    if((document.body.classList.contains("dark") && color == 'light')||(document.body.classList.contains("light") && color == 'dark'))
    {
        document.body.classList.remove("dark");
        document.body.classList.remove("light");
        switch (color) {
            
            case "dark":
                document.body.classList.add("dark");
                break;
        
            default:
                document.body.classList.add("light");
                break;
        }
    }
}

if(theme_mode)
{
    load_theme(theme_mode)
}
else
{
    load_theme("os_preference");
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event=>
    {
        if(localStorage.getItem("theme_mode")== "os_preference")
        {
            load_theme('os_preference');
        }
        
    }
)
let i = 0;
function drop()
{
    arrow.classList.toggle("rotate-0");
    arrow.classList.toggle("rotate-180");
    if(dropdown.classList.contains("hidden"))
    {
        dropdown.classList.toggle("hidden") ;
        setTimeout(()=>{
            dropdown.classList.toggle("flex");
            dropdown.classList.toggle("top-5");
            dropdown.classList.toggle("top-14");
            dropdown.classList.toggle("opacity-100");
        }, 100)
    }
    else
    {
        
        dropdown.classList.toggle("flex");
        dropdown.classList.toggle("top-5");
        dropdown.classList.toggle("top-14");
        dropdown.classList.toggle("opacity-100");
        setTimeout(()=>{
            dropdown.classList.toggle("hidden") ;
        }, 100)

    }
    
}


dark_btn.onclick = ()=>{load_theme("dark_mode")};
light_btn.onclick = ()=>{load_theme ("light_mode")};
os_btn.onclick = ()=>{load_theme("os_preference")};
display_btn.onclick = drop;




//menu logic

const menu = document.getElementById("menu");
const exit_menu_btn = document.querySelector("button[title='exit']");
const background = document.querySelector("body>div:first-child");
let new_btn = document.getElementById("new");
function toggle_menu()
{
    if(menu.classList.contains("hidden"))
    {
        menu.classList.toggle("hidden");
        setTimeout(()=>{
            menu.classList.toggle("block");
            menu.classList.toggle("-translate-y-full");
            menu.classList.toggle("-translate-y-1/2");
            menu.classList.toggle("opacity-0");
            menu.classList.toggle("opacity-100");
            background.classList.toggle("blur-md");
            
        },100)
        
    }
    else
    {
        menu.classList.toggle("block");
        menu.classList.toggle("-translate-y-full");
        menu.classList.toggle("-translate-y-1/2");
        menu.classList.toggle("opacity-0");
        menu.classList.toggle("opacity-100");
        background.classList.toggle("blur-md");
        setTimeout(()=>{
            menu.classList.toggle("hidden");
        },100)

    }
}
    

new_btn.addEventListener("click", toggle_menu); 
exit_menu_btn.onclick = toggle_menu;
    
    //CRUD logic
const my_library = JSON.parse(localStorage.getItem('my_library'))|| [];
const my_library2=[];
const form = document.querySelector("form");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const author = document.getElementById("author");
const summary = document.getElementById("sum");
const read_input = document.querySelectorAll('input[name="yes-no"]');
const card_area = document.getElementById('card_area');
const add_button = document.querySelector("button[title='add']");
const cancel_button = document.querySelector("button[title='cancel']");


let curr_book = {};

const generateId =()=>
{
    let date_obj = new Date();
    let date = date_obj.getDate();
    let year = date_obj.getFullYear();
    let month = date_obj.getMonth();
    let hours = date_obj.getHours();
    let minutes = date_obj.getMinutes();
    let seconds = date_obj.getSeconds();
    let miliseconds = date_obj.getMilliseconds()
    let time = `${month}${date}${year}${hours}${minutes}${seconds}${miliseconds}`;
    return time;
}
function Book(title,author, pages, summary, read) 
{
    this.title = title;
    this.pages = pages;
    this.summary = summary;
    this.author = author;
    this.read = read;
    this.id = generateId();
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    add_or_update();
});
const addBookToLibrary = (book)=>
{
    my_library.unshift(book);
    localStorage.setItem("my_library", JSON.stringify(my_library));

}

const add_or_update=()=>
{

    let index = my_library.findIndex((book)=>curr_book.id === book.id);
    let read;
    read_input.forEach((element)=>{if(element.checked){read = element.value}})
    let new_book = new Book(title.value, author.value, pages.value, summary.value, read)


    if(index == -1)
    {
        addBookToLibrary(new_book)
    }
    else
    {
        my_library[index] = new_book;
        localStorage.setItem("my_library", JSON.stringify(my_library));
    }
    update_library();
    reset();
}
const reset = ()=>
{
    add_button.firstElementChild.innerText = "Add"
    title.value = "";
    author.value = "";
    read_input.forEach((element)=>{element.checked = false});
    pages.value=""
    summary.value = "";
    curr_book = {}
    toggle_menu();
    
}

const update_library =()=>
{
    card_area.innerHTML =
        `<div id="card_area" class="grid md:grid-cols-[repeat(auto-fill,14rem)] grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:gap-3 gap-2 overflow-scroll" onclick='toggle_menu()'>
                    <div id="new" class="md:h-[20.5rem] h-[17rem] flex justify-center items-center">
                        <button class="group bg-primary border-[1px] border-contrast rounded-[10px] md:w-52 md:h-80 w-[calc(100%-1rem)] h-64 hover:scale-[1.025]  hover:border-hover_color_2 [transition:all_150ms,transform_300ms] flex justify-center items-center flex-col text-icon_color active:border-secondary active:text-secondary">
                            <i data-feather="plus-circle" class="stroke-[3px] size-8 group-hover:rotate-[360deg] transition-transform group-active:rotate-[-360deg] "></i>
                            <p class="font-semibold text-xl">New</p>
                        </button>
                    </div>
                </div>`
    ;


    my_library.forEach(element => {
        //ADD ID TO 
        card_area.innerHTML+=
        ` <div  class="md:h-[20.5rem] h-[17rem] flex justify-center items-center transition-all opacity-100" id="${element.id}">
            <div class="group bg-primary border-[1px] border-contrast rounded-[10px] md:w-52 md:h-80 w-[calc(100%-1rem)] h-64 hover:scale-[1.025]  hover:border-hover_color_2 [transition:all_150ms,transform_300ms] opacity-100 grid grid-rows-[repeat(4,40px)_1fr] text-icon_color active:border-secondary active:text-secondary p-3">
                <div class="">
                    <p class="line-clamp-1 text-sm"> <b>Title:</b> ${element.title}</p>
                </div>
                <div>
                    <p class="line-clamp-1 text-sm""><b>Author:</b> ${element.author}</p>
                </div>
                <div>
                    <p class="line-clamp-1 text-sm""><b>Pages:</b> ${element.pages}</p>
                </div>
                <div>
                    <p class="line-clamp-1 text-sm""><b>Read:</b> ${element.read}</p>
                </div>
                <div class="grid grid-cols-3 gap-2 items-end">
                    <div>
                        <button title="Read" class="flex border-[1px] border-contrast flex-row h-9 self-center items-center justify-center rounded-[10px] px-3 hover:bg-hover_color active:text-white active:bg-secondary text-icon_color">
                            <i data-feather="file-text" class="inline-block stroke-[3px] size-5"></i>
                        </button>
                    </div>
                    <div>
                        <button title="Edit" class="flex border-[1px] border-contrast flex-row h-9 self-center items-center justify-center rounded-[10px] px-3 hover:bg-hover_color active:text-white active:bg-secondary text-icon_color">
                                <i data-feather="edit" class="inline-block stroke-[3px] size-5 "></i>
                        </button>
                    </div>
                    
                    <div>
                        <button title="Delete" class="flex border-[1px] border-contrast flex-row h-9 self-center items-center justify-center rounded-[10px] px-3 hover:bg-hover_color active:text-white active:bg-red-500 text-icon_color">
                            <i data-feather="trash-2" class="inline-block stroke-[3px] size-5"></i>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>`
        feather.replace();
    });
    const delete_btn = document.querySelectorAll('button[title="Delete"]');
    const edit_btn = document.querySelectorAll('button[title="Edit"]');
    const read_btn = document.querySelectorAll('button[title="Read"]');

    delete_btn.forEach((element)=>{element.onclick = ()=>{delete_book(element)}});
    edit_btn.forEach((element)=>{element.onclick = ()=>{edit_book(element)}});
    read_btn.forEach((element)=>{element.onclick = ()=>{read_book(element)}});


    
}

const delete_book = (button)=>
{
    let card = button.parentElement.parentElement.parentElement.parentElement;
    let library_index = my_library.findIndex((element)=> card.id = element.id);
    card.classList.toggle('opacity-0');
    card.classList.toggle('opacity-100');
    setTimeout(()=>{
        card.remove();
    },150);
    my_library.splice(library_index, 1);
    localStorage.setItem("my_library", JSON.stringify(my_library));
}

const edit_book = (button)=>
{
    let card = button.parentElement.parentElement.parentElement.parentElement
    let library_index = my_library.findIndex((element)=> card.id = element.id);
    
    curr_book = my_library[library_index];
    title.value = curr_book.title;
    author.value = curr_book.author;
    read_input.forEach((element)=>{if(curr_book.read == element.value){element.checked = true;}});
    pages.value= curr_book.pages;
    summary.value = curr_book.summary;

    document.getElementById('add_text').innerText = 'Save';
    toggle_menu();
}

if(my_library.length)
{
    update_library();
}

cancel_button.addEventListener('click', reset);
const read_menu =  document.getElementById('viewing');
const exit_v = document.querySelector("button[title='exit_v']");

const read_book = (button)=>
{
    let card = button.parentElement.parentElement.parentElement.parentElement
    let library_index = my_library.findIndex((element)=> card.id = element.id);
    
    let book = my_library[library_index];
    document.getElementById("read_title").innerHTML = `<b>Title:</b> ${book.title}`;
    document.getElementById("read_author").innerHTML = `<b>Author:</b> ${book.author}`;
    document.getElementById("read_pages").innerHTML = `<b>Pages:</b> ${book.pages}`;
    document.getElementById("read_id").innerHTML = `<b>ID:</b> ${book.id}`;
    document.getElementById("read_read").innerHTML = `<b>Read:</b> ${book.read}`;
    document.getElementById("read_summary").innerHTML = `<b>Summary:</b> ${book.summary}`;
    toggle_read_menu();
}

const toggle_read_menu = ()=>
{
    if(read_menu.classList.contains("hidden"))
    {
        read_menu.classList.toggle("hidden");
        setTimeout(()=>{
            read_menu.classList.toggle("block");
            read_menu.classList.toggle("-translate-y-full");
            read_menu.classList.toggle("-translate-y-1/2");
            read_menu.classList.toggle("opacity-0");
            read_menu.classList.toggle("opacity-100");
            background.classList.toggle("blur-md");
            
        },100)
        
    }
    else
    {
        read_menu.classList.toggle("block");
        read_menu.classList.toggle("-translate-y-full");
        read_menu.classList.toggle("-translate-y-1/2");
        read_menu.classList.toggle("opacity-0");
        read_menu.classList.toggle("opacity-100");
        background.classList.toggle("blur-md");
        setTimeout(()=>{
            read_menu.classList.toggle("hidden");
        },100)

    }
}

exit_v.onclick = toggle_read_menu;

window.addEventListener('click', function(e){
    if (!document.getElementById('dropdown').contains(e.target) && !display_btn.contains(e.target) && dropdown.classList.contains("flex"))
        drop();
    if(!document.getElementById('menu').contains(e.target) && !exit_menu_btn.contains(e.target) && menu.classList.contains("block"))
    {
        toggle_menu();
    }
    if(!document.getElementById('viewing').contains(e.target) && !exit_v.contains(e.target) && read_menu.classList.contains("block"))
        {
            toggle_read_menu();
        }
})