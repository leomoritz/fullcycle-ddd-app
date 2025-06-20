import Product from "../../entity/product";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductUpdatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductUpdatedEvent")[0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
        expect(eventDispatcher.getEventHandlers("ProductUpdatedEvent").length).toBe(1);
    }
    );

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductUpdatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductUpdatedEvent")[0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
        expect(eventDispatcher.getEventHandlers("ProductUpdatedEvent")[0]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("ProductUpdatedEvent").length).toBe(0);
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyHandle = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Mouse Logitech",
            description: "Mouse sem fio",
            price: 100.0,
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        expect(spyHandle).toHaveBeenCalledWith(productCreatedEvent);
    });

});