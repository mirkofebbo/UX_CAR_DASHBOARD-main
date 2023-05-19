const HID = require('node-hid');

const gearStickMapping = {
  0: 'IDLE',
  1: 'GEAR-1',
  2: 'GEAR-2',
  4: 'GEAR-3',
  8: 'GEAR-4',
  16: 'GEAR-5',
  32: 'GEAR-6',
  64: 'GEAR-7',
  128: 'GEAR-R'
};

const d_padMapping = {
  15: 'IDLE',
  0: 'UP',
  1: 'UP-RIGHT',
  2: 'RIGHT',
  3: 'DOWN-RIGHT',
  4: 'DOWN',
  5: 'DOWN-LEFT',
  6: 'LEFT',
  7: 'UP-LEFT'
};

function generateNoiseData() {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const gearOption = [0,1,2,4,8,16,32,64,128];
  const d_padOption = [15,0,1,2,3,4,5,6,7];
  const true_false = [true, false];
  const GEAR = gearStickMapping[gearOption[getRandomInt(0, gearOption.length)]];
  const WHEEL = getRandomInt(-32766, 32766);
  const PEDAL = { GAS: getRandomInt(0, 1023), BRAKE: getRandomInt(0, 1023), CLUTCH: getRandomInt(0, 1023) };
  const D_PAD =  d_padMapping[d_padOption[getRandomInt(0, d_padOption.length)]];
  const POTMETER = { PRESSED: true_false[getRandomInt(0, 2)], LEFT: true_false[getRandomInt(0, 2)], RIGHT: true_false[getRandomInt(0, 2)] };
  const BUTTONS = {
    A: true_false[getRandomInt(0, 2)],
    B: true_false[getRandomInt(0, 2)],
    X: true_false[getRandomInt(0, 2)],
    Y: true_false[getRandomInt(0, 2)],
    TAB: true_false[getRandomInt(0, 2)],
    MENU: true_false[getRandomInt(0, 2)],
    XBOX: true_false[getRandomInt(0, 2)],
    YELLOW: true_false[getRandomInt(0, 2)],
    SHIFT_PEDAL_LEFT: true_false[getRandomInt(0, 2)],
    SHIFT_PEDAL_RIGHT: true_false[getRandomInt(0, 2)]
  }

  return {
      GEAR,
      WHEEL,
      PEDAL,
      D_PAD,
      POTMETER,
      BUTTONS
    };
}

function connectToTXRacingWheel(callback, dataCallback) {
  // List all HID devices
  const devices = HID.devices();
  // Thrustmaster's Vendor ID
  const vendorId = 0x044F;

  // Thrustmaster TX Racing Wheel
  const racingWheelProductId = 0xB669;
  const racingWheelDeviceInfo = devices.find((d) => d.vendorId === vendorId && d.productId === racingWheelProductId);

  // Thrustmaster Gear Stick
  const gearStickProductId = 0xB660;
  const gearStickDeviceInfo = devices.find((d) => d.vendorId === vendorId && d.productId === gearStickProductId);

  if (racingWheelDeviceInfo && gearStickDeviceInfo) {
    // Connect to devices
    const racingWheelDevice = new HID.HID(racingWheelDeviceInfo.path);
    const gearStickDevice = new HID.HID(gearStickDeviceInfo.path);

    // Initialize previous data
    let previousRacingWheelData = null;
    let previousGearStickData = null;

    // Read data from the racing wheel
    racingWheelDevice.on('data', (data) => {
      // Check if data has changed
      if (!previousRacingWheelData || !previousRacingWheelData.equals(data)) {
        const dataArray = Array.from(data);

        if (previousGearStickData) {
          const simplifiedData = simplifiedJSON(Array.from(data), Array.from(previousGearStickData));
          dataCallback(simplifiedData);
        }
        previousRacingWheelData = data;
      }
    });

    // Read data from the gear stick
    gearStickDevice.on('data', (data) => {
      // Check if data has changed
      if (!previousGearStickData || !previousGearStickData.equals(data)) {
        // console.log('Gear Stick Data received:', Array.from(data));
        if (previousRacingWheelData) {
          const simplifiedData = simplifiedJSON(Array.from(previousRacingWheelData), Array.from(data));
          dataCallback(simplifiedData);
        }
        previousGearStickData = data;
      }
    });

    // Handle errors
    racingWheelDevice.on('error', (error) => {
      callback(error, null);
    });

    gearStickDevice.on('error', (error) => {
      callback(error, null);
    });

    console.log(simplifiedJSON())
  } else {
    console.log('Thrustmaster TX Racing Wheel or Gear Stick not found. Generating noise data.');
    setInterval(() => {
      const simplifiedData =  generateNoiseData();
      dataCallback(simplifiedData);
    }, 1000);
  }
}

// WHEEL MAPPING
function crossProduct(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function simplifiedJSON(racingWheelArray, gearStickArray) {
  if (!racingWheelArray || !gearStickArray || racingWheelArray.length === 0 || gearStickArray.length === 0) {
    return {};
  }

  const GEAR = gearStickMapping[gearStickArray[1]];
  const D_PAD = d_padMapping[racingWheelArray[14]];

  const wheelRaw = Buffer.from(racingWheelArray).readInt16LE(1);
  // const WHEEL = mapRange(wheelRaw, 32766, 1175, 0, 420);
  const inMax = wheelRaw >= 0 ? 32766 : 1175;
  const inMin = wheelRaw <= 0 ? -32766 : -1175;
  const outMax = wheelRaw >= 0 ? 0 : 420;
  const outMin = wheelRaw <= 0 ? 0 : -420;
  const WHEEL = crossProduct(wheelRaw, inMin, inMax, outMin, outMax);

  const PEDAL = {
    GAS: Buffer.from(racingWheelArray).readInt16LE(7),
    BRAKE: Buffer.from(racingWheelArray).readInt16LE(3),
    CLUTCH: Buffer.from(racingWheelArray).readInt16LE(5)
  }

  const POTMETER = {
    PRESSED: !!(racingWheelArray[12] & 16),
    LEFT: !!(racingWheelArray[11] & 64),
    RIGHT: !!(racingWheelArray[11] & 128)
  }

  const BUTTONS = {
    A: !!(racingWheelArray[11] & 16),
    B: !!(racingWheelArray[12] & 1),
    X: !!(racingWheelArray[11] & 4),
    Y: !!(racingWheelArray[12] & 2),
    TAB: !!(racingWheelArray[11] & 8),
    MENU: !!(racingWheelArray[11] & 32),
    XBOX: !!(racingWheelArray[12] & 4),
    YELLOW: !!(racingWheelArray[12] & 8),
    SHIFT_PEDAL_LEFT: !!(racingWheelArray[11] & 1),
    SHIFT_PEDAL_RIGHT: !!(racingWheelArray[11] & 2),
  };

  return {
    GEAR,
    WHEEL,
    PEDAL,
    D_PAD,
    POTMETER,
    BUTTONS
  };
}
module.exports = {
  connectToTXRacingWheel,
};
