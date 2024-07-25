import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,SideNavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  lastMonthsIncome=['January: $1000','February:$1500','March:$1200'];
  currentMonthIncome='$2000';

  // Expense
  lastMonthsExpense=['January:$800','February:$1000',"March:$1200"];
  currentMonthExpense='$1500';

  // Todo Trans
  todoTransaction=[
    {description:"Pay Electricity"},
    {description:"Submit monthly report"},
    {description:"Buy groceries"},
    {description:"Call insurance money"}
    
  ];
  totalCurrentMonthIncome=2000;
  totalCurrentMonthExpense=1500;


  constructor(public router:Router){}
  onIncome(){
    this.router.navigate(['/budget-planner/income']);
  }
  onExpense(){
    this.router.navigate(['/budget-planner/expense']);
  }
  onTodo(){
    this.router.navigate(['/budget-planner/todo']);
  }

  get currentMonthSavings():number{
    return this.totalCurrentMonthIncome-this.totalCurrentMonthExpense;
  }
  isSlideOut=false;
  
  toggleSlideOut():void{
    this.isSlideOut=!this.isSlideOut;
  }
  onDash(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
  onProfile(){
    this.router.navigate(['/budget-planner/profile']);
  }
  onHistory(){
    this.router.navigate(['/budget-planner/history']);
  }
  onLogout(){
    this.router.navigate(['/budget-planner/login']);
  }

}
