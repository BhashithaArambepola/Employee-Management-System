import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

// import {AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCRUD';
  displayedColumns: string[] = ['Name','email',  'department','date', 'gender','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private dialog:MatDialog , private api : ApiService){

}
  ngOnInit(): void {
    this.getAllproduct();

  }
openDialog() {
  this.dialog.open(DialogComponent, {
   width : '30%'
  }).afterClosed().subscribe(val=>{
    if(val== 'save'){
      this.getAllproduct();
    }
  })
}
getAllproduct(){
this.api.getproduct().subscribe({
  next: (res)=>{

    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  },
  error:(err)=>{
    alert("Error while feteching the records")
  }
})
}

editProduct(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row

  }).afterClosed().subscribe(val=>{
    if(val=='update'){
      this.getAllproduct();
    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


deleteproduct(id: number){
  this.api.deleteproduct(id).subscribe(
   {
     next:(res)=>{
       alert("Deleted SucessFully")
       this.getAllproduct();
     },
     error:()=>{
       alert("error while Deleteing the product")
     }
   }
  )

}
}