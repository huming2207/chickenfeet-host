import { Mutex } from "async-mutex";
import SerialPort from "serialport";

import { CurrPosExp, RunStateExp } from "./regex";

export interface MachinePosition {
  x: number;
  y: number;
  z: number;
}

export type MachineState = "Idle" | "Run" | "Error";

const Readline = SerialPort.parsers.Readline;

class SerialManager {
  private txMutex = new Mutex();
  public serial = new SerialPort(process.env.CF_UART_PORT || "/dev/ttyUSB0", {
    baudRate: process.env.CF_UART_BAUD ? 115200 : parseInt(process.env.CF_UART_BAUD || "115200"),
    dataBits: 8,
    stopBits: 1,
    autoOpen: true,
  });

  private currPosition: MachinePosition = { x: 0, y: 0, z: 0 };
  private machineState: MachineState = "Idle";

  private parser = this.serial.pipe(new Readline({ delimiter: "\r\n" }));

  constructor() {
    setInterval(async () => {
      await this.sendData("?");
    }, 200);

    this.parser.on("data", this.handleSerialRx);
  }

  public sendData = async (data: string | number[] | Buffer): Promise<number> => {
    return await this.txMutex.runExclusive(async () => {
      return await this.sendDataAsync(data);
    });
  };

  private sendDataAsync = async (data: string | number[] | Buffer): Promise<number> => {
    return new Promise((resolve, reject) => {
      this.serial.write(data, (err, written) => {
        if (err) {
          reject(err);
        } else {
          resolve(written);
        }
      });
    });
  };

  private handleSerialRx = (data: string): void => {
    if (data.includes("ok")) {
      return;
    }

    const currPosRet = data.match(CurrPosExp);
    if (currPosRet != null) {
      const splitted = currPosRet[0].split(",");
      if (splitted.length < 3) {
        return; // Probably garbage, give up here
      }

      this.currPosition.x = parseFloat(splitted[0]);
      this.currPosition.y = parseFloat(splitted[1]);
      this.currPosition.z = parseFloat(splitted[2]);
    }

    const runStateRet = data.match(RunStateExp);
    if (runStateRet != null) {
      switch (runStateRet[0]) {
        case "Idle": {
          this.machineState = "Idle";
          break;
        }

        case "Run": {
          this.machineState = "Run";
          break;
        }

        default: {
          this.machineState = "Error";
          break;
        }
      }
    }

    console.log("Position", this.currPosition);
    console.log("State", this.machineState);
  };

  public getPosition = (): MachinePosition => {
    return this.currPosition;
  };
}

export default new SerialManager();
