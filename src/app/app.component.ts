import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasksArr: any[]=[];
  add: boolean = true;
  update: boolean = false;
  selectedId: any;
  selectedTask: any;
  taskInModal: any;
  isCheck: boolean = true;
  taskChecked: any;
  taskDone: any;
  getId: number=0;

  constructor(private taskSrv: TaskService, private modalService: NgbModal) {}

  TaskForm = new FormGroup({
    id: new FormControl(0),
    newTask: new FormControl(''),
  });

  ngOnInit() {
    // localStorage.removeItem('tasksData');
    // console.log(localStorage);
    this.refresh();
  }

  refresh() {
    this.taskSrv.getTask().subscribe(m=>{
      // console.log(m);
      this.tasksArr=m
      
    });
    // console.log(this.tasksArr);
  }

  addNewTask() {
    if (this.add) {

      this.taskSrv.addTask(this.TaskForm.controls['newTask'].value)?.subscribe(m=>{
        // console.log(m);
      this.refresh();
      this.TaskForm.reset();
        
      });
    } else {
      this.taskSrv.updateTask(this.getId,this.TaskForm.controls['newTask'].value)?.subscribe(m=>{
        // console.log(m);
        this.backToAdd();
      this.refresh();
      })
      
    }
  }

  deleteTask(i: number) {
    this.taskSrv.deleteTask(i).subscribe(m=>{
      // console.log(m);
      this.refresh();
    });
  }

  backToAdd() {
    this.TaskForm.reset();
    this.add = true;
    this.update = false;
  }

  updateTask(id: number) {
    // console.log(id);
    this.add = false;
    this.update = true;
    this.getId=id
    // console.log(this.taskSrv.getTaskById(id));
    // this.selectedId = this.taskSrv.getTaskById(id)[0].id;
    // this.selectedTask = this.taskSrv.getTaskById(id)[0].task;
    this.taskSrv.getTaskById(id).subscribe(m=>{
    this.TaskForm.controls['newTask'].setValue(m.task);
      
    })
      
  }
  openVerticallyCentered(content:any, id:any) {
    // console.log(id);
    this.taskSrv.getTaskById(id+1).subscribe(m=>{
    this.taskInModal=m.task;
      })

    // this.taskInModal = this.taskSrv.getTaskById(id + 1)[0].task;
    this.modalService.open(content, { centered: true });
  }
  checkBox(id: number, e:any) {
    this.isCheck = !this.isCheck;
    // this.taskDone = this.taskSrv.getTaskById(id)[0].task;
    
    // this.check = !this.check;
    // console.log(e.target.value);
    if (this.isCheck == true) {
      this.taskChecked = '';
    } else if (this.isCheck == false) {
      this.taskChecked = 'line-through';
    }
  }
}
