import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})

export class ManagementComponent implements OnInit{
  usersList!:any;
  ordersList!: { [cartId: string]: { status: string, date: string, products: any[] } };
  productsList!:any;
  noorders = false;
  constructor(private ms: MasterService){}
  // oninit
  ngOnInit(): void {
    this.ms.getAllOrders().subscribe(
      (response: any) => {
        if(response.success){
          this.ordersList = response.data;
        }else{
          this.noorders = true;
        }
      }    
    );
    this.ms.getAllUsers().subscribe((res:any)=>{
      if(res.success){
        this.usersList = res.data
      }
    })
      
  }

  markOrderDispatched(id:any){
    this.ms.markOrderDispatched(id).subscribe((res:any)=>{
      if(res.success){
        window.location.reload()
      }
    })
  }
  markComplete(id:any){
    this.ms.markOrderCompleted(id).subscribe((res:any)=>{
      if(res.success){
        window.location.reload()
      }
    })
  }

  

}
