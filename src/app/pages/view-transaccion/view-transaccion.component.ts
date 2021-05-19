import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-view-transaccion',
  templateUrl: './view-transaccion.component.html',
  styleUrls: ['./view-transaccion.component.css']
})
export class ViewTransaccionComponent implements OnInit {
  public subscribes: Subscription[] = [];
  public groupTransacciones: any[];

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
  
    let cuenta = await this.accountService.getTransaccion().subscribe(res=>{
 
      this.groupTransacciones = res.map((item:any)=>{return{id:item.transaccion.id,monto:item.transaccion.monto,tipo:item.transaccion.tipo}});
      console.log("Compermiso",res)
    });
  
    this.subscribes.push(
      cuenta
    );
  }
}
