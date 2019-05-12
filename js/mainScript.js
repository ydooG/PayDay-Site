$(document).ready(function () {

    var users = new Array();
    var products = new Array();
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
        var fullname = name + ' ' + surname;
        var user = new User(name, surname);
        // var fullname = name + ' ' + surname;
        users[fullname] = user;
        for (var i = 0; i < users.length; i++) {
            console.log(users[i].to_string())
        }
        // $('.select-name ul').appendChild('<li>' + user.to_string() + '</li>');
        /*var para = document.createElement("P");
        var t = document.createTextNode(user.to_string());
        para.appendChild(t);
        para.classList.add('dropdown-item');
        document.getElementById("user_selector").appendChild(para);*/

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
    });

    var formAddProduct = $('#form_adding_product');
    console.log(formAddProduct);
    formAddProduct.on('submit', function (e) {
        e.preventDefault();
        var name = $('#name_of_product').val();
        var price = $('#price_of_product').val();
        var e = document.getElementById("section3_users");
        var user = e.options[e.selectedIndex].text;
        var quantity = $('#quantity_of_product').val();
        var fullPrice = price * quantity;
        products.push(Product(name, users[user], fullPrice));

        var option = document.createElement("option");
        option.innerHTML = name;
        option.value = products.length;
        document.getElementById("section4_products").append(option);

        console.log(user + " bought " + quantity + ' ' + name + " for " + price);

    });

    var formAddMember = $('#form_adding_members');
    formAddMember.on('submit', function (e) {
        e.preventDefault();
        var user = e.options[e.selectedIndex].text;
        console.log(user);
    })


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


    var users = []
    var products = []
    var members = []

    for (var i = 0; i < 5; i++) {
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
    }
    for (var i = 0; i < users.length; i++) {
        var all_kind = true;
        var current = []
        for (var j = 0; j < members.length; j++) {
            if (users[i] == members[j].getUser()) {
                current.push(members[j].getPoduct());
                members[j].getPoduct().addAmount();
                all_kind = false;
            }
        }
        if (all_kind) {
            for (var k = 0; k < products.length; k++) {
                current.push(products[k])
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
            to_user_list.push(new toUser(current_product_list[j].getUser(), price));
        }
        users[i].setToUserList(to_user_list);
    }

    console.log('New');
    for (var i = 0; i < users.length; i++) {
        console.log(users[i].getName() + " " + users[i].getSurname())
        var list = users[i].getToUserList();
        for (var j = 0; j < list.length; j++) {
            console.log(list[j])
        }
    }


});