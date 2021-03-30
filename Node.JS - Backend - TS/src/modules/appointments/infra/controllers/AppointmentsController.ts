import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;

    // "date_TIMESTAMP": 1611254930
    // Transforming to ISO - JS should * 1000 to make it work
    // dateISO_FORMAT: 2021-01-21T18:00:00.000Z
    const dateIso = new Date(date * 1000).toISOString();

    // PARSED_DATE : 2021-01-21T19:00:00.000Z
    const parsedDate = parseISO(dateIso);
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  }
}
