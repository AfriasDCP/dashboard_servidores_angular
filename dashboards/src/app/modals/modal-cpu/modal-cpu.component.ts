import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZabbixService } from '../../services/zabbix.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-cpu',
  templateUrl: './modal-cpu.component.html',
  styleUrls: ['./modal-cpu.component.scss']
})
export class ModalCpuComponent implements OnInit {
  @Input() public Tipo: any;
  @Input() public Grupo: any;
  @Input() public Sitio: any;
  @Input() public totalCpu: any;
  @Input() public disponibleCpu: any;
  @Input() public utilizadoCpu: any;

  hosts:any = [];
  hostStatus: { [key: string]: any } = {};
  hostCpu: { [key: string]: any } = {};
  hostCpuUsado: { [key: string]: any } = {};

  public loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private ref: ChangeDetectorRef,
    private api: ZabbixService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    this.loading = true;
    const authToken: string = await this.api.authenticate();
    const groupId: string = await this.api.getHostGroupId(authToken, this.Grupo);
    this.hosts = await this.api.getHostsByGroup(authToken, groupId);
    console.log(this.hosts);

    // const icmp = await this.api.checkIcmpPing(authToken, hostList[0].hostid);
    let i = 0;
    for (const host of this.hosts) {
      this.hostStatus[host.hostid] = await this.api.getHostsWithProblems(authToken, host.hostid, 'Cpu less than');
      this.hostCpu[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Total CPU');
      this.hostCpuUsado[host.hostid] = await this.api.checkItem(authToken, host.hostid, 'Uso CPU');

      this.hosts[i].order = this.hostStatus[host.hostid] ? 1 : 0;
      console.log(this.hostStatus[host.hostid]);
      // order this.host by order
      this.hosts.sort((a: any, b: any) => b.order - a.order);
      i++;
    }
    this.spinner.hide();
  }

}
