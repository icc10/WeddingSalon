import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { companyData } from '../entities/companyData';
import { CompanyDataService } from '../services/company-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
@Component({
  selector: 'app-companies-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    ],
  templateUrl: './companies-page.component.html',
  styleUrl: './companies-page.component.css'
})
export class CompaniesPageComponent {

  companies?: companyData[];
  displayed100Companies? : companyData[];
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

  startIndex: number = 0;
  endIndex: number = 100;
  pageNum: number = 1;


  selected: { [key: number]: boolean } = {};
  allSelected = false;

  search: string = '';
  clientType: string = '';
  searchType: string = '';
  showPopup: boolean = false;
  showSortPopup: boolean = false;
  filter: string = '';
  changeLeadDate: { [key: number]: boolean } = {};
  changeLastCall: { [key: number]: boolean } = {};
  changeLastFollowUp: { [key: number]: boolean } = {};
  changeLastEmailClient: { [key: number]: boolean } = {};
  changeNextFollowUp: { [key: number]: boolean } = {};

  newDomain: string = '';
  ny: string = '';
  la: string = '';
  fl: string = '';
  tx: string = '';
  il: string = '';
  dc: string = '';

  inputSubject = new Subject<{ id: number, index: number, textVar: string }>(); // Subject emitting an object with the four arguments
  startTime!: number;


  dataRow: companyData = {
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

  constructor (private companyService: CompanyDataService) {}

  ngOnInit(): void {
    this.getCompanies();
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

    this.inputSubject
      .pipe(
        tap(({ id, index, textVar }) => {
          if (!this.startTime) {
            this.startTime = Date.now(); // Record the start time when typing begins
          }
        }),
        debounceTime(300) // Adjust delay time as needed
      )
      .subscribe(({ id, index, textVar }) => {
        const endTime = Date.now();
        this.startTime = 0; // Reset start time
        this.handleInput(id, index, textVar); // Pass the arguments to handleInput
      });
  }

  getCompanies() : void {
    this.companyService.getAllCompanies()
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall +'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          console.log(data);

          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
        },
        error: (e) => console.error(e)
      });
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

  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }


  popupToggle(): void {
      this.showPopup = !this.showPopup;
  }

  popupSortToggle(): void {
      this.showSortPopup = !this.showSortPopup;
  }
//-------------------------- Checkboxes -----------------------------

toggleChecks(): void {
  for(let i = 1; i<=Object.keys(this.selected).length; i++){
    if(this.allSelected) {
      this.selected[i] = false;
    }
    else {
      this.selected[i] = true;
    }
  }
  this.allSelected = !this.allSelected;
}


