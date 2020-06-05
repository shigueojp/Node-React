import Notification from '../schemas/Notifications';
import User from '../models/Users';

class NotificationController {
  async index(req, res) {
    /**
     * Check is provider
     */
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // => findByIdAndUpdate(id, o q vai ser mudado, se retorna o novo objeto com novas mudancas)
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true
      },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
