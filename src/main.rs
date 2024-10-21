#[macro_use]
extern crate rocket;

mod routes;
mod services;

use crate::routes::date::get_current_date;
use crate::routes::slides::get_slide_paths;
use rocket::fs::{relative, FileServer};
use rocket_dyn_templates::{context, Template};

#[get("/")]
fn index() -> Template {
    let context = context! {
        title_main: "S. Tourbier",
    };

    Template::render("pages/index", &context)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/static", FileServer::from(relative!("static")))
        .mount("/", routes![index, get_current_date, get_slide_paths])
        .attach(Template::fairing())
}