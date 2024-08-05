/**
 * Color presets in RGB format
 */
enum ebColors {
    //% block=vermelho
    Red = 0xFF0000,
    //% block=laranja
    Orange = 0xFFA500,
    //% block=amarelo
    Yellow = 0xFFFF00,
    //% block=verde
    Green = 0x00FF00,
    //% block=azul
    Blue = 0x0000FF,
    //% block=violeta
    Violet = 0x8a2be2,
    //% block=branco
    White = 0xFFFFFF,
    //% block=preto
    Black = 0x000000
}

/**
 * Shield Color Input Ports 
 */
enum ebColorInputPorts {
    //% block="Entrada 1"
    ebiInput1 = 0,
    //% block="Entrada 2"
    ebiInput2 = 1,
    //% block="Entrada 3"
    ebiInput3 = 2
}

/**
 * RGB component enumerate
 */
enum ebRgbColor {
    //% block=vermelho
    rgbRed = 0,
    //% block=verde
    rgbGreen = 1,
    //% block=azul
    rgbBlue = 2
}

/**
 * RGB struct
 */
interface rgbColor {
    red: number;
    green: number;
    blue: number;
}

/**
 * Motor direction
 */
enum ebMotorDirection {
    //% block="horário"
    ebmClockwise = 0,
    //% block="anti-horário"
    ebmCounterClockwise = 1
}

/**
 * Shield Input Ports 
 */
enum ebInputPorts {
    //% block="Entrada 1"
    ebiInput1 = 0,
    //% block="Entrada 2"
    ebiInput2 = 1,
    //% block="Entrada 3"
    ebiInput3 = 2,
    //% block="Entrada A"
    ebiInputA = 3,
    //% block="Entrada B"
    ebiInputB = 4,
    //% block="Entrada C"
    ebiInputC = 5
}

/**
 * Shield Output Ports 
 */
enum ebOutputPorts {
    //% block="Saída 1"
    eboOutput1 = 0,
    //% block="Saída 2"
    eboOutput2 = 1,
    //% block="Saída 3"
    eboOutput3 = 2,
    //% block="Saída A"
    eboOutputA = 3,
    //% block="Saída B"
    eboOutputB = 4,
    //% block="Saída C"
    eboOutputC = 5
}

/**
 * Shield Block Available Output Ports 
 */
enum ebBlockOutputPorts {
    //% block="Saída 1"
    ebbOutput1 = 0,
    //% block="Saída 2"
    ebbOutput2 = 1,
    //% block="Saída 3"
    ebbOutput3 = 2,
}

/**
 * EletroBlocks Block
 */

//% color="#AA278D" weight=100 icon="\uf1b2" block="EletroBlocks"
//% groups=['Blocos', 'Funções']
namespace eletroblocks {

    let colorSensorRedFilter = new LowPassFilter(0.8) // filtro das amostras
    let colorSensorGreenFilter = new LowPassFilter(0.8) // filtro das amostras
    let colorSensorBlueFilter = new LowPassFilter(0.8) // filtro das amostras

    let colorSensorRed: number;
    let colorSensorGreen: number;
    let colorSensorBlue: number;

    let redMin: number;
    let redMax: number;
    let greenMin: number;
    let greenMax: number;
    let blueMin: number;
    let blueMax: number;

    function outputFilter(port: ebBlockOutputPorts, filter: boolean): void {
        let filterEnablePin: DigitalPin;
        let filterEnable: number;

        if (filter)
            filterEnable = 0;
        else 
            filterEnable = 1;

        switch (port) {
            case ebBlockOutputPorts.ebbOutput1: {
                filterEnablePin = DigitalPin.P8;
                break;
            }
            case ebBlockOutputPorts.ebbOutput2: {
                filterEnablePin = DigitalPin.P16;
                break;
            }
            case ebBlockOutputPorts.ebbOutput3: {
                filterEnablePin = DigitalPin.P10; 
                break;
            }
            default: {
                return;
            }
        }

        pins.digitalWritePin(filterEnablePin, filterEnable);
    }

