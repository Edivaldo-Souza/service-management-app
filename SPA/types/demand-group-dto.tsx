import CustomerDto from "./customer-dto";

export default interface DemandGroupDto {
  id: number,
  customer: CustomerDto,
  value: number,
  reducedValue: number,
  created: string,
}