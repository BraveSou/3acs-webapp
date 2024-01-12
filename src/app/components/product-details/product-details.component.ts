import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:String = "";
  productDetails!:any;
  userType:String = "";
  userDetails = "";
  constructor(private route: ActivatedRoute, private ms: MasterService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    // get product details
    this.ms.getProductDetails(this.productId).subscribe((res:any)=>{
      if(res.success){
        this.productDetails = res.data
      }
    })
    // get the user type...to help determine what dashboard to display...we use user id
    this.ms.getUserDetails(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.userDetails = res.data
        if(res.data.supplier){
          this.userType = "Supplier";
        }
        if(res.data.staff){
          this.userType = "Staff"
        }
        if(!res.data.supplier && !res.data.staff){
          this.userType = "User"
        }
      }
    })



  }
  // reject product
  rejectProduct(id:any){
    this.ms.rejectProduct({id:id}).subscribe((res:any)=>{
      if(res.success){
        alert(res.message)
        this.router.navigate(['dashboard/market'])
      }else{
        alert(res.message)
      }
    })      
  }

  addToCart(productid:any, qtty:any){
    const amount = prompt("Enter the quantity");
    console.log(typeof amount)
    // if(typeof amount === 'number')
    if(!Number.isNaN(parseInt(amount!))){
      if(amount!>qtty){
        alert("Insufficient remaining units to cover your quantity");
      }else{
        this.ms.addProductToCart({userId: localStorage.getItem('3ac-uid'), productId: productid, quantity: amount}).subscribe((res:any)=>{
          if(res.success){
            console.log(res.cart)
            alert(res.message)
          }else{
            alert(res.message)
          }
        })
  
      }
    }else{
      alert('Please enter a valid number, not in words')
    }
    
  }
  

}
