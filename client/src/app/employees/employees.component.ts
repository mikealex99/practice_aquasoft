import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiEmployeeService } from '../service_controller/employee-service';
import { ApiProjectService } from '../service_controller/project-service';
import { Employee } from './employees-model';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Project } from '../projects/projects-model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  
  formValue !: FormGroup
  formVal !: FormGroup
  employeeModelObj : Employee = new Employee()
  projectModelObj : Project = new Project()
  employeeInfo !: any
  projInfo !: any
  emplInfo !: any
  add !: boolean
  update !: boolean
  p: number = 1;
  formNull !: boolean
  submitted = false
  alertAdd = false
  alertUpd = false
  alertDel = false
 
  
  // set title of page in constructor
  constructor( private formbuilder: FormBuilder, private titleService: Title,
    private apiEmployee : ApiEmployeeService, private apiProject : ApiProjectService) { 
      this.titleService.setTitle('Angajati');
    }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      name: ['', Validators.required],
      address : ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      hire_date: ['', Validators.required],
      salary: ['', Validators.required],
      job_title: ['', Validators.required],
      project_id: ['', Validators.required]
    })

    this.getAllEmployees()
    this.getAllProjs()

    this.formVal = this.formbuilder.group({
      project_name: ['', Validators.required],
      start_date : ['', Validators.required],
      planned_end_date: ['', Validators.required],
      description: ['', Validators.required],
      project_code: ['', Validators.required]
    })
  }


  // get f for input control
  get f(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }

  addEmployeeDetails(){
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formValue.value, null, 2));

    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.hire_date = this.formValue.value.hire_date;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.job_title = this.formValue.value.job_title;
    this.employeeModelObj.project_id = this.formValue.value.project_id;
    
    this.apiEmployee.addEmployee(this.employeeModelObj).subscribe(res=>{

      // display alert
      this.alertAdd = true
      // close modal
      let ref = document.getElementById('close')
      ref?.click()
      // clear validation message
      this.submitted = false;
      // reset form
      this.formValue.reset()
      // get all records
      this.getAllEmployees()

    },err=>{
      alert("Error!")
    })
  }

  getAllEmployees(){
     this.apiEmployee.getEmployees().subscribe(res=>{
      this.employeeInfo = res
      
      console.log(res)
    })
  }

  getAllProjs(){
    this.apiProject.getProjects().subscribe(res=>{
     this.projInfo = res
     console.log(res)
   })
 }

  updateEmployees(){
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formValue.value, null, 2));

    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.hire_date = this.formValue.value.hire_date;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.job_title = this.formValue.value.job_title;
    this.employeeModelObj.project_id = this.formValue.value.project_id;

    this.apiEmployee.updateEmpl(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{

    // display alert
    this.alertUpd = true
    // close modal
    let ref = document.getElementById('close')
    ref?.click()
    // clear validation message
    this.submitted = false;
    // reset form
    this.formValue.reset()

    this.getAllEmployees()

    })
  
  }

  onEdit(empl: any){
    var datePipe = new DatePipe("en-US");
    empl.hire_date = datePipe.transform(empl.hire_date, 'mediumDate');

    this.add = false
    this.update = true
    this.employeeModelObj.id = empl.id
    this.formValue.controls['name'].setValue(empl.name)
    this.formValue.controls['address'].setValue(empl.address)
    this.formValue.controls['email'].setValue(empl.email)
    this.formValue.controls['hire_date'].setValue(empl.hire_date)
    this.formValue.controls['salary'].setValue(empl.salary)
    this.formValue.controls['job_title'].setValue(empl.job_title)
    this.formValue.controls['project_id'].setValue(empl.project_id)
  }

  
  getEmplProj(empl:any): void {
   
    this.apiEmployee.getEmployeeProj(empl.id)
      .subscribe(
        data => {

              // reset form
              this.formVal.reset()

              var datePipe = new DatePipe("en-US");
              data["Project"].start_date = datePipe.transform(data["Project"].start_date, 'mediumDate');
              data["Project"].planned_end_date = datePipe.transform(data["Project"].planned_end_date, 'mediumDate');

              console.log(data);

              console.log(data["Project"].project_name);
              
              this.projectModelObj.id = data["Project"].id
              this.formVal.controls['project_name'].setValue(data["Project"].project_name)
              this.formVal.controls['description'].setValue(data["Project"].description)
              this.formVal.controls['start_date'].setValue(data["Project"].start_date)
              this.formVal.controls['planned_end_date'].setValue(data["Project"].planned_end_date)
              this.formVal.controls['project_code'].setValue(data["Project"].project_code)

        },
        error => {
          console.log(error);
        });
  }

  updateProjects(){
    this.submitted = true;
    if (this.formVal.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formVal.value, null, 2));

    this.projectModelObj.project_name = this.formVal.value.project_name;
    this.projectModelObj.start_date = this.formVal.value.start_date;
    this.projectModelObj.description = this.formVal.value.description;
    this.projectModelObj.planned_end_date = this.formVal.value.planned_end_date;
    this.projectModelObj.project_code = this.formVal.value.project_code;
    console.log(this.projectModelObj.id)

      this.apiProject.updateProj(this.projectModelObj, this.projectModelObj.id)
      .subscribe(res=>{

      // display alert
      this.alertUpd = true
      // close modal
      let ref = document.getElementById('closeM')
      ref?.click()
      // clear validation message
      this.submitted = false;
      this.formVal.reset()
  
      this.getAllEmployees()

      })
 
  }




  clearFormEmployee(){
    this.formValue.reset()
    this.add = true
    this.update = false
  }

  removeEmployee(empl: any){
     this.apiEmployee.deleteEmployee(empl.id).subscribe(res=>{
        // display alert
        this.alertDel = true
       // then display all records
       this.getAllEmployees()
     })
  }
}