    /**
     * Define um valor digital para porta
     * @param port porta de saída
     * @param outputValue valor digital, 0 ou 1
     */
    //% blockId="eletroblocks_setDigitalOutput" block="gravação digital na %port para %outputValue"
    //% outputValue.min=0 outputValue.max=1
    //% weight=97
    export function setDigitalOutput(port: ebOutputPorts, outputValue: number): void {
        let pin: DigitalPin;

        switch (port) {
            case ebOutputPorts.eboOutput1: {
                outputFilter(ebBlockOutputPorts.ebbOutput1, false);
                pin = DigitalPin.P15;
                break;
            }
            case ebOutputPorts.eboOutput2: {
                outputFilter(ebBlockOutputPorts.ebbOutput2, false);
                pin = DigitalPin.P14;
                break;
            }
            case ebOutputPorts.eboOutput3: {
                outputFilter(ebBlockOutputPorts.ebbOutput3, false);
                pin = DigitalPin.P13;
                break;
            }
            case ebOutputPorts.eboOutputA: {
                pin = DigitalPin.P3;
                break;
            }
            case ebOutputPorts.eboOutputB: {
                pin = DigitalPin.P4;
                break;
            }
            case ebOutputPorts.eboOutputC: {
                pin = DigitalPin.P10;
                break;
            }
        }

        pins.digitalWritePin(pin, outputValue);
    }

    /**
     * Define um valor analógico para porta. As saídas 1, 2 e 3 apresentam valor analógico real, enquanto A, B e C são pulsadas
     * @param port porta de saída
     * @param outputValue valor analógico, 0 a 1023
     */
    //% blockId="eletroblocks_setAnalogOutput" block="gravação analógica na %port para %outputValue"
    //% outputValue.min=0 outputValue.max=1023
    //% weight=98
    export function setAnalogOutput(port: ebOutputPorts, outputValue: number): void {
        let pin: AnalogPin;
        

        switch (port) {
            case ebOutputPorts.eboOutput1: {
                outputFilter(ebBlockOutputPorts.ebbOutput1, true);
                pin = AnalogPin.P15;
                break;
            }
            case ebOutputPorts.eboOutput2: {
                outputFilter(ebBlockOutputPorts.ebbOutput2, true);
                pin = AnalogPin.P14;
                break;
            }
            case ebOutputPorts.eboOutput3: {
                outputFilter(ebBlockOutputPorts.ebbOutput3, true);
                pin = AnalogPin.P13;
                break;
            }
            case ebOutputPorts.eboOutputA: {
                pin = AnalogPin.P3;
                break;
            }
            case ebOutputPorts.eboOutputB: {
                pin = AnalogPin.P4;
                break;
            }
            case ebOutputPorts.eboOutputC: {
                pin = AnalogPin.P10;
                break;
            }
        }

        pins.analogWritePin(pin, outputValue);
        pins.analogSetPeriod(pin, 200) // 5kHz
    }

    /**
     * Define um valor de controle de servo na porta.
     * @param port porta de saída
     * @param outputValue valor de graus, 0 a 180
     */
    //% blockId="eletroblocks_setServoOutput" block="define servo na %port para %outputValue"
    //% outputValue.min=0 outputValue.max=180 outputValue.defl=90
    //% weight=96
    export function setServoOutput(port: ebBlockOutputPorts, outputValue: number): void {
        let pin: AnalogPin;

        switch (port) {
            case ebBlockOutputPorts.ebbOutput1: {
                pin = AnalogPin.P15;
                break;
            }
            case ebBlockOutputPorts.ebbOutput2: {
                pin = AnalogPin.P14;
                break;
            }
            case ebBlockOutputPorts.ebbOutput3: {
                pin = AnalogPin.P13;
                break;
            }
        }
        outputFilter(port, false);
        pins.servoWritePin(pin, outputValue);
    }

    /**
     * Define um valor de velocidade para o motor.
     * @param port porta de saída
     * @param outputValue valor de velocidade, 0 a 1023
     */
    //% blockId="eletroblocks_setMotorValue" block="gira motor na %port com %speed para sentido %direction"
    //% speed.min=0 speed.max=1023 speed.defl=1023
    //% weight=95
    export function setMotorValue(port: ebBlockOutputPorts, speed: number, direction: ebMotorDirection): void {
        if(speed > 1023)
            speed = 1023

        const _port: number = port;
        let _speed = (speed & 0x3ff) >> 1;

        switch (direction){
            case ebMotorDirection.ebmClockwise:{
                setAnalogOutput(_port, 512 + _speed);
                break;
            }
            case ebMotorDirection.ebmCounterClockwise:{
                setAnalogOutput(_port, 511 - _speed);
                break;
            }
        }
    }

