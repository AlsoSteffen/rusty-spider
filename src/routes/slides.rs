use std::path::PathBuf;
use rocket::serde::json::Json;
use crate::services::slides::get_dir_images;

#[get("/origami/img-paths")]
pub fn get_slide_paths() -> Json<Vec<PathBuf>> {
    Json(get_dir_images("static\\img\\origami"))
}

