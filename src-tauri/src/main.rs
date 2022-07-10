#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn convert_binary(binary_string: String) -> String {
    return binary_to_decimal(binary_string);
}

fn binary_to_decimal(string: String) -> String{
    if string.len() > 10 {
        return "Error: Input Too Large".into();
    }

    let b = string.to_string();
    let mut byte_vec = Vec::new();
    let mut i = 0;
    let mut total = 0;
    
    for value in b.clone().into_bytes() {
        byte_vec.push(value);
        if value != 48 && value != 49 {
            return "Error: Please Enter Only 1's or 0's".into();
        }
    }
    
    let reversed_vec: Vec<_> =  byte_vec.into_iter().rev().collect();
    
    for byte in reversed_vec {
        let bit = if byte == 48 { 0 } else { 1 };
        total += bit * (2_i32.pow(i));
        i += 1
    }
   return total.to_string();
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![convert_binary])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
