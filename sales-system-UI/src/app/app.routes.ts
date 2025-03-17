import { Routes } from '@angular/router';
import { CompaniesPageComponent } from './companies-page/companies-page.component';
import { EmailPageComponent } from './email-page/email-page.component';
import { AddCompanyComponent } from './add-company/add-company.component';

export const routes: Routes = [
  { path: 'companies', component: CompaniesPageComponent },
  { path: 'email', component: EmailPageComponent},
  { path: 'add-company', component: AddCompanyComponent}
  ];
