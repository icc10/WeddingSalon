export class companyData {
  leadDate: Date | null;
  lastCall: Date | null;
  lastFollowUp: Date | null;
  rep: string | null;
  origin: string | null;
  company: string | null;
  category: string | null;
  firstName: string | null;
  lastName: string | null;
  title: string| null;
  priority: string | null;
  email: string | null;
  lastEmailClient: Date | null;
  note: string | null;
  tempType: string | null;
  status: string | null;
  ny: string | null;
  la: string | null;
  fl: string | null;
  tx: string | null;
  il: string | null;
  dc: string | null;
  lastAction: string | null;
  showOutreach: string| null;
  saidNoTo: string | null;
  targetClient: string | null;
  emailAction: string| null;
  mobile: string | null;
  office: string | null;
  address: string | null;
  city: string | null;
  zip: string | null;
  socialMedia: string | null;
  nextFollowUp: Date | null;
  inquiryStatus: string | null;
  website: string | null;
  vendorTour: boolean | null;
  calendlySource: string | null;
  recommender: string| null;
  inquiryOrigin: string | null;
  id: number;

  constructor(
    leadDate: Date,
    lastCall: Date,
    lastFollowUp: Date,
    rep: string,
    origin: string,
    company: string,
    category: string,
    firstName: string,
    lastName: string,
    title: string,
    priority: string,
    email: string,
    lastEmailClient: Date,
    note: string,
    tempType: string,
    status: string,
    ny: string,
    la: string,
    fl: string,
    tx: string,
    il: string,
    dc: string,
    lastAction: string,
    showOutreach: string,
    saidNoTo: string,
    targetClient: string,
    emailAction: string,
    mobile: string,
    office: string,
    address: string,
    city: string,
    zip: string,
    socialMedia: string,
    nextFollowUp: Date,
    inquiryStatus: string,
    website: string,
    vendorTour: boolean,
    calendlySource: string,
    recommender: string,
    inquiryOrigin: string,
    id: number
  ) {
    this.leadDate = leadDate;
    this.lastCall = lastCall;
    this.lastFollowUp = lastFollowUp;
    this.rep = rep;
    this.origin = origin;
    this.company = company;
    this.category = category;
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.priority = priority;
    this.email = email;
    this.lastEmailClient = lastEmailClient;
    this.note = note;
    this.tempType = tempType;
    this.status = status;
    this.ny = ny;
    this.la = la;
    this.fl = fl;
    this.tx = tx;
    this.il = il;
    this.dc = dc;
    this.lastAction = lastAction;
    this.showOutreach = showOutreach;
    this.saidNoTo = saidNoTo;
    this.targetClient = targetClient;
    this.emailAction = emailAction;
    this.mobile = mobile;
    this.office = office;
    this.address = address;
    this.city = city;
    this.zip = zip;
    this.socialMedia = socialMedia;
    this.nextFollowUp = nextFollowUp;
    this.inquiryStatus = inquiryStatus;
    this.website = website;
    this.vendorTour = vendorTour;
    this.calendlySource = calendlySource;
    this.recommender = recommender;
    this.inquiryOrigin = inquiryOrigin;
    this.id = id;
  }
}
