import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public subscribes: Subscription[] = [];
  public groupCuenta: any[];

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
  
}

async CargarDatos(){
  console.log("Si entro al metodo ")

  let cuenta = await this.accountService.getAccount().subscribe(res=>{
 
    this.groupCuenta = res.map((item:any)=>{return{id:item.cuenta.id,titular:item.cuenta.titular,ci:item.cuenta.ci,banco:item.cuenta.banco,monto:item.cuenta.monto}});
    
  });

  this.subscribes.push(
    cuenta
  );
}
}
