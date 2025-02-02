import React, { Component } from "react";
import "./style.css";

class ExplosiveButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.buttonRef.current) {
        new Explosive(this.buttonRef.current);
      }
    }, 100);
  }

  handleClick() {
    if (this.buttonRef.current) {
      const explosive = new Explosive(this.buttonRef.current);
      explosive.explode(1000);
    }

    // Führe die onClick-Methode aus, wenn sie vorhanden ist
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <button
        ref={this.buttonRef}
        className="explosive-button mt-4 px-6 py-2 bg-[#ffb6c1] text-white font-bold rounded-lg shadow-md hover:bg-[#ff9aad] transition-colors duration-300"
        onClick={this.handleClick}
      >
        Click on me 🤍
      </button>
    );
  }
}

class Explosive {
  constructor(element) {
    this.element = element;
    if (!this.element) return;

    this.particleHeight = 0;
    this.particleWidth = 0;
    this.columnCount = 25;
    this.rowCount = 10;
    this.duration = 1000;

    this.updateDimensions();

    if (document.body.animate) {
      this.element.addEventListener("click", this.explode.bind(this, this.duration));
    }
  }

  updateDimensions() {
    if (!this.element) return;
    this.particleWidth = this.element.offsetWidth / this.columnCount;
    this.particleHeight = this.element.offsetHeight / this.rowCount;
  }

  explode(duration) {
    if (!this.element || this.element.classList.contains("exploding")) {
      return;
    }
    this.element.classList.add("exploding");

    this.createParticles(this.columnCount * this.rowCount, duration);

    setTimeout(() => {
      if (this.element) {
        this.element.style.visibility = "hidden";
        this.element.style.pointerEvents = "none";
      }
    }, duration);
  }

  createParticles(count, duration) {
    for (let particleIndex = 0; particleIndex < count; particleIndex++) {
      const particleColumn = (this.particleWidth / 2) + this.particleWidth * (particleIndex % this.columnCount);
      const particleRow = (this.particleHeight / 2) + this.particleWidth * Math.floor(particleIndex / this.columnCount);

      new Particle(this.element, particleColumn, particleRow, this.particleWidth, this.particleHeight, duration);
    }
  }
}

class Particle {
  constructor(parent, column, row, w, h, duration) {
    if (!parent) return;
    
    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;

    this.startPosition = {
      x: column - w / 2,
      y: row - h / 2,
    };

    const targetFactor = randomFloat(0.5, 2);
    this.targetPosition = {
      x: targetFactor * (this.startPosition.x + this.startPosition.x - parentWidth / 2),
      y: targetFactor * (this.startPosition.y + this.startPosition.y - parentHeight / 2),
    };

    const maxAngle = 360;
    const rotX = randomInt(0, maxAngle);
    const rotY = randomInt(0, maxAngle);
    const rotZ = randomInt(0, maxAngle);

    this.div = document.createElement("div");
    this.div.className = "particle moving";
    this.div.style.width = `${w}px`;
    this.div.style.height = `${h}px`;
    this.div.style.transform = `translate(${this.startPosition.x}px, ${this.startPosition.y}px) rotateX(0) rotateY(0) rotateZ(0)`;

    parent.appendChild(this.div);

    this.runSequence(
      this.div,
      [
        {
          opacity: 1,
          transform: `translate(${this.startPosition.x}px, ${this.startPosition.y}px) rotateX(0) rotateY(0) rotateZ(0)`,
          offset: 0,
        },
        {
          opacity: 0.6,
          transform: `translate(${this.targetPosition.x}px, ${this.targetPosition.y}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotY}deg)`,
          offset: 0.98,
        },
        {
          opacity: 0,
          transform: `translate(${this.startPosition.x}px, ${this.startPosition.y}px) rotateX(0) rotateY(0) rotateZ(0)`,
          offset: 1,
        },
      ],
      duration,
      randomFloat(0, 100)
    );
  }

  runSequence(el, keyframes, duration, delay) {
    if (!el) return;

    let animation = el.animate(keyframes, {
      duration: duration,
      easing: "cubic-bezier(0.25, 1, 0.25, 1)",
      delay: delay,
    });

    animation.onfinish = () => {
      if (el) {
        el.classList.remove("moving");
      }

      if (!document.querySelector(".particle.moving") && el?.parentElement) {
        el.parentElement.className = "";
        el.parentElement.innerHTML = "Explode";
      }
    };
  }
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

export default ExplosiveButton;
