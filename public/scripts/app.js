class App {
    constructor() {
        this.carContainerElement = document.getElementById("cars-container");
    }

    async init() {
        await this.load();
    }

    run = () => {
        Car.list.forEach((car) => {
            const node = document.createElement("div");
            node.innerHTML = car.render();
            this.carContainerElement.appendChild(node);
        });
    };

    async load() {
        const cars = await CarHelper.listCars();
        Car.init(cars);
    }

}
