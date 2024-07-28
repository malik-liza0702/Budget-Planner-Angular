import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm:any;
  selectedMonth:string='';
  expenses:{month:string,expenseAmount:number}[]=[
    {month:"January",expenseAmount:1500},
    {month:"February",expenseAmount:2000},
    {month:"March",expenseAmount:1000},
  ]
  monthSelected:boolean=false;
  januaryExpense:any[]=[
    {expenseType:"Rent",expenseAmount:1000},
    {expenseType:"Groceries",expenseAmount:2000},
  ]
  februaryExpense:any[]=[
    {expenseType:"Utilites",expenseAmount:500},
    {expenseType:"Groceries",expenseAmount:500},
  ]
  marchExpense:any[]=[
    {expenseType:"Rent",expenseAmount:600},
    {expenseType:"Utilites",expenseAmount:100},
  ]
  constructor(public fb:FormBuilder,public router:Router){
    const currentDate=new Date();
    this.selectedMonth=currentDate.toLocaleString('default',{month:'long'})
  }
  ngOnInit():void{
    this.expenseForm=this.fb.group({
      month:['',Validators.required],
      expenseType:['',Validators.required],
      expenseAmount:['',Validators.required],
    
    })
  }
  onSubmitExpense(){
    if(this.expenseForm.valid){
      const newExpense=this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();  
        
      }
      
  }

  onChangeExpense(event:any){
    this.selectedMonth=event.target.value;
    this.monthSelected=true;
    this.getFilteredExpenses();
  }
  getFilteredExpenses(){
    switch(this.selectedMonth){
      case "January":
          return this.januaryExpense;
      case "February":
          return this.februaryExpense;
      case "March":
          return this.marchExpense;
      default:
        return [];
      
    }
  
  }
  calculateTotalExpense(month:string):number{
    return this.getFilteredExpenses().reduce((acc,curr)=>acc+curr.expenseAmount,0);
  }
  
  saveForm(){
    if(this.expenseForm.valid){
      this.expenseForm.reset({month:this.selectedMonth});
      this.getFilteredExpenses();
    }
  }
  onSave(){
    console.log("form saved");
  }
  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }



}
