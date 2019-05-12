$(document).ready(function () {

    var users = new Array();
    var products = [];
    var members = [];
    var usersNames = [];
    var eventName = "";
    var date = "";

    var form2 = $('#form_creating_event');
    console.log(form2);
    form2.on('submit', function (e) {
        e.preventDefault();
        eventName = $('#usr').val();
        date = $('#date').val();
        console.log(date);
        window.location.href = "#section2";
        console.log(eventName);
    });

    var formAddingUser = $('#form_adding_user');
    console.log(formAddingUser);
    formAddingUser.on('submit', function (e) {
        e.preventDefault();
        var name = $('#name').val();
        var surname = $('#surname').val();
        $('#name').val('');
        $('#surname').val('');
        var fullname = name + ' ' + surname;
        var user = new User(name, surname);
        usersNames.push(fullname);
        users.push(user);
        console.log(usersNames.length + ' ' + users.length);

        /*for (var i = 0; i < users.length; i++) {
            console.log(users[i].to_string())
        }*/

        var option = document.createElement("option");
        option.innerHTML = user.to_string();
        option.value = users.length;
        document.getElementById("section3_users").append(option);


        var option2 = document.createElement("option");
        option2.innerHTML = user.to_string();
        option2.value = users.length;
        document.getElementById("section4_users").append(option2);

        // console.log(name);
        // console.log(surname);
        // console.log(fullname);

        /*var data = {};
        data.name = name;
        data.surname = surname;
        var csrf_token = $('#form_adding_user [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
        var url = formAddingUser.attr("action");
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                console.log("OK");
            },
            error: function () {
                console.log('error')
            }
        })*/

        //cleaning form

        /*var frm = document.getElementsByName('adding_users')[0];
        frm.submit(); // Submit
        frm.reset();  // Reset
        return false;*/
    });


    var formAddProduct = $('#form_adding_product');
    console.log(formAddProduct);
    formAddProduct.on('submit', function (e) {
        e.preventDefault();
        var name = $('#name_of_product').val();
        var price = $('#price_of_product').val();
        $('#name_of_product').val('');
        $('#price_of_product').val('');
        var e = document.getElementById("section3_users");
        var userNmb = e.options[e.selectedIndex].value - 1;
        var user = users[userNmb];
        var quantity = $('#quantity_of_product').val();
        $('#quantity_of_product').val('');
        var fullPrice = price * quantity;
        // products[name] = (Product(name, users[userNmb], fullPrice));
        console.log(user.to_string());
        var product = new Product(name, users[userNmb], fullPrice);
        console.log(product.to_string());
        products.push(product);

        var option = document.createElement("option");
        option.innerHTML = name;
        option.value = products.length;
        document.getElementById("section4_products").append(option);

        console.log(user.to_string() + " bought " + quantity + ' ' + name + " for " + price);

        // cleaning form, works bad

        /*var frm2 = document.getElementsByName('adding_product')[0];
        frm2.submit(); // Submit
        frm2.reset();  // Reset
        return false;*/
    });

    var formAddMember = $('#form_adding_members');
    formAddMember.on('submit', function (e) {
        e.preventDefault();
        var usrSel = document.getElementById("section4_users");
        var userNmb = usrSel.options[usrSel.selectedIndex].value - 1;
        var prodSel = document.getElementById("section4_products");
        var productNmb = prodSel.options[prodSel.selectedIndex].value - 1;

        var member = new Member(users[userNmb], products[productNmb]);
        members.push(member);
        console.log(users[userNmb].to_string());
        console.log(products[productNmb].to_string());
        console.log("Success");
    });


    function User(name, surname) {
        this.name = name;
        this.surname = surname;
        this.productlist = [];
        this.toUserList = [];
        this.getName = function () {
            return this.name;
        };
        this.getSurname = function () {
            return this.surname;
        };
        this.getPoductList = function () {
            return this.productlist;
        };
        this.setPoductList = function (list) {
            this.productlist = list;
        };
        this.getPoductList = function () {
            return this.productlist;
        };
        this.setToUserList = function (list) {
            this.toUserList = list;
        };
        this.getToUserList = function () {
            return this.toUserList;
        };
        this.to_string = function () {
            return name + ' ' + surname;
        }

    }


    function Product(name, user, price) {
        this.name = name;
        this.user = user;
        this.price = price;
        this.amount = 0;
        this.getName = function () {
            return this.name;
        };
        this.getUser = function () {
            return this.user;
        };
        this.getPrice = function () {
            return this.price;
        };
        this.getAmount = function () {
            return this.amount;
        };
        this.addAmount = function () {
            this.amount++;
        }
        this.to_string = function () {
            return this.name + ' ' + this.user.to_string() + ' ' + this.price;
        }
    }

    function Member(user, product) {
        this.user = user;
        this.product = product;
        this.getUser = function () {
            return this.user;
        };
        this.getPoduct = function () {
            return this.product;
        };
    }

    function toUser(user, amount) {
        this.user = user;
        this.amount = amount;
        this.getUser = function () {
            return this.user;
        };
        this.getAmount = function () {
            return this.amount;
        };

    }

    var show_users_list = $('#show_users_list');
    show_users_list.on('submit', function (e) {
        e.preventDefault();
        console.log("Ты в алерте");
        alert("Ты в алерте");
    });

    /*for (var i = 0; i < 5; i++) {
        var user = new User("User" + i, "Surname");
        users.push(user);
    }

    for (var i = 0; i < users.length; i++) {
        console.log(users[i]);
    }

    for (var i = 0; i < 3; i++) {
        var product = new Product("product" + i, users[i], i + 10);
        products.push(product);
    }

    for (var i = 0; i < products.length; i++) {
        console.log(products[i]);
    }

    for (var i = 0; i < 2; i++) {
        var member = new Member(users[i], products[i + 1]);
        members.push(member);
    }

    for (var i = 0; i < members.length; i++) {
        console.log(members[i]);
    }*/

    var show = $('#show_results');
    show.on('submit', function (e) {
        e.preventDefault();
        console.log("Вычисления");

        /*// testing users array
        console.log("Users");
        for(var i =0; i<users.length; i++) {
            console.log(users[i].to_string());
        }

        // testing products array
        console.log("\nProducts:");
        for(var i =0; i<products.length; i++) {
            console.log(products[i].to_string());
        }*/

        // test input values

        /*for (var i = 0; i < 5; i++) {
            var user = new User("User" + i, "Surname");
            users.push(user);
        }
        for (var i = 0; i < users.length; i++) {
            console.log(users[i]);
        }

        for (var i = 0; i < 3; i++) {
            var product = new Product("product" + i, users[i], i + 10);
            products.push(product);
        }
        for (var i = 0; i < products.length; i++) {
            console.log(products[i]);
        }

        for (var i = 0; i < 2; i++) {
            var member = new Member(users[i], products[i + 1]);
            members.push(member);
        }
        for (var i = 0; i < members.length; i++) {
            console.log(members[i]);
        }*/


        for (var i = 0; i < users.length; i++) {
            var all_kind = true;
            var current = [];
            for (var j = 0; j < members.length; j++) {
                if (users[i] == members[j].getUser()) {
                    current.push(members[j].getPoduct());
                    members[j].getPoduct().addAmount();
                    all_kind = false;
                }
            }
            if (all_kind) {
                for (var k = 0; k < products.length; k++) {
                    current.push(products[k]);
                    products[k].addAmount();
                }
            }
            all_kind = true;
            users[i].setPoductList(current);
        }

        for (var i = 0; i < users.length; i++) {
            var current_product_list = users[i].getPoductList();
            var to_user_list = [];
            for (var j = 0; j < current_product_list.length; j++) {
                var price = current_product_list[j].getPrice() / current_product_list[j].getAmount();
                price = price.toFixed(2);
                to_user_list.push(new toUser(current_product_list[j].getUser(), price));
            }
            users[i].setToUserList(to_user_list);
        }

        console.log('New');

        for (var i = 0; i < users.length; i++) {
            console.log(users[i].to_string() + " should pay:");
            var list = users[i].getToUserList();
            for (var j = 0; j < list.length; j++) {
                console.log(list[j])
            }
        }
        addTable();
    });

    function addTable() {
        var section5 = document.getElementById('section5');
        var table = document.createElement('table');
        table.setAttribute('border', '1');
        table.className += " table";
        table.style.width = '60%';
        table.style.color = 'black';
        table.style.marginLeft = '20%';
        table.style.marginTop = '5vh';
        table.style.backgroundColor = '#EEE';
        for (var i = 0; i < users.length; i++) {
            var row = table.insertRow(i);
            var list = users[i].getToUserList();
            var cell = row.insertCell(0);
            cell.innerHTML = users[i].getName() + " " + users[i].getSurname() + " should pay:";
            var cell1 = row.insertCell(1);
            var data = ""
            for (var j = 0; j < list.length; j++) {
                data += "<p>" + list[j].getUser().getName() + " " + list[j].getUser().getSurname() + " " + list[j].getAmount() + "</p>";
            }
            cell1.innerHTML = data;
            cell.style.width = '50%';
        }

        section5.appendChild(table);
    }

});