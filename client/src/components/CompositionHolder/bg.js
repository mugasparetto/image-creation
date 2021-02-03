export default class Background {
  constructor(p) {
    this.p = p;

    this.Y_AXIS = 1;
    this.X_AXIS = 2;

    this.allColors = this.setColors(p.color(210, 215, 255));

    this.pg = p.createGraphics(p.width, p.height);

    this.loadGraphics();
  }

  loadGraphics() {
    const { p, allColors, pg } = this;

    pg.background(allColors.lightColor);

    pg.noFill();

    pg.stroke(allColors.darkColor);
    pg.strokeWeight(2);
    pg.line(0, pg.height / 2, pg.width, pg.height / 2);

    pg.noStroke();
    pg.fill(allColors.midColor);

    pg.beginShape();
    pg.vertex(pg.width, 0.07 * pg.height);
    pg.vertex(pg.width, pg.height);
    pg.vertex(0.25 * pg.width, pg.height);
    pg.endShape(p.CLOSE);

    const transparent = p.color(allColors.lightColor.toString());
    transparent.setAlpha(0);

    this.setGradient(
      0,
      0.4 * pg.height,
      pg.width,
      0.6 * pg.height,
      transparent,
      allColors.lightColor,
      this.Y_AXIS
    );

    this.drawLines();
  }

  display() {
    this.p.image(this.pg, this.pg.width / 2, this.pg.height / 2);
  }

  setColors(c) {
    const { p } = this;

    p.colorMode(p.HSL);

    const midHue = p.hue(c);
    const midSaturation = p.saturation(c);
    const midLightness = p.lightness(c);

    //233°, 100%, 91%
    const midColor = c;

    //234°, 100%, 96%

    const lightColor = p.color(
      midHue,
      midSaturation,
      p.constrain(midLightness + 5, 0, 100)
    );

    //233°, 100%, 81%
    const darkColor = p.color(
      midHue,
      midSaturation,
      p.constrain(midLightness - 10, 0, 100)
    );

    return { lightColor, midColor, darkColor };
  }

  drawLines() {
    const { p, allColors, pg } = this;

    const transparent = p.color(allColors.darkColor.toString());
    transparent.setAlpha(0);

    for (let i = 0; i <= 20; i++) {
      pg.push();
      pg.translate(0.55 * pg.width, -0.5 * pg.height + i * (pg.width / 13));
      pg.rotate((0.9 * p.PI) / 3);
      this.setThreeColorGradient(
        0,
        0,
        0.8 * pg.width,
        1,
        transparent,
        allColors.darkColor,
        transparent,
        0.5
      );
      pg.pop();
    }
  }

  setGradient(x, y, w, h, c1, c2, axis) {
    const { pg, p } = this;

    pg.noFill();
    pg.strokeWeight(1);

    if (axis === this.Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = p.map(i, y, y + h, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        pg.stroke(c);
        pg.line(x, i, x + w, i);
      }
    } else if (axis === this.X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = p.map(i, x, x + w, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        pg.stroke(c);
        pg.line(i, y, i, y + h);
      }
    }
  }

  setThreeColorGradient(x, y, w, h, c1, c2, c3, factor) {
    const { p, pg } = this;

    const compFactor = 1 - 2 * factor;

    pg.noFill();
    pg.strokeWeight(1);

    for (let i = x; i <= x + factor * w; i++) {
      let inter = p.map(i, x, x + factor * w, 0, 1);
      let c = p.lerpColor(c1, c2, inter);
      pg.stroke(c);
      pg.line(i, y, i, y + h);
    }

    for (let i = x + factor * w; i <= x + (compFactor + factor) * w; i++) {
      pg.stroke(c2);
      pg.line(i, y, i, y + h);
    }

    for (let i = x + (compFactor + factor) * w; i <= x + w; i++) {
      let inter = p.map(i, x + (compFactor + factor) * w, x + w, 0, 1);
      let c = p.lerpColor(c2, c3, inter);
      pg.stroke(c);
      pg.line(i, y, i, y + h);
    }
  }
}
