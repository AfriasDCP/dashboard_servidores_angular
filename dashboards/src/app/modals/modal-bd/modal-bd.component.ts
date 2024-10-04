import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ZabbixService } from '../../services/zabbix.service';

@Component({
  selector: 'app-modal-bd',
  templateUrl: './modal-bd.component.html',
  styleUrls: ['./modal-bd.component.scss']
})
export class ModalBdComponent implements OnInit {
  @Input() public Tipo: any;
  @Input() public Grupo: any;
  @Input() public Sitio: any;
  @Input() public tag: any;
  @Input() public bd: any;
  @Input() public arribaMariaDB: any;
  @Input() public abajoMariaDB: any;
  @Input() public arribaMySQL: any;
  @Input() public abajoMySQL: any;
  @Input() public arribaPostgreSQL: any;
  @Input() public abajoPostgreSQL: any;
  @Input() public arribaSQLServer: any;
  @Input() public abajoSQLServer: any;
  @Input() public arribaVertica: any;
  @Input() public abajoVertica: any;

  hosts:any = [];
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
    let i = 0;
    this.bd.forEach(async (element: any) => {
      let arrBd: any = await this.api.getTotalHostsInGroupBD(authToken, element, 'Sitio', this.tag);
      console.log(arrBd);
      arrBd.forEach(async (bd: any) => {
        let estatus: any;
        if (element != 'SRV-POSTGRESQL') {
          estatus = await this.api.getHostsWithProblems(authToken, bd.hostid, 'Database is down');
        } else {
          estatus = await this.api.getHostsWithProblems(authToken, bd.hostid, 'Postgresql service is down');
        }
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, bd.hostid, 'Database blocks');
        let consultas: any = await this.api.getHostsWithProblems(authToken, bd.hostid, 'Querys');
        let conexiones: any = await this.api.getHostsWithProblems(authToken, bd.hostid, 'Conexiones');

        let order = (estatus == '' ? 0 : 1) + (bloqueos == '' ? 0 : 1) + (consultas == '' ? 0 : 1) + (conexiones == '' ? 0 : 1);

        this.hosts.push({
          hostid: bd.hostid,
          hostname: bd.host,
          motor: element == 'MARIADB-SRV' ? 'MariaDB' : element == 'MYSQL-SRV' ? 'MySQL' : element == 'SRV-POSTGRESQL' ? 'PostgreSQL' : element == 'SQLSERVER-SRV' ? 'SQL Server' : 'Vertica',
          estatus: estatus,
          bloqueos: bloqueos,
          consultas: consultas,
          conexiones: conexiones,
          order: order,
          img: element == 'MARIADB-SRV' ? 'assets/img/mariadb.png' : element == 'MYSQL-SRV' ? 'assets/img/mysql.svg' : element == 'SRV-POSTGRESQL' ? 'assets/img/postgresql.svg' : element == 'SQLSERVER-SRV' ? 'assets/img/sql.svg' : 'assets/img/vertica.svg'
        });
        this.hosts.sort((a: any, b: any) => b.order - a.order);
        this.hosts.sort((a: any, b: any) => a.motor - b.motor);
        console.log('Hosts: ',this.hosts);
        i++;
        if (i == this.hosts.length) {
          this.spinner.hide();
        }
      });
    });

  }

}
