export interface ItemGroupModel {
    Id: string;
    NavigationTypeId: number;
    IdCol: string;
    OrderBy: string;
    IntId: string;
    Name: string;
    ExpDay: number;
    ExpMonth: number;
    ExpYear: number;
    IsNotifyExp: boolean;
    IsExpire: boolean;
    AllowNeg: boolean;
    CostLessSale: boolean;
    UseVat: boolean;
    IsTaxIncluded: boolean;
    ImageLink: string;
    Sort: number;
    ParentId: string;
    LoginId: number;
    SearchText: string;
    EnteredBranchId: number;
    StoreCurrencyId: number;
    OldId: string;
    AvgCostAtCurrentVal: boolean;
    VatTypeId: number;
    UseVatPrecent100: boolean;
    VatTypeIdPrecent100: number;
    GroupDefaultPrinter: string;
    AllowNegForAllItemGroup: boolean;
    BranchId: number;
    IsScale: boolean;
    IsScaleForAllItem: boolean;
  }
  