    /**
     * Lê um valor digital da porta
     * @param port porta de entrada
     * @param outputValue valor digital, 0 ou 1
     */
    //% blockId="eletroblocks_getDigitalInput" block="leitura digital na %port"
    //% weight=99
    export function getDigitalInput(port: ebInputPorts): number {
        let pin: DigitalPin;

        switch (port) {
            case ebInputPorts.ebiInput1: {
                pin = DigitalPin.P0;
                break;
            }
            case ebInputPorts.ebiInput2: {
                pin = DigitalPin.P2;
                break;
            }
            case ebInputPorts.ebiInput3: {
                pin = DigitalPin.P1;
                break;
            }
            case ebInputPorts.ebiInputA: {
                pin = DigitalPin.P3;
                break;
            }
            case ebInputPorts.ebiInputB: {
                pin = DigitalPin.P4;
                break;
            }
            case ebInputPorts.ebiInputC: {
                pin = DigitalPin.P10;
                break;
            }
        }

        return pins.digitalReadPin(pin);
    }

    //% blockId="calibrateColorSensor" block="calibra o sensor de cor na %port"
    //% weight=66
    export function calibrateColorSensor(port: ebColorInputPorts): void {
        enum state {
            sWAIT_START,
            sGET_LIGHTEST,
            sWAIT_BUTTON,
            sGET_DARKEST,
            sEND
        }

        serial.writeLine("calibrando")

        let currentState: state = state.sWAIT_START;
        let tempColor: number;
        let tempRedMin: number;
        let tempRedMax: number;
        let tempGreenMin: number;
        let tempGreenMax: number;
        let tempBlueMin: number;
        let tempBlueMax: number;

        let calibrating: boolean = true;
        while(calibrating){

            switch (currentState) {
                case state.sWAIT_START: {
                    basic.showArrow(ArrowNames.West)

                    while (!input.buttonIsPressed(Button.A));

                    basic.clearScreen()

                    redMin = 0;
                    redMax = 255;
                    greenMin = 0;
                    greenMax = 255;
                    blueMin = 0;
                    blueMax = 255;

                    currentState = state.sGET_DARKEST
                    break;
                }
                case state.sGET_DARKEST: {
                    basic.showLeds(`
                    . # # # .
                    . # . . .
                    . # # # .
                    . # . . .
                    . # # # .
                    `)
                    tempColor = getColorSensor(port);
                    tempRedMin = getColorIntensity(tempColor, ebRgbColor.rgbRed);
                    tempGreenMin = getColorIntensity(tempColor, ebRgbColor.rgbGreen);
                    tempBlueMin = getColorIntensity(tempColor, ebRgbColor.rgbBlue);

                    for (let i = 0; i < 5; i++) {
                        tempColor = getColorSensor(port);

                        if (getColorIntensity(tempColor, ebRgbColor.rgbRed) < redMin)
                            tempRedMin = getColorIntensity(tempColor, ebRgbColor.rgbRed);
                        if (getColorIntensity(tempColor, ebRgbColor.rgbGreen) < greenMin)
                            tempGreenMin = getColorIntensity(tempColor, ebRgbColor.rgbGreen);
                        if (getColorIntensity(tempColor, ebRgbColor.rgbBlue) < blueMin)
                            tempBlueMin = getColorIntensity(tempColor, ebRgbColor.rgbBlue);
                    }

                    currentState = state.sWAIT_BUTTON
                    break;
                }
                case state.sWAIT_BUTTON: {
                    basic.showArrow(ArrowNames.West)
                    
                    while(!input.buttonIsPressed(Button.A));

                    basic.clearScreen()

                    currentState = state.sGET_LIGHTEST
                    break;
                }
                case state.sGET_LIGHTEST:  {
                    basic.showLeds(`
                    . # # # .
                    . # . . .
                    . # . . .
                    . # . . .
                    . # # # .
                    `)
                    tempColor = getColorSensor(port);
                    tempRedMax = getColorIntensity(tempColor, ebRgbColor.rgbRed);
                    tempGreenMax = getColorIntensity(tempColor, ebRgbColor.rgbGreen);
                    tempBlueMax = getColorIntensity(tempColor, ebRgbColor.rgbBlue);

                    for (let i = 0; i < 5; i++) {
                        tempColor = getColorSensor(port);

                        if (getColorIntensity(tempColor, ebRgbColor.rgbRed) > redMax)
                            tempRedMax = getColorIntensity(tempColor, ebRgbColor.rgbRed);
                        if (getColorIntensity(tempColor, ebRgbColor.rgbGreen) > greenMax)
                            tempGreenMax = getColorIntensity(tempColor, ebRgbColor.rgbGreen);
                        if (getColorIntensity(tempColor, ebRgbColor.rgbBlue) > blueMax)
                            tempBlueMax = getColorIntensity(tempColor, ebRgbColor.rgbBlue);
                    }

                    currentState = state.sEND;
                    break;
                }
                case state.sEND: {
                    redMin = tempRedMin;
                    redMax = tempRedMax;
                    greenMin = tempGreenMin;
                    greenMax = tempGreenMax;
                    blueMin = tempBlueMin;
                    blueMax = tempBlueMax;

                    basic.clearScreen()
                    calibrating = false;
                    
                    break;
                }
            }

        }
        return;
                
    }

