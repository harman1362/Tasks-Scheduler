import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from '../environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class BaseService {
    BaseURL: string='';

    constructor(private http:HttpClient){
      this.BaseURL = environment.apiUrl;

    }

    get(url=''){
        return this.http.get<any>(this.BaseURL+url).pipe(
          map((data:any)=>{
            return data;
          })
        );
    }

    post(data:any,url=''){
      return this.http.post<any>(this.BaseURL+url,data).pipe(
        map((data:any)=>{
          return data
        })
      )
    }

    delete(url=''){
      return this.http.delete(this.BaseURL+url).pipe(
        map((data:any)=>{
          return data
        })
      )
    }

    put(data:any, url = '') {
      return this.http.put(this.BaseURL + url, data).pipe(
        map((data: any) => {
          return data;
        })
      );
    }
    
  }
