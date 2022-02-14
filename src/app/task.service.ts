import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tasks, Task } from './task';
import {map} from "rxjs/operators";
import { BaseService } from './base';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = tasks;
  constructor(private srv:BaseService) {}

  getTask() {
    return this.srv.get("tasks");
  }

  addTask(task: Task) {
    if(task){
      let newData: any = {
        // id:this.srv.get("tasks").subscribe(m=>m.length>0?m[m.length-1].id+1:1),
        // this.tasks?.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
        task: task,
      };
    return this.srv.post(newData,"tasks")
    }
    else{
      return null;
    }
      

  }

  deleteTask(key: number) {
 
    return this.srv.delete("tasks/"+key);
  }

  getTaskById(id: number) {
    // let arr: any[] = this.tasks.filter((m) => {
    //   return m.id == id;
    // });
    // console.log(id);
    
    return this.srv.get("tasks/"+id);
  }

  updateTask(id:any, task:any) {
    
   if(task){
      let newData: any = {
        task: task,
      };
    return this.srv.put(newData,"tasks/"+id)
    }
    else{
      return null;
    }
      
  }
}
