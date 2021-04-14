import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var nombreColumnas = ['Codigo', 'Cedula', 'Edad', 'Direccion', 'Telefono'];
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxInf = document.getElementById("search-box1");
var inputSearchBoxMax = document.getElementById("superior");
var totalCreditElm = document.getElementById("total-credits");
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent, nombreColumnas);
btnfilterByCredits.onclick = function () { return applyFilterByStudent(); };
btnfilterByName.onclick = function () { return applyFilterByName(); };
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students, columnas) {
    console.log('Desplegando estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>" + columnas[0] + "</td>\n                           <td>" + students[0].codigo + "</td>";
    studentTbody.appendChild(trElement);
    var trElement1 = document.createElement("tr");
    trElement1.innerHTML = "<td>" + columnas[1] + "</td>\n                           <td>" + students[0].cedula + "</td>";
    studentTbody.appendChild(trElement1);
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>" + columnas[2] + "</td>\n                           <td>" + students[0].edad + "</td>";
    studentTbody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>" + columnas[3] + "</td>\n                           <td>" + students[0].direccion + "</td>";
    studentTbody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>" + columnas[4] + "</td>\n                           <td>" + students[0].telefono + "</td>";
    studentTbody.appendChild(trElement4);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByStudent() {
    var textInf = inputSearchBoxInf.value;
    var textMax = inputSearchBoxMax.value;
    textInf = (textInf == null) ? '' : textInf;
    textMax = (textMax == null) ? '' : textMax;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(textInf, textMax, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    console.log("borrando tabla");
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function searchCourseByCredits(textInf, textMax, dataCourses) {
    var min = +textInf;
    var max = +textMax;
    console.log(min);
    console.log(max);
    return dataCourses.filter(function (c) { return c.credits > min; });
}
