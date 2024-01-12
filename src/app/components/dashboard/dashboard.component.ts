import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddFundsDialogComponent } from '../add-funds-dialog/add-funds-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userType:String = "User Dashboard"
  isStaff:boolean = false;
  isSupplier:boolean = false;
  username!: String;
  userinfo!:any;

  constructor(private ms: MasterService, private auth: AuthService, private router: Router, public dialog: MatDialog){}

  onAddFundsDialog(){
    const dialogRef = this.dialog.open(AddFundsDialogComponent, {
      width: "20%"
    })
    dialogRef.afterClosed().subscribe(funds => {
      // Handle the result if needed
      this.ms.addFunds({userid:localStorage.getItem('3ac-uid'), amount: funds}).subscribe((res:any)=>{
        if(res.success){
          alert(this.capitalizeEachWord(`Congratulations ${res.data.firstname}, £${funds} added successfully`))
        }else{
          alert("Failed to add funds. Please try again")
        }
      })
    });
  }

  ngOnInit(): void {
    // load the market page
    this.router.navigate(['dashboard/market'])
    // get the user details
    this.ms.getUserDetails(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.userinfo = res.data
        this.isSupplier = res.data.supplier;
        this.isStaff = res.data.staff
        this.username = this.capitalizeEachWord(res.data.firstname +' '+res.data.lastname);

        if(res.data.supplier){
          this.userType = "Supplier Dashboard"
        }
        if(res.data.staff){
          this.userType = "Staff Dashboard"
        }

        if(!res.data.staff && !res.data.supplier){
          this.userType = "User Dashboard"
        }

      }
    })
  }


  // other methods
  capitalizeEachWord(inputString: string): string {
    return inputString
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the array back into a string
  }
  
  // logout
  logout(){
    this.auth.logout();
  }
  // delete user account
  deleteUserAccount(id:any){
    let confirmation = confirm("Are you sure you want to delete your account?")
    if(confirmation){
      this.ms.deleteUserAccount(id).subscribe((res:any)=>{
        if(res.success){
          this.logout()
        }else{
          alert(res.message)
        }
      })
    }else{
      alert("Operation canceled")
    }

    
  }



}
