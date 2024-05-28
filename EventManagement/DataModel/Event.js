// Define the Event class
class Event {
  constructor(date, time, description, participants = []) {
    this.date = date;
    this.time = time;
    this.description = description;
    this.participants = participants;
  }

  // Method to add participants to the event
  addParticipant(participant) {
    this.participants.push(participant);
  }

  // Method to remove participants from the event
  removeParticipant(participant) {
    const index = this.participants.indexOf(participant);
    if (index !== -1) {
      this.participants.splice(index, 1);
    }
  }
}

module.exports = Event;
