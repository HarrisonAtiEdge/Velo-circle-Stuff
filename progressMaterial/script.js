window.addEventListener("DOMContentLoaded", () => {
    const ccl = new ConcentricCircleLoader(".l");
});

class ConcentricCircleLoader {
    /** SVG used for the loader */
    el = null;
    /** Milliseconds to start progress */
    delay = 750;
    /** Timeout function for progress increments */
    timeout = 0;
    /** Progress amount in which 0 = 0% and 1 = 100% */
    _progress = 0;
    /** Loader is running. */
    _running = false;

    /**
     * @param el CSS selector of the SVG
     */
    constructor(el) {
        this.el = document.querySelector(el);
        this.timeout = setTimeout(this.progressStart.bind(this), this.delay);
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        this._progress = value;
        this.progressDisplay();
    }

    get progressPerceived() {
        return Math.floor(Easing.easeOutCirc(this.progress) * 100);
    }

    get running() {
        return this._running;
    }

    set running(value) {
        this._running = value;
        this.runningClass();
    }

    /** Display the progress as a readable value and `aria-label`. */
    progressDisplay() {
        // update the aria label
        if (this.el) {
            this.el.setAttribute("aria-label", `${this.progressPerceived}%`);
        }
        // update the display value
        const progressEl = this.el?.querySelector("[data-progress]");
        if (progressEl) {
            progressEl.textContent = `${this.progressPerceived}`;
        }
    }

    /**
     * Increment the progress. When it reaches 100%, it stops the runner.
     * @param amount Amount to add
     */
    progressInc(amount = 0.01) {
        this.progress = this.progress + amount;

        if (this.progress >= 1) {
            this.progress = 1;
            this.running = false;

        } else if (this.running) {
            const timeoutInterval = 40;
            this.timeout = setTimeout(this.progressInc.bind(this, 0.01), timeoutInterval);
        }
    }

    /** Set the progress back to 0. */
    progressReset() {
        this.progress = 0;
    }

    /** Start incrementing the progress. */
    progressStart() {
        this.running = true;
        this.progressInc(0.01);
    }

    /** Add the CSS animations when the loader is running. */
    runningClass() {
        if (this.running) {
            const runningClass = "l--running";
            this.el?.classList.add(runningClass);
        }
    }
}

/** Easing functions from https://easings.net/ */
class Easing {
    /**
     * @param x Number along the X-axis (should be between 0 and 1)
     */
    static easeOutCirc(x) {
        return Math.sqrt(1 - (1 - x) ** 2);
    }

    /**
     * @param x Number along the X-axis (should be between 0 and 1)
     */
    static easeOutCubic(x) {
        return 1 - (1 - x) ** 3;
    }

    /**
     * @param x Number along the X-axis (should be between 0 and 1)
     */
    static easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
    }
}
