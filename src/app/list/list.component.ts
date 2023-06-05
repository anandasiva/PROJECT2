import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { datamodel } from './model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employeeform: any;
  data:datamodel[] | undefined;
  datamodel!: datamodel;
  
 
  constructor(private formbuilder: FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.employeeform = this.formbuilder.group({

      name: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      phonenumber: ['', Validators.required],

    })
    this.getemployee();
}

addemployee(data:datamodel){
  console.log(data)
  this.api.addemployee(data).subscribe((res=>{
      this.employeeform.reset();
  }))
  this.getemployee();
}

getemployee(){
  this.api.getemployee().subscribe(res=>{
    this.data=res;
  })
}

delete(id:number){
  this.api.deleteemployee(id).subscribe(res=>{
    this.datamodel=res;
  })

}



}
