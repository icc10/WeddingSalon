import { Component } from '@angular/core';
import {FileService} from "../services/file.service";
import { companyData } from '../entities/companyData';
import { CompanyDataService } from '../services/company-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-company',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {

  constructor(private fileService: FileService, private companyService: CompanyDataService) {}

  calendlyFile: File | null = null;
  fileName: string = '';
  errors = false;

  companies?: companyData[];

  changeLeadDate: { [key: number]: boolean } = {};
  changeLastCall: { [key: number]: boolean } = {};
  changeLastFollowUp: { [key: number]: boolean } = {};
  changeLastEmailClient: { [key: number]: boolean } = {};
  changeNextFollowUp: { [key: number]: boolean } = {};

  repDomain?: any[];
  originDomain?: any[];
  tempTypeDomain?: any[];
  statusDomain?: any[];
  lastActionDomain?: any[];
  targetClientDomain?: any[];
  emailActionDomain?: any[];
  calendlySourceDomain?: any[];
  recommenderDomain?: any[];
  inquiryOriginDomain?: any[];

  newDomain: string = '';

  inputSubject = new Subject<{ id: number, index: number, textVar: string }>(); // Subject emitting an object with the four arguments

  ngOnInit(): void {
    this.getDomain("rep_domain");
    this.getDomain("origin_domain");
    this.getDomain("temp_type_domain");
    this.getDomain("status_domain");
    this.getDomain("last_action_domain");
    this.getDomain("target_client_domain");
    this.getDomain("email_action_domain");
    this.getDomain("calendly_source_domain");
    this.getDomain("recommender_domain");
    this.getDomain("inquiry_origin_domain");
  }

  fileChange(event: any, field: any) : void {
    const file: File = event.target.files[0];
    if(!file)
      return;

    this.calendlyFile = file;
    let elem = document.getElementById('calendlyFileName');
    if (elem)
      elem.innerText = this.displayFileName(this.calendlyFile.name);
    this.parseFile();
  }

  uploadFile():void {

    if(this.calendlyFile === null){
      return;
    }

    const uploadData = new FormData();
    uploadData.append('calendlyFile', this.calendlyFile);

  }

  parseFile(): void {
    if (this.calendlyFile) {
      const reader = new FileReader();

      // When file reading is done
      reader.onload = (e) => {
        const csvData = reader.result as string;
        this.parseCSV(csvData);
      };

      // Read file as text
      reader.readAsText(this.calendlyFile);
    }
  }

  parseCSV(data: string) {
    const rows = data.split('\n');
    const headers = rows[0].split(',');

    const parsedData = rows.slice(1).map(row => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {} as any);
    });

    console.log(parsedData); // Parsed CSV data as an array of objects
    this.createCompaniesWithCalendly(parsedData);
  }

  createCompaniesWithCalendly(calendly: any): void {
    for(let i = 0; i<calendly.length; i++){
      const data: companyData = {
        leadDate: null,
        lastCall : null,
        lastFollowUp : null,
        rep : null,
        origin : null,
        company : calendly[i]["Response 1"],
        category : calendly[i]["Response 4"],
        firstName : calendly[i]["Invitee First Name"],
        lastName : calendly[i]["Invitee Last Name"],
        title : calendly[i]["Response 2"],
        priority : null,
        email : calendly[i]["Invitee Email"],
        lastEmailClient : null,
        note : null,
        tempType : null,
        status : null,
        ny : null,
        la : null,
        fl : null,
        tx : null,
        il : null,
        dc : null,
        lastAction : null,
        showOutreach : null,
        saidNoTo : null,
        targetClient : null,
        emailAction : null,
        mobile : calendly[i]["Response 9"],
        office : null,
        address : calendly[i]["Response 5"],
        city : calendly[i]["Response 6"],
        zip : null,
        socialMedia : null,
        nextFollowUp : null,
        inquiryStatus : null,
        website : calendly[i]["Response 3"],
        vendorTour: null,
        calendlySource: null,
        recommender: null,
        inquiryOrigin: null,
        id: 0
        };

      if(calendly[i]["Response 8"] === "NY")
        data.ny = calendly[i]["Response 8"];
      else if(calendly[i]["Response 8"] === "LA")
        data.la = calendly[i]["Response 8"];
      else if(calendly[i]["Response 8"] === "FL")
        data.fl = calendly[i]["Response 8"];
      else if(calendly[i]["Response 8"] === "TX")
        data.tx = calendly[i]["Response 8"];
      else if(calendly[i]["Response 8"] === "IL")
        data.il = calendly[i]["Response 8"];
      else if(calendly[i]["Response 8"] === "DC")
        data.dc = calendly[i]["Response 8"];

      this.companies = this.companies || [];
      this.companies.push(data);
    }
  }



  displayFileName(filePath: string) : string {
    const splitStr = filePath.split('/');
    return splitStr[splitStr.length-1];
  }

  addEmptyCompany(): void{
    console.log("here");
    const data: companyData = {
      leadDate: null,
      lastCall : null,
      lastFollowUp : null,
      rep : null,
      origin : null,
      company : null,
      category : null,
      firstName : null,
      lastName : null,
      title : null,
      priority : null,
      email : null,
      lastEmailClient : null,
      note : null,
      tempType : null,
      status : null,
      ny : null,
      la : null,
      fl : null,
      tx : null,
      il : null,
      dc : null,
      lastAction : null,
      showOutreach : null,
      saidNoTo : null,
      targetClient : null,
      emailAction : null,
      mobile : null,
      office : null,
      address : null,
      city : null,
      zip : null,
      socialMedia : null,
      nextFollowUp : null,
      inquiryStatus : null,
      website : null,
      vendorTour: null,
      calendlySource: null,
      recommender: null,
      inquiryOrigin: null,
      id: 0
      };

    this.companies = this.companies || [];
    this.companies.push(data);
  }

