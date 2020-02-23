const eventsController = {
  get: (req, res) => {
    res.json([
      { id: '01', name: 'Event 1' },
      { id: '02', name: 'Event 2' },
      { id: '03', name: 'Event 3' }
    ])
  }
}

export default eventsController
