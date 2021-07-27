import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiEmployeeService } from '../service_controller/employee-service';
import { Employee } from './employees-model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  formValue !: FormGroup
  employeeModelObj : Employee = new Employee()
  employeeInfo !: any
  add !: boolean
  update !: boolean
  submitted = false

  // set title of page in constructor
  constructor(private formbuilder: FormBuilder, private titleService: Title,
    private api : ApiEmployeeService, ) { 
      this.titleService.setTitle('Angajati');
    }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', Validators.required],
      address : ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      hire_date: ['', Validators.required],
      salary: ['', Validators.required],
      job_title: ['', Validators.required]
    })

    this.getAllEmployees()
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

    this.api.addEmployee(this.employeeModelObj).subscribe(res=>{

      alert("Ati adaugat un angajat nou!")

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
     this.api.getEmployees().subscribe(res=>{
      this.employeeInfo = res
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

    if (window.confirm("Sunteti sigur ca doriti sa modificati informatiile?")) {

    this.api.updateEmpl(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{

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
  }

  onEdit(empl: any){

    this.add = false
    this.update = true
    this.employeeModelObj.id = empl.id
    this.formValue.controls['name'].setValue(empl.name)
    this.formValue.controls['address'].setValue(empl.address)
    this.formValue.controls['email'].setValue(empl.email)
    this.formValue.controls['hire_date'].setValue(empl.hire_date)
    this.formValue.controls['salary'].setValue(empl.salary)
    this.formValue.controls['job_title'].setValue(empl.job_title)
    
  }

  clearFormEmployee(){
    this.formValue.reset()
    this.add = true
    this.update = false
  }

  removeEmployee(empl: any){
    if (window.confirm("Sunteti sigur ca doriti sa eliminati acest angajat?")) {
     this.api.deleteEmployee(empl.id).subscribe(res=>{
       // then display all records
       this.getAllEmployees()
     })
  }
  }
}
