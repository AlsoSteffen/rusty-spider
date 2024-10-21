use std::fs;
use std::path::PathBuf;

pub fn get_dir_images(dir: &str) -> Vec<PathBuf> {
    let mut paths: Vec<PathBuf> = Vec::new();
    let reader = fs::read_dir(dir).unwrap();

    for file in reader {
        paths.push(PathBuf::from(file.unwrap().path()));
    }

    paths
}
