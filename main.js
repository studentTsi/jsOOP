// Example of simple OOP in JS

class Vehicle {
  constructor(
    model = "Audi",
    year = 2019,
    type = "Car",
    fuelType = "Diesel",
    fuelConsuption = 6,
    fuelTankAmount = 60,
  ) {
    this.model = model;
    this.year = year;
    this.type = type;
    this.fuelType = fuelType;
    this.fuelConsuption = fuelConsuption;
    this.fuelAmount = 0;
    this.fuelTankAmount = fuelTankAmount;
    this.isEngineStarted = false;
    this.hasConditionErrors = false;
    this.errorLogs = {
      engine: {
        hasError: false,
        errorDescription: "",
      },
      fuelTank: {
        hasError: false,
        errorDescription: "",
      },
    };
  }
  getVehicleInfo() {
    console.log(
      "Model name: " +
        this.model +
        " | " +
        "Model type: " +
        this.type +
        " | " +
        "Fuel remains :",
      this.fuelAmount,
    );
  }

  checkSystem() {
    if (!this.fuelAmount) {
      console.log(this.model, "Low fuel amount. Please, fill fuel");
      return this.fuelAmount;
    }
    if (!this.hasConditionErrors) {
      console.log(this.model, "All systems fine. You can start engine now");
      return !this.hasConditionErrors;
    } else {
      console.log(this.model, "System check failed. Error list:");
      Object.entries(this.errorLogs).forEach(([errorKey, errorValue]) => {
        if (errorValue.hasError) {
          console.log(this.model, `${errorKey}:${errorValue.errorDescription}`);
        }
      });
      return !this.hasConditionErrors;
    }
  }

  fillFuel(amount, fuelType) {
    if (amount > this.fuelTankAmount) {
      console.log(
        this.model,
        "Fuel amount is more than tank amount. Fuel is not filled. Try again",
      );
      return;
    }
    if (fuelType !== this.fuelType) {
      this.hasConditionErrors = true;
      this.errorLogs.fuelTank.hasError = true;
      (this.errorLogs.fuelTank.errorDescription = this.model),
        "You have filled wrong fuel type. Please remove current fuel.";
    }
    this.fuelAmount += amount;
    console.log(
      this.model,
      "Fuel has been filled succesfully! You have filled: " + amount + "L",
    );
  }

  startEngine() {
    console.log(this.model, "Preparing for engine start ...");
    const checkResult = this.checkSystem();
    if (checkResult) {
      console.log(this.model, "Engine started. Ready for drive");
      this.isEngineStarted = true;
    }
  }

  drive() {
    if (!this.isEngineStarted) {
      console.log(this.model, "Drive fails. Start engine first.");
    } else {
      const drivingInterval = setInterval(() => {
        if (this.fuelAmount < this.fuelConsuption) {
          clearInterval(drivingInterval);
          console.log(this.model, "Fuel is low. Drive stops now.");
          return;
        }
        console.log(this.model, "Driving. Fuel left: ", this.fuelAmount);
        this.fuelAmount -= this.fuelConsuption;
      }, 500);
    }
  }
}

const audi = new Vehicle("Audi A3", 2016, "Car", "Diesel", 5, 60);
audi.getVehicleInfo();
audi.fillFuel(60, "Diesel");
audi.startEngine();
audi.drive();

const bmw = new Vehicle("BMW 320", 2014, "Car", "Benzin", 8, 60);
bmw.fillFuel(30, "Benzin");
bmw.startEngine();
bmw.drive();
