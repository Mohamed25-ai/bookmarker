# 📌 Bookmarker Web App

Bookmarker is a simple web application that allows users to save, validate, and manage their favorite website links locally in the browser using `localStorage`. It features form validation, modal alerts, and dynamic rendering of saved URLs.

---

## ✨ Features

- ✅ Add a new bookmark with a **name** and **URL**.
- 🧪 Real-time input **validation** with regex.
- ⚠️ Modal popup alerts when inputs are invalid.
- 💾 Bookmarks are **saved in localStorage** and persist between sessions.
- 👁️ Visit bookmarked sites directly.
- 🗑️ Delete any saved bookmark.
- 📱 Fully responsive UI with **Bootstrap 5**.

---

## 🚀 Technologies Used

- **HTML5**  
- **CSS3** (with Bootstrap)  
- **JavaScript (Vanilla)**  
- **FontAwesome** for icons  
- **localStorage** for data persistence  

---

## 🧠 How It Works

1. User enters a **site name** and **URL**.
2. The app:
   - Validates both inputs:
     - Name: At least 3 characters.
     - URL: Must end with `.com`.
   - If valid, the site is stored in `localStorage` and rendered in the table.
   - If invalid, a **Bootstrap modal** appears explaining the rules.
3. User can:
   - **Visit** the site.
   - **Delete** it from the list.

---

## 🧪 Input Validation Rules

| Field       | Rule                                            |
|-------------|-------------------------------------------------|
| Site Name   | Minimum 3 characters, alphanumeric only         |
| Site URL    | Must match the format `example.com`             |

---

