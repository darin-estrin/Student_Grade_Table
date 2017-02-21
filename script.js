var app = angular.module("sgt",[]);

app.controller('sgtController', function(){
  this.student = {};
  this.students = [];
  this.avgGrade = null;
  var self = this;

  this.addStudent = function(){
    this.student.grade = parseInt(this.student.grade);
    if(isNaN(this.student.grade)){
      alert("Please enter a number for grade");
      return false;
    } else if (this.student.grade < 0 || this.student.grade >= 100){
      alert('Pleas enter a number between 0 and 100 for grade');
      return false;
    }
    this.students.push(this.student);
    this.updateData();
    this.student = {};
  };

  this.updateData = function(){
    for(var i = 0; i < this.students.length; i++){
      this.students[i].id = i;
    }
    this.average();
  };

  this.average = function(){
    this.avgGrade = 0;
    for (var i = 0; i < this.students.length; i++){
      this.avgGrade += this.students[i].grade;
    }
    if (this.students.length <= 0){
      this.avgGrade = 0;
    } else {
      this.avgGrade = Math.round(this.avgGrade / this.students.length);
    }
  };

  this.clear = function(){
    this.student = {};
  };

  this.deleteStudent = function(){
    $("tbody").on("click", ".btn-danger", function(){
      self.studentToDelete = parseInt(this.id);
      console.log(self.students);
      self.students.splice(self.studentToDelete,1);
      $(this).parents('tr').remove();
      self.updateData();
    });
  };

});