/*----------------------------- Updating Data -------------------------------- */

  onDateChange(event: any, index: number, dateVar: string) {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }

    /*gonna have to search through companies array for id and change its values that way*/
    if(dateVar === 'leadDate') {
      this.companies[index].leadDate = event.value;
      this.toggleChangeLeadDate(index);
      return;
    }
    else if(dateVar === 'lastCall') {
      this.companies[index].lastCall = event.value;
      this.toggleChangeLastCall(index);
      return;
    }
    else if(dateVar === 'lastFollowUp') {
      this.companies[index].lastFollowUp = event.value;
      this.toggleChangeLastFollowUp(index);
      return;
    }
    else if(dateVar === 'lastEmailClient') {
      this.companies[index].lastEmailClient = event.value;
      this.toggleChangeLastEmailClient(index);
      return;
    }
    else if(dateVar === 'nextFollowUp') {
      this.companies[index].nextFollowUp = event.value;
      this.toggleChangeNextFollowUp(index);
      return;
    }
  }

  //Dates
  toggleChangeLeadDate(index: number): void {
    this.changeLeadDate[index] = !this.changeLeadDate[index];
  }

  toggleChangeLastCall(index: number): void {
    this.changeLastCall[index] = !this.changeLastCall[index];
  }

  toggleChangeLastFollowUp(index: number): void {
    this.changeLastFollowUp[index] = !this.changeLastFollowUp[index];
  }

  toggleChangeLastEmailClient(index: number): void {
    this.changeLastEmailClient[index] = !this.changeLastEmailClient[index];
  }

  toggleChangeNextFollowUp(index: number): void {
    this.changeNextFollowUp[index] = !this.changeNextFollowUp[index];
  }


  /*MAKE SURE TO GET RID OF FOR LOOPS THAT FIND MATCHING IDS SINCE WE ONLY NEED INDEX */
  //Rep
  changeRep(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].rep = value;
    return;
  }

//Origin
  changeOrigin(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].origin = value;
    return;
  }

//Temp Type
  changeTempType(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].tempType = value;
    return;
  }

//Status
  changeStatus(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].status = value;
    return;
  }

