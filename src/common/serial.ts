import SerialPort from "serialport";

const serial = new SerialPort(process.env.CF_UART_PORT || "/dev/ttyUSB0", {
  baudRate: process.env.CF_UART_BAUD ? 115200 : parseInt(process.env.CF_UART_BAUD || "115200"),
  dataBits: 8,
  stopBits: 1,
  autoOpen: true,
});

export default serial;

export const serialSendData = async (data: string | number[] | Buffer): Promise<number> => {
  return new Promise((resolve, reject) => {
    serial.write(data, (err, written) => {
      if (err) {
        reject(err);
      } else {
        resolve(written);
      }
    });
  });
};
