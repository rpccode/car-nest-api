export class CreateReservationDto {
    readonly userId: string;
    readonly carId: string;
    readonly startDate: Date;
    readonly endDate: Date;
  }
  