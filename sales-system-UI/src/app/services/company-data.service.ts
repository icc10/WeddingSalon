import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { companyData } from '../entities/companyData';
import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl);
  }

  getCompanyByName(name: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-name/"+name);
  }

  getCompanyByEmail(email: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-email/"+email);
  }

  getCompanyByFirstName(firstName: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-firstName/"+firstName);
  }

  getCompanyByLastName(lastName: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-lastName/"+lastName);
  }
  getCompanyByRep(rep: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-rep/"+rep);
  }

  getCompanyByClientType(clientType: string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-clientType/"+clientType);
  }

  getCompanyByLocation(ny: string, la:string, fl:string, tx:string, il:string, dc:string): Observable<companyData[]> {
    return this.http.get<companyData[]>(baseUrl+"/by-location/"+ny+la+fl+tx+il+dc);
  }

  getDomain(domainName: string): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+"/get-domain/"+domainName);
  }

  addDomainValue(domainName: string, value: string): Observable<any> {
    return this.http.get<String>(`${baseUrl}/add-domain/${domainName}/${value}`, {
       responseType: 'text' as 'json'});
  }

  deleteDomainValue(domainName: string, value: string): Observable<any> {
    return this.http.get<String>(baseUrl+"/delete-domain/"+domainName+"/"+value,
      {responseType: 'text' as 'json'});
  }

  update(data: any): Observable<any> {
    return this.http.put<any>(baseUrl, data);
  }

  addCompany(data: any): Observable<any> {
    return this.http.post<any>(baseUrl, data);
  }


}
