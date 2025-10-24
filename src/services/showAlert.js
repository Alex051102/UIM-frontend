export default function showAlert(message) {
  if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
    window.Telegram.WebApp.showAlert(message);
  } else if (typeof window.alert !== 'undefined') {
    window.alert(message);
  }
}
