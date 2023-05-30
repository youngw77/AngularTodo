import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  todo : ITask [] = [];
  inprogress : ITask [] = [];
  done: ITask [] =[];
  updateIndex !:any;
  isEditEnabled : boolean = false;
  constructor(private fb : FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }
  addTask(){
    this.todo.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
  updateTask(){
    this.todo[this.updateIndex].description = this.todoForm.value.item;
    this.todo[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  onEdit(item:ITask, i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  deleteTask(i:number){
    this.todo.splice(i,1);
  }
  deleteInprogressTask(i:number){
    this.inprogress.splice(i,1);
  }
  deleteDoneTask(i:number){
    this.done.splice(i,1);
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
