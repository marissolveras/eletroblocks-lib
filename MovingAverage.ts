class MovingAverage {
    private window: number[];
    private size: number;

    constructor(size: number) {
        this.window = [];
        this.size = size;
    }

    average(val: number): number {
        let sum: number = 0;

        this.window.push(val);

        if (this.window.length > this.size) {
            this.window.shift();
        }

        for (let i: number = 0; i < this.window.length; i++) {
            sum += this.window[i];
        }

        return sum / this.window.length;
    }
}

class LowPassFilter {
    private alpha: number;
    private previousOutput: number;

    constructor(alpha: number) {
        this.alpha = alpha;
        this.previousOutput = 0;
    }

    filter(input: number): number {
        let output: number = this.alpha * input + (1 - this.alpha) * this.previousOutput;
        this.previousOutput = output;
        return output;
    }
}