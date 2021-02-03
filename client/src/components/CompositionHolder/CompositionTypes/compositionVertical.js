import Background from '../bg.js';

export default function (p) {
  p.state = {};
  const imgArray = [];
  let bg;
  let shouldLoad = true;

  const saveBtn = document.querySelector('#save');
  saveBtn.addEventListener('click', () => {
    p.saveCanvas('composition', 'png');
  });

  p.setup = () => {
    p.createCanvas(1080, 1080);
    p.background(225);

    p.imageMode(p.CENTER);
    bg = new Background(p);
  };

  p.draw = () => {
    p.background(225);

    if (Object.keys(p.state).length !== 0) {
      if (shouldLoad) {
        p.state.images.forEach((image) =>
          p.loadImage(image, (img) => {
            imgArray.push(img);
          })
        );

        // bg = p.loadImage(process.env.PUBLIC_URL + '/bg.png');
        shouldLoad = false;
      } else {
        // p.image(bg, p.width / 2, p.height / 2);
        bg.display();

        p.push();
        p.translate(p.width / 2, p.height / 2);

        for (let i = 0; i < imgArray.length; i++) {
          const w = imgArray[i].width;
          const h = imgArray[i].height;

          const copyImage = p.createImage(w, h);
          copyImage.copy(imgArray[i], 0, 0, w, h, 0, 0, w, h);

          copyImage.resize(
            imgArray[i].width * (0.6 + p.state.size),
            imgArray[i].height * (0.6 + p.state.size)
          );

          const y =
            imgArray.length === 1
              ? 0
              : p.map(
                  i,
                  0,
                  imgArray.length - 1,
                  -(1 / imgArray.length),
                  1 / imgArray.length
                ) * imgArray.length;

          p.image(
            copyImage,
            p.state.horizontalValue +
              (i % 2 === 0 ? 1 : -1) * p.state.displacement,
            p.state.verticalValue + y * 100 + y * p.state.spacing
          );
        }

        p.pop();
      }
    }
  };
}