// ---------------------- Filters and Sorts --------------------------

  filterByRep(): void {
    this.companyService.getCompanyByRep(this.filter)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  filterByLocation(): void {
    this.companyService.getCompanyByLocation(this.ny, this.la, this.fl, this.tx, this.il, this.dc)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  filterByClientType(): void {
    this.companyService.getCompanyByClientType(this.clientType)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }

  searchBy(): void {
    if(this.search === '') {
      this.getCompanies();
      return;
    }
    if(this.searchType === 'name')
      this.findByCompany();
    else if (this.searchType === 'email')
      this.findByEmail();
    else if (this.searchType === 'firstName')
          this.findByFirstName();
    else if (this.searchType === 'lastName')
          this.findByLastName();
  }

  findByCompany(): void {
    this.companyService.getCompanyByName(this.search)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }

  findByEmail(): void {
    this.companyService.getCompanyByEmail(this.search)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  findByFirstName(): void {
    this.companyService.getCompanyByFirstName(this.search)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  findByLastName(): void {
    this.companyService.getCompanyByLastName(this.search)
      .subscribe({
        next: (data) => {
          this.companies = data.map(company => {
            return {
              ...company,
              leadDate: new Date(company.leadDate + 'Z'), // Convert leadDate to Date and 'Z' is for UTC
              lastCall: new Date(company.lastCall + 'Z'),
              lastFollowUp: new Date(company.lastFollowUp + 'Z'),
              lastEmailClient: new Date(company.lastEmailClient + 'Z'),
              nextFollowUp: new Date(company.nextFollowUp + 'Z')
            };
          });
          for(let i = 0; i<this.companies.length; i++) {
            this.selected[i+1] = false;
            this.changeLeadDate[i] = false;
            this.changeLastCall[i] = false;
            this.changeLastFollowUp[i] = false;
            this.changeLastEmailClient[i] = false;
            this.changeNextFollowUp[i] = false;
            console.log(this.selected[i]);
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  sortByLeadDate(order: string): void {
    if(this.companies !== null){
      if(order == 'asc') {
        this.companies?.sort((a, b) => {
          if (!a.leadDate || isNaN(new Date(a.leadDate).getTime()))
            return 1; // Move invalid a to end
          if (!b.leadDate || isNaN(new Date(b.leadDate).getTime()))
            return -1; // Move invalid b to end
          return a.leadDate.getTime() - b.leadDate.getTime(); // Ascending order
        });
      }
      else if(order == 'des'){
        this.companies?.sort((a, b) => {
          if (!a.leadDate || isNaN(new Date(a.leadDate).getTime()))
            return 1; // Move invalid a to end
          if (!b.leadDate || isNaN(new Date(b.leadDate).getTime()))
            return -1; // Move invalid b to end
          return b.leadDate.getTime() - a.leadDate.getTime(); // Descending order
        });
      }
    }
  }

//-----------------Data Page Change--------------------------

  nextPage():void {
    if(this.companies == null )
      return;
    if(this.endIndex == this.companies.length-1)
      return;
    if(this.endIndex + 100 > this.companies.length-1){
      this.startIndex = this.endIndex;
      this.endIndex += this.companies.length-1 - this.endIndex;
    }
    else{
      this.startIndex = this.endIndex;
      this.endIndex += 100;
    }
    this.pageNum++;
  }

  prevPage(): void {
    if(this.startIndex === 0)
      return;
    if(this.startIndex - 100 < 0){
      this.endIndex = this.startIndex;
      this.startIndex = 0;
      console.log(this.startIndex, this.endIndex);
    }
    else{
      this.endIndex = this.startIndex;
      this.startIndex -= 100;
      console.log(this.startIndex, this.endIndex);
    }
    this.pageNum--;
  }

// --------------- Table Data -----------------

// Add new company data
  updateData(): void {
    console.log("called updateData");
    this.companyService.update(this.dataRow)
      .subscribe({
        next: (res) => {
          console.log('updated company data: ', res);
          this.resetDataRow();
        },
        error: (e) => console.error(e)
      });
  }

  resetDataRow(): void {
    this.dataRow.leadDate= null;
    this.dataRow.lastCall = null;
    this.dataRow.lastFollowUp = null;
    this.dataRow.rep = null;
    this.dataRow.origin = null;
    this.dataRow.company = null;
    this.dataRow.category = null;
    this.dataRow.firstName = null;
    this.dataRow.lastName = null;
    this.dataRow.title = null;
    this.dataRow.priority = null;
    this.dataRow.email = null;
    this.dataRow.lastEmailClient = null;
    this.dataRow.note = null;
    this.dataRow.tempType = null;
    this.dataRow.status = null;
    this.dataRow.ny = null;
    this.dataRow.la = null;
    this.dataRow.fl = null;
    this.dataRow.tx = null;
    this.dataRow.il = null;
    this.dataRow.dc = null;
    this.dataRow.lastAction = null;
    this.dataRow.showOutreach = null;
    this.dataRow.saidNoTo = null;
    this.dataRow.targetClient = null;
    this.dataRow.emailAction = null;
    this.dataRow.mobile = null;
    this.dataRow.office = null;
    this.dataRow.address = null;
    this.dataRow.city = null;
    this.dataRow.zip = null;
    this.dataRow.socialMedia = null;
    this.dataRow.nextFollowUp = null;
    this.dataRow.inquiryStatus = null;
    this.dataRow.website = null;
    this.dataRow.vendorTour= null;
    this.dataRow.calendlySource= null;
    this.dataRow.recommender= null;
    this.dataRow.inquiryOrigin= null;
    this.dataRow.id= 0;
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


  onDateChange(event: any, id: number, index: number, dateVar: string) {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }

    /*gonna have to search through companies array for id and change its values that way*/
    if(dateVar === 'leadDate') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.companies[i].leadDate = event.value;
          this.toggleChangeLeadDate(index);
          this.dataRow.id=id;
          this.dataRow.leadDate = event.value;
          this.updateData();
          return;
        }
      }
    }
    else if(dateVar === 'lastCall') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.companies[i].lastCall = event.value;
          this.toggleChangeLastCall(index);
          this.dataRow.id=id;
          this.dataRow.lastCall = event.value;
          this.updateData();
          return;
        }
      }

    }
    else if(dateVar === 'lastFollowUp') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.companies[i].lastFollowUp = event.value;
          this.toggleChangeLastFollowUp(index);
          this.dataRow.id=id;
          this.dataRow.lastFollowUp = event.value;
          this.updateData();
          return;
        }
      }
    }
    else if(dateVar === 'lastEmailClient') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.companies[i].lastEmailClient = event.value;
          this.toggleChangeLastEmailClient(index);
          this.dataRow.id=id;
          this.dataRow.lastEmailClient = event.value;
          this.updateData();
          return;
        }
      }
    }
    else if(dateVar === 'nextFollowUp') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.companies[i].nextFollowUp = event.value;
          this.toggleChangeNextFollowUp(index);
          this.dataRow.id=id;
          this.dataRow.nextFollowUp = event.value;
          this.updateData();
          return;
        }
      }
    }
  }


