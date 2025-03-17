import { Component } from '@angular/core';
import { EmailService } from "../services/email.service";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-page',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './email-page.component.html',
  styleUrl: './email-page.component.css'
})
export class EmailPageComponent {
  emails: string = '';
  subject: string = '';
  body: string = '';
  from: string = '';
  password: string = '';

  constructor(private emailService: EmailService) {}

  ngOnInit() {}

  // Split and trim emails
  emailsEntered(): string[] {
    return this.emails
      .split(',')
      .map(email => email.trim()) // Remove extra whitespace
      .filter(email => email !== ''); // Remove empty strings
  }

  sendEmail(): void {
    const emailData = {
      from: this.from,
      to: this.emailsEntered(),
      subject: this.subject,
      body: this.body,
      host: 'smtp.gmail.com',
      port: 587,
      username: this.from,
      password: this.password
    };

    this.emailService.create(emailData).subscribe({
      next: (res) => {
        console.log('Email sent:', res);
      },
      error: (e) => console.error('Error:', e)
    });
  }
}
