import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './Student.js';

import { dataStudent } from './dataStudent.js';

let nombreColumnas: string[] = ['Codigo', 'Cedula', 'Edad', 'Direccion', 'Telefono'];

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputSearchBoxInf: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box1")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement>document.getElementById("superior")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent, nombreColumnas);

btnfilterByCredits.onclick = () => applyFilterByStudent();
btnfilterByName.onclick = () => applyFilterByName();


totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach((course) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students: Student[], columnas: string[]): void {
    console.log('Desplegando estudiante');
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${columnas[0]}</td>
                           <td>${students[0].codigo}</td>`;
    studentTbody.appendChild(trElement);
    let trElement1 = document.createElement("tr");
    trElement1.innerHTML = `<td>${columnas[1]}</td>
                           <td>${students[0].cedula}</td>`;
    studentTbody.appendChild(trElement1);
    let trElement2 = document.createElement("tr");
    trElement2.innerHTML = `<td>${columnas[2]}</td>
                           <td>${students[0].edad}</td>`;
    studentTbody.appendChild(trElement2);
    let trElement3 = document.createElement("tr");
    trElement3.innerHTML = `<td>${columnas[3]}</td>
                           <td>${students[0].direccion}</td>`;
    studentTbody.appendChild(trElement3);
    let trElement4 = document.createElement("tr");
    trElement4.innerHTML = `<td>${columnas[4]}</td>
                           <td>${students[0].telefono}</td>`;
    studentTbody.appendChild(trElement4);


}




function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function applyFilterByStudent() {
    let textInf = inputSearchBoxInf.value;
    let textMax = inputSearchBoxMax.value;
    textInf = (textInf == null) ? '' : textInf;
    textMax = (textMax == null) ? '' : textMax;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(textInf, textMax, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
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

function searchCourseByCredits(textInf: string, textMax: string, dataCourses: Course[]): Course[] {
    let min: number = +textInf;
    let max: number = +textMax;
    console.log(min);
    console.log(max);
    return  dataCourses.filter(c => c.credits > min );
}
