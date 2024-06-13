window.onload = _ => {
    let lode = document.querySelector(".lod")
    setTimeout(_ => {
        lode.style.cssText = `
         backdrop-filter: blur( 0px );
        `
    }, 1000)
    setTimeout(_ => {
        lode.style.cssText = `
         display:none
        `
    }, 1050)
}
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let num_total = document.querySelector(".num_total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let search = document.getElementById("search")
let tbody = document.getElementById("tbody")

let form = document.querySelector("form")
let database = []

if (localStorage.data) {
    database = JSON.parse(localStorage.getItem("data"))
    show_data()
}

dell_all()
let statuss = "create"
form.onsubmit = e => {
    e.preventDefault()
    if (title.value != "" && statuss == "create") {
        let data = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            category: category.value,
            total: num_total.innerHTML
        }
        if (count.value != "") {
            for (let i = 0; i < +count.value; i++) {
                data = {
                    title: title.value,
                    price: price.value,
                    taxes: taxes.value,
                    ads: ads.value,
                    discount: discount.value,
                    category: category.value,
                    total: num_total.innerHTML
                }
                database.push(data)
                localStorage.setItem("data", JSON.stringify(database))
            }
        }
        else if (count.value == "") {
            database.push(data)
            localStorage.setItem("data", JSON.stringify(database))
        }

        show_data()
        clear_inputs()
        dell_all()


    }
}

// show data 

function show_data() {
    let table = " "
    for (let i = 0; i < database.length; i++) {
        table += `
         <tr>
                  <td>${i+1}</td>
                  <td>${database[i].title}</td>
                  <td>${database[i].price}</td>
                  <td>${database[i].ads}</td>
                  <td>${database[i].taxes}</td>
                  <td>${database[i].discount}</td>
                  <td>${database[i].category}</td>
                  <td>${database[i].total}</td>
                  <td><button onclick="update_items(${i})">update</button></td>
                  <td><button onclick="dell_items(${i})" >delet</button></td>
                </tr>
                <tr>
        
        `
    }
    tbody.innerHTML = table
}

function dell_all() {
    if (database.length != 0) {
        document.getElementById("del_a").style.display = "block"
    }
    else {
        document.getElementById("del_a").style.display = "none"
    }
}
function clear_inputs() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    count.value = ""
    discount.value = ""
    category.value = ""
    num_total.innerHTML = ""
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.style.background = "green"
        num_total.innerHTML = result
    }
    else {
        total.style.background = "rgb(53, 43, 121)"
        num_total.innerHTML = ""
    }
}
function dell_items(items) {
    database.splice(items, 1)
    localStorage.setItem("data", JSON.stringify(database))
    show_data()
}
function update_items(items) {
    let sub = document.getElementById("sub")
    console.log(sub)
    statuss = "update"
    if (statuss == "update") {
        title.value = database[items].title
        price.value = database[items].price
        taxes.value = database[items].taxes
        ads.value = database[items].ads
        discount.value = database[items].discount
        category.value = database[items].category
        sub.value = "update"
        if (price.value != "") {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value
            total.style.background = "green"
            num_total.innerHTML = result
        }
        else {
            total.style.background = "rgb(53, 43, 121)"
            num_total.innerHTML = ""
        }
        sub.onclick = e => {
            database[items] = {
                title: title.value,
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                category: category.value,
                total: num_total.innerHTML
            }


            localStorage.setItem("data", JSON.stringify(database))
            show_data()
            clear_inputs()
            window.location.reload()
        }
    }
}
let search_status = "title"
function search_btn(search_type) {
    search.removeAttribute("disabled")
    if (search_type == "title") {
        search_status = "title"
        search.placeholder = "search by title"
    } else {
        search_status = "category"
        search.placeholder = "search by category"
    }
    search.focus()
}

function search_inp() {
    if (search_status == "title") {
        console.log("title")
        let x = ""
        for (let i = 0; i < database.length; i++) {
            if (database[i].title.includes(search.value) != true) {
                continue;
            }
            x += `
            <tr>
            <td>${i}</td>
                     <td>${database[i].title}</td>
                     <td>${database[i].price}</td>
                     <td>${database[i].ads}</td>
                     <td>${database[i].taxes}</td>
                     <td>${database[i].discount}</td>
                     <td>${database[i].category}</td>
                     <td>${database[i].total}</td>
                     <td><button onclick="update_items(${i})">update</button></td>
                     <td><button onclick="dell_items(${i})" >delet</button></td>
                   </tr>
                   <tr>
           
           `
       
           }
        tbody.innerHTML = x
    }else if (search_status == "category") {
        console.log("title")

        let x = ""
        for (let i = 0; i < database.length; i++) {
            if (database[i].category.includes(search.value) != true) {
                continue;
            }
            x += `
            <tr>
            <td>${i}</td>
                     <td>${database[i].title}</td>
                     <td>${database[i].price}</td>
                     <td>${database[i].ads}</td>
                     <td>${database[i].taxes}</td>
                     <td>${database[i].discount}</td>
                     <td>${database[i].category}</td>
                     <td>${database[i].total}</td>
                     <td><button onclick="update_items(${i})">update</button></td>
                     <td><button onclick="dell_items(${i})" >delet</button></td>
                   </tr>
                   <tr>
           
           `
       
           }
        tbody.innerHTML = x
    }
   
    }
