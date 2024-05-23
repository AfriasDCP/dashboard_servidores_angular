import { map } from 'rxjs/operators';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ZabbixService } from './services/zabbix.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalServidoresFisicosComponent } from './modals/modal-servidores-fisicos/modal-servidores-fisicos.component';
import { ModalCpuComponent } from './modals/modal-cpu/modal-cpu.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalMemoriaComponent } from './modals/modal-memoria/modal-memoria.component';
import { ModalDiscoComponent } from './modals/modal-disco/modal-disco.component';


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
      this.valueFisicosQro = 100 - ((this.problemasFisicosQro * 100) / this.totalFisicosQro);

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


      // // Total de virtuales
      // let arr_virtualesQro = await this.api.getTotalVirtuales(authToken, groupId);

      // // Obtengo el total de registros con el estado 'running' para obtener el total de virtuales
      // let virtualesLinuxQro = arr_virtualesQro.filter((virtual: any) => virtual.lastvalue.includes('Linux'));
      // this.totalVirtualesLinuxQro = virtualesLinuxQro.length;

      // // Total de problemas virtuales
      // let virtualesDownQro = arr_virtualesQro.filter((virtual: any) => virtual.lastvalue === 'not running');
      // this.problemasVirtualesQro = virtualesDownQro.length;


      // MariaDB

      this.arribaMariaDBQro = await this.api.getTotalHostsInGroupBD(authToken, 'MARIADB-SRV', 'Sitio', 'Queretaro');

      // MongoDB
      this.arribaMongoDBQro = await this.api.getTotalHostsInGroupBD(authToken, 'MONGO-SRV', 'Sitio', 'Queretaro');

      // MySQL
      this.arribaMySQLQro = await this.api.getTotalHostsInGroupBD(authToken, 'MYSQL-SRV', 'Sitio', 'Queretaro');

      // SQL Server
      this.arribaSQLServerQro = await this.api.getTotalHostsInGroupBD(authToken, 'SQLSERVER-SRV', 'Sitio', 'Queretaro');



      //******************************** *****************************************//
      //***************************** TULTITLAN **********************************//
      //******************************* *****************************************//

      const groupIdTlt: string = await this.api.getHostGroupId(authToken, 'KIO-TULTITLAN-ESXi');

      //Total de equipos fisicos
      this.totalFisicosTlt = await this.api.getTotalHostsInGroup(authToken, groupIdTlt);

      // Total de problemas fisicos
      this.problemasFisicosTlt = await this.api.getHostsWithProblemsByGroup(authToken, groupIdTlt, 'Unavailable by ICMP ping');
      console.log('Problemas fisicos:', this.problemasFisicosTlt);

      this.valueFisicosTlt = 100 - ((this.problemasFisicosTlt * 100) / this.totalFisicosTlt);

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



      //******************************** *****************************************//
      //******************************* AZTECA **********************************//
      //******************************* *****************************************//

      const groupIdAzteca: string = await this.api.getHostGroupId(authToken, 'KIO-TV-AZTECA-AJUSCO-ESXi');

      //Total de equipos fisicos
      this.totalFisicosAzteca = await this.api.getTotalHostsInGroup(authToken, groupIdAzteca);

      // Total de problemas fisicos
      this.problemasFisicosAzteca = await this.api.getHostsWithProblemsByGroup(authToken, groupIdAzteca, 'Unavailable by ICMP ping');
      console.log('Problemas fisicos:', this.problemasFisicosAzteca);

      this.valueFisicosAzteca = 100 - ((this.problemasFisicosAzteca * 100) / this.totalFisicosAzteca);

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


      this.spinner.hide();

      setTimeout(()=>{                           // <<<---using ()=> syntax
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

  openModalCpu (tipo: any, grupo: any, sitio: any) {
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

  openModalMemoria (tipo: any, grupo: any, sitio: any) {
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

}
