import { Injectable } from '@angular/core';
import { ProcesseProviderService } from '../processe-provider.service';
import { Tarmeez } from 'src/app/enum/ELookup';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any;

  constructor(private processe: ProcesseProviderService) {}
  async getElookupItemGroup() {
    let ElookupItemGroup: { Name: string; Id: string }[] = [];
    let ElookupCurrency: { Name: string; Id: string }[] = [];
    let ElookupTarmeez: { Name: string; ItemNo: number }[] = [];
    await this.processe
      .getListAsString('api/ItemGroupApi/GetAll')
      .then((res) => {
        ElookupItemGroup = res.map((element) => ({
          Name: element.Name,
          Id: element.Id,
        }));
      });
    const currencyData = await this.processe.getListAsString(
      'api/CurrencyApi/GetAll'
    );
    ElookupCurrency = currencyData.map((item) => ({
      Name: item.Name,
      Id: item.Id,
    }));
    const tarmeezData = await this.processe.getByRequireList(
      'api/TarmeezApi/GetTarmeezByGroupAndRequireList',
      Tarmeez
    );
   ElookupTarmeez = tarmeezData.map((item) => ({
      Name: item.Name,
      ItemNo: item.ItemNo,
    }));
    
    this.setData({
      ItemGroup: ElookupItemGroup,
      Currency: ElookupCurrency,
      Tarmeez: ElookupTarmeez,
    })
  }
  async getElookupItem() {
    let ElookupItemGroup: { Name: string; Id: string }[] = [];
    let ELookupUnitName: { Name: string }[] = [];
    
    const itemGroupData = await this.processe.getListAsString(
      'api/ItemGroupApi/GetAll'
    );
    ElookupItemGroup = itemGroupData.map((element) => ({
      Name: element.Name,
      Id: element.Id,
      
    }));
    const unitNameData = await this.processe.getListAsString(
      'api/ItemUnitApi/GetAllUnitName'
    );
    ELookupUnitName = unitNameData.map((element) => ({
      Name: element.Name,
    }));
    this.setData({
      ItemGroup: ElookupItemGroup,
      UnitName: ELookupUnitName,
    })
    


  }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    const temp = this.data;
    return temp;
  }
}
