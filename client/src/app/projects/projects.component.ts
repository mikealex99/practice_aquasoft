import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiProjectService } from '../service_controller/project-service';
import { Project } from './projects-model';

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

  constructor(private formbuilder: FormBuilder,private api : ApiProjectService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      project_name: [''],
      start_date : [''],
      planned_end_date: [''],
      description: [''],
      project_code: ['']
    })

    this.getAllProjects()
  }

  addProjectDetails(){
    this.projectModelObj.project_name = this.formValue.value.project_name;
    this.projectModelObj.start_date = this.formValue.value.start_date;
    this.projectModelObj.description = this.formValue.value.description;
    this.projectModelObj.planned_end_date = this.formValue.value.planned_end_date;
    this.projectModelObj.project_code = this.formValue.value.project_code;

    this.api.addProject(this.projectModelObj).subscribe(res=>{

      alert("Ati adaugat un proiect nou!")


      // close modal
      let ref = document.getElementById('close')
      ref?.click()
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
    this.projectModelObj.project_name = this.formValue.value.project_name;
    this.projectModelObj.start_date = this.formValue.value.start_date;
    this.projectModelObj.description = this.formValue.value.description;
    this.projectModelObj.planned_end_date = this.formValue.value.planned_end_date;
    this.projectModelObj.project_code = this.formValue.value.project_code;

    if (window.confirm("Sunteti sigur ca doriti sa modificati acest proiect?")) {
      this.api.updateProj(this.projectModelObj, this.projectModelObj.id)
      .subscribe(res=>{
  
      // close modal
      let ref = document.getElementById('close')
      ref?.click()
      // reset form
      this.formValue.reset()
  
      this.getAllProjects()
      })
    }
 
  }

  onEdit(proj: any){

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
    
    if (window.confirm("Sunteti sigur ca doriti sa stergeti acest proiect?")) {
     this.api.deleteProject(proj.id).subscribe(res=>{
       // then display all records
       this.getAllProjects()
     })
  }
}

}
