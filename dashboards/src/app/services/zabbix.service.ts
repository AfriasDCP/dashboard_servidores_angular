import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";

import { map, catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class ZabbixService {

  private url = "http://10.71.35.164/zabbix/api_jsonrpc.php";

  constructor(private _http: HttpClient) { }

  generarToken() {
    let obj = {
      jsonrpc: "2.0",
      method: "user.login",
      params: {
        username: "GRAFANAUSER",
        password: "Z4bbGR4F4N2k23#",
      },
      id: 1,
      auth: null,
    };
    return this._http.post(this.url, obj, httpOptions).pipe(
      map((data) => data),
      catchError((e) => throwError(e))
    );
  }

  getItem(token_send: any, groupid: any, item: any) {
    let obj = {
      "jsonrpc": "2.0",
      "method": "item.get",
      "params": {
        "output": ["itemid", "name", "units"],
        "groupid": groupid,
        "selectHosts": ["hostid", "host"],
        "search": {
          "name": item
        },
        "sortfield": "itemid"
      },
      "auth": token_send,
      "id": 1
    };
    return this._http.post(this.url, obj, httpOptions).pipe(
      map((data) => data),
      catchError((e) => throwError(e))
    );

  }

  updateHost(
    hostId: any,
    visibleName: any,
    groupId: any,
    templateId: any,
    proxyId: any,
    tagMHValor: any,
    tagContenedorValor: any,
    tagSubcontenedorValor: any,
    tagCompletoValor: any,
    token_send: any,
  ) {
    let obj = {};

    let temp = [];
    let arrGroups = [];
    let arr_details = {};

    // Templates
    // if(typeof templateId == 'number') {
    //   temp.push({
    //     templateid: templateId
    //   });
    // } else {
    //   let arrayDeCadenas = templateId.split(',');
    //   for (var i=0; i < arrayDeCadenas.length; i++) {
    //     temp.push({
    //       templateid: arrayDeCadenas[i].trim()
    //     });
    //   }
    // }

    // if(typeof groupId == 'number') {
    //   arrGroups.push({
    //     groupid: groupId
    //   });
    // } else {
    //   let arrayDeCadenas = groupId.split(',');
    //   for (var i=0; i < arrayDeCadenas.length; i++) {
    //     arrGroups.push({
    //       groupid: arrayDeCadenas[i].trim()
    //     });
    //   }
    // }

    // Groups



    obj = {
      jsonrpc: "2.0",
      method: "host.update",
      params: {
        hostid: hostId,
        // groups: [
        //   {
        //     groupid: groupId,
        //   },
        // ],
        tags: [
          {
            tag: 'MH',
            value: tagMHValor,
          },
          {
            tag: 'Contenedor',
            value: tagContenedorValor,
          },
          {
            tag: 'Subcontenedor',
            value: tagSubcontenedorValor,
          },
          {
            tag: 'Contenedor:Subcontenedor:Cliente',
            value: tagCompletoValor,
          },
        ],
        // proxy_hostid: proxyId,
        // templates: temp,
        // inventory_mode: 1,
      },
      auth: token_send,
      id: 1,
    };


    console.log(obj);
    return this._http.post(this.url, obj, httpOptions).pipe(
      map((data) => data),
      catchError((e) => throwError(e))
    );
  }

  // Función para autenticarse en Zabbix
  async authenticate(): Promise<string> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'user.login',
        params: {
          username: 'GRAFANAUSER',
          password: 'Z4bbGR4F4N2k23#'
        },
        id: 1
      })
    });
    const data = await response.json();
    return data.result;
  }

  // Función para obtener el ID del grupo de hosts
  async getHostGroupId(authToken: string, groupName: string): Promise<string> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'hostgroup.get',
        params: {
          output: ['groupid', 'name'],
          filter: {
            name: groupName
          },
        },
        auth: authToken,
        id: 2
      })
    });
    const data = await response.json();
    return data.result[0].groupid;
  }

  // Función para obtener el ID del grupo de hosts
  async getHostsByGroup(authToken: string, groupId: string): Promise<string> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
          output: ['hostid', 'name'],
          selectInterfaces: ['interfaceid', 'ip'],
          groupids: groupId,
          selectInventory: ["os_full"],
        },
        auth: authToken,
        id: 2
      })
    });
    const data = await response.json();
    return data.result;
  }

  // Función para obtener el total de memoria del grupo de hosts
  async getTotalMemory(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ['lastvalue'],
          search: {
            name: 'Total Memory'
          },
          groupids: groupId,
          sortfield: 'name',
        },
        auth: authToken,
        id: 3
      })
    });
    const data = await response.json();
    let totalMemory: number = 0;
    data.result.forEach((item: { lastvalue: string }) => {
      totalMemory += parseFloat(item.lastvalue);
    });
    return totalMemory;
  }

  // Función para obtener el total de memoria usada del grupo de hosts
  async getUsedMemory(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ['lastvalue'],
          search: {
            name: 'Memory Used'
          },
          groupids: groupId,
          sortfield: 'name',
        },
        auth: authToken,
        id: 4
      })
    });
    const data = await response.json();
    let totalMemory: number = 0;
    data.result.forEach((item: { lastvalue: string }) => {
      totalMemory += parseFloat(item.lastvalue);
    });
    return totalMemory;
  }

  // Función para obtener el total de DD del grupo de hosts
  async getTotalDisk(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ['lastvalue'],
          search: {
            name: 'Total size of VMFS'
          },
          groupids: groupId,
          sortfield: 'name',
        },
        auth: authToken,
        id: 5
      })
    });
    const data = await response.json();
    let totalDisk: number = 0;
    data.result.forEach((item: { lastvalue: string }) => {
      totalDisk += parseFloat(item.lastvalue);
    });
    return totalDisk;
  }

  // Función para obtener el total disponible de DD del grupo de hosts
  async getFreeDisk(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ['lastvalue'],
          search: {
            name: 'Free Space on VMFS'
          },
          groupids: groupId,
          sortfield: 'name',
        },
        auth: authToken,
        id: 6
      })
    });
    const data = await response.json();
    let totalDisk: number = 0;
    data.result.forEach((item: { lastvalue: string }) => {
      totalDisk += parseFloat(item.lastvalue);
    });
    return totalDisk;
  }

  // Función para obtener el total de CPU del grupo de hosts
  async getTotalCpu(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ['lastvalue'],
          search: {
            name: 'Total CPU'
          },
          groupids: groupId,
          sortfield: 'name',
        },
        auth: authToken,
        id: 4
      })
    });
    const data = await response.json();
    let totalDisk: number = 0;
    data.result.forEach((item: { lastvalue: string }) => {
      totalDisk += parseFloat(item.lastvalue);
    });
    return totalDisk;
  }

  // Función para obtener el total de CPU usado del grupo de hosts
  async getUsedCpu(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ['lastvalue'],
          search: {
            name: 'Uso CPU'
          },
          groupids: groupId,
          sortfield: 'name',
        },
        auth: authToken,
        id: 7
      })
    });
    const data = await response.json();
    let totalDisk: number = 0;
    data.result.forEach((item: { lastvalue: string }) => {
      totalDisk += parseFloat(item.lastvalue);
    });
    return totalDisk;
  }

  // Función para obtener el total de equipos en un grupo
  async getTotalHostsInGroup(authToken: string, groupId: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
          output: 'extend',
          groupids: groupId,
          limit: 1,
          countOutput: true,
        },
        auth: authToken,
        id: 8
      })
    });
    const data = await response.json();
    return data.result;
  }

    // Función para obtener el total de equipos en un grupo
    async getHost(authToken: string, hostId: string): Promise<number> {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'host.get',
          params: {
            output: 'extend',
            hostids: hostId
          },
          auth: authToken,
          id: 8
        })
      });
      const data = await response.json();
      return data.result[0];
    }


  // Función para obtener el total de Virtuales del grupo de hosts
  async getTotalVirtuales(authToken: string, groupId: string): Promise<any> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          output: ["hostid", "lastvalue", "name", "host"],
          search: {
            name: "VM Guest State"
          },
          groupids: groupId,
          searchByAny: true
        },
        auth: authToken,
        id: 10
      })
    });
    const data = await response.json();

    return data.result;
  }

    // Función para obtener el total de Virtuales  del grupo de hosts
    async getTotalVirtualesSO(authToken: string, groupId: any): Promise<any> {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'item.get',
          params: {
            output:  ["hostid", "lastvalue", "name", "host"],
            search: {
              name: "VM Guest OS"
            },
            groupids: groupId,
            searchByAny: true
          },
          auth: authToken,
          id: 10
        })
      });
      const data = await response.json();

      return data.result;
    }

  // Función para obtener el total de equipos en un grupo BD
  async getTotalHostsInGroupBD(authToken: string, hostName: string, key: string, value: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
          output: 'extend',
          // selectTags: 'extend',
          tags: [{ "tag": key, "value": value}],
          search: {
            name: hostName,
          }
        },
        auth: authToken,
        id: 11
      })
    });
    const data = await response.json();
    return data.result;
  }

  public async checkItem(authToken: string, hostId: string, item: string): Promise<any> {

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          hostids: hostId,
          output: ["hostid", "lastvalue", "name"],
          search: {
            name: item,
          },
          sortfield: 'name',
        },
        auth: authToken,
        id: 11
      })
    });
    const data = await response.json();
    // const itemId = data.result[0].lastvalue;

    // const lastValue = await this.zabbixApi('history.get', {
    //   history: 3, // Tipo 3 para valores de flotante (trapper, simple checks)
    //   itemids: itemId,
    //   sortfield: 'clock',
    //   sortorder: 'DESC',
    //   limit: 1,
    // });
    console.log(data);
    return data.result.length > 0 ? data.result[0].lastvalue: 0;
  }

  public async checkItemAllData(authToken: string, hostId: string, item: string): Promise<any> {

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.get',
        params: {
          hostids: hostId,
          output: "extend",
          search: {
            name: item,
          },
          sortfield: 'name',
        selectHosts: ["hostid", "host"],
        },
        auth: authToken,
        id: 11
      })
    });
    const data = await response.json();
    return data.result;
  }

  // Función para obtener el número de hosts con problemas en un grupo
  async getHostsWithProblemsByGroup(authToken: string, groupId: string, description: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'trigger.get',
        params: {
          output: ['triggerid'],
          groupids: groupId,
          expandDescription: true,
          filter: {
            value: 1 // Problemas activos
          },
          search: {
            description: description // Descripción del problema de ICMP
          },
          limit: 1,
          countOutput: true,
        },
        auth: authToken,
        id: 9
      })
    });
    const data = await response.json();
    return data.result;
  }

  // Función para obtener el número de hosts con problemas en un grupo
  async getHostsWithProblems(authToken: string, hostId: string, description: string): Promise<number> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'trigger.get',
        params: {
          output: 'extend',
          expandDescription: true,
          hostids: hostId,
          filter: {
            value: 1 // Problemas activos
          },
          search: {
            description: description // Descripción del problema de ICMP
          },
          sortfield: "priority",
          sortorder: "DESC"
        },
        auth: authToken,
        id: 9
      })
    });
    const data = await response.json();
    return data.result.length > 0 ? data.result[0].description : '';
  }

}