//NY
  toggleNy(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(this.companies[index].ny === 'NY')
      this.companies[index].ny = '';
    else
      this.companies[index].ny = 'NY';

  }

//LA
  toggleLa(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(this.companies[index].la === 'LA')
      this.companies[index].la = '';
    else
      this.companies[index].la = 'LA';
  }


//FL
  toggleFl(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(this.companies[index].fl === 'FL')
      this.companies[index].fl = '';
    else
      this.companies[index].fl = 'FL';
  }

//TX
  toggleTx(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(this.companies[index].tx === 'TX')
      this.companies[index].tx = '';
    else
      this.companies[index].tx = 'TX';
  }

//IL
  toggleIl(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(this.companies[index].il === 'IL')
          this.companies[index].il = '';
        else
          this.companies[index].il = 'IL';
  }

//DC
  toggleDc(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(this.companies[index].dc === 'DC')
      this.companies[index].dc = '';
    else
      this.companies[index].dc = 'DC';
  }

//lastAction
  changeLastAction(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].lastAction = value;
    return;
  }

//targetClient
  changeTargetClient(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].targetClient = value;
    return;
  }

//Email Action
  changeEmailAction(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].emailAction = value;
    return;
  }

//VendorTour
  toggleVendorTour(index: number): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].vendorTour = !this.companies[index].vendorTour;
  }

//CalendlySource
  changeCalendlySource(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].calendlySource = value;
    return;
  }

//Recommender
  changeRecommender(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].recommender = value;
    return;
  }

//Recommender
  changeInquiryOrigin(index: number, value: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    this.companies[index].inquiryOrigin = value;
    return;
  }



/*----------------------------------- Domains ----------------------------------------- */

  addDomainValue(domain: string, value: string): void {
    if (!value || value.trim() === '') {
      console.log('No value entered, skipping addDomain call.');
      return;
    }
    let str: any = '';
    this.companyService.addDomainValue(domain, value).subscribe({
      next: (response) => {
          console.log('Success:', response);
          this.getDomain(domain);
      },
      error: (err) => {
          console.error('Error:', err);
      }
    });
    this.newDomain = '';
  }


  deleteDomainValue(domain: string, value: string): void {
    console.log("calledDelete");
    this.companyService.deleteDomainValue(domain, value).subscribe({
      next: (response) => {
          console.log('Success:', response);
          this.getDomain(domain);
      },
      error: (err) => {
          console.error('Error:', err);
      }
    });
  }

  emptyNewDomain(): void {
    this.newDomain = '';
  }

  getDomain(domainName: string) : void {
    this.companyService.getDomain(domainName)
      .subscribe({
        next: (data) => {
          if(domainName === "rep_domain")
            this.repDomain = data;
          else if(domainName === "origin_domain")
            this.originDomain = data;
          else if(domainName === "temp_type_domain")
            this.tempTypeDomain = data;
          else if(domainName === "status_domain")
            this.statusDomain = data;
          else if(domainName === "last_action_domain")
            this.lastActionDomain = data;
          else if(domainName === "target_client_domain")
            this.targetClientDomain = data;
          else if(domainName === "email_action_domain")
            this.emailActionDomain = data;
          else if(domainName === "calendly_source_domain")
            this.calendlySourceDomain = data;
          else if(domainName === "recommender_domain")
            this.recommenderDomain = data;
          else if(domainName === "inquiry_origin_domain")
            this.inquiryOriginDomain = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  //TextChange
  onTextChange(id: number, index: number, textVar: string): void {
    this.inputSubject.next({id, index, textVar});
  }

  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  save(): void {
    if(!this.companies)
      return;
    for(let i=0; i<this.companies.length; i++){
      this.companyService.addCompany(this.companies[i])
        .subscribe({
          next: (res) => {
            console.log('updated company data: ', res);
          },
          error: (e) => console.error(e)
        });
    }
    this.companies = [];
  }

  deleteCompany(index: number):void {
    if(this.companies)
      this.companies.splice(index,1);
  }



}
