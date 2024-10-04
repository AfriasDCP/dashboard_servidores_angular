import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZabbixService } from '../../services/zabbix.service';

@Component({
  selector: 'app-modal-servidores-virtuales',
  templateUrl: './modal-servidores-virtuales.component.html',
  styleUrls: ['./modal-servidores-virtuales.component.scss']
})
export class ModalServidoresVirtualesComponent implements OnInit {
  @Input() public Tipo: any;
  @Input() public Grupo: any;
  @Input() public Sitio: any;
  @Input() public totalVirtuales: any;
  @Input() public problemasVirtuales: any;
  @Input() public so: any;



  hosts: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private ref: ChangeDetectorRef,
    private api: ZabbixService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    this.hosts = [];
    this.spinner.show();
    const authToken: string = await this.api.authenticate();
    const groupId: string = await this.api.getHostGroupId(authToken, this.Grupo);
    let arr_virtuales = await this.api.getTotalVirtuales(authToken, groupId);
    let arr_virtuales_so = arr_virtuales.filter((virtual: any) => virtual.lastvalue != '');

    let arr_so = await this.api.getTotalVirtualesSO(authToken, groupId);

    let virtualesSO = arr_so.filter((virtual: any) => virtual.lastvalue.includes(this.so));


    virtualesSO.forEach(async (so: any) => {
      let estado = await this.api.checkItem(authToken, so.hostid, 'VM Guest State ' + so.name.split('VM Guest OS ')[1]);
      let host:any = await this.api.getHost(authToken, so.hostid);
      this.hosts.push({
        'name': so.name.split('VM Guest OS ')[1],
        'so': so.lastvalue,
        'estado': estado,
        'fisico': host.host
      });
      console.log('hosts', this.hosts);
    });


    console.log('arr_virtuales', arr_virtuales);
    console.log('virtualesSO', virtualesSO);
    this.spinner.hide();
  }

}
