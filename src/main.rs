#[macro_use]
extern crate rocket;

mod routes;
mod services;

use std::collections::HashMap;
use rocket::fs::{relative, FileServer, Options};
use crate::routes::date::{date_plus_month, get_current_date};
use rocket_dyn_templates::{context, Template};


#[get("/")]
fn index() -> Template {
    let context = context! {
        title_main: "S. Tourbier",
    };

    Template::render("pages/index", &context)}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .mount("/static", FileServer::from(relative!("static")))
        .attach(Template::fairing())
}