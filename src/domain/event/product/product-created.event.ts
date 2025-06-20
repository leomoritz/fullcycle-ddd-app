import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventDate: any) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventDate;
    }
}