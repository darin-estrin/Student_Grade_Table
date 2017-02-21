var app = angular.module("sgt",[]);

app.controller('sgtController', function(){
  this.student = {};
  this.students = [];

  this.addStudent = function(){
    this.student.grade = parseInt(this.student.grade);
    if(isNaN(this.student.grade)){
      alert("Please enter a number for grade");
      return false;
    } else if (this.student.grade < 0 || this.student.grade >= 100){
      alert('Pleas enter a number between 0 and 100 for grade');
      return false;
    }
    this.updateData();
    this.students.push(this.student);
    this.student = {};
  };

  this.updateData = function(){
    for(var i = 0; i < this.students.lenght; i++){
      this.students[i].student.id = i;
    }
  };

  this.average = function(){
    this.avgGrade = 0;
    for (var i = 0; i < this.students.length; i++){
      this.avgGrade += this.students[i].student.grade;
    }
    return this.avgGrade / this.students.length;
  };

  this.clear = function(){
    this.student = {};
  };

  this.deleteStudent = function(){
    $("tbody").on("click", ".btn-danger", function(){
      console.log($(this).parents('tr'));
    });
  };

});
