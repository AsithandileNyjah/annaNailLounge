<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-md-6 position-relative">
        <h1 class="about">About Anna Nail Lounge:</h1>
        <p>
          Anna Nail Lounge is a premier destination for exquisite nail care and pampering experiences. Established with a commitment to excellence and a passion for beauty, we offer a sanctuary where clients can escape the hustle and bustle of everyday life and indulge in luxurious nail treatments that leave them feeling refreshed, rejuvenated, and ready to conquer the world.
        </p>
        <div class="animated-border"></div>
      </div>
      <div class="col-md-6 position-relative">
        <h1 class="about">Mission Statement:</h1>
        <p>
          At Anna Nail Lounge, our mission is to provide unparalleled nail care services in a welcoming and tranquil environment. We strive to exceed our clients' expectations by delivering exceptional quality, creativity, and professionalism in every service we offer. Our goal is to enhance the beauty, confidence, and well-being of our clients through personalized attention and attention to detail.
        </p>
        <div class="animated-border"></div>
      </div>
      <div class="col-md-6 position-relative">
        <h1 class="about">Vision:</h1>
        <p>
          Our vision at Anna Nail Lounge is to become the go-to destination for discerning individuals seeking the ultimate nail care experience. We aspire to set the standard for excellence in the industry, continually innovating and evolving to meet the evolving needs and desires of our clients. We aim to cultivate a loyal clientele who trust us as their partners in beauty and relaxation.
        </p>
        <div class="animated-border"></div>
      </div>
      <div class="col-md-6 position-relative">
        <h1 class="about">Our Offers:</h1>
        <p>
          Luxurious Nail Treatments: Indulge in a wide range of nail services, including manicures, pedicures, gel nails, acrylic nails, nail art, and more, performed by skilled technicians with a keen eye for detail and a commitment to perfection.
        </p>
        <div class="animated-border"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  text-align: center;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.col-md-6 {
  margin-bottom: 20px;
}
.animated-border {
  position: absolute;
  height: 2px;
  background-color:  rgb(252, 142, 160);
  width: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: width 0.5s ease;
}

.col-md-6:hover .animated-border {
  width: 100%;
}
</style>



