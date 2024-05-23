import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZabbixService } from '../../services/zabbix.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-servidores-fisicos',
  templateUrl: './modal-servidores-fisicos.component.html',
  styleUrls: ['./modal-servidores-fisicos.component.scss']
})
export class ModalServidoresFisicosComponent implements OnInit {
  @Input() public Tipo: any;
  @Input() public Grupo: any;
  @Input() public Sitio: any;
  @Input() public totalFisicos: any;
  @Input() public problemasFisicos: any;

  hosts:any = [];
  hostStatus: { [key: string]: any } = {};
  hostMemoria: { [key: string]: any } = {};
  hostCpu: { [key: string]: any } = {};
  hostMemoriaUsada: { [key: string]: any } = {};
  hostCpuUsado: { [key: string]: any } = {};


  constructor(
    public activeModal: NgbActiveModal,
    private ref: ChangeDetectorRef,
    private api: ZabbixService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    const authToken: string = await this.api.authenticate();
    const groupId: string = await this.api.getHostGroupId(authToken, this.Grupo);
    this.hosts = await this.api.getHostsByGroup(authToken, groupId);
    console.log(this.hosts);

    // const icmp = await this.api.checkIcmpPing(authToken, hostList[0].hostid);
    let i = 0;
    for (const host of this.hosts) {
      this.hostStatus[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'ICMP: ICMP ping');
      this.hostMemoria[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Total Memory') / 1000000000;
      this.hostMemoriaUsada[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Used Memory %');
      this.hostCpu[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Total CPU');
      this.hostCpuUsado[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Uso CPU');

      this.hosts[i].order = this.hostStatus[host.hostid];
      // order this.host by order
      this.hosts.sort((a: any, b: any) => a.order - b.order);

      i++;
    }

    console.log(this.Tipo);
    console.log(this.Grupo);
    console.log(this.Grupo);

    this.spinner.hide();
  }

}
