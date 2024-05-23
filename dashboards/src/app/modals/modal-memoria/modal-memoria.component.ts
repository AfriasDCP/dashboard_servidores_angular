import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZabbixService } from '../../services/zabbix.service';

@Component({
  selector: 'app-modal-memoria',
  templateUrl: './modal-memoria.component.html',
  styleUrls: ['./modal-memoria.component.scss']
})
export class ModalMemoriaComponent implements OnInit {

  @Input() public Tipo: any;
  @Input() public Grupo: any;
  @Input() public Sitio: any;
  @Input() public totalMemoria: any;
  @Input() public disponibleMemoria: any;
  @Input() public utilizadoMemoria: any;

  hosts:any = [];
  hostStatus: { [key: string]: any } = {};
  hostMemoria: { [key: string]: any } = {};
  hostMemoriaUsada: { [key: string]: any } = {};

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
      this.hostStatus[host.hostid] = await this.api.getHostsWithProblems(authToken, host.hostid, 'Available Memory is less than');
      this.hostMemoria[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Total Memory') / 1000000000;
      this.hostMemoriaUsada[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Used Memory %');

      this.hosts[i].order = this.hostStatus[host.hostid] ? 1 : 0;
      console.log(this.hostStatus[host.hostid]);
      // order this.host by order
      this.hosts.sort((a: any, b: any) => b.order - a.order);
      i++;

    }
    this.spinner.hide();
  }

}
