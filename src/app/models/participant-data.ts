export interface ParticipantData {
  name: string,
  expertise?: string,
  department?: string,
  email: string,
  linkedInProfile?: string,
  company: string,
  mobileNo: string,
  age: string,
  address: string,
  comments: string,
  arrivalflightDetails: {
    flightNo: string,
    origin: string,
    originCity?: string,
    arrivalDate: string,
    carrier: string,
    comments: string
  },
  departureflightDetails: {
    flightNo: string,
    destinationCity?: string,
    destination: string,
    departureDate: string,
    carrier: string,
    comments: string
  },
  hotelDetails: {
    name: string,
    contactNo: string,
    fromDate: string,
    toDate: string,
    address: string,
    comments: string
  }
  }