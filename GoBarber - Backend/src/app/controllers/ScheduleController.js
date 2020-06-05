import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointments';
import User from '../models/Users';

class ScheduleController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!isProvider) {
      return res.status('401').json({ error: 'You are not a provider.' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        cancelled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
        }
      },
      order: ['date']
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
