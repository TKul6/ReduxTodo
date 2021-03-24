import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../task";

@Injectable({providedIn: 'root'})
export class TasksService {

addTask(task: Task): Observable<number> {
    return this.httpClient.post<number>('/tasks', task);
}

removeTask(taskId: number): Observable<any>{
    return this.httpClient.delete(`/tasks/${taskId}`);
}

updateTask(task: Task): Observable<any> {
    return this.httpClient.put(`/tasks/${task.Id}`, task);
}

constructor(private httpClient: HttpClient) {}

}