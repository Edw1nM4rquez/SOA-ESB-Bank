import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public subscribes: Subscription[] = [];
  public groupLibros: any[];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnDestroy(): void {
    this.subscribes.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    let libros = await this.accountService.getLibros().subscribe(res=>{
 
      this.groupLibros = res.map((item:any)=>{return{autor: item.user.autor,id: item.user.id,title: item.user.title,image: item.user.imagen,descripcion: item.user.description  }});
    console.log("Libros", this.groupLibros)
        // console.log("Libros",res.map((item:any)=>{return{autor: item.user.autor,id: item.user.id,title: item.user.title,image: item.user.imagen,descripcion: item.user.description  }}));
    });
  
    this.subscribes.push(
      libros
    );
  }

}