//TextChange
  onTextChange(id: number, index: number, textVar: string): void {
    this.inputSubject.next({id, index, textVar});
  }

  handleInput(id: number, index: number, textVar: string): void {
    if (!this.companies || !this.companies[index]) {
      console.error("Company list or index is undefined:", index);
      return;
    }
    if(textVar === 'company') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.company = this.companies[i].company;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'firstName') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.firstName = this.companies[i].firstName;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'lastName') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.lastName = this.companies[i].lastName;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'title') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.title = this.companies[i].title;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'email') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.email = this.companies[i].email;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'note') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.note = this.companies[i].note;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'showOutreach') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.showOutreach = this.companies[i].showOutreach;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'saidNoTo') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.saidNoTo = this.companies[i].saidNoTo;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'mobile') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.mobile = this.companies[i].mobile;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'office') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.office = this.companies[i].office;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'address') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.address = this.companies[i].address;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'city') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.city = this.companies[i].city;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'zip') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.zip = this.companies[i].zip;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'socialMedia') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.socialMedia = this.companies[i].socialMedia;
          this.updateData();
          return;
        }
      }
    }
    else if(textVar === 'website') {
      for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.dataRow.id=id;
          this.dataRow.website = this.companies[i].website;
          this.updateData();
          return;
        }
      }
    }
  }


//Rep
  changeRep(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }

    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].rep = value;
        this.dataRow.id=id;
        this.dataRow.rep = value;
        this.updateData();
        return;
      }
    }
  }

//Origin
  changeOrigin(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
          if(this.companies[i].id === id){
            this.companies[i].origin = value;
            this.dataRow.id=id;
            this.dataRow.origin = value;
            this.updateData();
            return;
          }
        }
  }

//Temp Type
  changeTempType(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
        if(this.companies[i].id === id){
          this.companies[i].tempType = value;
          this.dataRow.id=id;
          this.dataRow.tempType = value;
          this.updateData();
          return;
        }
    }
  }

//Status
  changeStatus(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    console.log("Change status: " + value);
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].status = value;
        this.dataRow.id=id;
        this.dataRow.status = value;
        this.updateData();
        return;
      }
    }
  }

//NY
  toggleNy(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        if(this.companies[i].ny === 'NY')
          this.companies[i].ny = '';
        else
          this.companies[i].ny = 'NY';
        this.dataRow.id=id;
        this.dataRow.ny = this.companies[i].ny;
        this.updateData();
      }
    }
  }

//LA
  toggleLa(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        if(this.companies[i].la === 'LA')
          this.companies[i].la = '';
        else
          this.companies[i].la = 'LA';
        this.dataRow.id=id;
        this.dataRow.la = this.companies[i].la;
        this.updateData();
      }
    }
  }


//FL
  toggleFl(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        if(this.companies[i].fl === 'FL')
          this.companies[i].fl = '';
        else
          this.companies[i].fl = 'FL';
        this.dataRow.id=id;
        this.dataRow.fl = this.companies[i].fl;
        this.updateData();
      }
    }
  }

//TX
  toggleTx(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        if(this.companies[i].tx === 'TX')
          this.companies[i].tx = '';
        else
          this.companies[i].tx = 'TX';
        this.dataRow.id=id;
        this.dataRow.tx = this.companies[i].tx;
        this.updateData();
      }
    }
  }

//IL
  toggleIl(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        if(this.companies[i].il === 'IL')
          this.companies[i].il = '';
        else
          this.companies[i].il = 'IL';
        this.dataRow.id=id;
        this.dataRow.il = this.companies[i].il;
        this.updateData();
      }
    }
  }

//DC
  toggleDc(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        if(this.companies[i].dc === 'DC')
          this.companies[i].dc = '';
        else
          this.companies[i].dc = 'DC';
        this.dataRow.id=id;
        this.dataRow.dc = this.companies[i].dc;
        this.updateData();
      }
    }
  }

//lastAction
  changeLastAction(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].lastAction = value;
        this.dataRow.id=id;
        this.dataRow.lastAction = value;
        this.updateData();
        return;
      }
    }
  }

//targetClient
  changeTargetClient(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].targetClient = value
        this.dataRow.id=id;
        this.dataRow.targetClient = value;
        this.updateData();
        return;
      }
    }
  }

//Email Action
  changeEmailAction(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].emailAction = value
        this.dataRow.id=id;
        this.dataRow.emailAction = value;
        this.updateData();
        return;
      }
    }
  }

//VendorTour
  toggleVendorTour(id: number): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].vendorTour = !this.companies[i].vendorTour;
        this.dataRow.id=id;
        this.dataRow.vendorTour = this.companies[i].vendorTour;
        this.updateData();
      }
    }
  }

//CalendlySource
  changeCalendlySource(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].calendlySource = value
        this.dataRow.id=id;
        this.dataRow.calendlySource = value;
        this.updateData();
        return;
      }
    }
  }

//Recommender
  changeRecommender(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].recommender = value
        this.dataRow.id=id;
        this.dataRow.recommender = value;
        this.updateData();
        return;
      }
    }
  }

//Recommender
  changeInquiryOrigin(id: number, value: string): void {
    if (!this.companies || !this.companies[id]) {
      console.error("Company list or index is undefined:", id);
      return;
    }
    for(let i=0; i < this.companies.length; i++){
      if(this.companies[i].id === id){
        this.companies[i].inquiryOrigin = value
        this.dataRow.id=id;
        this.dataRow.inquiryOrigin = value;
        this.updateData();
        return;
      }
    }
  }


}
