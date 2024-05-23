import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZabbixService } from '../../services/zabbix.service';

@Component({
  selector: 'app-modal-disco',
  templateUrl: './modal-disco.component.html',
  styleUrls: ['./modal-disco.component.scss']
})
export class ModalDiscoComponent implements OnInit {

  @Input() public Tipo: any;
  @Input() public Grupo: any;
  @Input() public Sitio: any;
  @Input() public totalDisco: any;
  @Input() public disponibleDisco: any;
  @Input() public utilizadoDisco: any;

  hosts:any = [];
  hostStatus: { [key: string]: any } = {};
  hostDisco: { [key: string]: any } = {};
  hostDiscoUsado: { [key: string]: any } = {};
  hostDiscoLista: { [key: string]: any } = {};
  discos:any = [];

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

    for (const host of this.hosts) {
      this.hostDiscoLista = await this.api.checkItemAllData(authToken, host.hostid, 'Free Space on');

      this.hostDiscoLista['forEach'](async (element:any) => {
        this.discos.push({
          hostid: host.hostid,
          hostname: host.name,
          name: element.name.split('Free Space on ')[1],
          freeSpace: this.formatBytes(element.lastvalue),
          usedSpace: parseFloat(await this.api.checkItem(authToken, host.hostid, 'Used Space % on ' + element.name.split('Free Space on ')[1])).toFixed(2),
        });
        this.discos.sort((a: any, b: any) => b.usedSpace - a.usedSpace);
      });

    }
    this.spinner.hide();
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

}
