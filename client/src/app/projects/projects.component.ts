import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProjectService } from '../service_controller/project-service';
import { Project } from './projects-model';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})



export class ProjectsComponent implements OnInit {
  formValue !: FormGroup
  projectModelObj : Project = new Project()
  projectInfo !: any
  add !: boolean
  update !: boolean
  p: number = 1;
  submitted = false
  alertAdd = false
  alertUpd = false
  alertDel = false
  
  // set title of page in constructor
  constructor(private formbuilder: FormBuilder, private titleService: Title, private api : ApiProjectService ) { 
      this.titleService.setTitle('Proiecte');
    }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      project_name: ['', Validators.required],
      start_date : ['', Validators.required],
      planned_end_date: ['', Validators.required],
      description: ['', Validators.required],
      project_code: ['', Validators.required]
    })

    this.getAllProjects()
  }

  // get f for input control
  get f(): { [key: string]: AbstractControl } {
      return this.formValue.controls;
  }

  addProjectDetails(){
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formValue.value, null, 2));

    this.projectModelObj.project_name = this.formValue.value.project_name;
    this.projectModelObj.start_date = this.formValue.value.start_date;
    this.projectModelObj.description = this.formValue.value.description;
    this.projectModelObj.planned_end_date = this.formValue.value.planned_end_date;
    this.projectModelObj.project_code = this.formValue.value.project_code;

    this.api.addProject(this.projectModelObj).subscribe(res=>{
      console.log(res)
      this.alertAdd = true

      // close modal
      let ref = document.getElementById('close')
      ref?.click()
      // clear validation message
      this.submitted = false;
      // reset form
      this.formValue.reset()
      // get all records
      this.getAllProjects()
    },err=>{
      alert("Error!")
    })
  }

  getAllProjects(){
     this.api.getProjects().subscribe(res=>{
      this.projectInfo = res
    })
  }

  updateProjects(){
    this.submitted = true;
    if (this.formValue.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formValue.value, null, 2));

    this.projectModelObj.project_name = this.formValue.value.project_name;
    this.projectModelObj.start_date = this.formValue.value.start_date;
    this.projectModelObj.description = this.formValue.value.description;
    this.projectModelObj.planned_end_date = this.formValue.value.planned_end_date;
    this.projectModelObj.project_code = this.formValue.value.project_code;

      this.api.updateProj(this.projectModelObj, this.projectModelObj.id)
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
  
      this.getAllProjects()

      })
 
  }

  onEdit(proj: any){
    
    var datePipe = new DatePipe("en-US");
    proj.start_date = datePipe.transform(proj.start_date, 'mediumDate');
    proj.planned_end_date = datePipe.transform(proj.planned_end_date, 'mediumDate');

    this.add = false
    this.update = true
    this.projectModelObj.id = proj.id
    this.formValue.controls['project_name'].setValue(proj.project_name)
    this.formValue.controls['description'].setValue(proj.description)
    this.formValue.controls['start_date'].setValue(proj.start_date)
    this.formValue.controls['planned_end_date'].setValue(proj.planned_end_date)
    this.formValue.controls['project_code'].setValue(proj.project_code)
    
  }

  clearFormProject(){
    this.formValue.reset()
    this.add = true
    this.update = false
  }

  removeProject(proj: any){

     this.api.deleteProject(proj.id).subscribe(res=>{
        // display alert
        this.alertDel = true

       // then display all records
       this.getAllProjects()
     })
  }

}
