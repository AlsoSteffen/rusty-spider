class Slideshow {
    FETCH_ROUTES = "/origami/img-paths";
    _current_slide_no;
    _slide_paths;
    _automatic;

    constructor(automatic) {
        this._automatic = automatic;
        this._current_slide_no = 0;
        this._fetch_paths(this.FETCH_ROUTES)
            .then(res => {this._slide_paths = res;})
            .then(_ => this._create_slides(this._slide_paths))
            .then(_ => this.current_slide(1));
    }

    async _fetch_paths(routes) {
       return fetch(routes).then(res => res.json())
    }

    _create_slides(img_paths) {
        let slideshow_div = document.getElementById('origami-slideshow');
        let dots_div = document.getElementById('origami-slideshow-dots');
        for (let i = 0; i < img_paths.length; i++) {
            // Create slideshow image elements.
            let container = document.createElement("div");
            container.classList.add(["slide-container"]);

            let img_no = document.createElement("div");
            img_no.appendChild(document.createTextNode(`${i + 1} / ${img_paths.length}`));
            img_no.classList.add(["slide-img-number"]);

            let img = document.createElement("img");
            img.setAttribute("src", img_paths[i]);
            img.classList.add(["slide-img"]);


            let caption = document.createElement("div");
            caption.classList.add(["slide-caption"]);

            // Add sub-elements to container.
            container.appendChild(img_no);
            container.appendChild(img);
            container.appendChild(caption);

            // Add elements to slideshow
            slideshow_div.appendChild(container);
        }
    }

    show_slide(slide_no) {
        let slides = document.getElementsByClassName("slide-container");
        let dots = document.getElementsByClassName("slide-dot");

        if (slide_no > this._slide_paths.length) {this._current_slide_no = 1}
        if (slide_no < 1) {this._current_slide_no = this._slide_paths.length}

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[this._current_slide_no-1].style.display = "block";
        dots[this._current_slide_no-1].className += " active";
    }

    current_slide(slide_no) {
        this._current_slide_no = slide_no;
        this.show_slide(slide_no);
    }

    next_slide() {
        this.current_slide(this._current_slide_no += 1);
    }

    prev_slide() {
        this.current_slide(this._current_slide_no -= 1);
    }
}