var mysql = require('mysql');
var path = require('path');
var express = require('express');
const { rootCertificates } = require('tls');

var connection = mysql.createConnection({
    host : 'cop4331team21.live',
    user : rootCertificates,
    password : '',
    database : 'USERS'
});

const urlBase = 'http://cop4331team21.live/LAMPAPI'
const extension = '.php'

var userID = 0;
var firstName = "";
var lastName = "";

function doLogin() {
    userId = 0;
	firstName = "";
    lastName = "";
    
    var login = document.getElementById("login").nodeValue;
    var password = document.getElementById("password").nodeValue;
    var hash = md5( password );

    document.getElementById("loginResult").innerHTML = "";

    var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';

    var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
		
				userId = jsonObject.id;
		
				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doRegister() {
    userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("registerName").value;
    var password = document.getElementById("registerPassword").value;
    var first = document.getElementById("registerFirst").value;
    var last = document.getElementById("registerLast").value;
	var hash = md5( password );
	
	document.getElementById("registerResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '", "first" : "' + first + '", "last" : "' + last + '"}';

	// var dat = {login:login, password:hash, first:firstName, last:lastName};
	// var jsonPay = JSON.stringify(dat);

	// var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
                window.location.href = "contacts.html";
                
			}
		};
		
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}
}

// function listContacts()
// {

// }

function addContact()
{
    var firstName = document.getElementById("contactFirstName").value;
	var lastName = document.getElementById("contactLastName").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var address = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zipCode = document.getElementById("zip").value;

	document.getElementById("userAddResult").innerHTML = "";
	
	var jsonPayload = '{"uid" : ' + userId + '", "firstName" : "' + firstName + '", "lastName" : "' + lastName
					   + '", "phone" : "' + phone + '", "email" : "' + email + '", "address" : "' + address
					   + '", "city": "' + city + '", "state" : "' + state + '", "zip" : "' + zipCode + '"}';

	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "A new contact has been added!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

function searchContact()
{

}

function isLoggedIn () {
    // ...
    const { token, user } = response.body
    localStorage.setItem('user', user)
}

function logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}