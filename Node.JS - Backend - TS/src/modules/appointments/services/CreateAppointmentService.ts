import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  @inject('AppointmentsRepository')
  private appointmentsRepository: IAppointmentsRepository;

  constructor(appointmentsRepository: IAppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    this.appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // IsEqual(dataAserComparado, objetoMapeado)
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
