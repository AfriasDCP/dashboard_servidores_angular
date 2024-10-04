import { map } from 'rxjs/operators';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ZabbixService } from './services/zabbix.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalServidoresFisicosComponent } from './modals/modal-servidores-fisicos/modal-servidores-fisicos.component';
import { ModalCpuComponent } from './modals/modal-cpu/modal-cpu.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalMemoriaComponent } from './modals/modal-memoria/modal-memoria.component';
import { ModalDiscoComponent } from './modals/modal-disco/modal-disco.component';
import { ModalServidoresVirtualesComponent } from './modals/modal-servidores-virtuales/modal-servidores-virtuales.component';
import { ModalBdComponent } from './modals/modal-bd/modal-bd.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public loading = false;

  fechaHora = new Date().toLocaleString();

  title = 'dashboards';
  problemasFisicosQro = 0;
  problemasFisicosTlt = 0;
  problemasFisicosAzteca = 0;

  problemasVirtualesQro = 0;
  problemasVirtualesTlt = 0;
  problemasVirtualesAzteca = 0;

  problemasBdQro = 0;
  problemasBdTlt = 0;
  problemasBdAzteca = 0;

  totalFisicosQro: any;
  totalFisicosTlt: any;
  totalFisicosAzteca: any;

  totalVirtualesQro: any;
  totalVirtualesTlt: any;
  totalVirtualesAzteca: any;

  totalDiscoQro: any;
  totalDiscoTlt: any;
  totalDiscoAzteca: any;

  problemasDiscoQro = 0;
  problemasDiscoTlt = 0;
  problemasDiscoAzteca = 0;

  totalMemoriaQro: any;
  totalMemoriaTlt: any;
  totalMemoriaAzteca: any;

  problemasMemoriaQro = 0;
  problemasMemoriaTlt = 0;
  problemasMemoriaAzteca = 0;

  totalCpuQro: any = 0;
  totalCpuTlt: any = 0;
  totalCpuAzteca: any = 0;

  problemasCpuQro = 0;
  problemasCpuTlt = 0;
  problemasCpuAzteca = 0;

  totalVirtualesWindowsQro: any = 0;
  totalVirtualesWindowsTlt: any = 0;
  totalVirtualesWindowsAzteca: any = 0;

  totalVirtualesLinuxQro: any = 0;
  totalVirtualesLinuxTlt: any = 0;
  totalVirtualesLinuxAzteca: any = 0;

  disponibleDiscoQro: any;
  disponibleDiscoTlt: any;
  disponibleDiscoAzteca: any;

  disponibleMemoriaQro: any;
  disponibleMemoriaTlt: any;
  disponibleMemoriaAzteca: any;

  disponibleCpuQro: any;
  disponibleCpuTlt: any;
  disponibleCpuAzteca: any;

  utilizadoDiscoQro: any = 0;
  utilizadoDiscoTlt: any = 0;
  utilizadoDiscoAzteca: any = 0;

  utilizadoMemoriaQro: any;
  utilizadoMemoriaTlt: any;
  utilizadoMemoriaAzteca: any;

  utilizadoCpuQro: any = 0;
  utilizadoCpuTlt: any = 0;
  utilizadoCpuAzteca: any = 0;


  // Windows
  problemasDiscoVirtualesQro = 0;
  problemasDiscoVirtualesTlt = 0;
  problemasDiscoVirtualesAzteca = 0;

  problemasMemoriaVirtualesQro = 0;
  problemasMemoriaVirtualesTlt = 0;
  problemasMemoriaVirtualesAzteca = 0;

  problemasCpuVirtualesQro = 0;
  problemasCpuVirtualesTlt = 0;
  problemasCpuVirtualesAzteca = 0;

  problemasServiciosVirtualesQro = 0;
  problemasServiciosVirtualesTlt = 0;
  problemasServiciosVirtualesAzteca = 0;

  problemasWindowsVirtualesQro = 0;
  problemasWindowsVirtualesTlt = 0;
  problemasWindowsVirtualesAzteca = 0;


  // Linux
  problemasDiscoVirtualesLinuxQro = 0;
  problemasDiscoVirtualesLinuxTlt = 0;
  problemasDiscoVirtualesLinuxAzteca = 0;

  problemasMemoriaVirtualesLinuxQro = 0;
  problemasMemoriaVirtualesLinuxTlt = 0;
  problemasMemoriaVirtualesLinuxAzteca = 0;

  problemasCpuVirtualesLinuxQro = 0;
  problemasCpuVirtualesLinuxTlt = 0;
  problemasCpuVirtualesLinuxAzteca = 0;

  problemasServiciosVirtualesLinuxQro = 0;
  problemasServiciosVirtualesLinuxTlt = 0;
  problemasServiciosVirtualesLinuxAzteca = 0;

  problemasLinuxVirtualesQro = 0;
  problemasLinuxVirtualesTlt = 0;
  problemasLinuxVirtualesAzteca = 0;

  value = 100;
  valueFisicosQro = 100;
  valueFisicosTlt = 100;
  valueFisicosAzteca = 100;

  valueVirtualesLinuxQro = 100;
  valueVirtualesLinuxTlt = 100;
  valueVirtualesLinuxAzteca = 100;

  valueVirtualesWindowsQro = 100;
  valueVirtualesWindowsTlt = 100;
  valueVirtualesWindowsAzteca = 100;


  // BD

  // MariaDB
  arribaMariaDBQro = 0;
  arribaMariaDBTlt = 0;
  arribaMariaDBAzteca = 0;

  abajoMariaDBQro = 0;
  abajoMariaDBTlt = 0;
  abajoMariaDBAzteca = 0;

  bloqueosMariaDBQro = 0;
  bloqueosMariaDBTlt = 0;
  bloqueosMariaDBAzteca = 0;

  consultasMariaDBQro = 0;
  consultasMariaDBTlt = 0;
  consultasMariaDBAzteca = 0;

  conexionesMariaDBQro = 0;
  conexionesMariaDBTlt = 0;
  conexionesMariaDBAzteca = 0;

  // PostgreSQL

  arribaPostgreSQLAzteca = 0;
  abajoPostgreSQLAzteca = 0;
  bloqueosPostgreSQLAzteca = 0;
  consultasPostgreSQLAzteca = 0;
  conexionesPostgreSQLAzteca = 0;

  // SQL Server

  arribaSQLServerQro = 0;
  arribaSQLServerAzteca = 0;

  abajoSQLServerQro = 0;
  abajoSQLServerAzteca = 0;

  bloqueosSQLServerQro = 0;
  bloqueosSQLServerAzteca = 0;

  consultasSQLServerQro = 0;
  consultasSQLServerAzteca = 0;

  conexionesSQLServerQro = 0;
  conexionesSQLServerAzteca = 0;

  // MySQL

  arribaMySQLQro = 0;
  arribaMySQLTlt = 0;
  arribaMySQLAzteca = 0;

  abajoMySQLQro = 0;
  abajoMySQLTlt = 0;
  abajoMySQLAzteca = 0;

  bloqueosMySQLQro = 0;
  bloqueosMySQLTlt = 0;
  bloqueosMySQLAzteca = 0;

  consultasMySQLQro = 0;
  consultasMySQLTlt = 0;
  consultasMySQLAzteca = 0;

  conexionesMySQLQro = 0;
  conexionesMySQLTlt = 0;
  conexionesMySQLAzteca = 0;

  // MongoDB

  arribaMongoDBQro = 0;
  abajoMongoDBQro = 0;
  bloqueosMongoDBQro = 0;
  consultasMongoDBQro = 0;
  conexionesMongoDBQro = 0;

  // Vertica

  arribaVerticaTlt = 0;
  arribaVerticaAzteca = 0;

  abajoVerticaTlt = 0;
  abajoVerticaAzteca = 0;

  bloqueosVerticaTlt = 0;
  bloqueosVerticaAzteca = 0;

  consultasVerticaTlt = 0;
  consultasVerticaAzteca = 0;

  conexionesVerticaTlt = 0;
  conexionesVerticaAzteca = 0;




  activeIndex: any = [];

  arrGrupos = [
    {
      groupid: 244,
      group: 'KIO-QUERETARO-ESXi'
    },
    {
      groupid: 245,
      group: 'KIO-TULTITLAN-ESXi'
    },
    {
      groupid: 246,
      group: 'KIO-TV-AZTECA-AJUSCO-ESXi'
    }
  ]

  constructor(
    private ref: ChangeDetectorRef,
    private api: ZabbixService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.getDatos();
  }

  async getDatos() {
    this.spinner.show();
    try {
      const authToken: string = await this.api.authenticate();

      //******************************** *****************************************//
      //***************************** QUERÉTARO **********************************//
      //******************************* *****************************************//

      const groupId: string = await this.api.getHostGroupId(authToken, 'KIO-QUERETARO-ESXi');

      //Total de equipos fisicos
      this.totalFisicosQro = await this.api.getTotalHostsInGroup(authToken, groupId);

      // Total de problemas fisicos
      this.problemasFisicosQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Unavailable by ICMP ping');
      console.log('Problemas fisicos:', this.problemasFisicosQro);
      this.valueFisicosQro = parseFloat((100 - ((this.problemasFisicosQro * 100) / this.totalFisicosQro)).toFixed(2));

      // Memoria
      this.totalMemoriaQro = await this.api.getTotalMemory(authToken, groupId);
      this.utilizadoMemoriaQro = await this.api.getUsedMemory(authToken, groupId);
      this.disponibleMemoriaQro = this.totalMemoriaQro - this.utilizadoMemoriaQro;
      this.totalMemoriaQro = this.formatBytes(this.totalMemoriaQro);
      this.utilizadoMemoriaQro = this.formatBytes(this.utilizadoMemoriaQro);
      this.disponibleMemoriaQro = this.formatBytes(this.disponibleMemoriaQro);

      // Disco
      this.totalDiscoQro = await this.api.getTotalDisk(authToken, groupId);
      this.disponibleDiscoQro = await this.api.getFreeDisk(authToken, groupId);
      this.utilizadoDiscoQro = this.totalDiscoQro - this.disponibleDiscoQro;
      this.totalDiscoQro = this.formatBytes(this.totalDiscoQro);
      this.disponibleDiscoQro = this.formatBytes(this.disponibleDiscoQro);
      this.utilizadoDiscoQro = this.formatBytes(this.utilizadoDiscoQro);

      //CPU
      this.totalCpuQro = await this.api.getTotalCpu(authToken, groupId);
      this.utilizadoCpuQro = await this.api.getUsedCpu(authToken, groupId);
      this.disponibleCpuQro = this.totalCpuQro - this.utilizadoCpuQro;
      this.totalCpuQro = parseInt(this.totalCpuQro);
      this.utilizadoCpuQro = parseInt(this.utilizadoCpuQro);
      this.disponibleCpuQro = parseInt(this.disponibleCpuQro);

      // Total de problemas CPU Físicos Qro
      this.problemasCpuQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Cpu less than');

      // Total de problemas Memoria Físicos Qro
      this.problemasMemoriaQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Available Memory is less than');

      // Total de problemas DD Físicos Qro
      this.problemasDiscoQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Free disk space is less than');


      // Total de virtuales
      let arr_virtualesQro = await this.api.getTotalVirtuales(authToken, groupId);
      console.log('Virtuales:', arr_virtualesQro.filter((virtual: any) => virtual.lastvalue != ''));
      this.totalVirtualesQro = arr_virtualesQro.filter((virtual: any) => virtual.lastvalue != '').length;

      // Tota de virtuales arriba
      let virtualesUpQro = arr_virtualesQro.filter((virtual: any) => virtual.lastvalue === 'running');
      // console.log('Lista Virtuales arriba:', virtualesUpQro);

      // Total de problemas virtuales
      let virtualesDownQro = arr_virtualesQro.filter((virtual: any) => virtual.lastvalue === 'not running');
      this.problemasVirtualesQro = virtualesDownQro.length;
      // console.log('Virtuales abajo:', this.problemasVirtualesQro);
      // console.log('Lista Virtuales abajo:', virtualesDownQro);

      let arr_so_qro = await this.api.getTotalVirtualesSO(authToken, groupId);

      console.log('SO:', arr_so_qro.filter((virtual: any) => virtual.lastvalue != ''));

      // Total Linux
      let virtualesLinuxQro = arr_so_qro.filter((virtual: any) => virtual.lastvalue.includes('Linux'));
      this.totalVirtualesLinuxQro = virtualesLinuxQro.length;
      // console.log('Virtuales Linux:', virtualesLinuxQro);

      // Total Windows
      let virtualesWindowsQro = arr_so_qro.filter((virtual: any) => virtual.lastvalue.includes('Windows'));
      this.totalVirtualesWindowsQro = virtualesWindowsQro.length;

      // console.log('Virtuales Windows:', virtualesWindowsQro);

      // Problemas Windows
      virtualesDownQro.forEach((element: any) => {
        virtualesWindowsQro.forEach((element2: any) => {
          if (element.name === element2.name) {
            this.problemasWindowsVirtualesQro++;
          }
        });
      });

      this.valueVirtualesWindowsQro = 100 - ((this.problemasWindowsVirtualesQro * 100) / this.totalVirtualesQro);

      // Problemas Linux
      virtualesDownQro.forEach((element: any) => {
        virtualesLinuxQro.forEach((element2: any) => {
          if (element.name === element2.name) {
            this.problemasLinuxVirtualesQro++;
          }
        });
      });

      this.valueVirtualesLinuxQro = 100 - ((this.problemasLinuxVirtualesQro * 100) / this.totalVirtualesQro);

      // Problemas Memoria Virtuales
      this.problemasMemoriaVirtualesQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Available Memory is less than');

      // Problemas Disco Virtuales
      this.problemasDiscoVirtualesQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Free disk space is less than');

      // Problemas CPU Virtuales
      this.problemasCpuVirtualesQro = await this.api.getHostsWithProblemsByGroup(authToken, groupId, 'Cpu less than');


      // MariaDB
      let arrMariaDBQro: any = await this.api.getTotalHostsInGroupBD(authToken, 'MARIADB-SRV', 'Sitio', 'Queretaro');
      this.arribaMariaDBQro = arrMariaDBQro.length;
      console.log('MariaDB arriba:', arrMariaDBQro);
      // Abajo MariaDB
      this.abajoMariaDBQro = 0;
      this.problemasBdQro = 0;
      arrMariaDBQro.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoMariaDBQro++;
          this.problemasBdQro++;
        }
      });
      // Bloqueos MariaDB
      this.bloqueosMariaDBQro = 0;
      arrMariaDBQro.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosMariaDBQro++;
          this.problemasBdQro++;
        }
      });
      // Consultas MariaDB
      this.consultasMariaDBQro = 0;
      arrMariaDBQro.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasMariaDBQro++;
          this.problemasBdQro++;
        }
      });
      // Conexiones MariaDB
      this.conexionesMariaDBQro = 0;
      arrMariaDBQro.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesMariaDBQro++;
          this.problemasBdQro++;
        }
      });


      // MongoDB
      let arrMongoDBQro: any = await this.api.getTotalHostsInGroupBD(authToken, 'MONGO-SRV', 'Sitio', 'Queretaro');
      this.arribaMongoDBQro = arrMongoDBQro.length;
      console.log('MongoDB arriba:', arrMongoDBQro);
      // Abajo MongoDB
      this.abajoMongoDBQro = 0;
      arrMongoDBQro.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Mongo service is down');
        if (abajo != '') {
          this.abajoMongoDBQro++;
          this.problemasBdQro++;
        }
      });
      // Bloqueos MongoDB
      this.bloqueosMongoDBQro = 0;
      arrMongoDBQro.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Mongo blocks');
        if (bloqueos != '') {
          this.bloqueosMongoDBQro++;
          this.problemasBdQro++;
        }
      });
      // Consultas MongoDB
      this.consultasMongoDBQro = 0;
      arrMongoDBQro.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasMongoDBQro++;
          this.problemasBdQro++;
        }
      });
      // Conexiones MongoDB
      this.conexionesMongoDBQro = 0;
      arrMongoDBQro.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesMongoDBQro++;
          this.problemasBdQro++;
        }
      });

      // MySQL
      let arrMySQLQro: any = await this.api.getTotalHostsInGroupBD(authToken, 'MYSQL-SRV', 'Sitio', 'Queretaro');
      this.arribaMySQLQro = arrMySQLQro.length;
      console.log('MySQL arriba:', arrMySQLQro);
      // Abajo MySQL
      this.abajoMySQLQro = 0;
      arrMySQLQro.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoMySQLQro++;
          this.problemasBdQro++;
        }
      });
      // Bloqueos MySQL
      this.bloqueosMySQLQro = 0;
      arrMySQLQro.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosMySQLQro++;
          this.problemasBdQro++;
        }
      });
      // Consultas MySQL
      this.consultasMySQLQro = 0;
      arrMySQLQro.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasMySQLQro++;
          this.problemasBdQro++;
        }
      });
      // Conexiones MySQL
      this.conexionesMySQLQro = 0;
      arrMySQLQro.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesMySQLQro++;
          this.problemasBdQro++;
        }
      });

      // SQL Server
      let arrSQLServerQro: any = await this.api.getTotalHostsInGroupBD(authToken, 'SQLSERVER-SRV', 'Sitio', 'Queretaro');
      this.arribaSQLServerQro = arrSQLServerQro.length;
      console.log('SQL Server arriba:', arrSQLServerQro);
      // Abajo SQL Server
      this.abajoSQLServerQro = 0;
      arrSQLServerQro.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoSQLServerQro++;
          this.problemasBdQro++;
        }
      });
      // Bloqueos SQL Server
      this.bloqueosSQLServerQro = 0;
      arrSQLServerQro.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosSQLServerQro++;
          this.problemasBdQro++;
        }
      });
      // Consultas SQL Server
      this.consultasSQLServerQro = 0;
      arrSQLServerQro.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasSQLServerQro++;
          this.problemasBdQro++;
        }
      });
      // Conexiones SQL Server
      this.conexionesSQLServerQro = 0;
      arrSQLServerQro.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesSQLServerQro++;
          this.problemasBdQro++;
        }
      });




      //******************************** *****************************************//
      //***************************** TULTITLAN **********************************//
      //******************************* *****************************************//

      const groupIdTlt: string = await this.api.getHostGroupId(authToken, 'KIO-TULTITLAN-ESXi');

      //Total de equipos fisicos
      this.totalFisicosTlt = await this.api.getTotalHostsInGroup(authToken, groupIdTlt);

      // Total de problemas fisicos
      this.problemasFisicosTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Unavailable by ICMP ping');
      console.log('Problemas fisicos:', this.problemasFisicosTlt);

      this.valueFisicosTlt = parseFloat((100 - ((this.problemasFisicosTlt * 100) / this.totalFisicosTlt)).toFixed(2));

      // Memoria
      this.totalMemoriaTlt = await this.api.getTotalMemory(authToken, groupIdTlt);
      this.utilizadoMemoriaTlt = await this.api.getUsedMemory(authToken, groupIdTlt);
      this.disponibleMemoriaTlt = this.totalMemoriaTlt - this.utilizadoMemoriaTlt;
      this.totalMemoriaTlt = this.formatBytes(this.totalMemoriaTlt);
      this.utilizadoMemoriaTlt = this.formatBytes(this.utilizadoMemoriaTlt);
      this.disponibleMemoriaTlt = this.formatBytes(this.disponibleMemoriaTlt);

      // Disco
      this.totalDiscoTlt = await this.api.getTotalDisk(authToken, groupIdTlt);
      this.disponibleDiscoTlt = await this.api.getFreeDisk(authToken, groupIdTlt);
      this.utilizadoDiscoTlt = this.totalDiscoTlt - this.disponibleDiscoTlt;
      this.totalDiscoTlt = this.formatBytes(this.totalDiscoTlt);
      this.disponibleDiscoTlt = this.formatBytes(this.disponibleDiscoTlt);
      this.utilizadoDiscoTlt = this.formatBytes(this.utilizadoDiscoTlt);

      //CPU
      this.totalCpuTlt = await this.api.getTotalCpu(authToken, groupIdTlt);
      this.utilizadoCpuTlt = await this.api.getUsedCpu(authToken, groupIdTlt);
      this.disponibleCpuTlt = this.totalCpuTlt - this.utilizadoCpuTlt;
      this.totalCpuTlt = parseInt(this.totalCpuTlt);
      this.utilizadoCpuTlt = parseInt(this.utilizadoCpuTlt);
      this.disponibleCpuTlt = parseInt(this.disponibleCpuTlt);

      // Total de problemas CPU Físicos Tlt
      this.problemasCpuTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Cpu less than');

      // Total de problemas Memoria Físicos Tlt
      this.problemasMemoriaTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Available Memory is less than');

      // Total de problemas DD Físicos Tlt
      this.problemasDiscoTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Free disk space is less than');


      // Total de virtuales
      let arr_virtualesTlt = await this.api.getTotalVirtuales(authToken, groupIdTlt);
      console.log('Virtuales Tultitlán:', arr_virtualesTlt.filter((virtual: any) => virtual.lastvalue != ''));
      this.totalVirtualesTlt = arr_virtualesTlt.filter((virtual: any) => virtual.lastvalue != '').length;

      // Tota de virtuales arriba
      let virtualesUpTlt = arr_virtualesTlt.filter((virtual: any) => virtual.lastvalue === 'running');
      // console.log('Lista Virtuales arriba:', virtualesUpQro);

      // Total de problemas virtuales
      let virtualesDownTlt = arr_virtualesTlt.filter((virtual: any) => virtual.lastvalue === 'not running');
      this.problemasVirtualesTlt = virtualesDownTlt.length;
      // console.log('Virtuales abajo:', this.problemasVirtualesTlt);
      // console.log('Lista Virtuales abajo:', virtualesDownTlt);

      let arr_so_Tlt = await this.api.getTotalVirtualesSO(authToken, groupIdTlt);

      // console.log('SO:', arr_so_Tlt.filter((virtual: any) => virtual.lastvalue != ''));

      // Total Linux
      let virtualesLinuxTlt = arr_so_Tlt.filter((virtual: any) => virtual.lastvalue.includes('Linux'));
      this.totalVirtualesLinuxTlt = virtualesLinuxTlt.length;
      console.log('Virtuales Linux Tultitlán:', virtualesLinuxTlt);

      // Total Windows
      let virtualesWindowsTlt = arr_so_Tlt.filter((virtual: any) => virtual.lastvalue.includes('Windows'));
      this.totalVirtualesWindowsTlt = virtualesWindowsTlt.length;

      console.log('Virtuales Windows Tultitlán:', virtualesWindowsTlt);

      // Problemas Windows
      virtualesDownTlt.forEach((element: any) => {
        virtualesWindowsTlt.forEach((element2: any) => {
          if (element.name === element2.name) {
            this.problemasWindowsVirtualesTlt++;
          }
        });
      });

      this.valueVirtualesWindowsTlt = 100 - ((this.problemasWindowsVirtualesTlt * 100) / this.totalVirtualesTlt);

      // Problemas Linux
      virtualesDownTlt.forEach((element: any) => {
        virtualesLinuxTlt.forEach((element2: any) => {
          if (element.name === element2.name) {
            this.problemasLinuxVirtualesTlt++;
          }
        });
      });

      this.valueVirtualesLinuxTlt = 100 - ((this.problemasLinuxVirtualesTlt * 100) / this.totalVirtualesTlt);

      // Problemas Memoria Virtuales
      this.problemasMemoriaVirtualesTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Available Memory is less than');

      console.log('Problemas Memoria Virtuales Tultitlán:', this.problemasMemoriaVirtualesTlt);

      // Problemas Disco Virtuales
      this.problemasDiscoVirtualesTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Free disk space is less than');

      console.log('Problemas Disco Virtuales Tultitlán:', this.problemasDiscoVirtualesTlt);

      // Problemas CPU Virtuales
      this.problemasCpuVirtualesTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Cpu less than');

      console.log('Problemas CPU Virtuales Tultitlán:', this.problemasCpuVirtualesTlt);




      // MariaDB
      let arrMariaDBTlt: any = await this.api.getTotalHostsInGroupBD(authToken, 'MARIADB-SRV', 'Sitio', 'Tultitlan');
      this.arribaMariaDBTlt = arrMariaDBTlt.length;
      // console.log('MariaDB arriba:', arrMariaDBTlt);
      // Abajo MariaDB
      this.abajoMariaDBTlt = 0;
      this.problemasBdTlt = 0;
      arrMariaDBTlt.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoMariaDBTlt++;
          this.problemasBdTlt++;
        }
      });
      // Bloqueos MariaDB
      this.bloqueosMariaDBTlt = 0;
      arrMariaDBTlt.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosMariaDBTlt++;
          this.problemasBdTlt++;
        }
      });
      // Consultas MariaDB
      this.consultasMariaDBTlt = 0;
      arrMariaDBTlt.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasMariaDBTlt++;
          this.problemasBdTlt++;
        }
      });
      // Conexiones MariaDB
      this.conexionesMariaDBTlt = 0;
      arrMariaDBTlt.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesMariaDBTlt++;
          this.problemasBdTlt++;
        }
      });

     // MySQL
     let arrMySQLTlt: any = await this.api.getTotalHostsInGroupBD(authToken, 'MYSQL-SRV', 'Sitio', 'Tultitlan');
     this.arribaMySQLTlt = arrMySQLTlt.length;
     console.log('MySQL arriba:', arrMySQLTlt);
     // Abajo MySQL
     this.abajoMySQLTlt = 0;
     arrMySQLTlt.forEach(async (element: any) => {
       let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
       if (abajo != '') {
         this.abajoMySQLTlt++;
         this.problemasBdTlt++;
       }
     });
     // Bloqueos MySQL
     this.bloqueosMySQLTlt = 0;
     arrMySQLTlt.forEach(async (element: any) => {
       let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
       if (bloqueos != '') {
         this.bloqueosMySQLTlt++;
         this.problemasBdTlt++;
       }
     });
     // Consultas MySQL
     this.consultasMySQLTlt = 0;
     arrMySQLTlt.forEach(async (element: any) => {
       let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
       if (consultas != '') {
         this.consultasMySQLTlt++;
         this.problemasBdTlt++;
       }
     });
     // Conexiones MySQL
     this.conexionesMySQLTlt = 0;
     arrMySQLTlt.forEach(async (element: any) => {
       let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
       if (conexiones != '') {
         this.conexionesMySQLTlt++;
         this.problemasBdTlt++;
       }
     });

     //Vertica
      let arrVerticaTlt: any = await this.api.getTotalHostsInGroupBD(authToken, 'VERTICA-SRV', 'Sitio', 'Tultitlan');
      this.arribaVerticaTlt = arrVerticaTlt.length;
      console.log('Vertica arriba:', arrVerticaTlt);
      // Abajo Vertica
      this.abajoVerticaTlt = 0;
      arrVerticaTlt.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoVerticaTlt++;
          this.problemasBdTlt++;
        }
      });
      // Bloqueos Vertica
      this.bloqueosVerticaTlt = 0;
      arrVerticaTlt.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosVerticaTlt++;
          this.problemasBdTlt++;
        }
      });
      // Consultas Vertica
      this.consultasVerticaTlt = 0;
      arrVerticaTlt.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasVerticaTlt++;
          this.problemasBdTlt++;
        }
      });
      // Conexiones Vertica
      this.conexionesVerticaTlt = 0;
      arrVerticaTlt.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesVerticaTlt++;
          this.problemasBdTlt++;
        }
      });



      //******************************** *****************************************//
      //******************************* AZTECA **********************************//
      //******************************* *****************************************//

      const groupIdAzteca: string = await this.api.getHostGroupId(authToken, 'KIO-TV-AZTECA-AJUSCO-ESXi');

      //Total de equipos fisicos
      this.totalFisicosAzteca = await this.api.getTotalHostsInGroup(authToken, groupIdAzteca);

      // Total de problemas fisicos
      this.problemasFisicosAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Unavailable by ICMP ping');
      console.log('Problemas fisicos:', this.problemasFisicosAzteca);

      this.valueFisicosAzteca = parseFloat((100 - ((this.problemasFisicosAzteca * 100) / this.totalFisicosAzteca)).toFixed(2));

      // Memoria
      this.totalMemoriaAzteca = await this.api.getTotalMemory(authToken, groupIdAzteca);
      this.utilizadoMemoriaAzteca = await this.api.getUsedMemory(authToken, groupIdAzteca);
      this.disponibleMemoriaAzteca = this.totalMemoriaAzteca - this.utilizadoMemoriaAzteca;
      this.totalMemoriaAzteca = this.formatBytes(this.totalMemoriaAzteca);
      this.utilizadoMemoriaAzteca = this.formatBytes(this.utilizadoMemoriaAzteca);
      this.disponibleMemoriaAzteca = this.formatBytes(this.disponibleMemoriaAzteca);

      // Disco
      this.totalDiscoAzteca = await this.api.getTotalDisk(authToken, groupIdAzteca);
      this.disponibleDiscoAzteca = await this.api.getFreeDisk(authToken, groupIdAzteca);
      this.utilizadoDiscoAzteca = this.totalDiscoAzteca - this.disponibleDiscoAzteca;
      this.totalDiscoAzteca = this.formatBytes(this.totalDiscoAzteca);
      this.disponibleDiscoAzteca = this.formatBytes(this.disponibleDiscoAzteca);
      this.utilizadoDiscoAzteca = this.formatBytes(this.utilizadoDiscoAzteca);

      //CPU
      this.totalCpuAzteca = await this.api.getTotalCpu(authToken, groupIdAzteca);
      this.utilizadoCpuAzteca = await this.api.getUsedCpu(authToken, groupIdAzteca);
      this.disponibleCpuAzteca = this.totalCpuAzteca - this.utilizadoCpuAzteca;
      this.totalCpuAzteca = parseInt(this.totalCpuAzteca);
      this.utilizadoCpuAzteca = parseInt(this.utilizadoCpuAzteca);
      this.disponibleCpuAzteca = parseInt(this.disponibleCpuAzteca);

      // Total de problemas CPU Físicos Azteca
      this.problemasCpuAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Cpu less than');

      // Total de problemas Memoria Físicos Azteca
      this.problemasMemoriaAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Available Memory is less than');

      // Total de problemas DD Físicos Azteca
      this.problemasDiscoAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Free disk space is less than');


     // Total de virtuales
     let arr_virtualesAzteca = await this.api.getTotalVirtuales(authToken, groupIdAzteca);
     console.log('Virtuales Azteca:', arr_virtualesAzteca.filter((virtual: any) => virtual.lastvalue != ''));
     this.totalVirtualesAzteca = arr_virtualesAzteca.filter((virtual: any) => virtual.lastvalue != '').length;

     // Tota de virtuales arriba
     let virtualesUpAzteca = arr_virtualesAzteca.filter((virtual: any) => virtual.lastvalue === 'running');
     console.log('Lista Virtuales arriba Azteca:', virtualesUpAzteca);

     // Total de problemas virtuales
     let virtualesDownAzteca = arr_virtualesAzteca.filter((virtual: any) => virtual.lastvalue === 'not running');
     this.problemasVirtualesAzteca = virtualesDownAzteca.length;
     console.log('Virtuales abajo Azteca:', this.problemasVirtualesAzteca);
     console.log('Lista Virtuales abajo Azteca:', virtualesDownAzteca);

     let arr_so_Azteca = await this.api.getTotalVirtualesSO(authToken, groupIdAzteca);

     console.log('SO Azteca:', arr_so_Azteca.filter((virtual: any) => virtual.lastvalue != ''));

     // Total Linux
     let virtualesLinuxAzteca = arr_so_Azteca.filter((virtual: any) => virtual.lastvalue.includes('Linux'));
     this.totalVirtualesLinuxAzteca = virtualesLinuxAzteca.length;
     console.log('Virtuales Linux Azteca:', virtualesLinuxAzteca);

     // Total Windows
     let virtualesWindowsAzteca = arr_so_Azteca.filter((virtual: any) => virtual.lastvalue.includes('Windows'));
     this.totalVirtualesWindowsAzteca = virtualesWindowsAzteca.length;

     console.log('Virtuales Windows Azteca:', virtualesWindowsAzteca);

     // Problemas Windows
     virtualesDownAzteca.forEach((element: any) => {
       virtualesWindowsAzteca.forEach((element2: any) => {
         if (element.name === element2.name) {
           this.problemasWindowsVirtualesAzteca++;
         }
       });
     });

     this.valueVirtualesWindowsAzteca = 100 - ((this.problemasWindowsVirtualesAzteca * 100) / this.totalVirtualesAzteca);

     // Problemas Linux
     virtualesDownAzteca.forEach((element: any) => {
       virtualesLinuxAzteca.forEach((element2: any) => {
         if (element.name === element2.name) {
           this.problemasLinuxVirtualesAzteca++;
         }
       });
     });

     this.valueVirtualesLinuxAzteca = 100 - ((this.problemasLinuxVirtualesAzteca * 100) / this.totalVirtualesAzteca);

      // Problemas Memoria Virtuales
      this.problemasMemoriaVirtualesAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Available Memory is less than');

      // Problemas Disco Virtuales
      this.problemasDiscoVirtualesAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Free disk space is less than');

      // Problemas CPU Virtuales
      this.problemasCpuVirtualesAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Cpu less than');


      // MariaDB
      let arrMariaDBAzteca: any = await this.api.getTotalHostsInGroupBD(authToken, 'MARIADB-SRV', 'Sitio', 'Tv Azteca Ajusco');
      this.arribaMariaDBAzteca = arrMariaDBAzteca.length;
      console.log('MariaDB arriba:', arrMariaDBAzteca);
      // Abajo MariaDB
      this.abajoMariaDBAzteca = 0;
      this.problemasBdAzteca = 0;
      arrMariaDBAzteca.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoMariaDBAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Bloqueos MariaDB
      this.bloqueosMariaDBAzteca = 0;
      arrMariaDBAzteca.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosMariaDBAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Consultas MariaDB
      this.consultasMariaDBAzteca = 0;
      arrMariaDBAzteca.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasMariaDBAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Conexiones MariaDB
      this.conexionesMariaDBAzteca = 0;
      arrMariaDBAzteca.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesMariaDBAzteca++;
          this.problemasBdAzteca++;
        }
      });

      // PostgreSQL
      let arrPostgreSQLAzteca: any = await this.api.getTotalHostsInGroupBD(authToken, 'SRV-POSTGRESQL', 'Sitio', 'Tv Azteca Ajusco');
      this.arribaPostgreSQLAzteca = arrPostgreSQLAzteca.length;
      console.log('PostgreSQL arriba:', arrPostgreSQLAzteca);
      // Abajo PostgreSQL
      this.abajoPostgreSQLAzteca = 0;
      this.problemasBdAzteca = 0;
      arrPostgreSQLAzteca.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Postgresql service is down');
        if (abajo != '') {
          this.abajoPostgreSQLAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Bloqueos PostgreSQL
      this.bloqueosPostgreSQLAzteca = 0;
      arrPostgreSQLAzteca.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosPostgreSQLAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Consultas PostgreSQL
      this.consultasPostgreSQLAzteca = 0;
      arrPostgreSQLAzteca.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasPostgreSQLAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Conexiones PostgreSQL
      this.conexionesPostgreSQLAzteca = 0;
      arrPostgreSQLAzteca.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesPostgreSQLAzteca++;
          this.problemasBdAzteca++;
        }
      });

      // SQL Server
      let arrSQLServerAzteca: any = await this.api.getTotalHostsInGroupBD(authToken, 'SQLSERVER-SRV', 'Sitio', 'Tv Azteca Ajusco');
      this.arribaSQLServerAzteca = arrSQLServerAzteca.length;
      console.log('SQL Server arriba:', arrSQLServerAzteca);
      // Abajo SQL Server
      this.abajoSQLServerAzteca = 0;
      this.problemasBdAzteca = 0;
      arrSQLServerAzteca.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoSQLServerAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Bloqueos SQL Server
      this.bloqueosSQLServerAzteca = 0;
      arrSQLServerAzteca.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosSQLServerAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Consultas SQL Server
      this.consultasSQLServerAzteca = 0;
      arrSQLServerAzteca.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasSQLServerAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Conexiones SQL Server
      this.conexionesSQLServerAzteca = 0;
      arrSQLServerAzteca.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesSQLServerAzteca++;
          this.problemasBdAzteca++;
        }
      });

      // MySQL
      let arrMySQLAzteca: any = await this.api.getTotalHostsInGroupBD(authToken, 'MYSQL-SRV', 'Sitio', 'Tv Azteca Ajusco');
      this.arribaMySQLAzteca = arrMySQLAzteca.length;
      console.log('MySQL arriba:', arrMySQLAzteca);
      // Abajo MySQL
      this.abajoMySQLAzteca = 0;
      arrMySQLAzteca.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoMySQLAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Bloqueos MySQL
      this.bloqueosMySQLAzteca = 0;
      arrMySQLAzteca.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosMySQLAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Consultas MySQL
      this.consultasMySQLAzteca = 0;
      arrMySQLAzteca.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasMySQLAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Conexiones MySQL
      this.conexionesMySQLAzteca = 0;
      arrMySQLAzteca.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesMySQLAzteca++;
          this.problemasBdAzteca++;
        }
      });

      // Vertica
      let arrVerticaAzteca: any = await this.api.getTotalHostsInGroupBD(authToken, 'VERTICA-SRV', 'Sitio', 'Tv Azteca Ajusco');
      this.arribaVerticaAzteca = arrVerticaAzteca.length;
      console.log('Vertica arriba:', arrVerticaAzteca);
      // Abajo Vertica
      this.abajoVerticaAzteca = 0;
      arrVerticaAzteca.forEach(async (element: any) => {
        let abajo: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database is down');
        if (abajo != '') {
          this.abajoVerticaAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Bloqueos Vertica
      this.bloqueosVerticaAzteca = 0;
      arrVerticaAzteca.forEach(async (element: any) => {
        let bloqueos: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Database blocks');
        if (bloqueos != '') {
          this.bloqueosVerticaAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Consultas Vertica
      this.consultasVerticaAzteca = 0;
      arrVerticaAzteca.forEach(async (element: any) => {
        let consultas: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Querys');
        if (consultas != '') {
          this.consultasVerticaAzteca++;
          this.problemasBdAzteca++;
        }
      });
      // Conexiones Vertica
      this.conexionesVerticaAzteca = 0;
      arrVerticaAzteca.forEach(async (element: any) => {
        let conexiones: any = await this.api.getHostsWithProblems(authToken, element.hostid, 'Conexiones');
        if (conexiones != '') {
          this.conexionesVerticaAzteca++;
          this.problemasBdAzteca++;
        }
      });






      this.spinner.hide();

      setTimeout(() => {                           // <<<---using ()=> syntax
        this.getDatos();
        this.fechaHora = new Date().toLocaleString();
      }, 300000);


    } catch (error) {
      console.error('Error:', error);
      this.spinner.hide();
    }
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  activeIndexChange(index: any) {
    console.log(index)
    this.activeIndex = index;
  }

  getActiveAccordion(index: any) {
    if (this.activeIndex.includes(index)) {
      return true;
    } else {
      return false;
    }
  }

  openModalFisicos(tipo: any, grupo: any, sitio: any) {
    console.log(tipo, grupo);
    const modalFisicos = this.modalService.open(ModalServidoresFisicosComponent, {
      size: "xl",
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });

    modalFisicos.componentInstance.Tipo = tipo;
    modalFisicos.componentInstance.Grupo = grupo;
    modalFisicos.componentInstance.Sitio = sitio;

    if (sitio == 'QUERÉTARO') {
      modalFisicos.componentInstance.totalFisicos = this.totalFisicosQro;
      modalFisicos.componentInstance.problemasFisicos = this.problemasFisicosQro;
    } else if (sitio == 'TULTITLÁN') {
      modalFisicos.componentInstance.totalFisicos = this.totalFisicosTlt;
      modalFisicos.componentInstance.problemasFisicos = this.problemasFisicosTlt;
    } else if (sitio == 'TV AZTECA AJUSCO') {
      modalFisicos.componentInstance.totalFisicos = this.totalFisicosAzteca;
      modalFisicos.componentInstance.problemasFisicos = this.problemasFisicosAzteca;
    }


  }

  openModalCpu(tipo: any, grupo: any, sitio: any) {
    console.log(tipo, grupo);
    const modal = this.modalService.open(ModalCpuComponent, {
      size: "xl",
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });

    modal.componentInstance.Tipo = tipo;
    modal.componentInstance.Grupo = grupo;
    modal.componentInstance.Sitio = sitio;

    if (sitio == 'QUERÉTARO') {
      modal.componentInstance.totalCpu = this.totalCpuQro;
      modal.componentInstance.disponibleCpu = this.disponibleCpuQro;
      modal.componentInstance.utilizadoCpu = this.utilizadoCpuQro;
    } else if (sitio == 'TULTITLÁN') {
      modal.componentInstance.totalCpu = this.totalCpuTlt;
      modal.componentInstance.disponibleCpu = this.disponibleCpuTlt;
      modal.componentInstance.utilizadoCpu = this.utilizadoCpuTlt;

    } else if (sitio == 'TV AZTECA AJUSCO') {
      modal.componentInstance.totalCpu = this.totalCpuAzteca;
      modal.componentInstance.disponibleCpu = this.disponibleCpuAzteca;
      modal.componentInstance.utilizadoCpu = this.utilizadoCpuAzteca;
    }
  }

  openModalMemoria(tipo: any, grupo: any, sitio: any) {
    console.log(tipo, grupo);
    const modal = this.modalService.open(ModalMemoriaComponent, {
      size: "xl",
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });

    modal.componentInstance.Tipo = tipo;
    modal.componentInstance.Grupo = grupo;
    modal.componentInstance.Sitio = sitio;

    if (sitio == 'QUERÉTARO') {
      modal.componentInstance.totalMemoria = this.totalMemoriaQro;
      modal.componentInstance.disponibleMemoria = this.disponibleMemoriaQro;
      modal.componentInstance.utilizadoMemoria = this.utilizadoMemoriaQro;
    } else if (sitio == 'TULTITLÁN') {
      modal.componentInstance.totalMemoria = this.totalMemoriaTlt;
      modal.componentInstance.disponibleMemoria = this.disponibleMemoriaTlt;
      modal.componentInstance.utilizadoMemoria = this.utilizadoMemoriaTlt;

    } else if (sitio == 'TV AZTECA AJUSCO') {
      modal.componentInstance.totalMemoria = this.totalMemoriaAzteca;
      modal.componentInstance.disponibleMemoria = this.disponibleMemoriaAzteca;
      modal.componentInstance.utilizadoMemoria = this.utilizadoMemoriaAzteca;
    }
  }

  openModalDisco(tipo: any, grupo: any, sitio: any) {
    const modal = this.modalService.open(ModalDiscoComponent, {
      size: "xl",
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });

    modal.componentInstance.Tipo = tipo;
    modal.componentInstance.Grupo = grupo;
    modal.componentInstance.Sitio = sitio;

    if (sitio == 'QUERÉTARO') {
      modal.componentInstance.totalDisco = this.totalDiscoQro;
      modal.componentInstance.disponibleDisco = this.disponibleDiscoQro;
      modal.componentInstance.utilizadoDisco = this.utilizadoDiscoQro;
    } else if (sitio == 'TULTITLÁN') {
      modal.componentInstance.totalDisco = this.totalDiscoTlt;
      modal.componentInstance.disponibleDisco = this.disponibleDiscoTlt;
      modal.componentInstance.utilizadoDisco = this.utilizadoDiscoTlt;

    } else if (sitio == 'TV AZTECA AJUSCO') {
      modal.componentInstance.totalDisco = this.totalDiscoAzteca;
      modal.componentInstance.disponibleDisco = this.disponibleDiscoAzteca;
      modal.componentInstance.utilizadoDisco = this.utilizadoDiscoAzteca;
    }
  }

  openModalVirtuales(tipo: any, grupo: any, sitio: any, so: any) {
    console.log(tipo, grupo);
    const modal = this.modalService.open(ModalServidoresVirtualesComponent, {
      size: "xl",
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });

    modal.componentInstance.Tipo = tipo;
    modal.componentInstance.Grupo = grupo;
    modal.componentInstance.Sitio = sitio;
    modal.componentInstance.so = so;

    if (sitio == 'QUERÉTARO') {
      if (so == 'Windows') {
        modal.componentInstance.totalVirtuales = this.totalVirtualesWindowsQro;
        modal.componentInstance.problemasVirtuales = this.problemasWindowsVirtualesQro;
      } else if(so == 'Linux') {
        modal.componentInstance.totalVirtuales = this.totalVirtualesLinuxQro;
        modal.componentInstance.problemasVirtuales = this.problemasLinuxVirtualesQro;
      }
    } else if (sitio == 'TULTITLÁN') {
      if (so == 'Windows') {
        modal.componentInstance.totalVirtuales = this.totalVirtualesWindowsTlt;
        modal.componentInstance.problemasVirtuales = this.problemasWindowsVirtualesAzteca;
      } else if(so == 'Linux') {
        modal.componentInstance.totalVirtuales = this.totalVirtualesLinuxTlt;
        modal.componentInstance.problemasVirtuales = this.problemasLinuxVirtualesAzteca;
      }
    } else if (sitio == 'TV AZTECA AJUSCO') {
      if (so == 'Windows') {
        modal.componentInstance.totalVirtuales = this.totalVirtualesWindowsAzteca;
        modal.componentInstance.problemasVirtuales = this.problemasWindowsVirtualesAzteca;
      } else if(so == 'Linux') {
        modal.componentInstance.totalVirtuales = this.totalVirtualesLinuxAzteca;
        modal.componentInstance.problemasVirtuales = this.problemasLinuxVirtualesAzteca;
      }
    }
  }

  openModalBD(tipo: any, grupo: any, sitio: any, tag: any){
    const modal = this.modalService.open(ModalBdComponent, {
      size: "xl",
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });

    modal.componentInstance.Tipo = tipo;
    modal.componentInstance.Grupo = grupo;
    modal.componentInstance.Sitio = sitio;
    modal.componentInstance.tag = tag;

    if (sitio == 'QUERÉTARO') {
      modal.componentInstance.bd = ['MARIADB-SRV', 'MYSQL-SRV', 'SQLSERVER-SRV'];
      modal.componentInstance.arribaMariaDB = this.arribaMariaDBQro;
      modal.componentInstance.abajoMariaDB = this.abajoMariaDBQro;
      modal.componentInstance.arribaMySQL = this.arribaMySQLQro;
      modal.componentInstance.abajoMySQL = this.abajoMySQLQro;
      modal.componentInstance.arribaSQLServer = this.arribaSQLServerQro;
      modal.componentInstance.abajoSQLServer = this.abajoSQLServerQro;
    } else if (sitio == 'TULTITLÁN') {
      modal.componentInstance.bd = ['MARIADB-SRV', 'MYSQL-SRV', 'VERTICA-SRV'];
      modal.componentInstance.arribaMariaDB = this.arribaMariaDBTlt;
      modal.componentInstance.abajoMariaDB = this.abajoMariaDBTlt;
      modal.componentInstance.arribaMySQL = this.arribaMySQLTlt;
      modal.componentInstance.abajoMySQL = this.abajoMySQLTlt;
      modal.componentInstance.arribaVertica = this.arribaVerticaTlt;
      modal.componentInstance.abajoVertica = this.abajoVerticaTlt;
    } else if (sitio == 'TV AZTECA AJUSCO') {
      modal.componentInstance.bd = ['MARIADB-SRV', 'MYSQL-SRV', 'SRV-POSTGRESQL', 'SQLSERVER-SRV', 'VERTICA-SRV'];
      modal.componentInstance.arribaMariaDB = this.arribaMariaDBAzteca;
      modal.componentInstance.abajoMariaDB = this.abajoMariaDBAzteca;
      modal.componentInstance.arribaMySQL = this.arribaMySQLAzteca;
      modal.componentInstance.abajoMySQL = this.abajoMySQLAzteca;
      modal.componentInstance.arribaPostgreSQL = this.arribaPostgreSQLAzteca;
      modal.componentInstance.abajoPostgreSQL = this.abajoPostgreSQLAzteca;
      modal.componentInstance.arribaSQLServer = this.arribaSQLServerAzteca;
      modal.componentInstance.abajoSQLServer = this.abajoSQLServerAzteca;
      modal.componentInstance.arribaVertica = this.arribaVerticaAzteca;
      modal.componentInstance.abajoVertica = this.abajoVerticaAzteca;
    }
  }

}
