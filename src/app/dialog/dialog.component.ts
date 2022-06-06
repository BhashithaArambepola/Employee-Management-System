import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef,MAT_DIALOG_DATA}from'@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  genderList= ["Male","Female" ];
  productForm !: FormGroup;
  actionBtn : string ='Save';
 


constructor(private formBuilder : FormBuilder,
   private api:  ApiService, 
   @Inject(MAT_DIALOG_DATA)public editData:any,
   private dialogRef : MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name : ["",Validators.required],
      department: ["",Validators.required],
      gender : ["",Validators.required],
      email: ['',Validators.required],
      comment: ['',Validators.required],
      date: ["",Validators.required]
    });
    console.log(this.editData)


    if(this.editData){
      this.actionBtn='Update';
      this.productForm.controls['Name'].setValue(this.editData.Name);
      this.productForm.controls['email'].setValue(this.editData.email);
      this.productForm.controls['department'].setValue(this.editData.department);
      this.productForm.controls['gender'].setValue(this.editData.gender);
      this.productForm.controls['date'].setValue(this.editData.date);
      
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added Sucessfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: ()=>{
            alert("Error while adding the product")
  
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("product Pudate Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },error:()=>{
        alert("Error While Updating the record !!")
      }
    })
  }

}
