# book-borrow
# Easy flow of the book borrow process. 
The Node.js and Mongo databases were used to create this procces flow . A "mongoose" was used to create the model, through which the database was communicated.
Port number 2020 was used for the local server port.

# User
### Insert user (POST)
### Route
localhost:2020/user
### Body
{
  "firstName": "Your first name",
	"lastName": "Your las name",
	"email": "Your email",
	"password": "Your password
}

### Login (POST)
### Route
localhost:2020/login
### Body
{
	"email": "Your email",
	"password": "Your password
}

### Change user password (PUT)
### Route
localhost:2020/changepassword
### Body
{
	"password": "Your email",
	"newPassword": "Your password
}

# Author
### Insert Author (POST)
### Route
localhost:2020/authors
### Headers (Insert authorization field and jwt value)
### Body
{
	"firstName": "Author first name",
	"lastName": "Author last name"
}

### Update Author (PUT)
### Route
localhost:2020/author/:id
### Headers (Insert authorization field and jwt value)
### Body
{
	"firstName": "Author first name",
	"lastName": "Author last name"
}

### Get list of authors (GET)
### Headers (Insert authorization field and jwt value)
### Route
localhost:2020/authors

### Delete Author (DELETE)
### Headers (Insert authorization field and jwt value)
### Route
localhost:2020/author/:id

# Book Type
### Insert book type (POST)
### Route
localhost:2020/booktype
### Headers (Insert authorization field and jwt value)
### Body
{
	"name": "Book type name"
}

### Update book type (PUT)
### Route
localhost:2020/booktype/:id
### Headers (Insert authorization field and jwt value)
### Body
{
	"name": "Book type name",
}

# Book
### Insert book (POST)
### Route
localhost:2020/book
### Headers (Insert authorization field and jwt value)
### Body
{
	"name": "Book name",
	"pagecount": "Page number value"
	"authorId": "Value of authors id's"
	"bookTypeId": "Value of book id"
}

# Student
### Insert student (POST)
### Route
localhost:2020/student
### Headers (Insert authorization field and jwt value)
### Body
{
	"firstName": "Student first name",
	"lastName": "Student last name"
	"birthdate": "Birthdate value"
	"gender": "Gender value",
	"grade": "Grade value"
}

### Update student (PUT)
### Route
localhost:2020/student/:id
### Headers (Insert authorization field and jwt value)
### Body
{
	"firstName": "Student first name",
	"lastName": "Student last name"
	"birthdate": "Birthdate value"
	"gender": "Gender value",
	"grade": "Grade value"
}

### Get students by grade (GET)
### Route
localhost:2020/student/grade
### Headers (Insert authorization field and jwt value)
### Body
{
	"grade": "Grade value"
}

# Borrow
### Insert borrow (POST)
### Route
localhost:2020/borrow
### Headers (Insert authorization field and jwt value)
### Body
{
	"studentId": "Student id value",
	"bookId": "Book id value (array)"
	"takenDate": "taken date value"
}

### Update borrow (PUT)
### Route
localhost:2020/borrow/:id
### Headers (Insert authorization field and jwt value)
### Body
{
	"studentId": "Student id value",
	"bookId": "Book id value (array)"
	"takenDate": "Taken date value",
	"broughtDate": "Brought date value"
}
