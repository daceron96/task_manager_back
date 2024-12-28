class TaskController {
  // Método simple para responder hello world
  static sayHello(req, res) {
      res.json({ message: '¡Hola Mundo!' });
  }
}

module.exports = TaskController;