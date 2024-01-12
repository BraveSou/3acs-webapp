// this file is responsible for communicating with the server for sending and also receiving information


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient){}
  // https://3acs-server.azurewebsites.net/
  // http://20.219.200.11/api/getAllUsers
  baseurl = "https://3amigos-server.azurewebsites.net/api";//https calls to the server container hosted on azure

  // all the code below this point communicates with the sever container...these the routes to the various server requests
  registerUser(data:any){
    return this.http.post(this.baseurl+'/addUser', data);
  }

  loginUser(data:any){
    return this.http.post(this.baseurl+'/login', data);
  }
  getAllUsers(){
    return this.http.get(`${this.baseurl}/getAllUsers`)
  }

  getAllOrders(){
    return this.http.get(`${this.baseurl}/getCartItems`)
  }

  markOrderDispatched(id:any){
    return this.http.get(`${this.baseurl}/markOrderDispatched/${id}`)
  }
  markOrderCompleted(id:any){
    return this.http.get(`${this.baseurl}/markOrderCompleted/${id}`)
  }

  addProduct(data:FormData){
    return this.http.post(this.baseurl+'/addProduct', data);
  }
  updateUserDetails(data:any){
    return this.http.put(this.baseurl+'/updateUser', data);
  }

  addFunds(data:any){
    return this.http.post(this.baseurl+'/addFunds', data);
  }

  getUserDetails(userid:any){
    return this.http.get(this.baseurl+'/getUser/'+userid);
  }
  getUserTransactions(userid:any){
    return this.http.get(this.baseurl+'/getUserTransactions/'+userid);
  }
  listAllProducts(){
    return this.http.get(this.baseurl+'/getAllProducts');
  }
  getProductDetails(id:any){
    return this.http.get(this.baseurl+'/getProductDetails/'+id);
  }
  rejectProduct(data:any){
    return this.http.post(`${this.baseurl}/rejectProduct`, data)
  }
  deleteUserAccount(id:any){
    return this.http.get(`${this.baseurl}/deleteUserAccount/${id}`)
  }
  getUserCartItems(id:any){
    return this.http.get(`${this.baseurl}/getUserCartItems/${id}`)
  }

  addProductToCart(data:any){
    return this.http.post(`${this.baseurl}/addToCart`, data)
  }
  checkout(id:any){
    return this.http.get(`${this.baseurl}/checkout/${id}`)
  }
  getUserOrders(userid:any){
    return this.http.get(`${this.baseurl}/getUserOrders/${userid}`)
  }

  // general purpose logic
  formatOrdinalDate(inputDate: string): string {
    const date = new Date(inputDate);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    const suffix = this.getOrdinalSuffix(day);
  
    return `${day}${suffix} ${month} ${year}`;
  }
  
  getOrdinalSuffix(n: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

}