    //% blockId="eletroblocks_getColorIntensity" block="obter de %rgb a quantidade de %color"
    //% weight=60
    export function getColorIntensity(rgb: number, color: ebRgbColor): number {
        switch (color){
            case ebRgbColor.rgbRed: {
                return (rgb >> 16) & 0xFF;
            }
            case ebRgbColor.rgbGreen: {
                return (rgb >> 8) & 0xFF;
            }
            case ebRgbColor.rgbBlue: {
                return rgb & 0xFF;
            }
        }
    }

    //% blockId="eletroblocks_getColorSensor" block="ler cor na %port"
    //% weight=94
    export function getColorSensor(port: ebColorInputPorts): number {
        let pin: AnalogPin;
        let maxTimeout: number;
        let rgb: number[];

        switch (port) {
            case ebColorInputPorts.ebiInput1: {
                pin = AnalogPin.P0;
                break;
            }
            case ebColorInputPorts.ebiInput2: {
                pin = AnalogPin.P1;
                break;
            }
            case ebColorInputPorts.ebiInput3: {
                pin = AnalogPin.P2;
                break;
            }
        }

        enum state {
            sINIT = 0,
            sWAITING_SYNC,
            sWAITING_TRIGGER,
            sWAIT_START,
            sREADING,
            sWAIT_STOP,
            sCONVERT
        }

        let voltage: number;
        let averageVoltage: number;
        let referenceTime: number;
        let currentState: state;
        let startTime: number, stopTime: number;
        let gettingColor: boolean;

        currentState = state.sWAITING_TRIGGER;

        rgb = [-1, -1, -1]; // reset colors
        gettingColor = true;
    
        while (gettingColor){
            voltage = pins.analogReadPin(pin); // get instantaneous sensor value

            if (input.runningTimeMicros() > referenceTime + 1100000) { // check for timeout
                currentState = state.sINIT;
            }

            switch (currentState) {
                case state.sINIT: {
                    referenceTime = input.runningTimeMicros();

                    currentState = state.sWAITING_SYNC;
                    break;
            }
                case state.sWAITING_SYNC: {
                        if (voltage < 20) // less than 78.2mV
                        currentState = state.sWAITING_TRIGGER;
                    break;
                }
                case state.sWAITING_TRIGGER: {
                        if (voltage > 20) { // less than 78.2mV
                        startTime = input.runningTimeMicros() + 60000;
                        stopTime = startTime + 50000;

                        currentState = state.sWAIT_START;
                    }
                    break;
                }
                case state.sWAIT_START: {
                    if (input.runningTimeMicros() >= startTime) {
                        currentState = state.sREADING;
                    }
                    break;
                }
                case state.sREADING: {
                    let voltageFilter = new LowPassFilter(0.5);
                    /* do 16 samples average */
                    for(let i = 0; i < 16; i++){
                        averageVoltage = Math.round(voltageFilter.filter(pins.analogReadPin(pin)));
                    }

                    currentState = state.sWAIT_STOP;
                    break;
                }
                case state.sWAIT_STOP: {
                    if (input.runningTimeMicros() >= stopTime) {
                        currentState = state.sCONVERT;
                    }
                    break;
                }
                case state.sCONVERT: {
                    if (averageVoltage >= 26 && averageVoltage <= 281) { // bettween 0.1 and 1.1 V, 255 range
                        rgb[0] = averageVoltage - 26; // consider a red value
                        colorSensorRed = Math.round(colorSensorRedFilter.filter(rgb[0]));

                    } else if (averageVoltage >= 308 && averageVoltage <= 563) { // bettween 1.2 and 2.2 V, 255 range
                        rgb[1] = averageVoltage - 308; // consider a green value
                        colorSensorGreen = Math.round(colorSensorGreenFilter.filter(rgb[1]));

                    } else if (averageVoltage >= 589 && averageVoltage <= 844) { // bettween 2.3 and 3.3 V, 255 range
                        rgb[2] = averageVoltage - 589; // consider a blue value
                        colorSensorBlue = Math.round(colorSensorBlueFilter.filter(rgb[2]));

                    }

                    if (rgb[0] >= 0 && rgb[1] >= 0 && rgb[2] >= 0){
                        gettingColor = false;
                    }

                    currentState = state.sINIT;
                    break;
                }
            }
        }

        let red: number;
        let green: number;
        let blue: number;

        red = parseInt((rgb[0] - redMin) / ((redMax - redMin) / 255) + '');
        green = parseInt((rgb[1] - greenMin) / ((greenMax - greenMin) / 255) + '');
        blue = parseInt((rgb[2] - blueMin) / ((blueMax - blueMin) / 255) + '');

        // red = rgb[0];
        // green = rgb[1];
        // blue = rgb[2];


        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    //% blockId="eletroblocks_getAnalogInput" block="leitura analógica na %port"
    //% weight=100
    export function getAnalogInput(port: ebInputPorts): number {
        let pin: AnalogPin;

        switch (port) {
            case ebInputPorts.ebiInput1: {
                pin = AnalogPin.P0;
                break;
            }
            case ebInputPorts.ebiInput2: {
                pin = AnalogPin.P2;
                break;
            }
            case ebInputPorts.ebiInput3: {
                pin = AnalogPin.P1;
                break;
            }
            case ebInputPorts.ebiInputA: {
                pin = AnalogPin.P3;
                break;
            }
            case ebInputPorts.ebiInputB: {
                pin = AnalogPin.P4;
                break;
            }
            case ebInputPorts.ebiInputC: {
                pin = AnalogPin.P10;
                break;
            }
        }

        return pins.analogReadPin(pin);
    }
    //% color="#AA278D"
    export class RgbLed {

        //% weight=64
        //% blockId="rgbled_rgbledRange" block="%ledrgb|iniciando em %start|com %length|leds"
        //% range.defl=range
        //% parts="rgbled"
        //% blockSetVariable=range
        //% start.min=1 start.max=20 start.defl=1
        //% length.min=1 length.max=20 length.defl=1
        range(start: number, length: number): neopixel.Strip {
            let strip = new neopixel.Strip();

            return strip.range(start, length);
        }

        //% blockId="rgbled_showColor" block="define cor de %ledrgb| para %rgb|"
        //% strip.defl=strip
        //% weight=63
        //% parts="rgbled"
        showColor(rgb: number) {
            let strip = new neopixel.Strip();
            strip.showColor(rgb)
        }

        //% blockId="rgbled_rgbledShow" block="acende %ledrgb|"
        //% strip.defl=strip
        //% weight=59
        //% parts="rgbled"
        show() {
            let strip = new neopixel.Strip();
            strip.show()
        }

        //% blockId="rgbled_rgbledClear" block="apaga %ledrgb|"
        //% strip.defl=strip
        //% weight=58
        //% parts="rgbled"
        clear(): void {
            let strip = new neopixel.Strip();
            strip.clear()
            strip.show()
        }
    }

    //% blockId="rgbled_rgbledCreate" block="LEDS RGB na %port|com %numleds|LED"
    //% weight=65
    //% parts="rgbled"
    //% blockSetVariable=ledrgb
    //% length.min=0 length.max=20 length.defl=1
    export function rgbledCreate(port: ebBlockOutputPorts, length: number): neopixel.Strip {
        let strip = new neopixel.Strip();
        let pin: DigitalPin;

        switch (port) {
            case ebBlockOutputPorts.ebbOutput1: {
                outputFilter(port, false);
                pin = DigitalPin.P15;
                break;
            }
            case ebBlockOutputPorts.ebbOutput2: {
                outputFilter(port, false);
                pin = DigitalPin.P14;
                break;
            }
            case ebBlockOutputPorts.ebbOutput3: {
                outputFilter(port, false);
                pin = DigitalPin.P13;
                break;
            }
        }

        strip = neopixel.create(pin, length, NeoPixelMode.RGB)

        return strip;
    }

    //% blockId=eletroblocks_rgb block="vermelho %r|green %g|azul %b"
    //% weight=61
    export function rgb(r: number, g: number, b: number): number {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }

    //% blockId=eletroblocks_color block="cor %color"
    //% weight=62
    export function color(color: ebColors): number {
        let rgb: number = color; 

        return rgb;
    }

}