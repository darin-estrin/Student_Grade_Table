/**
 * Define all global variables here
 */
  var studentArray = [];
  var student = $('#studentName');
  var grade = $('#studentGrade');
  var studentCourse = $('#course');
  /**
 * student_array - global array to hold student objects
 * @type {Array}
 */
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
/**
 * addClicked - Event Handler when user clicks the add button
 */
 function addClicked(){
   if (student.val() === '' || studentCourse.val() === '' || grade.val() === ''){
     return;
   }
   if(isNaN(parseInt(grade.val()))){
     return;
   }
  addStudent();
  clearAddStudentForm();
  updateData();
  $('#studentName').focus();
 }
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
  clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
  studentArray.push({name: student.val(), course: studentCourse.val(), grade: parseInt(grade.val())});
  return;
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
  $('#studentName').val('');
  $('#course').val('');
  $('#studentGrade').val('');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
  var total = 0;
  for (var i = 0; i < studentArray.length; i++){
    total += studentArray[i].grade;
  }
  return Math.round(total / studentArray.length);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
  $('.student-list-container h1').text('');
  $('.avgGrade').text('');
  $('tbody tr').remove();
  var average = calculateAverage();
  updateStudentList();
  $('.avgGrade').text(average);
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
  for (var i = 0; i < studentArray.length; i++){
    studentArray[i].studentID = i;
    addStudentToDom(studentArray[i]);
  }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj){
  $('tbody').append('<tr studentID="' + studentObj.studentID + '"><td>' + studentObj.name + '</td><td>' + studentObj.course + '</td><td>' + studentObj.grade + '</td><td><button class="btn btn-danger">Delete</button</td></tr>');
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
  studentArray = [];
  student = $('#studentName');
  grade = $('#studentGrade');
  studentCourse = $('#course');
  $('.avgGrade').text('');
  $('.student-list-container').append('<h1>User Info Unavailbe</h1>');
  $('tbody tr').remove();
}

function removeStudent(element){
  var studentIndex = $(element).parents('tr');
  studentIndex = parseInt(studentIndex[0].attributes[0].value);
  studentArray.splice(studentIndex, 1);
  updateData();
}

function getData(){
  $.ajax({
    dataType: "json",
    data: {
     api_key: "9HsjbCyrZn"
   },
   url: "http://s-apis.learningfuze.com/sgt/get",
   type: "post",
   success: function(response){
     console.log(response);
     for (var i = 0; i < response.data.length; i++){
       studentArray.push(response.data[i]);
     }
     updateData();
   }
 });
}
/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
  $('#studentGrade').on('keyup', function(e){
    if(e.keyCode === 13 || e.which === 13){
      addClicked();
    }
  });
  reset();

  $('.student-list tbody').on('click', '.btn-danger', function(e){
    removeStudent(this);
  });
});
